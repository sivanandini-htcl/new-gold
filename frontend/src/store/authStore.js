import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      profileData: null,
      accessToken: null,
      refreshToken: null,
      isLoading: true,
      isAuthenticated: false,

      setAuth: (data) =>
        set({
          user: data.user,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          isAuthenticated: true,
          isLoading: false,
        }),

      setProfileData: (profileData) =>
        set({ profileData }),

      updateToken: (token) =>
        set({ accessToken: token }),

      logout: () =>
        set({
          user: null,
          profileData: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (value) =>
        set({ isLoading: value }),
    }),
    {
      name: "auth-storage",
    }
  )
);

export default useAuthStore;