import express from "express";
import { authRoutes } from "./modules/auth/auth.route";
import auth from "./middleware/auth";
import role from "./middleware/role";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("DevPulse Server Running");
});

app.get("/api/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "Protected route accessed",
    user: req.user,
  });
});

app.get("/api/admin", auth, role("maintainer"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome maintainer",
  });
});

app.use("/api/auth", authRoutes);

export default app;
