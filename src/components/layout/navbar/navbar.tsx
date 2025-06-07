"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { DesktopNavMenu } from "./desktop";
import { MobileNavMenu } from "./mobile";
import { BrandType } from "@/data/brand";
import Link from "next/link";
import { IMenueItem } from "@/types/navigation";
import Container from "../container";
import {logo} from '@/assests/assests';
import LoginPage from "@/app/login/page";
import { Modal } from "@/components/blurmodal/modal";

export default function NavBar({
  navBarRoutes,
  brand,
}: Readonly<{ navBarRoutes: IMenueItem[]; brand: BrandType }>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const navBarHeight = document.querySelector("header")?.clientHeight || 0;
      if (window.scrollY > navBarHeight) {
        if (window.scrollY > lastScrollY) {
          setIsVisible(true);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  // Modify the navBarRoutes to include the click handler for Login
  const modifiedNavBarRoutes = navBarRoutes.map(menu => {
    if (!('groupTitle' in menu) && menu.title === "Login") {
      return {
        ...menu,
        onClick: () => setIsLoginModalOpen(true)
      };
    }
    return menu;
  });

  return (
    <>
      <header
        className={`py-3 border-b-2 sticky z-50 top-0 bg-white transition-transform duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <Container>
          <div className="flex justify-between">
            <Link href="/">
              <Image
                src={logo}
                alt="ResearchBucks"
                width={150}
                height={150}
                className="animate animate-pulse opacity-100"
              />
            </Link>
            <nav className="flex items-center">
              <div className="md:hidden">
                <MobileNavMenu navBarRoutes={modifiedNavBarRoutes} brand={brand} />
              </div>
              <div className="hidden md:block">
                <DesktopNavMenu navBarRoutes={modifiedNavBarRoutes} />
              </div>
            </nav>
          </div>
        </Container>
      </header>
      <Modal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <LoginPage />
      </Modal>
    </>
  );
}