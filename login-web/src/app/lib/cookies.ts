import Cookies from "js-cookie";

interface CookieParams {
  userId: number;
  token: string;
  role: string;
  expiration?: number | Date | undefined;
}

export function setAuthCookie(data: CookieParams) {
  Cookies.set("token", data.token, { expires: data.expiration });
  Cookies.set("userId", String(data.userId), { expires: data.expiration });
  Cookies.set("role", data.role);
}

export function getAuthCookie() {
  return {
    userId: Cookies.get("userId"),
    promotorId: Cookies.get("promotorId"),
    token: Cookies.get("token"),
    role: Cookies.get("role"),
  };
}

export const removeAuthCookie = () => {
  Cookies.remove("token");
};
