"use client"
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

type userLoginRes = {};
export function LoginForm() {
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
      const res = await CustomAxios.post("admin/auth/login", data);
      if (res.status === 200) {
        dispatch(setAccessToken(res.data.data.token));
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4">
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
      <div>
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
          className="absolute right-3 top-1/3 -translate-y-1 text-text hover:text-gray-700 focus:outline-none cursor-pointer"
        >
          {showPassword ? <IoEyeOff size={18} /> : <IoEye size={18} />}
        </button>

        {errors.password && (
          <span className="text-[10px] text-error">
            {errors.password.message}
          </span>
        )}
        <div className="flex flex-row justify-end pt-1">
          <p className="text-[.7rem] cursor-pointer hover:text-main hover:font-medium ">
            Forgot Password ?
          </p>
        </div>
      </div>
    </form>
  );
}
