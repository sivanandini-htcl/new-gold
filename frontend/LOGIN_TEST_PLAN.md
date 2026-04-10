# Multi-Device Login - Test Plan

## Test Environment
- Frontend URL: `http://localhost:5174`
- Backend API: `http://localhost:3000`
- Environment: Development

## Test Cases

### TEST 1: Step 1 - Email Verification (First Time Device)
**Expected Behavior:**
- ✅ User enters email address
- ✅ Click NEXT button
- ✅ Device fingerprint data is collected (screen resolution, timezone, browser info)
- ✅ API call to `/auth/login/step1` is made with email and device info
- ✅ If new device: `otpRequired` = true, move to Step 2 (OTP)
- ✅ If known device: `otpRequired` = false, move to Step 2.5 (Password)

**Test Steps:**
1. Navigate to Login page
2. Enter email: `test@example.com`
3. Click "NEXT" button
4. Check browser console for device fingerprint info
5. Verify success toast notification

**Expected Output:**
- Status: 200
- Message: "Email/phone verified"
- Next Step: 2 or 2.5

---

### TEST 2: Step 2a - Send OTP 
**Expected Behavior:**
- ✅ "SEND OTP" button appears
- ✅ Click button to send OTP
- ✅ API call to `/auth/login/step2/send-otp` is made
- ✅ Toast notification: "OTP sent to your email/phone"
- ✅ OTP code logged to server console (dev mode)

**Test Steps:**
1. After Step 1 completes (otpRequired = true)
2. Click "SEND OTP" button
3. Check for success toast
4. Check server logs for OTP value
5. Check email/SMS for OTP code

**Expected Output:**
- Status: 200
- Message: "OTP sent to..."

---

### TEST 3: Step 2b - Verify OTP
**Expected Behavior:**
- ✅ User enters OTP (6 digits)
- ✅ Click "VERIFY OTP" button
- ✅ API call to `/auth/login/step2/verify-otp` is made
- ✅ On success: Move to Step 2.5 (Password)
- ✅ On failure: Error toast "Invalid OTP"
- ✅ OTP field is cleared after verification

**Test Steps:**
1. Enter OTP from email/SMS
2. Click "VERIFY OTP" button
3. Verify no errors and move to password step
4. Or enter wrong OTP and verify error message

**Expected Output:**
- Status: 200
- Data: New sessionId
- Message: "OTP verified successfully"

---

### TEST 4: Step 2.5 - Known Device Skip OTP
**Expected Behavior:**
- ✅ If fingerprint matches (known device): Skip OTP step
- ✅ Show password field directly
- ✅ Step indicator shows Step 2.5 (password entry)

**Test Steps:**
1. First login: Complete all steps
2. Logout: Clear sessionId and tokens
3. Login again with same device: Should skip OTP
4. Verify password field appears directly

**Expected Output:**
- Only password field visible
- Toast: "Proceeding to password verification"

---

### TEST 5: Step 3 - Password Verification & Device Session
**Expected Behavior:**
- ✅ User enters correct password
- ✅ Click "SIGN IN" button
- ✅ API call to `/auth/login/step3` with password and device info
- ✅ On success: Store accessToken, refreshToken, user data
- ✅ Redirect to `/dashboard`
- ✅ Update auth store with user data
- ✅ Store tokens in localStorage

**Test Steps:**
1. Enter password
2. Click "SIGN IN" button
3. Verify redirect to dashboard
4. Check browser DevTools → Application → localStorage
   - `accessToken` exists
   - `refreshToken` exists
   - `user` object exists
5. Verify auth store is updated

**Expected Output:**
- Status: 200
- Tokens issued
- User redirected to dashboard
- localStorage contains tokens

---

### TEST 6: Invalid Credentials
**Expected Behavior:**
- ✅ Wrong password: Error toast "Invalid credentials"
- ✅ Non-existent email: Error toast "Email not found"
- ✅ User remains on password step
- ✅ Can retry without going back

**Test Steps:**
1. Enter wrong password
2. Click "SIGN IN"
3. Verify error toast
4. Try again with correct password

**Expected Output:**
- Status: 401
- Message: "Invalid credentials" or similar

---

### TEST 7: Back Button Functionality
**Expected Behavior:**
- ✅ Back button appears on Step 2 and Step 2.5
- ✅ Click back: Return to Step 1
- ✅ Form fields reset (OTP, password cleared)
- ✅ sessionId cleared
- ✅ Can start new login attempt

**Test Steps:**
1. On Step 2: Click back arrow
2. Verify returned to Step 1
3. Verify form is clean
4. Try new email address

**Expected Output:**
- Back button works
- No errors on navigation

---

### TEST 8: Google Login
**Expected Behavior:**
- ✅ Google button available on Step 1
- ✅ Click: Firebase Google OAuth popup
- ✅ On success: API call to `/auth/firebase-login`
- ✅ Tokens returned
- ✅ Redirect to dashboard

**Test Steps:**
1. Click "Continue with Google"
2. Complete Google OAuth flow
3. Verify redirect to dashboard
4. Check localStorage for tokens

**Expected Output:**
- Successful authentication
- Tokens in localStorage
- Redirect to dashboard

---

### TEST 9: Device Fingerprinting
**Expected Behavior:**
- ✅ Automatically collects: screen resolution, timezone, browser, OS
- ✅ Fingerprint same on repeat logins → Skip OTP
- ✅ Fingerprint different (browser change, etc.) → Require OTP
- ✅ Device name format: "Chrome on Windows"

**Test Steps:**
1. Open browser console (F12 → Console)
2. Check for device fingerprint logs
3. Verify format:
   ```
   screenResolution: "1920x1080"
   timezone: "Asia/Kolkata"
   deviceType: "web"
   deviceName: "Chrome on Windows"
   ```

**Expected Output:**
- Device info correctly detected and sent

---

### TEST 10: Network & API Error Handling
**Expected Behavior:**
- ✅ Network error: Toast "Failed to verify..."
- ✅ Server error (5xx): Toast "Verification failed"
- ✅ No page crash
- ✅ Graceful error messages

**Test Steps:**
1. Disable network (DevTools → Network → Offline)
2. Try to login
3. Verify error toast
4. Re-enable network and retry

**Expected Output:**
- Appropriate error message
- No crashes

---

### TEST 11: Loading States
**Expected Behavior:**
- ✅ Buttons show loading state (text changes, disabled)
- ✅ Loading state cleared on success/error
- ✅ Buttons not clickable while loading

**Test Steps:**
1. During API call: Button shows "VERIFYING..." or "SIGNING IN..."
2. Button is disabled
3. After response: Button returns to normal

**Expected Output:**
- Visual feedback during loading

---

### TEST 12: Max 4 Devices Enforcement (Backend Test)
**Expected Behavior:**
- ✅ User can have max 4 devices
- ✅ 5th device login removes oldest device
- ✅ `GET /api/v1/devices` returns device list

**Test Steps:**
1. (POSTMAN) Call `/api/v1/devices` with accessToken
2. Verify device count ≤ 4
3. Login from 5th device (if applicable)
4. Verify oldest device removed

**Expected Output:**
- Device list returned
- Max 4 devices enforced

---

## Test Results Summary

| Test Case | Status | Notes |
|-----------|--------|-------|
| Step 1: Email Verification | ⏳ Pending | |
| Step 2a: Send OTP | ⏳ Pending | |
| Step 2b: Verify OTP | ⏳ Pending | |
| Step 2.5: Skip OTP (Known Device) | ⏳ Pending | |
| Step 3: Password & Device Session | ⏳ Pending | |
| Invalid Credentials | ⏳ Pending | |
| Back Button | ⏳ Pending | |
| Google Login | ⏳ Pending | |
| Device Fingerprinting | ⏳ Pending | |
| Error Handling | ⏳ Pending | |
| Loading States | ⏳ Pending | |
| Max 4 Devices | ⏳ Pending | |

---

## Debugging Tips

### Check Browser Console
```
F12 → Console → Look for:
- Device fingerprint info
- API errors
- Toast notifications
```

### Check localStorage
```
F12 → Application → localStorage → Look for:
- accessToken
- refreshToken
- user (JSON object)
```

### Check Network Tab
```
F12 → Network → Look for requests:
- POST /auth/login/step1
- POST /auth/login/step2/send-otp
- POST /auth/login/step2/verify-otp
- POST /auth/login/step3
```

### Check Backend Logs
Monitor the backend/server logs for:
- [Login Service] logs
- [Device Session] logs
- OTP generation (dev mode)
- Device fingerprint matching

---

## Manual Test Checklist

- [ ] Step 1: Email entry and verification
- [ ] Step 2: OTP flow (new device)
- [ ] Step 2.5: Password flow (known device)
- [ ] Step 3: Successful login
- [ ] Back button works
- [ ] Google login works
- [ ] Device fingerprint collected
- [ ] Tokens stored in localStorage
- [ ] Error messages display correctly
- [ ] Loading states work
- [ ] No console errors
- [ ] UI looks correct on mobile
- [ ] UI looks correct on desktop
