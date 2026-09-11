import { EventDetails, Participant, Speaker } from './types';

export const EVENT_DETAILS: EventDetails = {
  title: "5-Day AI Engineering Knowledge Webinar Series",
  subtitle: "Explore • Learn • Innovate with AI",
  organizer: "Vaigai College of Engineering",
  departments: "Department of Electronics and Communication Engineering & Department of Computer Science and Engineering",
  startDate: "September 7, 2026",
  endDate: "September 11, 2026",
  unlockDateTime: "2026-09-11T20:00:00+05:30", // Sept 11, 2026 at 8:00 PM IST
  time: "7:00 PM – 8:00 PM IST Daily",
  convener: {
    name: "Dr. R. Sivaranjani",
    title: "Principal i/c & Convener • Professor / ECE"
  },
  coordinators: [
    {
      name: "Mrs. P. Kursheetha Begum",
      title: "Co-ordinator • AP / ECE"
    },
    {
      name: "Ms. N. Roobika",
      title: "Co-ordinator • AP / CSE"
    },
    {
      name: "Ms. E. Selvamahalakshmi",
      title: "Co-ordinator • AP / ECE"
    }
  ],
  registrationUrl: "https://forms.gle/Q28jBNMCCdrUT6VD8",
  sheetUrl: "https://docs.google.com/spreadsheets/d/1n0qntg1k2uM6P9I_qd6jr2sh07FsKGVtAoO3HejxwG4/export?format=csv&gid=1021106059"
};

export const SPEAKERS_SCHEDULE: Speaker[] = [
  {
    day: 1,
    date: "Sept 7, 2026",
    speaker: "Mr. Jaiber John",
    title: "Robotics & AI Researcher",
    topic: "Embodied AI: Bridging Vision, Language, and Action for Next-Gen Robotics"
  },
  {
    day: 2,
    date: "Sept 8, 2026",
    speaker: "Dr. Yoga Meena",
    title: "Professor & Computer Vision Specialist",
    topic: "Computer Vision and AI: Leveraging Video Analytics for Enhanced Insight"
  },
  {
    day: 3,
    date: "Sept 9, 2026",
    speaker: "Dr. S. Mohamed Mansoor Roomi",
    title: "Distinguished Academician & AI Researcher",
    topic: "Deep Learning & Multimedia Analytics for Emerging Applications"
  },
  {
    day: 4,
    date: "Sept 10, 2026",
    speaker: "Mrs. Vijayalakshmi",
    title: "AI Solutions Architect",
    topic: "Engineering the Future with AI: From Curiosity to Creating Real-World Solutions"
  },
  {
    day: 5,
    date: "Sept 11, 2026",
    speaker: "Mr. Muthu Nivas",
    title: "AI Strategist & Tech Leader",
    topic: "The Democratization of Knowledge in the AI Age"
  }
];

export const SAMPLE_PARTICIPANTS: Participant[] = [
  {
    id: "part-001",
    timestamp: "2026-08-25 10:15:20",
    email: "saravanan.ai@gmail.com",
    salutation: "Mr.",
    name: "Saravanan K",
    fullName: "Mr. Saravanan K",
    designation: "Student",
    branch: "Computer Science and Engineering",
    department: "CSE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9876543210",
    certificateId: "VCE-AI26-84912",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-002",
    timestamp: "2026-08-25 11:30:45",
    email: "praveen.kumar@vaigai.edu.in",
    salutation: "Mr.",
    name: "Praveen Kumar S",
    fullName: "Mr. Praveen Kumar S",
    designation: "Final Year Student",
    branch: "Computer Science and Engineering",
    department: "CSE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9123456780",
    certificateId: "VCE-AI26-77341",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-003",
    timestamp: "2026-08-26 14:22:10",
    email: "divyabharathi.ece@gmail.com",
    salutation: "Ms.",
    name: "Divya Bharathi M",
    fullName: "Ms. Divya Bharathi M",
    designation: "Student",
    branch: "Electronics and Communication Engineering",
    department: "ECE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9443218765",
    certificateId: "VCE-AI26-61029",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-004",
    timestamp: "2026-08-26 16:45:00",
    email: "vignesh.aids@gmail.com",
    salutation: "Mr.",
    name: "Vigneshwaran R",
    fullName: "Mr. Vigneshwaran R",
    designation: "Student",
    branch: "Artificial Intelligence and Data Science",
    department: "AI & DS",
    collegeName: "Thiagarajar College of Engineering",
    mobileNumber: "9786541230",
    certificateId: "VCE-AI26-55912",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-005",
    timestamp: "2026-08-27 09:10:30",
    email: "abinaya.cse@klnce.edu",
    salutation: "Ms.",
    name: "Abinaya S",
    fullName: "Ms. Abinaya S",
    designation: "Student",
    branch: "Computer Science and Engineering",
    department: "CSE",
    collegeName: "KLN College of Engineering",
    mobileNumber: "9842109876",
    certificateId: "VCE-AI26-38291",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-006",
    timestamp: "2026-08-27 11:20:15",
    email: "mukhilan.sc@gmail.com",
    salutation: "Mr.",
    name: "Mukhilan SC",
    fullName: "Mr. Mukhilan SC",
    designation: "Student",
    branch: "Artificial Intelligence and Machine Learning",
    department: "AI & ML",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9944112233",
    certificateId: "VCE-AI26-49102",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-007",
    timestamp: "2026-08-27 14:05:40",
    email: "sudarshan.b@gmail.com",
    salutation: "Mr.",
    name: "B. Sudarshan",
    fullName: "Mr. B. Sudarshan",
    designation: "Student",
    branch: "Computer Science and Engineering",
    department: "CSE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9789012345",
    certificateId: "VCE-AI26-72819",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-008",
    timestamp: "2026-08-28 10:12:00",
    email: "karthickraja.j@gmail.com",
    salutation: "Mr.",
    name: "J. Karthick Raja",
    fullName: "Mr. J. Karthick Raja",
    designation: "Student",
    branch: "Electronics and Communication Engineering",
    department: "ECE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9655443322",
    certificateId: "VCE-AI26-83941",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-009",
    timestamp: "2026-08-28 12:45:10",
    email: "kaavya.t@gmail.com",
    salutation: "Ms.",
    name: "Kaavya T",
    fullName: "Ms. Kaavya T",
    designation: "Student",
    branch: "Computer Science and Engineering",
    department: "CSE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9566778899",
    certificateId: "VCE-AI26-90482",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-010",
    timestamp: "2026-08-29 09:30:22",
    email: "leoakash.s@gmail.com",
    salutation: "Mr.",
    name: "S. Leo Akash",
    fullName: "Mr. S. Leo Akash",
    designation: "Student",
    branch: "Information Technology",
    department: "IT",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9445566778",
    certificateId: "VCE-AI26-19482",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-011",
    timestamp: "2026-08-29 15:10:05",
    email: "vaishnavi.s@gmail.com",
    salutation: "Ms.",
    name: "Vaishnavi S",
    fullName: "Ms. Vaishnavi S",
    designation: "Student",
    branch: "Artificial Intelligence and Data Science",
    department: "AI & DS",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9843322110",
    certificateId: "VCE-AI26-67382",
    issueDate: "September 11, 2026",
    isUnlocked: false
  },
  {
    id: "part-012",
    timestamp: "2026-08-30 11:25:30",
    email: "harivignesh.ece@gmail.com",
    salutation: "Mr.",
    name: "Hari Vignesh G",
    fullName: "Mr. Hari Vignesh G",
    designation: "Student",
    branch: "Electronics and Communication Engineering",
    department: "ECE",
    collegeName: "Vaigai College of Engineering",
    mobileNumber: "9787654321",
    certificateId: "VCE-AI26-58291",
    issueDate: "September 11, 2026",
    isUnlocked: false
  }
];
