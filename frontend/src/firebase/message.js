import { getToken } from "firebase/messaging";
import { messaging } from "./firebaseClient";
import api from "../api/axiosInstance";

export const saveFCMTokenToBackend = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      console.log("Notification permission denied");
      return;
    }

    const token = await getToken(messaging, {
      vapidKey: "BILfmdK8jF4DbpKXdAW5_57R0TE0qFtrx9M7PvMKl4xWnI3fgAlQnTzUQTeoBcgaPb7TwetKFhavkDoo_yr0Zic",
    });

    if (!token) {
      console.log("No FCM token found");
      return;
    }

    console.log("FCM Token:", token);

    await api.post("/notifications/fcm-token", {
      token,
      deviceName: navigator.userAgent,
      deviceType: "web",
    });

    console.log("FCM token saved successfully");
  } catch (error) {
    console.error("FCM API Error:", error);
    console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);
  console.log("MESSAGE:", error.response?.data?.message);
  }
};
