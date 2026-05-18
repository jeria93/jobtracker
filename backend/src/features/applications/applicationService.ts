import { getApplications } from "./applicationRepository.js";
import type { Application } from "./applicationTypes.js";

// Retrieves all job applications from the database via the repository.
export function listApplications(): Application[] {
  return getApplications();
}
