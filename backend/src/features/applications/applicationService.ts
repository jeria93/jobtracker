import {
  createApplication,
  getApplicationById,
  getApplications,
  updateApplicationStatus,
} from "./applicationRepository.js";
import {
  applicationStatuses,
  type Application,
  type CreateApplicationInput,
  type UpdateApplicationStatusInput,
} from "./applicationTypes.js";

// Retrieves all job applications through the repository layer.
export function listApplications(): Application[] {
  return getApplications();
}

// Retrieves a single job application by id, or null if it does not exist.
export function getApplicationDetails(id: number): Application | null {
  return getApplicationById(id);
}

type CreateApplicationResult =
  | { success: true; application: Application }
  | { success: false; error: string };

// Validates input and creates a new job application.
export function createApplicationDetails(
  input: Partial<CreateApplicationInput>,
): CreateApplicationResult {
  if (!input.companyName?.trim()) {
    return { success: false, error: "Company name is required" };
  }

  if (!input.jobTitle?.trim()) {
    return { success: false, error: "Job title is required" };
  }

  if (!input.status || !applicationStatuses.includes(input.status)) {
    return { success: false, error: "Invalid application status" };
  }

  const application = createApplication({
    companyName: input.companyName.trim(),
    jobTitle: input.jobTitle.trim(),
    jobLink: input.jobLink ?? null,
    status: input.status,
    dateApplied: input.dateApplied ?? null,
    contactName: input.contactName ?? null,
    contactEmail: input.contactEmail ?? null,
    notes: input.notes ?? null,
  });

  return { success: true, application };
}

type UpdateApplicationStatusResult =
  | { success: true; application: Application }
  | { success: false; statusCode: 400 | 404; error: string };

// Validates status input and returns either the updated application or an error.
export function updateApplicationStatusDetails(
  id: number,
  input: Partial<UpdateApplicationStatusInput>,
): UpdateApplicationStatusResult {
  if (!input.status || !applicationStatuses.includes(input.status)) {
    return {
      success: false,
      statusCode: 400,
      error: "Invalid application status",
    };
  }

  const application = updateApplicationStatus(id, input.status);

  if (!application) {
    return {
      success: false,
      statusCode: 404,
      error: "Application not found",
    };
  }

  return { success: true, application };
}
