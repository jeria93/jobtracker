export const applicationStatuses = [
  "saved",
  "applied",
  "interview",
  "rejected",
  "offer",
] as const;

export type ApplicationStatus = (typeof applicationStatuses)[number];

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
