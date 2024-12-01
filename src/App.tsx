import { ThemeProvider } from "styled-components";
import { DARK_THEME, LIGHT_THEME, themeStore } from "./global";
import { Toaster } from "sonner";
import { Styles } from "./global/Styles";
import Routes from "./components/Routes/Routes";
import { useTranslation } from "react-i18next";
import { SessionStore } from "./store/store.session";
import { GlobalStore } from "./store/store.global";
import { addLocale, locale } from "primereact/api";

import { useEffect } from "react";
import i18n from "./global/locales/i18n";

const updatePrimeReactLocale = (lng: string) => {
  const translation = i18n.getResourceBundle(lng, "translation");
  const primeReactLocale = translation.primereact;

  if (primeReactLocale) {
    addLocale(lng, primeReactLocale);
    locale(lng);
  }
};

function App() {
  const { i18n } = useTranslation();
  const { theme } = themeStore();
  const { session } = SessionStore();
  const { setIsSession } = GlobalStore();

  useEffect(() => {
    if (session) {
      setIsSession(true);
    }
  }, [session, setIsSession]);

  useEffect(() => {
    updatePrimeReactLocale(i18n.language);

    const handleLanguageChange = (lng: string) => {
      updatePrimeReactLocale(lng);
    };

    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  return (
    <ThemeProvider theme={theme === "light" ? LIGHT_THEME : DARK_THEME}>
      <Toaster position="top-center" closeButton richColors />
      <Styles />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
