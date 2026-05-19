export const applicationStatuses = [
  "saved",
  "applied",
  "interview",
  "rejected",
  "offer",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

// Represents a job application row from SQLite.
export type ApplicationRow = {
  id: number;
  company_name: string;
  job_title: string;
  job_link: string | null;
  status: ApplicationStatus;
  date_applied: string | null;
  contact_name: string | null;
  contact_email: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

// Represents a job application returned by the API.
export type Application = {
  id: number;
  companyName: string;
  jobTitle: string;
  jobLink: string | null;
  status: ApplicationStatus;
  dateApplied: string | null;
  contactName: string | null;
  contactEmail: string | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
};

// Describes the data required when creating a job application -> move to its own file?
export type CreateApplicationInput = {
  companyName: string;
  jobTitle: string;
  jobLink?: string | null;
  status: ApplicationStatus;
  dateApplied?: string | null;
  contactName?: string | null;
  contactEmail?: string | null;
  notes?: string | null;
};
