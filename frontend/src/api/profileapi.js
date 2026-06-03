import api from "./axiosInstance";
import useAuthStore from "../store/authStore";  
export const fetchUserProfile = async () => {
  try {
    const response = await api.get("/auth/profile");
  // Adjust endpoint as needed
    if (response.data && response.data.success) {
   
         const profileData = response.data.data;
           console.log("Before set:", profileData);
         useAuthStore.getState().setProfileData(profileData);
         console.log( "After set:", useAuthStore.getState().profileData);
      return profileData; // Return profile data
    }
    
    throw new Error(response.data?.message || "Failed to fetch profile");
  } catch (error) {
    console.error("Profile fetch error:", error);
    throw error;
  }
};