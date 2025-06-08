'use client';

import LandingPage from "./landing/page";
import { useAppDispatch,useAppSelector } from "@/lib/redux/hooks";
import {setAccessToken, setUserRole, clearAuth} from "@/lib/redux/authSlice";

export default function test() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.ACCESSTOKEN)
  const role = useAppSelector((state) =>state.auth.userRole)
    const handleLogin = () => {
    dispatch(setUserRole('John Doeghh'));
    console.log(role)
  };

  return(
    <>
        <h1>token : {token}</h1>
        <button onClick={handleLogin}>Login</button>
    </>

  )
}
