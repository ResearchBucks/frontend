"use client"
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { researcherSignupschema,researcherSignupDataTypes } from "@/schema/user/user-details";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomAxios from "../api/CustomAxios";


export function SignUp ({ onSwitch }: { onSwitch: () => void }){
    const [userLoginType, setUserLoginType] = useState<string | null>(null);

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
