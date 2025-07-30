"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/utils/useAuth";
import { getAuthCookie } from "@/app/lib/cookies";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validasi input
    if (!email || !password) {
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return;
    }

    if (password.length < 6) {
      return;
    }

    if (!login) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      const authorize = getAuthCookie();

      if (result.success) {

        setTimeout(() => {
          if (authorize.role === "USER") {
            window.location.replace("/");
            // window.location.replace("/pages/dashboard/user");
          } else {
            window.location.replace("/dashboard/promotor");
          }
        }, 500);
      } else {
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Kiri: Ilustrasi + Teks */}
        <div className="text-center md:text-left flex flex-col items-center md:items-start gap-4">
          <Image
            src="/images/mascot.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <h2 className="text-xl text-center text-gray-600 font-semibold">
            Tidak lagi ketinggalan event dan konser favoritmu
          </h2>
          <p className="text-xl text-center text-gray-600 font-semibold max-w-md">
            Gabung dan rasakan kemudahan bertransaksi dan mengelola event di
            Eventify.
          </p>
        </div>

        {/* Kanan: Form Login */}
        <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md mx-auto border">
          <h3 className="text-xl text-gray-600 font-semibold mb-2">
            Masuk ke akunmu
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            Tidak punya akun Eventify?{" "}
            <Link
              href="/auth/signUp"
              className="text-blue-600 font-medium hover:underline"
            >
              Daftar
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Masukkan email"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                className="block text-sm text-gray-600 font-medium mb-1"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full border rounded px-4 py-2 pr-10 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute top-9 right-3 text-gray-500"
              >

              </button>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 font-medium mt-2 inline-block hover:underline"
              >
                Lupa password?
              </Link>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 rounded flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    ></path>
                  </svg>
                  <span>Memproses...</span>
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
