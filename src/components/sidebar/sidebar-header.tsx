"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useAdminRoutes } from "@/hooks/useAdminRoutes";
import { getAllAvailableRoutes } from "@/data/routes/admin-routes";
import { UserRoles } from "@/enum/user";

interface AdminHeaderContentProps {
  role: UserRoles;
}

export default function AdminHeaderContent({ role }: AdminHeaderContentProps) {
  const availableRoutes = getAllAvailableRoutes(role);
  const { pathOne, pathTwo } = useAdminRoutes(availableRoutes);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbPage>{pathOne?.title}</BreadcrumbPage>
          </BreadcrumbItem>
          {pathTwo && <BreadcrumbSeparator className="hidden md:block" />}
          {pathTwo && (
            <BreadcrumbItem>
              <BreadcrumbPage>{pathTwo.title}</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}
