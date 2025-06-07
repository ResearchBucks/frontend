"use client";

import { forwardRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { IMenueItem } from "@/types/navigation"; 

export function DesktopNavMenu({ navBarRoutes }: Readonly<{ navBarRoutes: IMenueItem[] }>) {
  return (
    <NavigationMenu className="items-center h-full">
      <NavigationMenuList>
        {navBarRoutes.map((menu) => (
          <NavigationMenuItem
            key={"groupTitle" in menu ? menu.groupTitle : menu.title}
          >
            {"items" in menu ? (
              <>
                <NavigationMenuTrigger>{menu.groupTitle}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    {menu.items.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        target={item.linkTarget}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : menu.href ? (
              <Link 
                href={menu.href} 
                legacyBehavior 
                passHref
                target={menu.linkTarget}
              >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menu.title}
                </NavigationMenuLink>
              </Link>
            ) : (
              <button
                onClick={menu.onClick}
                className={navigationMenuTriggerStyle()}
              >
                {menu.title}
              </button>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, children, target, ...props }, ref) => {
  const isActive = usePathname() === href;

  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            isActive
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          href={href}
          target={target}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";