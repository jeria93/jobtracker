import { app } from "./app.js";
import { initializeDatabase } from "./database.js";

const port = Number(process.env.PORT) || 3000;

initializeDatabase();

app.listen(port, () => {
  console.log(`Backend server is running on port ${port}`);
});
