"use client";
import Image from "next/image";
import { logo } from "@/assests/assests";
import Link from "next/link";
import { useState } from "react";
import { LoginForm } from "@/components/login-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import LoginPage from "@/app/login/page";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Respondents", href: "/#respondents" },
    { title: "Surveys", href: "/#surveys" },
    { title: "Researcher", href: "/#researcher" },
    { title: "About Us", href: "/#aboutus" },
    { title: "Login", href: "#" }, // href="#" to maintain link styling
    { title: "Sign Up", href: "#signup" },
  ];

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Login Dialog */}
      <Dialog open={showLogin} onOpenChange={setShowLogin}>
        <DialogContent className="sm:max-w-[425px]">
          <LoginPage />
        </DialogContent>
      </Dialog>

      <div className="flex flex-row justify-between items-center px-6 py-3 max-w-[1440px] mx-auto">
        {/* Logo on the left */}
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

        {/* Navigation items on the right */}
        <ul className="flex flex-row gap-4 text-sm font-semibold">
          {navItems.map((item, index) => (
            <li key={index}>
              {item.title === "Login" ? (
                <button
                  onClick={() => setShowLogin(true)}
                  className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext w-full text-left"
                >
                  {item.title}
                </button>
              ) : (
                <Link
                  href={item.href}
                  className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}