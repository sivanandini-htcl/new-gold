// import { app } from './firebaseClient';

// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
// importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// firebase.initializeApp({
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//   appId: "YOUR_APP_ID",
// });

// const messaging = firebase.messaging();

// messaging.onBackgroundMessage((payload) => {
//   console.log("Background Message:", payload);

//   self.registration.showNotification(
//     payload.notification?.title || "New Notification",
//     {
//       body: payload.notification?.body || "",
//       icon: "/icon.png",
//     }
//   );
// });

// const messaging = getMessaging(app);

// export const getFcmToken = async () => {
//   try {
//     const permission = await Notification.requestPermission();

//     if (permission !== 'granted') return null;

//     const token = await getToken(messaging, {
//       vapidKey: import.meta.env.VITE_FCM_KEY,
//     });

//     return token;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };
