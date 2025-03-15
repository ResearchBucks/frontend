import { TlinkTarget } from "./components-props";

export interface IBaseMenuItem {
  title: string;
  href: string;
  linkTarget?: TlinkTarget;
  description?: string;
  showOnlyIn?: "footer" | "navbar";
}

type ISubMenuItem = IBaseMenuItem;

export interface IMenuGroup {
  groupTitle: string;
  items: ISubMenuItem[];
}

export type IMenueItem = IMenuGroup | IBaseMenuItem;
