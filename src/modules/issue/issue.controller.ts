import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import sendResponse from "../../utils/sendResponse";
import { createIssueIntoDB, updateIssueIntoDB } from "./issue.service";
import { getAllIssuesFromDB } from "./issue.service";
import { getSingleIssueFromDB } from "./issue.service";

export const createIssue = async (req: Request, res: Response) => {
  try {
    const payload = {
      ...req.body,
      reporter_id: req.user?.id,
    };

    const issue = await createIssueIntoDB(payload);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Issue created successfully",
      data: issue,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getAllIssues = async (req: Request, res: Response) => {
  try {
    const sort = (req.query.sort as string) || "newest";

    const type = req.query.type as string;

    const status = req.query.status as string;

    const issues = await getAllIssuesFromDB(sort, type, status);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Issues retrieved successfully",
      data: issues,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const getSingleIssue = async (req: Request, res: Response) => {
  try {
    const issue = await getSingleIssueFromDB(req.params.id as string);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Issue retrieved successfully",
      data: issue,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: error instanceof Error ? error.message : "Issue not found",
    });
  }
};

export const updateIssue = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid issue id",
      });
    }

    const user = req.user;

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const result = await updateIssueIntoDB(id, req.body, user);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Issue updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update issue",
    });
  }
};
