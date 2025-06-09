"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logo } from "@/assests/assests";
import LoginPage from "@/app/login/page";
import SignupPage from "@/app/signup/signupPage/page";
import ResetRequest from "@/app/passwordReset/resetRequest/page";

export default function Header() {
  const pathname = usePathname();
  const [modalType, setModalType] = useState<"login" | "signup" | "reset" | null>(null);
  const [userLoginType, setUserLoginType] = useState<string>("researcher");
  const [open, onOpenChange] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("Home");

  const navItems = [
    { id: "Home", title: "Home", href: "/" },
    { id: "Respondents", title: "Respondents", href: "/#respondents" },
    { id: "Surveys", title: "Surveys", href: "/#surveys" },
    { id: "Researcher", title: "Researcher", href: "/#researcher" },
    { id: "AboutUs", title: "About Us", href: "/#aboutus" },
    { id: "Login", title: "Login", href: "#", onClick: () => setModalType("login") },
    { id: "Signup", title: "Signup", href: "#", onClick: () => setModalType("signup") },
  ];

  const closeModal = () => setModalType(null);

  return (
    <div className="bg-white sticky top-0 z-50">
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
          {navItems.map((item, index) => {
            const isActive = activeItem === item.id;

            return (
              <li key={index}>
                {item.onClick ? (
                  <button
                    onClick={() => {
                      item.onClick?.();
                      setActiveItem(item.id); // set unique id for Login/Signup
                    }}
                    className={`cursor-pointer p-2 rounded-sm text-sm font-semibold ${
                      isActive ? "bg-main text-maintext" : "hover:bg-main hover:text-maintext"
                    }`}
                  >
                    {item.title}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setActiveItem(item.id)}
                    className={`cursor-pointer p-2 rounded-sm text-sm font-semibold ${
                      isActive ? "bg-main text-maintext" : "hover:bg-main hover:text-maintext"
                    }`}
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      {/* Modals */}
      {modalType === "login" && (
        <LoginPage
          open={modalType === "login"}
          onOpenChange={(open) => !open && closeModal()}
          setModalType={setModalType}
          setUserLoginType={setUserLoginType}
        />
      )}

      {modalType === "signup" && (
        <SignupPage
          open={modalType === "signup"}
          onOpenChange={(open) => !open && closeModal()}
          setModalType={setModalType}
        />
      )}

      {modalType === "reset" && (
        <ResetRequest
          open={modalType === "reset"}
          onOpenChange={(open) => !open && closeModal()}
          userLoginType={userLoginType}
        />
      )}
    </div>
  );
}
