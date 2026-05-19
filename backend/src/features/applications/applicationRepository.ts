import { database } from "../../database.js";
import type { Application, ApplicationRow } from "./applicationTypes.js";

// Converts SQLite snake_case fields to API camelCase fields.
export function mapApplicationRow(row: ApplicationRow): Application {
  return {
    id: row.id,
    companyName: row.company_name,
    jobTitle: row.job_title,
    jobLink: row.job_link,
    status: row.status,
    dateApplied: row.date_applied,
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function getApplications(): Application[] {
  const rows = database
    .prepare(
      `
      SELECT
        id,
        company_name,
        job_title,
        job_link,
        status,
        date_applied,
        contact_name,
        contact_email,
        notes,
        created_at,
        updated_at
      FROM job_applications
      ORDER BY created_at DESC
      `,
    )
    .all() as ApplicationRow[];

  // Converts database rows to the format used by the API endpoint.
  return rows.map(mapApplicationRow);
}

// Gets a single job application by id, or null if it does not exist.
export function getApplicationById(id: number): Application | null {
  const row = database
    .prepare(
      `
      SELECT
        id,
        company_name,
        job_title,
        job_link,
        status,
        date_applied,
        contact_name,
        contact_email,
        notes,
        created_at,
        updated_at
      FROM job_applications
      WHERE id = ?
      `,
    )
    .get(id) as ApplicationRow | undefined;

  if (!row) {
    return null;
  }

  return mapApplicationRow(row);
}
