import * as z from "zod";
import { UserRoles, UserStatus } from "@/enum/user";

const passwordSchema = z.string()
    .min(1, "password is required")
    .min(8, "password must be at least 8 characters")
    .regex(/[A-Z]/, "password must contain at least one Uppercase letter")
    .regex(/[a-z]/,"password must contain at least one lowercase letter")
    .regex(/[0-9]/, "password must contain at least one number")
    .regex(/[#?!@$%^&*-]/, "password must contain at least one of (#?!@$%^&*-)")

const confirmPasswordSchema = z.string()
    .min(1, {message:"Must have at least 1 character"})

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

export const userLoginSchema = z.object({
    email:z.string().email(),
    password:passwordSchema,
})

export const researcherSignupschema = z.object({
  firstName:z.string().min(1),
  lastName:z.string().min(1),
  occupation:z.string().min(1),
  email:z.string().email(),
  mobile:z.number().min(10),
  nic:z.string().min(10),
  address:z.string().min(1),
  password:passwordSchema,
  confirm_password:confirmPasswordSchema,
})
.superRefine(({ confirm_password, password }, ctx) => {
 if (confirm_password !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords doesn't match",
      path: ['confirm_password']
    });
  }
});


export type researcherSignupDataTypes = z.infer<typeof researcherSignupschema>;
export type userLoginDataTypes = z.infer<typeof userLoginSchema>;
export type adminLoginDataTypes = z.infer<typeof adminLoginSchema>;