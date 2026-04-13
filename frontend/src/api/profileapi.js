import api from "./axiosInstance";

export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile"); // Adjust endpoint as needed
    if (response.data && response.data.success) {
      return response.data.data; // Return profile data
    }
    throw new Error(response.data?.message || "Failed to fetch profile");
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};