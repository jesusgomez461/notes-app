import CryptoJS from "crypto-js";
import { create } from "zustand";
import { StorageValue, persist } from "zustand/middleware";
import { TLanguage, TSessionActions, TSessionStore } from "./store.interface";
import { SECRET_KEY_LOCAL_STORAGE, TTheme } from "../global";
import { IUser } from "../hooks";

export const SessionStore = create(
  persist<TSessionStore & TSessionActions>(
    (set) => ({
      session: null,
      theme: "light",
      language: "es",
      setSession: (session: IUser | null) => {
        set({
          session,
        });
      },
      clearSession: () => set((state) => ({ ...state, session: null })),
      setTheme: (theme: TTheme) => {
        set({
          theme,
        });
      },
      clearTheme: () => set((state) => ({ ...state, theme: "light" })),
      setLanguage: (language: TLanguage) => {
        set({
          language,
        });
      },
      clearLanguage: () => set((state) => ({ ...state, language: "es" })),
    }),
    {
      name: "session",
      storage: {
        getItem: async (key: string) => {
          const encryptedData = localStorage.getItem(key);
          if (encryptedData) {
            const bytes = CryptoJS.AES.decrypt(
              encryptedData,
              SECRET_KEY_LOCAL_STORAGE
            );
            const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedData);
          }
          return null;
        },
        setItem: (
          key: string,
          value: StorageValue<TSessionStore & TSessionActions>
        ) => {
          const encryptedData = CryptoJS.AES.encrypt(
            JSON.stringify(value),
            SECRET_KEY_LOCAL_STORAGE
          ).toString();
          localStorage.setItem(key, encryptedData);
        },
        removeItem: (key: string) => {
          localStorage.removeItem(key);
        },
      },
    }
  )
);
