export interface Participant {
  id: string;
  timestamp: string;
  email: string;
  salutation: string;
  name: string;
  fullName: string;
  designation: string;
  branch: string;
  department: string;
  collegeName: string;
  mobileNumber: string;
  certificateId: string;
  issueDate: string;
  isUnlocked: boolean;
}

export interface Speaker {
  day: number;
  date: string;
  speaker: string;
  title: string;
  designation?: string;
  topic: string;
}

export interface EventDetails {
  title: string;
  subtitle: string;
  organizer: string;
  departments: string;
  startDate: string;
  endDate: string;
  unlockDateTime: string; // ISO string or target date
  time: string;
  convener: {
    name: string;
    title: string;
  };
  coordinators: Array<{
    name: string;
    title: string;
  }>;
  registrationUrl: string;
  sheetUrl: string;
}
