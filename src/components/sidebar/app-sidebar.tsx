"use client";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavProjects } from "@/components/sidebar/nav-projects";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { BRAND } from "@/data/brand";
import Image from "next/image";
import {
  availableNavMainRoutes,
  availableProjectsRoutes,
} from "@/data/routes/admin-routes";
import { UserRoles } from "@/enum/user";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: UserRoles;
};

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="w-full flex justify-center items-center py-3">
          <Image
            alt={BRAND.name}
            height={100}
            width={200}
            src={open ? BRAND?.logo || BRAND.mobilelogo : BRAND.mobilelogo}
            className="object-contain"
          />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={availableNavMainRoutes(role)} />
        <NavProjects projects={availableProjectsRoutes(role)} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
