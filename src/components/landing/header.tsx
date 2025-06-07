"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { logo } from "@/assests/assests";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import LoginPage from "@/app/login/page";
import { SignUp } from "@/app/signup/page";


export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [modalView, setModalView] = useState<"login" | "signup">("login");

  const handleSwitchToLogin = () => setModalView("login");
  const handleSwitchToSignup = () => setModalView("signup");

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Respondents", href: "/#respondents" },
    { title: "Surveys", href: "/#surveys" },
    { title: "Researcher", href: "/#researcher" },
    { title: "About Us", href: "/#aboutus" },
  ];

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className={`${modalView === "login" ? "sm:max-w-[425px]" : "sm:max-w-[550px]"}`}>
          <DialogTitle className="text-xl font-bold mb-2 text-center">
            {modalView === "login" ? "Login" : "Sign Up"}
          </DialogTitle>
          {modalView === "login" ? (
            <LoginPage onSwitch={handleSwitchToSignup} />
          ) : (
            <SignUp onSwitch={handleSwitchToLogin} />
          )}
        </DialogContent>
      </Dialog>

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
              <Link
                href={item.href}
                className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
              >
                {item.title}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setModalView("login");
                setOpenModal(true);
              }}
              className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
            >
              Login
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setModalView("signup");
                setOpenModal(true);
              }}
              className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
            >
              Sign Up
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
