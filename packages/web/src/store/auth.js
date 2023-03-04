import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuth = create(
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
      name: "auth",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
