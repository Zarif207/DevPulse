import express from "express";
import { authRoutes } from "./modules/auth/auth.route";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevPulse Server Running");
});

app.use("/api/auth", authRoutes);

export default app;