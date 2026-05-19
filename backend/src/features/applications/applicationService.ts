import {
  getApplicationById,
  getApplications,
} from "./applicationRepository.js";
import type { Application } from "./applicationTypes.js";

// Retrieves all job applications through the repository layer.
export function listApplications(): Application[] {
  return getApplications();
}

// Retrieves a single job application by id, or null if it does not exist.
export function getApplicationDetails(id: number): Application | null {
  return getApplicationById(id);
}
