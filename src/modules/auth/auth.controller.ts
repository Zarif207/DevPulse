import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { createUserIntoDB, loginUserFromDB } from "./auth.service";

import sendResponse from "../../utils/sendResponse";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserIntoDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message:
        error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await loginUserFromDB(req.body);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    sendResponse(res, {
      statusCode: StatusCodes.UNAUTHORIZED,
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};