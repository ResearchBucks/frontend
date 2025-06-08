"use client"

import { Input } from "@/components/ui/input"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomAxios from "@/app/api/CustomAxios";
import { Button } from "@/components/ui/button";

interface ForgotPasswordProps {
  userLoginType: string;
}
export default function ForgotPassword({userLoginType}:ForgotPasswordProps){
const emailSchema = z.object({
    email:z.string().email()
 })
 type resetRequestDataType = z.infer<typeof emailSchema>;

   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<resetRequestDataType>({
     resolver: zodResolver(emailSchema),
   });
    const onsubmit = async (data: resetRequestDataType) => {
    try {
     const endpoint= userLoginType === "researcher" ? `researcher/auth/requestPasswordReset/${data}` :`respondent/auth/requestPasswordReset/${data}`;
     const res = await CustomAxios.post(endpoint);
      if (res.status === 200) {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
    return(
    <div className="">
        <h1 className="text-xs text-center">A password reset link will be send to you email. Enter the email that you want to recieve the email</h1>
        <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4 pt-3">
            <div>
                <label className="text-sm font-medium">Enter the email:</label>
                <Input
                placeholder="ex: abc@gmail.com"
                {...register("email")}
                className={errors.email ? "border border-error" : ""}
                />
                {errors.email && (
                <span className="text-[10px] text-error">{errors.email.message}</span>
                )}
            </div>
        <div className=" w-full">
        <Button
          type="submit"
          variant="login"
          size="sm"
          name="Submit"
          className="w-full cursor-pointer"
        />
      </div>
        </form>
    </div>
    )
}