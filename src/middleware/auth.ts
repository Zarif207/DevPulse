import type {
  NextFunction,
  Request,
  Response,
} from "express";
import jwt from "jsonwebtoken";

const auth =
  (...requiredRoles: string[]) =>
  (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.status(401).json({
          success: false,
          message: "You are not authorized",
        });
        return;
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

      if (
        requiredRoles.length &&
        !requiredRoles.includes(req.user.role)
      ) {
        res.status(403).json({
          success: false,
          message: "Forbidden access",
        });
        return;
      }

      next();
    } catch (error) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
        error,
      });
      return;
    }
  };

export default auth;