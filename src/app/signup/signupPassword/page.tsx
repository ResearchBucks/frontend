"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  passwordResetDataTypes,
  passwordResetSchema,
} from "@/schema/user/user-details";
import CustomAxios from "@/app/api/CustomAxios";
import { useSearchParams } from "next/navigation";
import { logo } from "@/assests/assests";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function SignUpPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const role = searchParams.get("role");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPw, setShowConfrimPw] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<passwordResetDataTypes>({
    resolver: zodResolver(passwordResetSchema),
    defaultValues: {
      token: token || "",
      role: role || "",
    },
  });

  const onsubmit = async (data: passwordResetDataTypes) => {
    const Newdata = { token, password: data.password };
    try{
        const endpoint = role === "ROLE_RESEARCHER" ? "researcher/auth/verifyResearcher" : "respondent/auth/verifyRespondent"
        const res = await CustomAxios.post(endpoint, Newdata);
        if (res.status === 200) {
            toast.success("Password was send sucessfully!");
            //enter the naviagtion to log into the syste succesfully
        }
        
    }catch(err:any){
        console.log(err)
         toast.error(err?.response?.data?.message || "Error Occured in password submmision! try again!");
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center flex-col bg-main/30">
      <div className="bg-white p-6 min-w-[380px] max-h-[55vh]  mob2:h-screen w-auto rounded-md flex flex-col gap-4 shadow-md justify-center">
        <div className="w-full flex justify-center items-center p-2">
          <img src={logo} className="w-full size-32" />
        </div>
        <div className="flex flex-col pb-2 gap-1">
          <h1 className="font-semibold text-xl tracking-wide text-center">
            Enter Your Password
          </h1>
          <p className="text-xs text-center text-textgray ">
            Enter your new password below to log into the system successfully
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onsubmit)}
          className="gap-2 flex flex-col w-full"
        >
          <div className="relative flex flex-col">
            <label className="text-sm  pb-1">Password</label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="*******"
              {...register("password")}
              className={errors.password ? "border border-riskcolor" : ""}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              {showPassword ? <IoEyeOff size={18} className="text-black/50" /> : <IoEye size={18}  className="text-black/50"/>}
            </button>
            {errors.password && (
              <span className="text-[10px] text-red-600">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="relative flex flex-col">
            <label className="text-sm  pb-1">Confirm Password</label>
            <Input
              type={showConfirmPw ? "text" : "password"}
              placeholder="*******"
              {...register("confirm_password")}
              className={
                errors.confirm_password ? "border border-riskcolor" : ""
              }
            />
            <button
              type="button"
              onClick={() => setShowConfrimPw((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              {showConfirmPw ? <IoEyeOff size={18} className="text-black/50" /> : <IoEye size={18}  className="text-black/50"/>}
            </button>
            {errors.confirm_password && (
              <span className="text-[10px] text-red-600">
                {errors.confirm_password.message}
              </span>
            )}
          </div>

          <div className="pt-3 w-full">
            <Button
              type="submit"
              variant="login"
              size="sm"
              name="SUBMIT"
              className="w-full cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
