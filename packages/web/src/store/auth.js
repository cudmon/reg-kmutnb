import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      name: null,
      role: null,
      token: null,

      update: ({ name, role, token }) =>
        set(() => ({
          name,
          role,
          token,
        })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
