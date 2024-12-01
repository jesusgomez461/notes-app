import { create } from "zustand";
import { TGlobalActions, TGlobalStore } from "./store.interface";

export const GlobalStore = create<TGlobalStore & TGlobalActions>((set) => ({
  isSession: false,
  isValidatingCode: false,
  isSuccessValidationCode: false,
  codeValidationValue: null,
  setIsSession: (isSession: boolean) => {
    set({
      isSession,
    });
  },
  setIsValidatingCode: (isValidatingCode: boolean) => {
    set({
      isValidatingCode,
    });
  },
  setIsSuccessValidationCode: (isSuccessValidationCode: boolean) => {
    set({
      isSuccessValidationCode,
    });
  },
  setCodeValidationValue: (codeValidationValue: string | null) => {
    set({
      codeValidationValue,
    });
  },
}));
