import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { createUserIntoDB } from "./auth.service";
import { loginUserFromDB } from "./auth.service";

export const signupUser = async (req: Request, res: Response) => {
  try {
    const user = await createUserIntoDB(req.body);

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await loginUserFromDB(req.body);

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
};
