import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const auth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    );

    req.user = decoded as {
      id: number;
      name: string;
      role: string;
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
      error,
    });
  }
};

export default auth;