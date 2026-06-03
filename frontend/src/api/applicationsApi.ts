import { API_BASE_URL } from "../constants/api";
import type { Application } from "../types/application";

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
