import { Request, Response, NextFunction } from "express";
import { JwtUtils } from "../lib/token.config";
// import { User } from "@prisma/client";
type User = any;

export class AuthenticationMiddleware {
  static verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(401).json({
          message: "Unauthorized : no token provided",
        });
      }

      const token = authHeader?.split(" ")[1];
      const decoded = JwtUtils.verifyToken(token as string) as any;

      console.log("decoded:", decoded);
      // Explicitly type the user property on req
      (req as Request & { user?: User }).user = decoded;
      next();
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized : invalid token",
      });
    }
  }
}
