export const getDeviceFingerprint = () => {
  const screenResolution = `${window.screen.width}x${window.screen.height}`;
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userAgent = navigator.userAgent;
  const language = navigator.language;
  const deviceType = /mobile|android|iphone|ipad/i.test(userAgent) ? 'mobile' : 'web';

  return {
    screenResolution,
    timezone,
    userAgent,
    language,
    deviceType,
    deviceName: `${getBrowserName()} on ${getOSName()}`,
  };
};

const getBrowserName = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Safari')) return 'Safari';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Edge')) return 'Edge';
  return 'Browser';
};

const getOSName = () => {
  const ua = navigator.userAgent;
  if (ua.includes('Windows')) return 'Windows';
  if (ua.includes('Mac')) return 'MacBook';
  if (ua.includes('Android')) return 'Android';
  if (ua.includes('iPhone')) return 'iPhone';
  return 'Device';
};

export const saveDeviceFingerprint = (device) => {
  localStorage.setItem('deviceFingerprint', JSON.stringify(device));
};

export const loadDeviceFingerprint = () => {
  const raw = localStorage.getItem('deviceFingerprint');
  return raw ? JSON.parse(raw) : null;
};