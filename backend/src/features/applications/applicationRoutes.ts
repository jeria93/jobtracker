import { Router } from "express";
import {
  getApplicationDetails,
  listApplications,
} from "./applicationService.js";

export const applicationRoutes = Router();

applicationRoutes.get("/", (_request, response) => {
  const applications = listApplications();

  response.json(applications);
});

// Fetches one job application by id and returns it as JSON.
applicationRoutes.get("/:id", (request, response) => {
  const id = Number(request.params.id);

  // If the id is not a whole number, respond with 400 Bad Request. Jobapplications cant have id 1.5
  if (!Number.isInteger(id) || id < 1) {
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
