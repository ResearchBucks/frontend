"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { passwordResetDataTypes, passwordResetSchema } from "@/schema/user/user-details";
import CustomAxios from "../api/CustomAxios";
import { useSearchParams } from "next/navigation";
import { logo } from "@/assests/assests";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ResetPassword(){
     const searchParams = useSearchParams();
     const token = searchParams.get("token");
     const role = searchParams.get("role");
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPw, setShowConfrimPw] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<passwordResetDataTypes>({
        resolver: zodResolver(passwordResetSchema),
         defaultValues: {
            token: token || "",
            role:role || ""
        },
      });

    const onsubmit = async(data:passwordResetDataTypes) =>{
        const Newdata = {token,password:data.password}
        const endpoint = role === "researcher" ? "researcher/auth/resetPassword" : "respondent/auth/resetPassword"
        try{
            const res = await CustomAxios.post(endpoint, Newdata);
            if(res.status === 200){
                toast.success("Password Reset sucessfully!")
            }
        }catch(err:any){
            toast.error("Error Occured in password Reset! try again!")
            console.log(err);
        }
    }
    return(
        <div className="w-screen min-h-screen flex items-center justify-center flex-col bg-main">
            <div className="bg-white p-6 min-w-[380px] max-h-[55vh]  mob2:h-screen w-auto rounded-md flex flex-col gap-4 shadow-md justify-center">
                <div className="w-full flex justify-center items-center p-2">
                    <img src={logo} className="w-full size-32"/>
                </div>  
                <div className="flex flex-col pb-2 gap-1">
                    <h1 className="font-semibold text-lg tracking-wider text-center">Change Your Password</h1>
                     <p className="text-xs text-center text-textgray ">Enter a new password below to change your password</p>
                </div>   

                <form onSubmit={handleSubmit(onsubmit)} className="gap-2 flex flex-col w-full">
                    <div className="relative flex flex-col">
                       <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...register("password")}
                            className={errors.password ? "border border-riskcolor" : ""}
                        />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-1/3 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
                            >
                                {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
                            </button>
                            {errors.password && (
                                <span className="text-[10px] text-red-600">
                                    {errors.password.message}
                                </span>
                            )}
                    </div>
                     <div className="relative flex flex-col">
                        <Input
                            type={showConfirmPw ? "text" : "password"}
                            placeholder="Confirm password"
                            {...register("confirm_password")}
                            className={errors.confirm_password ? "border border-riskcolor" : ""}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfrimPw((prev) => !prev)}
                            className="absolute right-3 top-1/3 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
                        >
                            {showConfirmPw ? <IoEyeOff size={18} /> : <IoEye size={18} />}
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
          name="CHANGE"
          className="w-full cursor-pointer"
        />
      </div>
                </form>
            </div>

        </div>
    )
}