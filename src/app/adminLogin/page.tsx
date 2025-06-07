"use client";

import { back5, back, back6, logo } from "@/assests/assests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema } from "@/schema/user/user-details";
import type { adminLoginDataTypes } from "@/schema/user/user-details";
import CustomAxios from "../api/CustomAxios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setAccessToken } from "@/lib/redux/authSlice";

type adminLoginRes ={
    status:string;
    message:string;
    data:{
        token:string;
        email:string;
        roles:string[]
    };
}


export default function AdminLogin() {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, formState:{errors},} =useForm<adminLoginDataTypes>({
        resolver: zodResolver(adminLoginSchema),
    });

    //the login submit function
    const onsubmit = async (data:adminLoginDataTypes) =>{
        try{
            const res = await CustomAxios.post<adminLoginRes>("admin/auth/login", data);
            if(res.status === 200){
                dispatch(setAccessToken(res.data.data.token))
                console.log(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className="min-h-screen h-screen w-screen flex justify-center items-center bg-white ">
      <div className="grid md:grid-cols-2 grid-cols-1 mob:h-[78vh] p-3 gap-3 bg-mainlight xl:w-[850px] md:w-[700px] mob:w-[400px] mob2:w-full mob2:h-full  rounded-md shadow-sm">
        <div className="w-full h-full mob2:hidden md:flex overflow-hidden rounded-md">
            <img src={back} className="w-full h-full object-cover rounded-md"/>
        </div>
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col gap-5">
                {/* the logo is shown here */}
                <div className="w-full flex justify-center items-center ">
                    <img src={logo} className="w-full size-32"/>
                </div>

                {/* the text section of login */}
                <div className="text-center flex flex-col gap-2">
                    <h1 className="font-medium text-lg">Welcome Back!</h1>
                    <p className="text-xs">Kindly Provide your details to login into account</p>
                </div>

                
                <form
                    onSubmit={handleSubmit(onsubmit)}
                    className="flex flex-col gap-4"
                >
                        <div>
                            <label className="text-sm">Email</label>
                            <Input
                                type="email"
                                placeholder="ex: admin@gmail.com"
                                {...register("email")}
                                className={errors.email ? "border border-error" : ""}
                            />
                                {errors.email && (
                                    <span className="text-[10px] text-error">
                                        {errors.email.message}
                                    </span>
                                )}
                        </div>
                        <div>
                            <label className="text-sm">Password</label>
                            <Input
                                type="password"
                                placeholder="*******"
                                {...register("password")}
                                className={errors.password ? "border border-error" : ""}
                            />

                            <div className="flex flex-row justify-end pt-1">
                                <p className="text-[.7rem] cursor-pointer hover:text-main hover:font-medium ">Forgot Password ?</p>
                            </div>
                        
                                {errors.password && (
                                    <span className="text-[10px] text-error">
                                        {errors.password.message}
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

            </div>
        </div>
      </div>
    </div>
  );
}