export interface UserPayload {
  usersId: number;
  name: string;
  role: "USER" | "TENANT";
}

export interface UserInput {
  name: string;
  email: string;
  password: string;
  role?: "USER" | "TENANT";
}