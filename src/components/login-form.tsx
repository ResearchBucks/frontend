"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userloginImg } from "@/assests/assests";
import { loginpwImg } from "@/assests/assests";
import { useForm } from "react-hook-form";
import { userLoginSchema } from "@/schema/user/user-details";
import { userLoginDataTypes } from "@/schema/user/user-details";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/redux/hooks";
import CustomAxios from "@/app/api/CustomAxios";
import { setAccessToken } from "@/lib/redux/authSlice";
import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import ResetRequest from "@/app/passwordReset/resetRequest/page";

type LoginFormProps = {
  setModalType: (type: "login" | "signup" | null) => void;
};
export function LoginForm({setModalType} :LoginFormProps) {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [userLoginType, setUserLoginType] = useState<string>("researcher")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userLoginDataTypes>({
    resolver: zodResolver(userLoginSchema),
  });

  //the login submit function for user
  const onsubmit = async (data: userLoginDataTypes) => {
    try {
     const endpoint= userLoginType === "researcher" ? "researcher/auth/login" :"respondent/auth/login"
     const res = await CustomAxios.post(endpoint, data);
      if (res.status === 200) {
        dispatch(setAccessToken(res.data.data.token));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
    <div className="flex flex-col">
       <p className="text-base font-medium text-center">Login to ResearchBucks as</p>
      <div className="flex flex-row justify-between mx-auto gap-12 text-sm">
        <div className="flex flex-row items-center gap-2">
          <Input
            type="checkbox"
            className="w-4 accent-main cursor-pointer"
            value="researcher"
            checked={userLoginType === "researcher"}
            onChange={() =>setUserLoginType("researcher")}
          />
          Researcher
        </div>
        <div className="flex flex-row items-center gap-2">
        <Input
          type="checkbox"
          className="w-4 accent-main cursor-pointer"
          value="respondent"
          checked={userLoginType === "respondent"}
          onChange={() =>setUserLoginType("respondent")}
        />
        Respondent       
      </div>
      </div>
    </div>

    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4 pt-3 text-sm">
      {/* the input field for email */}
      <div>
        <label>Email</label>
        <Input
          type="email"
          placeholder="ex: admin@gmail.com"
          {...register("email")}
          className={errors.email ? "border border-error" : ""}
        />
        {errors.email && (
          <span className="text-[10px] text-error">{errors.email.message}</span>
        )}
      </div>

      {/* the input field for password */}
      <div className="flex flex-col relative">
        <label className="text-sm">Password</label>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="*******"
          {...register("password")}
          className={errors.password ? "border border-error" : ""}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-1/2 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
        >
          {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
        </button>
        {errors.password && (
          <span className="text-[10px] text-error">
            {errors.password.message}
          </span>
        )}
        <div className="flex flex-row justify-end pt-1">
          <p className="text-[.7rem] cursor-pointer hover:text-main hover:font-medium" >
            Forgot Password ?
          </p>
        </div>
      </div>

      {/* the submit for login */}
      <div className="pt-3 w-full">
        <Button
          type="submit"
          variant="login"
          size="sm"
          name="Submit"
          className="w-full cursor-pointer"
        />
      </div>
    </form>
    <div className="flex flex-row gap-2 justify-center pt-4 text-xs tracking-wide">
      <p>Don't have an account?</p><span className="hover:font-medium hover:underline underline-offset-4 cursor-pointer hover:underline-main hover:text-main" onClick={()=>setModalType("signup")}>SignUp</span>
    </div>  
    </>
  );
}
