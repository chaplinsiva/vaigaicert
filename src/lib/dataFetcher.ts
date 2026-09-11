import { Participant } from './types';
import { SAMPLE_PARTICIPANTS } from './mockData';

export const SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/1n0qntg1k2uM6P9I_qd6jr2sh07FsKGVtAoO3HejxwG4/export?format=csv&gid=1021106059";

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

export function parseCsvData(csvText: string): Participant[] {
  if (!csvText || !csvText.trim()) return [];

  // Simple, fast, robust CSV parser for standard Google Forms CSV export
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
  
  const getIndex = (possibleNames: string[]): number => {
    return headers.findIndex(h => possibleNames.some(p => h.includes(p.toLowerCase())));
  };

  const nameIdx = getIndex(['name', 'participant name', 'full name']);
  const salutationIdx = getIndex(['salutation', 'title', 'prefix']);
  const emailIdx = getIndex(['email', 'email address', 'mail']);
  const designationIdx = getIndex(['designation', 'role', 'occupation']);
  const branchIdx = getIndex(['branch', 'department', 'stream']);
  const collegeIdx = getIndex(['college', 'institution', 'university', 'organization']);
  const mobileIdx = getIndex(['mobile', 'phone', 'contact', 'whatsapp']);
  const timestampIdx = getIndex(['timestamp', 'date', 'time']);

  const participants: Participant[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    const rawName = nameIdx >= 0 && values[nameIdx] ? values[nameIdx] : '';
    if (!rawName.trim()) continue;

    const salutation = salutationIdx >= 0 && values[salutationIdx] ? values[salutationIdx] : '';
    const fullName = salutation ? `${salutation} ${rawName}` : rawName;
    const email = emailIdx >= 0 && values[emailIdx] ? values[emailIdx] : `participant${i}@vaigai.edu.in`;
    const designation = designationIdx >= 0 && values[designationIdx] ? values[designationIdx] : 'Participant';
    const branch = branchIdx >= 0 && values[branchIdx] ? values[branchIdx] : 'Engineering';
    const collegeName = collegeIdx >= 0 && values[collegeIdx] ? values[collegeIdx] : 'Vaigai College of Engineering';
    const mobileNumber = mobileIdx >= 0 && values[mobileIdx] ? values[mobileIdx] : '';
    const timestamp = timestampIdx >= 0 && values[timestampIdx] ? values[timestampIdx] : new Date().toISOString();

    participants.push({
      id: `sheet-${i}-${Date.now()}`,
      timestamp,
      email,
      salutation,
      name: rawName,
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
          localStorage.setItem('vce_cached_participants', JSON.stringify(parsed));
        }
        return { participants: parsed, source: 'google-sheets' };
      }
    }

    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('vce_cached_participants');
      if (cached) {
        try {
          const parsedCache = JSON.parse(cached);
          if (Array.isArray(parsedCache) && parsedCache.length > 0) {
            return { participants: parsedCache, source: 'cached' };
          }
        } catch {}
      }
    }

    return {
      participants: SAMPLE_PARTICIPANTS,
      source: 'fallback'
    };
  } catch (err: any) {
    return {
      participants: SAMPLE_PARTICIPANTS,
      source: 'fallback',
      error: err.message
    };
  }
}
