"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { DesktopNavMenu } from "./desktop";
import { MobileNavMenu } from "./mobile";
import { BrandType } from "@/data/brand";
import Link from "next/link";
import { IMenueItem } from "@/types/navigation";
import Container from "../container";

export default function NavBar({
  navBarRoutes,
  brand,
}: Readonly<{ navBarRoutes: IMenueItem[]; brand: BrandType }>) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = useCallback(() => {
    if (typeof window !== "undefined") {
      const navBarHeight = document.querySelector("header")?.clientHeight || 0;
      if (window.scrollY > navBarHeight) {
        if (window.scrollY > lastScrollY) {
          // if scroll down hide the navbar
          setIsVisible(false);
        } else {
          // if scroll up show the navbar
          setIsVisible(true);
        }
      } else {
        // if scroll is less than 85px from top, always show the navbar
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [controlNavbar]);

  return (
    <header
      className={`py-3 border-b-2 sticky top-0 bg-background transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <Container>
        <div className="flex justify-between">
          <Link href="/">
            <Image
              src={brand.logo}
              alt={`${brand.name} Logo`}
              width={100}
              height={100}
            />
          </Link>
          <nav className="flex items-center">
            <div className="md:hidden">
              <MobileNavMenu navBarRoutes={navBarRoutes} brand={brand} />
            </div>
            <div className="hidden md:block">
              <DesktopNavMenu navBarRoutes={navBarRoutes} />
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
