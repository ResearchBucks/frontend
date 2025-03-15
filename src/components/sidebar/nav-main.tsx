"use client";

import { ChevronRight } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IMenueItem } from "@/data/routes/admin-routes";
import { useAdminRoutes } from "@/hooks/useAdminRoutes";

export function NavMain({
  title,
  items,
}: {
  title?: string;
  items: IMenueItem[];
}) {
  const { pathOne, pathTwo } = useAdminRoutes(items);
  return (
    <SidebarGroup>
      {title && <SidebarGroupLabel>{title}</SidebarGroupLabel>}
      <SidebarMenu>
        {items.map((item) =>
          item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild={true}
              defaultOpen={
                item.url === pathOne?.url ||
                item.items?.some((subItem) => subItem.url === pathTwo?.url)
              }
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={!pathOne?.items && pathOne?.url === item.url}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          asChild={true}
                          isActive={
                            pathOne?.items && pathTwo?.url === subItem.url
                          }
                        >
                          <Link
                            href={subItem.url}
                            target={subItem.linkTarget || "_self"}
                          >
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                        {subItem.seperator && <SidebarSeparator />}
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                tooltip={item.title}
                isActive={!pathOne?.items && pathOne?.url === item.url}
              >
                <Link href={item.url} target={item.linkTarget || "_self"}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

/**
 * To Remove collabsibliity from the sidebar, we can remove the Collapsible imports
 * more info: https://ui.shadcn.com/docs/components/sidebar
 */
