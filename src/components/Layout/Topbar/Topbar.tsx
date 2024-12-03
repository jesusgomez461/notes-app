import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import {
  extractCharacter,
  START_ICON_LIGHT,
  themeStore,
} from "../../../global";
import { GlobalStore } from "../../../store/store.global";
import { SessionStore } from "../../../store/store.session";

function Topbar() {
  const { theme, setTheme } = themeStore();
  const { language, setLanguage, session, clearSession } = SessionStore();
  const { setIsSession } = GlobalStore();
  const op = useRef<OverlayPanel>(null);
  const { t, i18n } = useTranslation();

  return (
    <div className="top-bar">
      <nav>
        <div className="logo-show-hide-sidebar">
          <ul className="p-0">
            <li>
              <NavLink to="/">
                <img
                  src="/src/assets/logo-notes.png"
                  alt="logo-company"
                  width="43px"
                  height="43px"
                />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className="content-top-bar">
        <div className="flex flex-row align-items-center gap-3">
          <i
            className={`${START_ICON_LIGHT + "language"} cursor-pointer`}
            onClick={() => {
              const newLanguage = language === "es" ? "en" : "es";
              setLanguage(newLanguage);
              i18n.changeLanguage(newLanguage);
            }}
          />
          <i
            className={`${START_ICON_LIGHT}${
              theme === "light" ? "sun" : "moon"
            } cursor-pointer`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <Avatar
            label={`${extractCharacter({
              element: session?.full_name ?? "",
              isUppercase: true,
            })}${extractCharacter({
              element:
                session?.full_name.split(" ")[2] ??
                session?.full_name.split(" ")[1] ??
                "",
              position: 0,
              isUppercase: true,
            })}`}
            icon="pi pi-user"
            className="cursor-pointer"
            size="normal"
            style={{ width: 40, height: 40 }}
            shape="circle"
            onClick={(e) => op.current && op.current.toggle(e)}
          />
        </div>
        <OverlayPanel ref={op}>
          <div className="flex flex-column gap-2 w-auto">
            <div
              className="cursor-pointer flex gap-2 align-items-center element-pointer"
              onClick={() => {
                clearSession();
                setIsSession(false);
              }}
            >
              <i className={START_ICON_LIGHT + "sign-out text-sm"} />
              <span>{t("logout")}</span>
            </div>
          </div>
        </OverlayPanel>
      </div>
    </div>
  );
}

export default Topbar;
