import { IMenuOptions } from "./Menu.interface";

export const MENU_STRUCTURE: IMenuOptions[] = [
  {
    id: 1,
    menuName: "home",
    nameLeftIcon: "chart-tree-map",
    redirectTo: "/home",
    identifier: "home",
  },
  // {
  //   id: 2,
  //   menuName: 'locals',
  //   nameLeftIcon: 'shop',
  //   redirectTo: '/locals',
  //   identifier: 'locals',
  // },
  // {
  //   id: 3,
  //   menuName: 'discounts',
  //   nameLeftIcon: 'tags',
  //   redirectTo: '/local/discounts',
  //   identifier: 'discounts',
  // },
  // {
  //   id: 4,
  //   menuName: 'users',
  //   nameLeftIcon: 'users',
  //   redirectTo: '/users',
  //   identifier: 'users',
  // },
  // {
  //   id: 5,
  //   menuName: 'menu',
  //   nameLeftIcon: 'burger-cheese',
  //   redirectTo: '/menu',
  //   identifier: 'menu',
  // },
  // {
  //   id: 6,
  //   menuName: 'companySettings',
  //   nameLeftIcon: 'sliders',
  //   redirectTo: '/company-settings',
  //   identifier: 'companySettings',
  // },
  // {
  //   id: 5,
  //   menuName: 'inventory',
  //   nameLeftIcon: 'warehouse-full',
  //   redirectTo: '/inventory',
  //   identifier: 'inventory',
  // },
  // {
  //   id: 6,
  //   menuName: 'providers',
  //   nameLeftIcon: 'truck-utensils',
  //   redirectTo: '/providers',
  //   identifier: 'providers',
  // },
];

export const MENU_DOWN: IMenuOptions[] = [
  {
    id: 1,
    menuName: "applicationsAndServices",
    nameLeftIcon: "grid",
    redirectTo: "#",
    identifier: "applicationsAndServices",
  },
  // {
  //   id: 2,
  //   menuName: "appStore",
  //   nameLeftIcon: "cart-plus",
  //   redirectTo: "#",
  //   identifier: "appStore",
  // },
  // {
  //   id: 6,
  //   menuName: "trashCan",
  //   nameLeftIcon: "trash-can",
  //   redirectTo: "/trash-can",
  //   identifier: "trashCan",
  // },
  // {
  //   id: 3,
  //   menuName: "quickAccess",
  //   nameLeftIcon: "rectangle-history-circle-plus",
  //   redirectTo: "",
  //   overlayPanel: "op",
  //   identifier: "create-quick-access",
  // },
];
