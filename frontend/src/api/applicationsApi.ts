import { API_BASE_URL } from "../constants/api";
import type { Application, ApplicationStatus } from "../types/application";

/**
 * Fetches all job applications from the backend API.
 */
export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}/applications`);

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json() as Promise<Application[]>;
}

/**
 * Fetches one job application by id from the backend API.
 */
export async function getApplicationById(id: number): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch application");
  }

  return response.json() as Promise<Application>;
}

/**
 * Updates one job application status through the backend API.
 */
export async function updateApplicationStatus(
  id: number,
  status: ApplicationStatus,
): Promise<Application> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update application status");
  }

  return response.json() as Promise<Application>;
}

/**
 * Deletes one job application through the backend API.
 */
export async function deleteApplication(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete application");
  }
}
