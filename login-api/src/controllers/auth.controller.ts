import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validasi input
      if (!email || !password) {
        res.status(400).json({
          message: "Email and password are required",
        });
        return;
      }

      const result = await this.authService.login(email, password);

      // Jika login gagal
      if (result === "===Invalid credentials===") {
        res.status(401).json({
          message: "Unauthorized: Invalid credentials",
        });
        return;
      }
      // Jika login sukses
      res.status(200).json({
        data: result, // Token atau data user bisa dikirim di sini
      });

    } catch (error: any) {
      console.error("Login Error:", error.message);
  
      //Kasus salah kredensial
      if (error.message === "Invalid credentials") {
        res.status(401).json({
          message: "Unauthorized: Invalid credentials, please check Email & Password",
        });
      }
  
      //Kasus role tidak sesuai (kalau ada pembatasan role dari login())
      else if (error.message.startsWith("Access denied")) {
        res.status(403).json({
          message: error.message, // contoh: "Access denied: Required role is PROMOTOR"
        });
      }
  
      //Error tak terduga lainnya
      else {
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    }
  }
}