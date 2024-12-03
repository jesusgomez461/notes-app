import { IMenuOptions } from "./Menu.interface";

export const MENU_STRUCTURE: IMenuOptions[] = [
  {
    id: 1,
    menuName: "home",
    nameLeftIcon: "clipboard",
    redirectTo: "/home",
    identifier: "home",
  },
  {
    id: 2,
    menuName: "categories",
    nameLeftIcon: "bookmark",
    redirectTo: "/categories",
    identifier: "categories",
  },
];
