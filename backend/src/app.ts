import cors from "cors";
import express from "express";
import { applicationRoutes } from "./features/applications/applicationRoutes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/applications", applicationRoutes);
