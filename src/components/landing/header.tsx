"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logo } from "@/assests/assests";
import LoginPage from "@/app/login/page";

import SignupPage from "@/app/signup/signupPage/page";

export default function Header() {
 const [modalType, setModalType] = useState<"login" | "signup" |null>(null);
const [open, onOpenChange] = useState(false)
  const navItems = [
    { title: "Home", href: "/" },
    { title: "Respondents", href: "/#respondents" },
    { title: "Surveys", href: "/#surveys" },
    { title: "Researcher", href: "/#researcher" },
    { title: "About Us", href: "/#aboutus" },
    { title: "Login", href: "#", onClick: () => setModalType("login") },
    { title: "Signup", href: "#", onClick: () => setModalType("signup") },
  ];

  const closeModal = () => setModalType(null);

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Header content */}
      <div className="flex flex-row justify-between items-center px-6 py-3 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="ResearchBucks"
            width={120}
            height={120}
            className="h-auto w-auto max-w-[150px]"
            priority
          />
        </Link>

        <ul className="flex flex-row gap-4 items-center">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.onClick ? (
                <button
                  onClick={item.onClick}
                  className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
        {modalType === "login" && (
        <LoginPage 
            open={modalType === "login"} 
            onOpenChange={(open) => !open && setModalType(null)} 
            setModalType={setModalType} 
        />
        )}
               {modalType === "signup" && (
        <SignupPage 
            open={modalType === "signup"} 
            onOpenChange={(open) => !open && setModalType(null)} 
            setModalType={setModalType} 
        />
        )}
    </div>
  );
}
