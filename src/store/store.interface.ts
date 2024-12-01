import { TTheme } from "../global";

export type TSessionStore = {
  session: unknown;
  countryCode: string;
  theme: TTheme;
  language: TLanguage;
  isVisibleSidebar: boolean;
};

export type TSessionActions = {
  setSession: (session: unknown) => void;
  clearSession: () => void;
  clearSettings: () => void;
  setCountryCode: (countryCode: string) => void;
  clearCountryCode: () => void;
  setTheme: (settings: TTheme) => void;
  clearTheme: () => void;
  setLanguage: (language: TLanguage) => void;
  clearLanguage: () => void;
  setIsVisibleSidebar: (isVisibleSidebar: boolean) => void;
};

export type TGlobalStore = {
  isSession: boolean;
  isValidatingCode: boolean;
  isSuccessValidationCode: boolean;
  codeValidationValue: string | null;
};

export type TGlobalActions = {
  setIsSession: (isSession: boolean) => void;
  setIsValidatingCode: (isValidatingCode: boolean) => void;
  setIsSuccessValidationCode: (isSuccessValidationCode: boolean) => void;
  setCodeValidationValue: (codeValidationValue: string | null) => void;
};

export type TLanguage = "es" | "en";
