import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { START_ICON_LIGHT, themeStore } from "../../../global";
import { SessionStore } from "../../../store/store.session";

function Topbar() {
  const { theme, setTheme } = themeStore();
  const { language, setLanguage } = SessionStore()
  const op = useRef<OverlayPanel>(null);

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
            onClick={() => setLanguage(language === "es" ? "en" : "es")}
          />
          <i
            className={`${START_ICON_LIGHT}${
              theme === "light" ? "sun" : "moon"
            } cursor-pointer`}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <Avatar
            label="U"
            className="cursor-pointer"
            size="normal"
            style={{ width: 40, height: 40 }}
            shape="circle"
            onClick={(e) => op.current && op.current.toggle(e)}
          />
        </div>
      </div>
    </div>
  );
}

export default Topbar;
