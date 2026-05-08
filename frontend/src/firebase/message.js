import { getToken } from 'firebase/messaging';
import { messaging } from './firebaseClient';
import api from '../api/axiosInstance';
import useAuthStore from '../store/authStore';

export const saveFCMTokenToBackend = async () => {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return;
    }

    const token = await getToken(messaging, {
      vapidKey:
        'BILfmdK8jF4DbpKXdAW5_57R0TE0qFtrx9M7PvMKl4xWnI3fgAlQnTzUQTeoBcgaPb7TwetKFhavkDoo_yr0Zic',
    });

    if (!token) {
      console.log('No FCM token found');
      return;
    }

    console.log('FCM Token:', token);
    console.log('My Token:', useAuthStore.getState());

    await api
      .post('/notifications/fcm-token', {
        token,
        deviceName: navigator.userAgent,
        deviceType: 'web',
      })
      .catch((err) => console.log('backend error on notifcations fcm token', err));
  } catch (error) {
    console.error('FCM API Error:', error);
    console.log('FULL ERROR:', error);
    console.log('RESPONSE:', error.response);
    console.log('DATA:', error.response?.data);
    console.log('MESSAGE:', error.response?.data?.message);
  }
};
