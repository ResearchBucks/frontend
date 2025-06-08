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
import { availableNavMainRoutes } from "@/data/routes/admin-routes";
import { UserRoles } from "@/enum/user";
import { useAppSelector } from "@/lib/redux/hooks";

type AppSidebarProps = React.ComponentProps<typeof Sidebar> & {
  role: UserRoles;
};

export function AppSidebar({ role, ...props }: AppSidebarProps) {
  const { open } = useSidebar();

  const userEmail = useAppSelector((state) => state.auth.userEmail);
  const userRole = useAppSelector((state) => state.auth.userRole);
  const userId = useAppSelector((state) => state.auth.userId);

  const user = {
    name: userEmail?.split("@")[0] || "User",
    email: userEmail || "user@example.com",
    avatar: "/avatars/default-avatar.jpg",
  };

  const getDisplayName = (email: string | null, role: string | null) => {
    if (!email) return "User";

    const namePart = email.split("@")[0];

    const formattedName = namePart
      .replace(/[._]/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return formattedName;
  };

  const enhancedUser = {
    name: getDisplayName(userEmail, userRole),
    email: userEmail || "user@example.com",
    avatar: "/avatars/default-avatar.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props} className="bg-[var(--main-light)]">
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
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={enhancedUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
