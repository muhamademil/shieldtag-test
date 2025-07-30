import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { UserInput } from "../models/interface";
import { prisma } from "../prisma/client";

export class UserController {
  private userService = new UserService();

  public register = async (req: Request, res: Response): Promise<void> => {
    try {
      const data: UserInput = req.body;

      const checkUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (checkUser) {
        throw new Error("User already registered");
      }

      // Validasi role sebelum mengirim ke service
      if (data.role && !["USER", "PROMOTOR"].includes(data.role)) {
        throw new Error("Invalid role");
      }

      const user = await this.userService.create(data);

      res.status(201).json({
        message: "User registered successfully",
        data: user,
      });
    } catch (error: any) {
      res.status(400).json({
        message: "Registration failed",
        error: error.message,
      });
    }
  }
}