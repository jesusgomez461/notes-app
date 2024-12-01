export interface ITheme {
  mainColor: string;
  backgroundColor: string;
  containerColor: string;
  borderLightColor: string;
  textColor: string;
  borderColor: string;
}

export type TColorTheme =
  | "mainColor"
  | "backgroundColor"
  | "containerColor"
  | "borderLightColor"
  | "textColor"
  | "borderColor";

export type TTheme = "dark" | "light";

export const THEME_TYPES = {
  dark: "Oscuro",
  light: "Claro",
};
