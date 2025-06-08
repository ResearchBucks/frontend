"use client";

import { ChevronsUpDown, LogOut, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { clearAuth } from "@/lib/redux/authSlice";
import { useRouter } from "next/navigation";
import CustomAxios from "@/app/api/CustomAxios";
import { toast } from "sonner";
import { UserRoles } from "@/enum/user";

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}) {
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const userRole = useAppSelector((state) => state.auth.userRole);

  const handleLogout = async () => {
    try {
      let logoutEndpoint = "";

      if (userRole === UserRoles.ADMIN || userRole === UserRoles.SUPER_ADMIN) {
        logoutEndpoint = "admin/auth/logout";
      } else if (userRole === UserRoles.RESEARCHER) {
        logoutEndpoint = "researcher/auth/logout";
      } else if (userRole === UserRoles.RESPONDENT) {
        logoutEndpoint = "respondent/auth/logout";
      } else {
        logoutEndpoint = "researcher/auth/logout";
      }

      console.log("Logging out with endpoint:", logoutEndpoint);
      console.log("Current user role:", userRole);

      await CustomAxios.post(logoutEndpoint);

      dispatch(clearAuth());

      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      toast.success("Logged out successfully");

      if (userRole === UserRoles.ADMIN || userRole === UserRoles.SUPER_ADMIN) {
        router.push("/adminLogin");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error("Logout error:", error);

      dispatch(clearAuth());

      document.cookie =
        "userRole=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      document.cookie =
        "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      toast.error("Logout failed, but you've been signed out locally");
      router.push("/auth/login");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">
                  <User />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
