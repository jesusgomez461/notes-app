import { TTheme } from "../global";
import { IUser } from "../hooks";

export type TSessionStore = {
  session: IUser | null;
  theme: TTheme;
  language: TLanguage;
};

export type TSessionActions = {
  setSession: (session: IUser | null) => void;
  clearSession: () => void;
  setTheme: (settings: TTheme) => void;
  clearTheme: () => void;
  setLanguage: (language: TLanguage) => void;
  clearLanguage: () => void;
};

export type TGlobalStore = {
  isSession: boolean;
};

export type TGlobalActions = {
  setIsSession: (isSession: boolean) => void;
};

export type TLanguage = "es" | "en";
