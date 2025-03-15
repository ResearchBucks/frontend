import { IMenueItem } from "@/types/navigation";

export function filterMenuItems(
  menuItems: IMenueItem[],
  showOnlyIn: "navbar" | "footer"
): IMenueItem[] {
  return menuItems
    .map((menu) => {
      if ("items" in menu) {
        const filteredItems = menu.items.filter(
          (item) => item.showOnlyIn !== showOnlyIn
        );
        if (filteredItems.length === 0) {
          return null;
        }
        return { ...menu, items: filteredItems };
      }
      return menu.showOnlyIn !== showOnlyIn ? menu : null;
    })
    .filter((menu): menu is IMenueItem => menu !== null);
}