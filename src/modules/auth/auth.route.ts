import express from "express";
import { loginUser, signupUser } from "./auth.controller";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);

export const authRoutes = router;