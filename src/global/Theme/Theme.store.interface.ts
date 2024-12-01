import { TTheme } from './Theme.interface'

export type ThemeStore = {
  theme: TTheme
}

export type ThemeActions = {
  setTheme: (platform: TTheme) => void
}
