import { IMenueItem } from "@/data/routes/admin-routes";
import { UserRoles } from "@/enum/user";

export function getAvailableRoutesForRole({
  role,
  routes,
}: {
  role: UserRoles | undefined;
  routes: IMenueItem[];
}): IMenueItem[] {
  // Return empty array if no role which means non-logged in user no dashboard access
  if (!role) return [];

  return routes.reduce<IMenueItem[]>((acc, route) => {
    // Check if route is available for role
    const isRouteAvailable =
      !route.onlyForRoles || route.onlyForRoles.includes(role);

    if (isRouteAvailable) {
      // Filter sub-items if they exist
      const filteredRoute = { ...route };
      if (route.items) {
        filteredRoute.items = route.items.filter(
          (item) => !item.onlyForRoles || item.onlyForRoles.includes(role)
        );
      }
      acc.push(filteredRoute);
    }

    return acc;
  }, []);
}

export function middlewareRouteCheck(
  routes: IMenueItem[],
  pathname: string
): boolean {
  for (const route of routes) {
    if (pathname.startsWith(route.url)) {
      // If route matches exactly
      if (pathname === route.url) {
        return true;
      }

      // If has sub-routes, check them
      if (route.items?.length) {
        // Find matching sub-route
        const matchingSubRoute = route.items.find(
          (subRoute) => pathname === subRoute.url
        );

        return !!matchingSubRoute;
      }
    }
  }
  return false;
}
