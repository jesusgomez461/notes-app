export interface IMenuOptions {
  id: number;
  menuName: string;
  nameLeftIcon: string;
  redirectTo: string;
  isCanCreateElement?: true;
  elementTypeAccess?: TElementTypeAccess;
  pageName?: string;
  modalName?: string;
  sidebarName?: string;
  identifier: string;
  isSubmenu?: true;
  submenuOptions?: IMenuOptions[];
  overlayPanel?: string;
}

export type TElementTypeAccess = "page" | "modal" | "sidebar";
