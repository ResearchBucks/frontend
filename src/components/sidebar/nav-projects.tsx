"use client";

import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import Link from "next/link";
import { IMenueItem } from "@/data/routes/admin-routes";

export function NavProjects({
  title,
  projects,
  itemLimit = 2,
}: {
  title?: string;
  projects: IMenueItem[];
  itemLimit?: number;
}) {
  const { isMobile } = useSidebar();
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, itemLimit);
  const hasMore = projects.length > itemLimit;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {visibleProjects.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
              <Link href={item.url} target={item.linkTarget || "_self"}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                {item.items?.map((subItem) => (
                  <div key={subItem.title}>
                    <DropdownMenuItem asChild>
                      <Link
                        href={subItem.url}
                        target={subItem.linkTarget || "_self"}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        {subItem.icon && <subItem.icon size="20" />}
                        <span>{subItem.title}</span>
                      </Link>
                    </DropdownMenuItem>
                    {subItem.seperator && <DropdownMenuSeparator />}
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        {hasMore && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className="text-sidebar-foreground/70"
              onClick={() => setShowAll(!showAll)}
            >
              <MoreHorizontal className="text-sidebar-foreground/70" />
              <span>{showAll ? "Show Less" : "More"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
