import { useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useLocation } from "react-router-dom";
import { START_ICON_LIGHT } from "../../global";
import { MENU_STRUCTURE } from "./Menu.constants";
import { IMenuOptions } from "./Menu.interface";

function Menu() {
  const { t } = useTranslation();

  const [openMenus, setOpenMenus] = useState<number[]>([]);
  const location = useLocation();

  const toggleSubMenu = (menuId: number) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(menuId)
        ? prevOpenMenus.filter((id) => id !== menuId)
        : [...prevOpenMenus, menuId]
    );
  };

  const isActiveMenu = (redirectTo: string) => {
    return redirectTo !== "#" && location.pathname === redirectTo;
  };

  const isActiveParentMenu = (menuItem: IMenuOptions) => {
    if (menuItem.isSubmenu && menuItem.submenuOptions) {
      return menuItem.submenuOptions.some(
        (subItem) => location.pathname === subItem.redirectTo
      );
    }
    return false;
  };

  return (
    <div className="w-full h-full flex flex-column justify-content-between px-2 py-2">
      <nav className="flex flex-column gap-2">
        <span className="text-sm font-medium mt-1">{t("menu")}</span>
        <ul className="p-0 m-0">
          {MENU_STRUCTURE.map((menuItem: IMenuOptions) => (
            <li
              key={menuItem.id}
              className={`${
                menuItem.menuName + "_" + menuItem.id
              } list-none li-app-menu ${
                isActiveParentMenu(menuItem) ? "active-parent" : ""
              }`}
              style={{ paddingTop: "10px", paddingBottom: "10px" }}
            >
              <NavLink
                to={menuItem.redirectTo}
                className={() =>
                  `flex align-items-center justify-content-center no-underline menu-header ${
                    isActiveMenu(menuItem.redirectTo) ? "active" : ""
                  }`
                }
                onClick={() => toggleSubMenu(menuItem.id)}
              >
                <div className="flex align-items-center gap-2">
                  <i
                    className={`${START_ICON_LIGHT + menuItem.nameLeftIcon}`}
                  ></i>
                </div>
                <div className="flex align-items-center gap-2">
                  {menuItem.isCanCreateElement && (
                    <i
                      className={`text-base ${START_ICON_LIGHT}plus-circle create-element-menu`}
                    ></i>
                  )}
                  {menuItem.isSubmenu && (
                    <i
                      className={`text-xs ${START_ICON_LIGHT}chevron-${
                        openMenus.includes(menuItem.id) ? "down" : "right"
                      }`}
                    ></i>
                  )}
                </div>
              </NavLink>
              {/* <Tooltip
                children={
                  <div>
                    <span>{t(menuItem.menuName)}</span>
                  </div>
                }
                target={`${menuItem.menuName + "_" + menuItem.id}`}
                position="right"
              /> */}
              {openMenus.includes(menuItem.id) && menuItem.isSubmenu && (
                <ul className="pl-3 pt-3 subitem-content-ul">
                  {menuItem.submenuOptions?.map((subItem: IMenuOptions) => (
                    <li
                      key={subItem.id}
                      className="list-none subitem-content-li"
                    >
                      <NavLink
                        to={subItem.redirectTo}
                        className={({ isActive }) =>
                          `flex align-items-center justify-content-between no-underline ${
                            isActive ? "active" : ""
                          }`
                        }
                      >
                        <div className="flex align-items-center gap-2">
                          <i
                            className={`text-base ${START_ICON_LIGHT}${subItem.nameLeftIcon}`}
                          ></i>
                          {/* <span>{t(subItem.menuName)}</span> */}
                        </div>
                        <div className="flex align-items-center gap-2 container-create-element-menu">
                          {subItem.isCanCreateElement && (
                            <i
                              className={`text-sm ${START_ICON_LIGHT}plus-circle create-element-menu`}
                            ></i>
                          )}
                        </div>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Menu;
