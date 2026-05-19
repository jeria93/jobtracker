import { Router } from "express";
import {
  createApplicationDetails,
  getApplicationDetails,
  listApplications,
} from "./applicationService.js";

export const applicationRoutes = Router();

applicationRoutes.get("/", (_request, response) => {
  const applications = listApplications();

  response.json(applications);
});

// Creates a new job application and returns validation errors when input is invalid.
applicationRoutes.post("/", (request, response) => {
  const result = createApplicationDetails(request.body);

  if (!result.success) {
    response.status(400).json({ error: result.error });
    return;
  }

  response.status(201).json(result.application);
});

// Fetches one job application by id and returns it as JSON.
applicationRoutes.get("/:id", (request, response) => {
  const id = Number(request.params.id);

  // Reject invalid application ids before querying the database.
  if (!Number.isInteger(id)) {
    response.status(400).json({ error: "Invalid application id" });
    return;
  }

  const application = getApplicationDetails(id);

  // If the application does not exist, respond with 404 Not Found.
  if (!application) {
    response.status(404).json({ error: "Application not found" });
    return;
  }

  response.json(application);
});
