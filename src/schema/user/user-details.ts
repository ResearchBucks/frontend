import * as z from "zod";
import { UserRoles, UserStatus } from "@/enum/user";

export const UserDetailsSchema = z.object({
  name: z.string(),
  profileImage: z.string().optional(),
  email: z.string().email(),
  role: z.nativeEnum(UserRoles),
  dob: z.coerce.date().optional(),
  status: z.nativeEnum(UserStatus).optional(),
});
