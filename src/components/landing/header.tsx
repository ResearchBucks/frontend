"use client";
import Image from "next/image";
import { logo } from "@/assests/assests";
import Link from "next/link";
import { useState } from "react";
import { Dialog, DialogContent,DialogTitle} from "@/components/ui/dialog";
import LoginPage from "@/app/login/page";

export default function Header() {
  const [openModel, setOpenModel] = useState<string | null>(null);

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Respondents", href: "/#respondents" },
    { title: "Surveys", href: "/#surveys" },
    { title: "Researcher", href: "/#researcher" },
    { title: "About Us", href: "/#aboutus" },
    { title: "Login", href: "#" },
    { title: "Sign Up", href: "#signup" },
  ];


  return (
    <div className="bg-white sticky top-0 z-50">
      <Dialog open={openModel === "login"} onOpenChange={(open) => !open && setOpenModel(null)}>
        <DialogContent className="sm:max-w-[425px]">
            <DialogTitle className="text-xl font-bold mb-2 text-center ">Login</DialogTitle>
          <LoginPage />
        </DialogContent>
      </Dialog>

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
              {item.title === "Login" ? (
                <button
                  onClick={() => setOpenModel("login")}
                  className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold"
                >
                  {item.title}
                </button>
              ) : (
                <Link href={item.href} className="cursor-pointer hover:bg-main p-2 rounded-sm hover:text-maintext text-sm font-semibold">
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