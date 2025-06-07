"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { researcherSignupschema,researcherSignupDataTypes } from "@/schema/user/user-details";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomAxios from "../api/CustomAxios";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Button } from "@/components/ui/button";


export function SignUp ({ onSwitch }: { onSwitch: () => void }){
    const [userLoginType, setUserLoginType] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPw, setShowConfrimPw] = useState<boolean>(false);

    const {register, handleSubmit, formState:{errors}} = useForm<researcherSignupDataTypes>({
        resolver:zodResolver(researcherSignupschema)
    })

    const onsubmit = async(data:researcherSignupDataTypes)=>{
        try{
        const res = await CustomAxios.post("researcher/user/register",data);
        if (res.status === 200) {
            console.log(res.data);
      }
        }catch(err){
            console.log(err)
        }
    }

    return(
    <>
    <div className="flex flex-col">
       <p className="text-base font-medium text-center">Signup to ResearchBucks as</p>
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
    <form onSubmit={handleSubmit(onsubmit)}>
          {/* the firstName input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="text"
              placeholder="First name"
              {...register("firstName")}
              className={errors.firstName ? "border border-riskcolor" : ""}
            />
            {errors.firstName && (
              <span className="text-[10px] text-red-600">
                {errors.firstName.message}
              </span>
            )}
          </div>

                    {/* the lastName input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="text"
              placeholder="Last name"
              {...register("lastName")}
              className={errors.lastName ? "border border-riskcolor" : ""}
            />
            {errors.lastName && (
              <span className="text-[10px] text-red-600">
                {errors.lastName.message}
              </span>
            )}
          </div>

                              {/* the occupation input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="text"
              placeholder="Occupation"
              {...register("occupation")}
              className={errors.occupation ? "border border-riskcolor" : ""}
            />
            {errors.occupation && (
              <span className="text-[10px] text-red-600">
                {errors.occupation.message}
              </span>
            )}
          </div>
          

          {/* the email input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="email"
              placeholder="Email"
              {...register("email")}
              className={errors.email ? "border border-riskcolor" : ""}
            />
            {errors.email && (
              <span className="text-[10px] text-red-600">
                {errors.email.message}
              </span>
            )}
          </div>

                                        {/* the mobile input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="number"
              placeholder="Contact "
              {...register("mobile")}
              className={errors.mobile ? "border border-riskcolor" : ""}
            />
            {errors.mobile && (
              <span className="text-[10px] text-red-600">
                {errors.mobile.message}
              </span>
            )}
          </div>

                                                  {/* the NIC input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="text"
              placeholder="NIC "
              {...register("nic")}
              className={errors.nic ? "border border-riskcolor" : ""}
            />
            {errors.nic && (
              <span className="text-[10px] text-red-600">
                {errors.nic.message}
              </span>
            )}
          </div>

                                                  {/* the address input field */}
         <div className="flex flex-col gap-0">
            <Input
              type="text"
              placeholder="Address "
              {...register("address")}
              className={errors.address ? "border border-riskcolor" : ""}
            />
            {errors.address && (
              <span className="text-[10px] text-red-600">
                {errors.address.message}
              </span>
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
              </div>
                        {/* the confirm_password input field */}
          <div className="relative flex flex-col gap-0">
            <Input
              type={showConfirmPw ? "text" : "password"}
              placeholder="Confirm password"
              {...register("confirm_password")}
              className={
                errors.confirm_password ? "border border-riskcolor" : ""
              }
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
                                variant ="login"
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
        className="hover:font-medium hover:underline hover:text-main cursor-pointer"
        onClick={onSwitch}
      >
        Login
      </span>
    </p>
    </div>  
    </>

    )
}
