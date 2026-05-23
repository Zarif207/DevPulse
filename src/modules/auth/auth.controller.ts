import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { createUserIntoDB, loginUserFromDB } from "./auth.service";
import sendResponse from "../../utils/sendResponse";

export const signupUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const result = await loginUserFromDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});
