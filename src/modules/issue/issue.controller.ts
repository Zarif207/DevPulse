import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import sendResponse from "../../utils/sendResponse";
import { createIssueIntoDB } from "./issue.service";

export const createIssue = async (
  req: Request,
  res: Response,
) => {
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
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};