import { ITheme, TTheme } from "./Theme.interface";

export const PLATFORM_THEME: TTheme = "light";

export const LIGHT_THEME: ITheme = {
  mainColor: "#f0a756",
  backgroundColor: "#FFFFFF",
  containerColor: "#f6f6f6",
  borderLightColor: "#e8e8e8",
  textColor: "#000000",
  borderColor: "#d8d8d8",
};

export const DARK_THEME: ITheme = {
  mainColor: "#f0a756",
  backgroundColor: "#090909",
  containerColor: "#1c1c1e",
  borderLightColor: "#232325",
  textColor: "#dbdbdb",
  borderColor: "#1f1f22",
};
