import { prisma } from "../prisma/client";
import { UserInput } from "../models/interface";
import bcrypt from "bcrypt";

export class UserService {
  public async create(data: UserInput) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role || "USER",
      },
    });

    return newUser;
  }
}