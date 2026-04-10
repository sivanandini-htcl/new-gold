# Multi-Device Login Flow - Quick Reference Guide

## 🔄 Complete Login Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         LOGIN PAGE                              │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ STEP 1: Email/Mobile Verification                       │   │
│  │                                                         │   │
│  │ ┌──────────────────────────┐  ┌──────────┐             │   │
│  │ │ Email or Mobile Number   │  │  NEXT    │             │   │
│  │ └──────────────────────────┘  └──────────┘             │   │
│  │                   OR                                    │   │
│  │ ┌────────────────────────────────────────┐             │   │
│  │ │ Continue with Google                   │             │   │
│  │ └────────────────────────────────────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  Device Fingerprinting Collected:                               │
│  ✓ Screen Resolution (1920x1080)                                │
│  ✓ Timezone (Asia/Kolkata)                                      │
│  ✓ Browser (Chrome, Firefox, Safari, Edge)                      │
│  ✓ OS (Windows, Mac, Android, iPhone)                           │
│  ✓ Device Type (web, mobile, tablet)                            │
│                           ↓                                      │
│  API Call: POST /auth/login/step1                               │
│  {                                                              │
│    email: "user@example.com",                                   │
│    tenantId: "tenant_123",                                      │
│    screenResolution: "1920x1080",                               │
│    timezone: "Asia/Kolkata"                                     │
│  }                                                              │
│                           ↓                                      │
│              ┌────────────┴────────────┐                        │
│              ↓                         ↓                        │
│         NEW DEVICE                 KNOWN DEVICE                 │
│      (No fingerprint match)      (Fingerprint match)            │
│      otpRequired = true          otpRequired = false            │
│              ↓                         ↓                        │
└──────┬───────────────────────────────────────┬──────────────────┘
       │                                       │
       ↓                                       ↓
┌─────────────────────────┐         ┌────────────────────┐
│  STEP 2: OTP Required   │         │ STEP 2.5: Password │
│                         │         │                    │
│ ┌─ SEND OTP ──────┐    │         │ ┌────────────────┐  │
│ │ Sends OTP code  │    │         │ │ Enter Password │  │
│ │ to email/SMS    │    │         │ │ ┌────────────┐ │  │
│ └─────────────────┘    │         │ │ │ Password   │ │  │
│          ↓             │         │ │ └────────────┘ │  │
│ ┌─ VERIFY OTP ───┐    │         │ │ ┌────────────┐ │  │
│ │ ┌────────────┐ │    │         │ │ │ SIGN IN    │ │  │
│ │ │ OTP: ____  │ │    │         │ │ └────────────┘ │  │
│ │ └────────────┘ │    │         │ └────────────────┘  │
│ │ (6 digits)     │    │         └────────────────────┘
│ │ ┌────────────┐ │    │              ↓
│ │ │VERIFY OTP  │ │    │    ┌──────────────────┐
│ │ └────────────┘ │    │    │ STEP 3: Password │
│ └────────────────┘    │    │ Verification &   │
│          ↓             │    │ Device Session   │
│    ┌──────────┐        │    └──────────────────┘
│    ↓ VERIFIED ↓        │           ↓
└────┬─────────────────────┘  ┌──────────────────┐
     │                        │ API Call:        │
     └────────────┬───────────┤ /auth/login/step3│
                  │           │                  │
                  └───────→   │ POST with:       │
                              │ - sessionId      │
                              │ - password       │
                              │ - device info    │
                              └──────────────────┘
                                      ↓
                        ┌─────────────────────────┐
                        │ SUCCESS RESPONSE:       │
                        │ {                       │
                        │  accessToken: "jwt...",│
                        │  refreshToken: "jwt...",│
                        │  user: {                │
                        │    uid: "user_123",    │
                        │    email: "...",       │
                        │    role: "CUSTOMER"    │
                        │  },                     │
                        │  deviceSessionId: "..." │
                        │ }                       │
                        └─────────────────────────┘
                                      ↓
                        ┌─────────────────────────┐
                        │ STORE IN LOCALSTORAGE:  │
                        │ - accessToken           │
                        │ - refreshToken          │
                        │ - user (JSON)           │
                        └─────────────────────────┘
                                      ↓
                        ┌─────────────────────────┐
                        │ UPDATE AUTH STORE       │
                        │ + NAVIGATE TO           │
                        │ /DASHBOARD              │
                        └─────────────────────────┘
```

---

## API Endpoints Reference

### Endpoint 1: Email/Mobile Verification
```
POST /auth/login/step1

Request:
{
  "email": "user@example.com",
  "tenantId": "tenant_123",
  "screenResolution": "1920x1080",
  "timezone": "Asia/Kolkata"
}

Response (New Device):
{
  "success": true,
  "data": {
    "sessionId": "sess_abc123",
    "otpRequired": true,
    "nextStep": 2,
    "message": "Email verified. OTP required for new device."
  }
}

Response (Known Device):
{
  "success": true,
  "data": {
    "sessionId": "sess_def456",
    "otpRequired": false,
    "nextStep": 3,
    "message": "Email verified. Proceed to password."
  }
}
```

### Endpoint 2a: Send OTP
```
POST /auth/login/step2/send-otp

Request:
{
  "sessionId": "sess_abc123"
}

Response:
{
  "success": true,
  "data": {
    "message": "OTP sent to u***@example.com"
  }
}
```

### Endpoint 2b: Verify OTP
```
POST /auth/login/step2/verify-otp

Request:
{
  "sessionId": "sess_abc123",
  "otp": "123456"
}

Response:
{
  "success": true,
  "data": {
    "sessionId": "sess_abc123",
    "message": "OTP verified successfully",
    "nextStep": 3
  }
}
```

### Endpoint 3: Password & Device Session
```
POST /auth/login/step3

Request:
{
  "sessionId": "sess_abc123",
  "password": "user_password",
  "deviceName": "Chrome on Windows",
  "deviceType": "web",
  "screenResolution": "1920x1080",
  "timezone": "Asia/Kolkata"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "uid": "user_123",
      "email": "user@example.com",
      "role": "CUSTOMER",
      "tenantId": "tenant_123"
    },
    "deviceSessionId": "device_abc123",
    "expiresIn": 86400
  }
}
```

### Google OAuth
```
POST /auth/firebase-login

Request:
{
  "provider": "google",
  "credential": "jwt_from_firebase",
  "tenantId": "tenant_123"
}

Response:
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {...}
  }
}
```

---

## State Flow Diagram

```
INITIAL STATE:
step = 1
sessionId = null
otpRequired = false
identifier = ""
password = ""
otp = ""
deviceInfo = null

↓

USER ENTERS EMAIL → handleStep1Next()
↓
API: POST /auth/login/step1
↓
Response received
├─ If otpRequired = true:
│  └─ setStep(2)
│  └─ setSessionId(response.sessionId)
│  └─ setOtpRequired(true)
│
└─ If otpRequired = false:
   └─ setStep(2.5)
   └─ setSessionId(response.sessionId)
   └─ setOtpRequired(false)

↓

IF OTP REQUIRED (step = 2):
  USER CLICKS "SEND OTP" → handleSendOtp()
  ↓
  API: POST /auth/login/step2/send-otp
  ↓
  USER ENTERS OTP → handleVerifyOtp()
  ↓
  API: POST /auth/login/step2/verify-otp
  ↓
  Success → setStep(2.5)
  ↓

IF PASSWORD REQUIRED (step = 2.5):
  USER ENTERS PASSWORD → handlePasswordSubmit()
  ↓
  API: POST /auth/login/step3
  ↓
  Response received:
  ├─ setAccessToken(response.accessToken)
  ├─ setRefreshToken(response.refreshToken)
  ├─ localStorage.setItem("accessToken", ...)
  ├─ localStorage.setItem("refreshToken", ...)
  ├─ localStorage.setItem("user", ...)
  ├─ useAuthStore.setAuth(...)
  └─ navigate("/dashboard")

BACK BUTTON (step > 1):
  User clicks back → handleBack()
  ├─ setStep(1)
  ├─ setOtp("")
  ├─ setPassword("")
  ├─ setOtpRequired(false)
  └─ setSessionId(null)
```

---

## Component Props & State Summary

### Input Fields
```javascript
// Email/Mobile Input
<input
  type="text"
  placeholder="Email or Mobile Number"
  value={identifier}
  onChange={(e) => setIdentifier(e.target.value)}
/>

// OTP Input (6 digits only)
<input
  type="text"
  placeholder="Enter OTP (6 digits)"
  value={otp}
  onChange={(e) => setOtp(e.target.value.slice(0, 6))}
  maxLength="6"
/>

// Password Input
<input
  type="password"
  placeholder="Enter Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
```

### Conditional Rendering
```javascript
// Step 1: Email/Mobile
{step === 1 && (
  // Email input + Google button
)}

// Step 2: OTP (if required)
{step === 2 && otpRequired && (
  // Send OTP + Verify OTP
)}

// Step 2.5 or 2 (if OTP not required): Password
{(step === 2.5 || (step === 2 && !otpRequired)) && (
  // Password input + Sign in
)}

// Back button
{step > 1 && (
  // Back button
)}
```

---

## Device Fingerprinting Details

### What Gets Collected
```javascript
{
  screenResolution: "1920x1080",           // window.screen
  timezone: "Asia/Kolkata",                // Intl.DateTimeFormat
  userAgent: "Mozilla/5.0...",             // navigator.userAgent
  language: "en-US",                       // navigator.language
  deviceType: "web" | "mobile",            // Parsed from UA
  deviceName: "Chrome on Windows"          // Browser + OS
}
```

### Browser Detection
```javascript
Chrome, Safari, Firefox, Edge → Browser name
Windows, Mac, Android, iPhone → OS name
```

### Use Cases
```
SAME fingerprint + SAME IP
└─ Fully trusted → Skip OTP (known device)

SAME fingerprint + DIFFERENT IP
└─ Probably network switch → Skip OTP (trusted)

DIFFERENT fingerprint
└─ Unknown device → Require OTP (security)
```

---

## Token Structure (JWT)

### Access Token (Used for API Requests)
```
Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature

Header:   { alg: "HS256", typ: "JWT" }
Payload:  { uid, email, role, exp: 1 day }
Signature: HMAC SHA256(base64(header) + base64(payload), secret)
```

### Refresh Token (Used to Get New Access Token)
```
Format: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.payload.signature

Header:   { alg: "HS256", typ: "JWT" }
Payload:  { uid, deviceId, exp: 60 days }
Signature: HMAC SHA256(...)
```

---

## Error Handling

### Validation Errors (Client-Side)
```
Empty email → "Enter email or mobile number"
Empty password → Show password requirement
OTP < 6 digits → "Verify OTP" button disabled
```

### API Errors (Server-Side)
```
400 Bad Request → "Invalid input"
401 Unauthorized → "Invalid credentials" / "Invalid OTP"
404 Not Found → "User not found"
500 Server Error → "Verification failed"
Network Error → "Failed to verify..."
```

### Toast Notifications
```javascript
toast.error(message)      // Red error toast
toast.success(message)    // Green success toast
toast.info(message)       // Blue info toast
toast.warning(message)    // Yellow warning toast
```

---

## Testing Scenarios

### Scenario 1: New Device
```
1. Email → Step 1
2. Device fingerprint collected
3. otpRequired = true
4. → Step 2 (OTP)
5. Send OTP
6. Enter OTP
7. Verify OTP → Step 2.5
8. Enter Password
9. Sign In → Dashboard
```

### Scenario 2: Known Device
```
1. Email → Step 1
2. Device fingerprint matches
3. otpRequired = false
4. → Step 2.5 (Password directly)
5. Enter Password
6. Sign In → Dashboard
```

### Scenario 3: Google OAuth
```
1. Click Google button
2. Firefox auth popup
3. Google login
4. Token received
5. Backend exchange
6. → Dashboard
```

### Scenario 4: Error Handling
```
1. Enter wrong password
2. Show error toast
3. Can retry
4. Or go back to Step 1
```

---

## Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| "Verification failed" | Check backend is running on port 3000 |
| OTP not sent | Check server logs for email/SMS errors |
| Can't login | Verify correct credentials |
| Token not stored | Check localStorage permissions |
| Redirect fails | Verify /dashboard route exists |
| Google button doesn't work | Check Firebase configuration |
| "New device detected" every time | Check device fingerprinting logic |
| Buttons don't work | Check console for JS errors |
| Styles look wrong | Check Tailwind CSS loaded |

---

## Key Code Snippets

### Handle Step 1
```javascript
const handleStep1Next = async () => {
  const device = await getDeviceFingerprint();
  const response = await api.post("/auth/login/step1", {
    email: identifier,
    tenantId: import.meta.env.VITE_TENANT_ID,
    screenResolution: device.screenResolution,
    timezone: device.timezone,
  });
  
  if (response.data.success) {
    setSessionId(response.data.data.sessionId);
    setOtpRequired(response.data.data.otpRequired);
    setStep(response.data.data.otpRequired ? 2 : 2.5);
  }
}
```

### Handle Password Submit
```javascript
const handlePasswordSubmit = async () => {
  const response = await api.post("/auth/login/step3", {
    sessionId,
    password,
    deviceName,
    deviceType,
    screenResolution,
    timezone,
  });
  
  localStorage.setItem("accessToken", response.data.data.accessToken);
  localStorage.setItem("refreshToken", response.data.data.refreshToken);
  useAuthStore.getState().setAuth(response.data.data);
  navigate("/dashboard");
}
```

### Get Device Fingerprint
```javascript
const getDeviceFingerprint = async () => {
  return {
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    deviceType: /mobile|android|iphone/i.test(navigator.userAgent) ? "mobile" : "web",
    deviceName: `${getBrowserName()} on ${getOSName()}`,
  }
}
```

---

## Summary & Status

✅ **Frontend Implementation**: Complete
✅ **Device Fingerprinting**: Implemented
✅ **Multi-Step Flow**: Implemented
✅ **Error Handling**: Implemented
✅ **Token Management**: Implemented
✅ **UI Design**: Preserved

⏳ **Backend Integration**: Awaiting API endpoints
⏳ **Testing**: Ready to begin

---

**Dev Server**: http://localhost:5174 ✅ Running
**Last Updated**: April 10, 2026

