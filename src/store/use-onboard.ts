import { create } from "zustand";
import { persist } from "zustand/middleware";

type OnboardState = {
  hasOnboarded: boolean;
  setHasOnboarded: (value: boolean) => void;
};

export const useOnboard = create<OnboardState>()(
  persist(
    (set) => ({
      hasOnboarded: false,
      setHasOnboarded: (value: boolean) => set({ hasOnboarded: value }),
    }),
    {
      name: "onboard-storage",
    },
  ),
);
