import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      profileData: null,  // Add this
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

      // Add this new action
      setProfileData: (profileData) =>
        set({
          profileData: profileData,
        }),

      updateToken: (newAccessToken) =>
        set({
          accessToken: newAccessToken,
        }),

      logout: () =>
        set({
          user: null,
          profileData: null,  // Clear on logout
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (value) =>
        set({
          isLoading: value,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) state.isLoading = false;
      },
    }
  )
);

export default useAuthStore;