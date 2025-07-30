import { z as zod} from "zod";

export const userSchemaRegister = {
  body: zod.object({
    name: zod.string().min(1),
    email: zod.string().email(),
    password: zod.string().min(6),
    role: zod.enum(["USER", "TENANT"]).optional().default("USER"),
  })
};