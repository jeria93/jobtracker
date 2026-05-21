import { API_BASE_URL } from "../constants/api";
import type { Application } from "../types/application";

export async function getApplications(): Promise<Application[]> {
  const response = await fetch(`${API_BASE_URL}`);

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json() as Promise<Application[]>;
}
