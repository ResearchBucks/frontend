import * as z from "zod";
import { UserRoles, UserStatus } from "@/enum/user";

const passwordSchema = z.string()
    .min(1, "password is required")
    .min(8, "password must be at least 8 characters")
    .regex(/[A-Z]/, "password must contain at least one Uppercase letter")
    .regex(/[a-z]/,"password must contain at least one lowercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[#?!@$%^&*-]/, "password must contain at least one of (#?!@$%^&*-)")


export const UserDetailsSchema = z.object({
  name: z.string(),
  profileImage: z.string().optional(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
  dob: z.coerce.date().optional(),
  status: z.nativeEnum(UserStatus).optional(),
});

export const adminLoginSchema = z.object({
  email:z.string().email(),
  password:passwordSchema,
})

export type adminLoginDataTypes = z.infer<typeof adminLoginSchema>;