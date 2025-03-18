"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { IMenueItem } from "@/types/navigation";
import { Menu } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import Link from "next/link";
import { BrandType } from "@/data/brand";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {logo} from '@/assests/assests';

export function MobileNavMenu({
  navBarRoutes,
  brand,
}: Readonly<{ navBarRoutes: IMenueItem[]; brand: BrandType }>) {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-sm p-4 bg-[var(--background-light)]/70">
        <SheetHeader>
          <SheetTitle className="flex justify-center py-5">
            <SheetClose asChild>
              <Link href="/">
                <Image
                  src={logo}
                  alt={"ResearchBucks"}
                  width={100}
                  height={100}
                />
              </Link>
            </SheetClose>
          </SheetTitle>
          <SheetDescription hidden>
            Navigate through the menu items.
          </SheetDescription>
        </SheetHeader>
        <Accordion type="single" collapsible>
          {navBarRoutes.map((menu) => (
            <AccordionItem
              hideBorder
              key={"groupTitle" in menu ? menu.groupTitle : menu.title}
              value={"groupTitle" in menu ? menu.groupTitle : menu.title}
            >
              {"items" in menu ? (
                <>
                  <AccordionTrigger className="text-base p-3">
                    {menu.groupTitle}
                  </AccordionTrigger>
                  <AccordionContent className="text-base ml-5">
                    <ul className="space-y-2">
                      {menu.items.map((item) => (
                        <li key={item.title}>
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className={cn(
                                "block select-none space-y-1  rounded-md p-3 leading-none no-underline outline-none transition-colors",
                                pathname === item.href
                                  ? "bg-accent text-accent-foreground"
                                  : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              )}
                            >
                              {item.title}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </>
              ) : (
                <SheetClose asChild>
                  <Link
                    href={menu.href}
                    className={cn(
                      "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                      pathname === menu.href
                        ? "bg-accent text-accent-foreground"
                        : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                    )}
                  >
                    {menu.title}
                  </Link>
                </SheetClose>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
