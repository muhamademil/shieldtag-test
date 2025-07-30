import { prisma } from "../prisma/client";
import { JwtUtils } from "../lib/token.config";
import bcrypt, { hash } from "bcrypt";

export class AuthService {
  public async login(email: string, password: string, requiredRole?: string) {
    // pengecekan apakah user sudah terdaftar atau belum
    const user = await prisma.user.findUnique({
      where: { email: email },
    });

    // pengecekan pertama : kalau gagal ditolak
    if (!user) {
      throw new Error("Invalid credentials"); // Lempar error agar status 400/500
    }

    // Cek kecocokan password tanpa men-hash password baru
    const isValid = await bcrypt.compare(password, user.password);

    // pengecekan kedua : kalau gagal ditolak
    if (!isValid) {
      throw new Error("Invalid credentials"); // Tetap lempar error
    }

    // Pembatasan Role jika `requiredRole` diisi
    if (requiredRole && user.role !== requiredRole) {
      return `Access denied: Required role is ${requiredRole}`; // Role tidak sesuai
    }

    // Tukar dengan token
    const token = JwtUtils.generateToken({
      usersId: user.usersId,
      name: user.name,
      role: user.role ?? "USER",
    });

    return {
      id: user.usersId,
      name: user.name,
      role: user.role,
      access_token: token,
    };
  }
}