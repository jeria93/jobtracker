export type SeedApplication = {
  companyName: string;
  jobTitle: string;
  jobLink: string | null;
  status: "saved" | "applied" | "interview" | "rejected" | "offer";
  dateApplied: string | null;
  contactName: string | null;
  contactEmail: string | null;
  notes: string | null;
};

export const seedApplicationsData: SeedApplication[] = [
  {
    companyName: "Spotify",
    jobTitle: "Junior React Native Developer",
    jobLink: "https://example.com/job",
    status: "applied",
    dateApplied: "2026-05-15",
    contactName: "Anna Andersson",
    contactEmail: "anna@example.com",
    notes: "Applied through LinkedIn.",
  },
  {
    companyName: "Klarna",
    jobTitle: "Mobile App Developer",
    jobLink: "https://example.com/job",
    status: "saved",
    dateApplied: "2026-05-14",
    contactName: null,
    contactEmail: null,
    notes: "Need to tailor CV before applying.",
  },
  {
    companyName: "Volvo Cars",
    jobTitle: "Frontend Developer",
    jobLink: "https://example.com/job",
    status: "interview",
    dateApplied: "2026-05-10",
    contactName: null,
    contactEmail: null,
    notes: "First interview booked.",
  },
];
