import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { ThemeActions, ThemeStore } from './Theme.store.interface'
import { PLATFORM_THEME } from './Theme.constants'
import { TTheme } from './Theme.interface'

export const themeStore = create(
  persist<ThemeStore & ThemeActions>(
    (set) => ({
      theme: PLATFORM_THEME,
      setTheme: (theme: TTheme) =>
        set(() => ({
          theme,
        })),
    }),
    {
      name: 'theme',
    }
  )
)
