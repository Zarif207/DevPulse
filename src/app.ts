import express from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { issueRoutes } from "./modules/issue/issue.route";
import auth from "./middleware/auth";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevPulse Server Running");
});

app.get("/api/test", auth(), (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/admin", auth("maintainer"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome maintainer",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(globalErrorHandler);

export default app;
