import { Router } from "express";
import { listApplications } from "./applicationService.js";

export const applicationRoutes = Router();

applicationRoutes.get("/", (_request, response) => {
  const applications = listApplications();

  response.json(applications);
});
