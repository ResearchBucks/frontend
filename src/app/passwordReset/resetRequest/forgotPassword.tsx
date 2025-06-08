"use client"

import { Input } from "@/components/ui/input"

export default function ForgotPassword(){
    return(
<div className="">
    <h1 className="text-sm text-center">A password reset link will be send to you email. Enter the email that you want to recieve the email</h1>
    <form>
        <div>
            <label>Enter the email:</label>
            <Input
            placeholder="ex: abc@gmail.com"
            className="text-xs"
            />
        </div>
    </form>
</div>
    )
}