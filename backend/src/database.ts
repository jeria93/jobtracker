import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { seedApplicationsData } from "./seedData.js";

const dataDirectory = path.join(process.cwd(), "data");
const databasePath =
  process.env.DATABASE_PATH ?? path.join(dataDirectory, "jobtracker.sqlite");

mkdirSync(dataDirectory, { recursive: true });

export const database = new Database(databasePath);

database.pragma("journal_mode = WAL");

export function initializeDatabase() {
  database.exec(`
    CREATE TABLE IF NOT EXISTS job_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT NOT NULL,
      job_title TEXT NOT NULL,
      job_link TEXT,
      status TEXT NOT NULL CHECK (status IN ('saved', 'applied', 'interview', 'rejected', 'offer')),
      date_applied TEXT,
      contact_name TEXT,
      contact_email TEXT,
      notes TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TRIGGER IF NOT EXISTS update_job_applications_updated_at
    AFTER UPDATE ON job_applications
    FOR EACH ROW
    BEGIN
      UPDATE job_applications
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = OLD.id;
    END;
  `);

  seedApplications();
}

function seedApplications() {
  const row = database
    .prepare("SELECT COUNT(*) as count FROM job_applications")
    .get() as { count: number };

  if (row.count > 0) {
    return;
  }

  const insertApplication = database.prepare(`
    INSERT INTO job_applications (
      company_name,
      job_title,
      job_link,
      status,
      date_applied,
      contact_name,
      contact_email,
      notes
    ) VALUES (
      @companyName,
      @jobTitle,
      @jobLink,
      @status,
      @dateApplied,
      @contactName,
      @contactEmail,
      @notes
    )
  `);

  const insertSeedData = database.transaction(() => {
    for (const application of seedApplicationsData) {
      insertApplication.run(application);
    }
  });

  insertSeedData();
}
