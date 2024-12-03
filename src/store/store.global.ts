import { create } from "zustand";
import { TGlobalActions, TGlobalStore } from "./store.interface";

export const GlobalStore = create<TGlobalStore & TGlobalActions>((set) => ({
  isSession: false,
  setIsSession: (isSession: boolean) => {
    set({
      isSession,
    });
  },
}));
