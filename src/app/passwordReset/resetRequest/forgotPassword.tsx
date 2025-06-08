"use client";

import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomAxios from "@/app/api/CustomAxios";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ForgotPasswordProps {
  userLoginType: string;
  onClose:()=>void;
}
export default function ForgotPassword({ userLoginType,onClose }: ForgotPasswordProps) {
  const [localUserType, setLocalUserType] = useState(userLoginType);
  const emailSchema = z.object({
    email: z.string().email(),
  });
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
      const endpoint =
        userLoginType === "researcher"
          ? `researcher/auth/requestPasswordReset/${data.email}`
          : `respondent/auth/requestPasswordReset/${data.email}`;
      const res = await CustomAxios.post(endpoint);
      if (res.status === 200) {
        toast.success("Password Reset Email Send successfully")
        console.log(res.data);
        setTimeout(()=>{
          onClose()
        },2000)
      }
    } catch (err) {
      toast.error("An Error occured")
      console.log(err);
    }
  };
  const handleUserTypeChange = (type: string) => {
    setLocalUserType(type);
  };
  return (
    <div className="flex flex-col">
      <h1 className="text-xs text-center">
        A password reset link will be send to you email. Enter the email that
        you want to recieve the email
      </h1>

      {/* the section that gives to select the type of the user */}
      <div className="flex flex-row justify-between mx-auto gap-12 text-sm">
        <div className="flex flex-row items-center gap-2">
          <Input
            type="checkbox"
            className="w-4 accent-main cursor-pointer"
            value="researcher"
            checked={localUserType === "researcher"}
            onChange={() => handleUserTypeChange("researcher")}
          />
          Researcher
        </div>
        <div className="flex flex-row items-center gap-2">
          <Input
            type="checkbox"
            className="w-4 accent-main cursor-pointer"
            value="respondent"
            checked={localUserType === "respondent"}
            onChange={() => handleUserTypeChange("respondent")}
          />
          Respondent
        </div>
      </div>

      {/* the form to send email to request password */}
      <form
        onSubmit={handleSubmit(onsubmit)}
        className="flex flex-col gap-4 pt-3"
      >
        <div>
          <label className="text-sm font-medium">Enter the email:</label>
          <Input
            placeholder="ex: abc@gmail.com"
            {...register("email")}
            className={errors.email ? "border border-error" : ""}
          />
          {errors.email && (
            <span className="text-[10px] text-error">
              {errors.email.message}
            </span>
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
  );
}
