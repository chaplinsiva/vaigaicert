import { Participant } from './types';
import { FULL_PARTICIPANTS_DATA } from './participantsData';

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1n0qntg1k2uM6P9I_qd6jr2sh07FsKGVtAoO3HejxwG4/export?format=csv&gid=1021106059";

export const CACHE_KEY = 'vce_cached_participants_v3';

// Specific participant corrections requested by participants
export const PARTICIPANT_OVERRIDES: Record<string, Partial<Participant>> = {
  // S. Muthukumar: Participant reported missing initial "S." from Latha Mathavan Engineering College
  'suganthamuthukumar@gmail.com': {
    name: 'S. MUTHUKUMAR',
    fullName: 'Mr. S. MUTHUKUMAR',
    collegeName: 'Latha Mathavan Engineering College',
    designation: 'Assistant Professor',
    branch: 'Electronics and Communication Engineering',
    department: 'Electronics and Communication Engineering',
  },
  '06379324941': {
    name: 'S. MUTHUKUMAR',
    fullName: 'Mr. S. MUTHUKUMAR',
    collegeName: 'Latha Mathavan Engineering College',
    designation: 'Assistant Professor',
    branch: 'Electronics and Communication Engineering',
    department: 'Electronics and Communication Engineering',
  },
  '6379324941': {
    name: 'S. MUTHUKUMAR',
    fullName: 'Mr. S. MUTHUKUMAR',
    collegeName: 'Latha Mathavan Engineering College',
    designation: 'Assistant Professor',
    branch: 'Electronics and Communication Engineering',
    department: 'Electronics and Communication Engineering',
  },

  // Nandhini M: Research Scholar from Velammal College of Engineering
  'nandhinik837@gmail.com': {
    name: 'Nandhini M',
    fullName: 'Mrs. Nandhini M',
    designation: 'Research Scholar',
    collegeName: 'Velammal College of Engineering',
    branch: 'ECE',
    department: 'ECE',
  },
  '7094141042': {
    name: 'Nandhini M',
    fullName: 'Mrs. Nandhini M',
    designation: 'Research Scholar',
    collegeName: 'Velammal College of Engineering',
    branch: 'ECE',
    department: 'ECE',
  },

  // Saranya N: Research Scholar from Velammal College of Engineering and Technology
  'amutharajan27@gmail.com': {
    name: 'Saranya N',
    fullName: 'Ms. Saranya N',
    designation: 'Research Scholar',
    collegeName: 'Velammal College of Engineering and Technology',
    branch: 'ECE',
    department: 'ECE',
  },
  '9787598387': {
    name: 'Saranya N',
    fullName: 'Ms. Saranya N',
    designation: 'Research Scholar',
    collegeName: 'Velammal College of Engineering and Technology',
    branch: 'ECE',
    department: 'ECE',
  },
};

function generateCertId(email: string, name: string, index: number): string {
  let hash = 0;
  const str = `${email}-${name}-${index}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash).toString().padStart(6, '0').slice(0, 6);
  return `VCE-AI26-${positiveHash}`;
}

export function formatCollegeName(name: string): string {
  if (!name || !name.trim()) return 'Vaigai College of Engineering';
  const trimmed = name.trim();
  // Normalize ALL-CAPS names if excessively capitalized
  if (trimmed === trimmed.toUpperCase() && trimmed.length > 5) {
    return trimmed
      .split(' ')
      .map(w => w.length <= 3 ? w : w.charAt(0) + w.slice(1).toLowerCase())
      .join(' ');
  }
  return trimmed;
}

export function parseCsvData(csvText: string): Participant[] {
  if (!csvText || !csvText.trim()) return [];

  // Robust CSV parser for Google Forms CSV export
  const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length < 2) return [];

  const parseCsvLine = (text: string): string[] => {
    const result: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur.trim());
    return result;
  };

  const headers = parseCsvLine(lines[0]).map(h => h.trim().toLowerCase());

  const getAllIndices = (possibleNames: string[]): number[] => {
    const list: number[] = [];
    headers.forEach((h, idx) => {
      if (possibleNames.some(p => h.includes(p.toLowerCase()))) {
        list.push(idx);
      }
    });
    return list;
  };

  const nameIndices = getAllIndices(['name', 'participant name', 'full name']);
  const salutationIndices = getAllIndices(['salutation', 'title', 'prefix']);
  const emailIndices = getAllIndices(['email', 'email address', 'mail']);
  const designationIndices = getAllIndices(['designation', 'role', 'occupation']);
  const branchIndices = getAllIndices(['branch', 'department', 'stream']);
  const collegeIndices = getAllIndices(['college', 'institution', 'university', 'industry', 'organization']);
  const mobileIndices = getAllIndices(['mobile', 'phone', 'contact', 'whatsapp']);
  const timestampIndices = getAllIndices(['timestamp', 'date', 'time']);

  const getFirstNonEmpty = (values: string[], indices: number[]): string => {
    for (const idx of indices) {
      if (idx >= 0 && idx < values.length && values[idx] && values[idx].trim()) {
        return values[idx].trim();
      }
    }
    return '';
  };

  const participants: Participant[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const rawName = getFirstNonEmpty(values, nameIndices);
    if (!rawName) continue;

    const email = getFirstNonEmpty(values, emailIndices) || `participant${i}@vaigai.edu.in`;
    const mobileNumber = getFirstNonEmpty(values, mobileIndices);
    const salutation = getFirstNonEmpty(values, salutationIndices);

    // Designation resolution:
    // Check specific role columns (Col 7 / 15) first, fallback to Col 4 (Faculty/Student)
    let specificDesig = '';
    for (const idx of designationIndices) {
      if (idx !== 4 && values[idx] && values[idx].trim()) {
        specificDesig = values[idx].trim();
        break;
      }
    }
    const generalDesig = values[4]?.trim() || '';
    let designation = specificDesig || generalDesig || 'Participant';

    // College resolution: Check all matching college columns (Col 9 for faculty, Col 11 for students, Col 16 for industry)
    let collegeName = getFirstNonEmpty(values, collegeIndices) || 'Vaigai College of Engineering';
    collegeName = formatCollegeName(collegeName);

    // Branch / Department resolution: Col 8 for faculty, Col 17 for students
    let branch = getFirstNonEmpty(values, branchIndices) || 'Engineering';
    const timestamp = getFirstNonEmpty(values, timestampIndices) || new Date().toISOString();

    let name = rawName;
    let fullName = salutation ? `${salutation} ${name}` : name;

    // Check participant overrides by email or mobile number
    const cleanMobile = mobileNumber.replace(/\D/g, '');
    const cleanMobile10 = cleanMobile.slice(-10);
    const override =
      PARTICIPANT_OVERRIDES[email.toLowerCase()] ||
      (cleanMobile ? PARTICIPANT_OVERRIDES[cleanMobile] : undefined) ||
      (cleanMobile10 ? PARTICIPANT_OVERRIDES[cleanMobile10] : undefined);

    if (override) {
      if (override.name) name = override.name;
      if (override.fullName) fullName = override.fullName;
      else if (override.name && salutation) fullName = `${salutation} ${override.name}`;
      if (override.collegeName) collegeName = override.collegeName;
      if (override.designation) designation = override.designation;
      if (override.branch) branch = override.branch;
    }

    participants.push({
      id: `sheet-${i}`,
      timestamp,
      email,
      salutation,
      name,
      fullName,
      designation,
      branch,
      department: branch,
      collegeName,
      mobileNumber,
      certificateId: generateCertId(email, rawName, i),
      issueDate: 'September 11, 2026',
      isUnlocked: false,
    });
  }

  return participants;
}

export async function fetchParticipantsFromSheet(): Promise<{
  participants: Participant[];
  source: 'google-sheets' | 'fallback' | 'cached';
  error?: string;
}> {
  try {
    // Clear legacy cache with outdated parsed data
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('vce_cached_participants');
      } catch {}
    }

    const fetchUrls = [
      SHEET_CSV_URL,
      `https://api.allorigins.win/raw?url=${encodeURIComponent(SHEET_CSV_URL)}`,
      `https://corsproxy.io/?${encodeURIComponent(SHEET_CSV_URL)}`
    ];

    let csvContent: string | null = null;

    for (const url of fetchUrls) {
      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (res.ok) {
          const text = await res.text();
          if (text && text.includes('Timestamp') && text.includes('Name')) {
            csvContent = text;
            break;
          }
        }
      } catch (e) {}
    }

    if (csvContent) {
      const parsed = parseCsvData(csvContent);
      if (parsed.length > 0) {
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(CACHE_KEY, JSON.stringify(parsed));
          } catch {}
        }
        return { participants: parsed, source: 'google-sheets' };
      }
    }

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          if (Array.isArray(parsedCache) && parsedCache.length > 0) {
            return { participants: parsedCache, source: 'cached' };
          }
        } catch {}
      }
    }

    // High quality fallback dataset with all 199 verified participants
    return {
      participants: FULL_PARTICIPANTS_DATA,
      source: 'fallback'
    };
  } catch (err: any) {
    return {
      participants: FULL_PARTICIPANTS_DATA,
      source: 'fallback',
      error: err.message
    };
  }
}
