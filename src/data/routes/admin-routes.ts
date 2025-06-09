import { UserRoles } from "@/enum/user";
import { getAvailableRoutesForRole } from "@/lib/role/functions";
import { TlinkTarget } from "@/types/components-props";
import {
  type LucideIcon as TLucideIcon,
  ChartColumn,
  CircleUserRound,
  LayoutDashboard,
  Medal,
  NotebookPen,
  NotepadText,
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
  },
  {
    title: "Surveys",
    url: "/admin/surveys",
    icon: NotepadText,
    onlyForRoles: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
  },
  {
    title: "Create Survey",
    url: "/admin/create-survey",
    icon: NotebookPen,
    onlyForRoles: [UserRoles.RESEARCHER],
  },
  {
    title: "Leaderboard",
    url: "/admin/leaderboard",
    icon: ChartColumn,
    onlyForRoles: [UserRoles.RESPONDENT],
  },
  {
    title: "My Surveys",
    url: "/admin/my-surveys",
    icon: NotepadText,
    onlyForRoles: [UserRoles.RESEARCHER, UserRoles.RESPONDENT],
  },
  {
    title: "My Rewards",
    url: "/admin/my-rewards",
    icon: Medal,
    onlyForRoles: [UserRoles.RESPONDENT],
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Users,
    onlyForRoles: [UserRoles.ADMIN, UserRoles.SUPER_ADMIN],
  },
  {
    title: "Profile",
    url: "/admin/profile",
    icon: CircleUserRound,
  },
];

export function availableNavMainRoutes(role: UserRoles | undefined) {
  return getAvailableRoutesForRole({
    role,
    routes: navMain,
  });
}

export function getAllAvailableRoutes(role: UserRoles | undefined) {
  return [...availableNavMainRoutes(role)];
}
