"use client";

import { usePathname } from "next/navigation";
import { IMenueItem } from "@/data/routes/admin-routes";

export const useAdminRoutes = (availableRoutes: IMenueItem[]) => {
  const pathname = usePathname();

  const pathOne = availableRoutes.find((route: IMenueItem) =>
    route.url.includes(pathname.split("/").slice(0, 3).join("/"))
  );

  const pathTwo = pathOne?.items?.length
    ? pathOne.items.find((route: IMenueItem) => pathname.includes(route.url))
    : undefined;

  return { pathOne, pathTwo };
};
