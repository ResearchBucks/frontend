import { filterMenuItems } from "@/lib/client/routes";
import { navMenues } from "@/data/routes/client-menu";

export function useNavRoutes() {
  const navBarRoutes = filterMenuItems(navMenues, "footer");
  const footerRoutes = filterMenuItems(navMenues, "navbar");

  return { navBarRoutes, footerRoutes };
}