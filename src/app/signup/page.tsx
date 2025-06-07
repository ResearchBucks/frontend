"use client";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  researcherSignupschema,
  researcherSignupDataTypes,
  respondentSignupSchema,
  respondentSignupDatatypes,
} from "@/schema/user/user-details";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomAxios from "../api/CustomAxios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button";

export function SignUp({ onSwitch }: { onSwitch: () => void }) {
  const [userLoginType, setUserLoginType] = useState<
    "researcher" | "respondent"
  >("researcher");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPw, setShowConfrimPw] = useState<boolean>(false);

  const { schema, endpoint } = useMemo(() => {
    if (userLoginType === "researcher") {
      return {
        schema: researcherSignupschema,
        endpoint: "researcher/user/register",
      };
    } else {
      return {
        schema: respondentSignupSchema,
        endpoint: "respondent/user/register",
      };
    }
  }, [userLoginType]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<researcherSignupDataTypes | respondentSignupDatatypes>({
    resolver: zodResolver(schema),
  });

  const onsubmit = async (
    data: researcherSignupDataTypes | respondentSignupDatatypes
  ) => {
    try {
      const res = await CustomAxios.post(endpoint, data);
      if (res.status === 201) {
        console.log(res.data);
        reset();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <p className="text-base font-medium text-center">
          Signup to ResearchBucks as
        </p>
        <div className="flex flex-row justify-between mx-auto gap-12 text-sm">
          <div className="flex flex-row items-center gap-2">
            <Input
              type="checkbox"
              className="w-4 accent-main cursor-pointer"
              value="researcher"
              checked={userLoginType === "researcher"}
              onChange={() => setUserLoginType("researcher")}
            />
            Researcher
          </div>
          <div className="flex flex-row items-center gap-2">
            <Input
              type="checkbox"
              className="w-4 accent-main cursor-pointer"
              value="respondent"
              checked={userLoginType === "respondent"}
              onChange={() => setUserLoginType("respondent")}
            />
            Respondent
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className={errors.firstName ? "border border-error" : ""}
            />
            {errors.firstName && (
              <span className="text-[10px] text-red-600">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className={errors.lastName ? "border border-error" : ""}
            />
            {errors.lastName && (
              <span className="text-[10px] text-red-600">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "border border-error" : ""}
            />
            {errors.email && (
              <span className="text-[10px] text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col">
            <Input
              type="number"
              placeholder="Contact"
              {...register("mobile", { valueAsNumber: true })}
              className={errors.mobile ? "border border-error" : ""}
            />
            {errors.mobile && (
              <span className="text-[10px] text-red-600">
                {errors.mobile.message}
              </span>
            )}
          </div>
        </div>

        {/* Occupation/NIC row (researcher) or Address/NIC row (respondent) */}
        <div className="grid grid-cols-2 gap-3">
          {userLoginType === "researcher" ? (
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="Occupation"
                {...register("occupation")}
                className={errors.occupation ? "border border-error" : ""}
              />
              {errors.occupation && (
                <span className="text-[10px] text-red-600">
                  {(errors as any).occupation?.message}
                </span>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              <Input
                type="text"
                placeholder="Address"
                {...register("address")}
                className={errors.address ? "border border-error" : ""}
              />
              {errors.address && (
                <span className="text-[10px] text-red-600">
                  {errors.address.message}
                </span>
              )}
            </div>
          )}

          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="NIC"
              {...register("nic")}
              className={errors.nic ? "border border-error" : ""}
            />
            {errors.nic && (
              <span className="text-[10px] text-red-600">
                {errors.nic.message}
              </span>
            )}
          </div>
        </div>

        {/* Address field (only for researcher) */}
        {userLoginType === "researcher" && (
          <div className="flex flex-col">
            <Input
              type="text"
              placeholder="Address"
              {...register("address")}
              className={errors.address ? "border border-error" : ""}
            />
            {errors.address && (
              <span className="text-[10px] text-red-600">
                {errors.address.message}
              </span>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
          </div>
          <div className="relative flex flex-col">
            <Input
              type={showConfirmPw ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirm_password")}
              className={errors.confirm_password ? "border border-error" : ""}
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
        </div>

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
      <div className="text-center text-xs pt-4">
        <p>
          Already have an account?{" "}
          <span
            className="font-medium hover:underline hover:text-main cursor-pointer"
            onClick={onSwitch}
          >
            Login
          </span>
        </p>
      </div>
    </>
  );
}
