export interface ITheme {
  mainColor: string;
  backgroundColor: string;
  containerColor: string;
  borderLightColor: string;
  textColor: string;
  borderColor: string;
  errorColor: string;
  whiteColor: string;
  redColor: string;
  successColor: string;
  mainColorLight: string;
}

export type TColorTheme =
  | "mainColor"
  | "backgroundColor"
  | "containerColor"
  | "borderLightColor"
  | "textColor"
  | "borderColor"
  | "errorColor"
  | "whiteColor"
  | "redColor"
  | "successColor"
  | "mainColorLight";

export type TTheme = "dark" | "light";

export const THEME_TYPES = {
  dark: "Oscuro",
  light: "Claro",
};
