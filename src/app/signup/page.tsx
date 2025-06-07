"use client"

export function SignUp ({ onSwitch }: { onSwitch: () => void }){
    return(
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
    )
}
