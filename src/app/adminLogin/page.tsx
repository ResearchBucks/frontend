"use client";

import { back5, logo } from "@/assests/assests";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminLoginSchema } from "@/schema/user/user-details";
import type { adminLoginDataTypes } from "@/schema/user/user-details";
import CustomAxios from "../api/CustomAxios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type adminLoginRes ={
    status:string;
    message:string;
    data:Record<string, any>;
}



export default function AdminLogin() {

    const {register, handleSubmit, formState:{errors},} =useForm<adminLoginDataTypes>({
        resolver: zodResolver(adminLoginSchema),
    });

    const onsubmit = async (data:adminLoginDataTypes) =>{
        try{
            const res = await CustomAxios.post<adminLoginRes>("admin/auth/login", data);
            if(res.status === 200){
                console.log(res.data)
            }
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="min-h-screen h-screen w-screen overflow-hidden flex justify-center items-center bg-mainlight">
      <div className="grid grid-cols-1 lg:grid-cols-2 h-[80vh] p-3 gap-3 bg-white w-[900px] rounded-md">
        <div className="w-full h-full">
            <img src={back5} className="w-full h-full rounded-md"/>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
            <div>
                <div className="w-32">
                    <img src={logo} className="w-full"/>
                </div>
                <div className="text-center">
                    <h1 className="font-semibold text-xl">Welcome Back!</h1>
                    <p className="text-sm">Kindly Provide your details to login into account</p>
                </div>
                <div className="">
                    <form
                        onSubmit={handleSubmit(onsubmit)}
                    >
                        <div>
                            <label>Email</label>
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
                            <label>Password</label>
                            <Input
                                type="password"
                                placeholder="*******"
                                {...register("password")}
                                className={errors.password ? "border border-error" : ""}
                            />
                                {errors.password && (
                                    <span className="text-[10px] text-error">
                                        {errors.password.message}
                                    </span>
                                )}
                        </div>
                        <Button
                            type="submit"
                            variant ="default"
                            size="sm"
                            name="Submit"
                        />
        
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}