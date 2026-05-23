import express from "express";
import auth from "../../middleware/auth";
import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
} from "./issue.controller";

const router = express.Router();

router.post("/", auth, createIssue);
router.get("/", getAllIssues);
router.get("/:id", getSingleIssue);
router.patch("/:id", auth, updateIssue);
export const issueRoutes = router;
