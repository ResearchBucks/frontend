import { UserRoles } from "@/enum/user";
import { getAvailableRoutesForRole } from "@/lib/role/functions";
import { TlinkTarget } from "@/types/components-props";
import {
  type LucideIcon as TLucideIcon,
  SquareTerminal,
  HistoryIcon,
  ListStartIcon,
  BookOpen,
  Frame,
  Folder,
  Forward,
  Trash2,
  PieChart,
  LayoutDashboard,
  Users,
} from "lucide-react";

export interface IBaseMenuItem {
  title: string;
  url: string;
  linkTarget?: TlinkTarget;
  icon?: TLucideIcon;
  onlyForRoles?: UserRoles[];
}

interface ISubMenuItem extends IBaseMenuItem {
  seperator?: boolean;
}

export interface IMenueItem extends IBaseMenuItem {
  items?: ISubMenuItem[];
}

/**
 * An array of routes showing in sidebar as collapsible menu
 */
const navMain: IMenueItem[] = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
    items: [
      {
        title: "Overview",
        url: "/admin/dashboard/overview",
        icon: HistoryIcon,
      },
      {
        title: "Activity",
        url: "/admin/dashboard/activity",
        icon: ListStartIcon,
      },
      {
        title: "Settings",
        url: "/admin/dashboard/settings",
      },
    ],
  },
  {
    title: "Playground",
    url: "/admin/playground",
    icon: SquareTerminal,
    onlyForRoles: [UserRoles.ADMIN],
    items: [
      {
        title: "History",
        url: "/admin/playground/history",
        icon: HistoryIcon,
      },
      {
        title: "Starred",
        url: "/admin/playground/starred",
        icon: ListStartIcon,
      },
      {
        title: "Settings",
        url: "/admin/playground/settings",
      },
    ],
  },
  {
    title: "Documentation",
    url: "/admin/docs",
    icon: BookOpen,
    items: [
      {
        title: "Introduction",
        url: "/admin/docs/introduction",
        onlyForRoles: [UserRoles.OPERATOR],
      },
      {
        title: "Get Started",
        url: "/admin/docs/get-started",
        onlyForRoles: [UserRoles.SCANNER],
      },
      {
        title: "Tutorials",
        url: "/admin/docs/tutorials",
        onlyForRoles: [UserRoles.ADMIN],
      },
      {
        title: "Changelog",
        url: "/admin/docs/changelog",
      },
    ],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
  },
];

/**
 * An array of routes showing in admin sidebar as Dropdown menu
 */
const projects: IMenueItem[] = [
  {
    title: "Design Engineering",
    url: "/design",
    icon: Frame,
    items: [
      {
        title: "View Project",
        url: "/design/view",
        icon: Folder,
      },
      {
        title: "Share Project",
        url: "/design/share",
        icon: Forward,
        seperator: true,
      },
      {
        title: "Delete Project",
        url: "/design/delete",
        icon: Trash2,
      },
    ],
  },
  {
    title: "Sales & Marketing",
    url: "/sales",
    icon: PieChart,
    items: [
      {
        title: "View Project",
        url: "/sales/view",
        icon: Folder,
      },
      {
        title: "Share Project",
        url: "/sales/share",
        icon: Forward,
      },
      {
        title: "Delete Project",
        url: "/sales/delete",
        icon: Trash2,
      },
    ],
  },
  {
    title: "Sales & Marketing 2",
    url: "/sales2",
    icon: PieChart,
    items: [
      {
        title: "View Project 2",
        url: "/sales2/view",
        icon: Folder,
      },
      {
        title: "Share Project 2",
        url: "/sales2/share",
        icon: Forward,
      },
      {
        title: "Delete Project 2",
        url: "/sales2/delete",
        icon: Trash2,
      },
    ],
  },
];

export function availableNavMainRoutes(role: UserRoles | undefined) {
  return getAvailableRoutesForRole({
    role,
    routes: navMain,
  });
}

export function availableProjectsRoutes(role: UserRoles | undefined) {
  return getAvailableRoutesForRole({
    role,
    routes: projects,
  });
}

export function getAllAvailableRoutes(role: UserRoles | undefined) {
  return [...availableNavMainRoutes(role), ...availableProjectsRoutes(role)];
}
