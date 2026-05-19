# KYC Implementation Architecture

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React App                                │
│                    (App.jsx/Router)                             │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│              AppInitializer (New Wrapper)                       │
│  - Checks KYC status on app load                               │
│  - Routes users based on status                                │
│  - Shows loading state                                         │
└────────────────────────┬────────────────────────────────────────┘
                         │
        ┌────────────────┼────────────────┐
        ▼                ▼                ▼
   ┌─────────┐    ┌──────────────┐  ┌──────────┐
   │Routes   │    │Components    │  │Hooks     │
   │─────────│    │──────────────│  │──────────│
   │/kyc     │    │useKYCStatus()│  │useKYC()  │
   │/dash    │    │StatusBanner  │  │Refresh   │
   │/profile │    │FeatureGate   │  │          │
   └────┬────┘    └──────────────┘  └──────────┘
        │
        ▼
┌─────────────────────────────────────────────────────────────────┐
│                    KYC Pages                                    │
├─────────────────────────────────────────────────────────────────┤
│ • KycPage.jsx (4-step form)         Form & Validation          │
│ • KYCStatusScreen.jsx (Status UI)   Status Display             │
└────────────┬─────────────────────────────────────────────────┬──┘
             │                                                 │
             ▼                                                 ▼
    ┌──────────────────┐                        ┌──────────────────┐
    │  API Layer       │                        │  Utilities       │
    │  (kycapi.js)     │                        │  (kycUtils.js)   │
    ├──────────────────┤                        ├──────────────────┤
    │ • submitKYC()    │                        │ • KYCProtected   │
    │ • updateKYC()    │                        │ • KYCFeatureGate │
    │ • getStatus()    │                        │ • routeByStatus  │
    │ • validators     │                        │                  │
    │ • featureAccess  │                        │                  │
    └────────┬─────────┘                        └──────────────────┘
             │
             ▼
    ┌──────────────────┐
    │  Axios Instance  │
    │  (with JWT)      │
    └────────┬─────────┘
             │
             ▼
    ┌──────────────────┐
    │ Backend API      │
    │ /api/v1/kyc/*    │
    └──────────────────┘
```

---

## 📦 Module Dependencies

```
KycPage.jsx
├── imports: submitKYC, updateKYC, validators (from kycapi.js)
├── imports: useNavigate (from react-router-dom)
└── uses: useState, useEffect

useKYC.js
├── imports: checkKYCStatus (from kycapi.js)
├── exports: useKYCStatus hook
├── exports: KYCStatusBanner component
└── exports: FeatureAccessGuard component

kycapi.js
├── imports: api (axios instance)
├── exports: All KYC API functions
├── exports: validators object
└── exports: featureAccess mapping

kycUtils.js
├── imports: checkKYCStatus (from kycapi.js)
├── exports: KYCProtectedRoute component
├── exports: KYCFeatureGate component
└── exports: routing helpers

AppInitializer.jsx
├── imports: checkKYCStatus (from kycapi.js)
├── imports: useAuthStore (from store)
├── exports: AppInitializer wrapper
└── exports: useGlobalKYCStatus hook

KYCStatusScreen.jsx
├── imports: useNavigate (from react-router-dom)
├── exports: KYCVerifiedScreen
├── exports: KYCPendingScreen
├── exports: KYCRejectedScreen
└── exports: KYCNotSubmittedScreen
```

---

## 🔄 Data Flow

### 1. App Load Flow

```
User Opens App
    ↓
AppInitializer Mounts
    ↓
Check isAuthenticated
    ↓ (YES)
Call checkKYCStatus()
    ↓
Get Status from API
    ↓
Store in localStorage
    ↓
Route Based on Status
    ├→ VERIFIED: /dashboard
    ├→ PENDING: /kyc-pending
    ├→ REJECTED: /kyc-rejected
    └→ NOT_SUBMITTED: /kyc
```

### 2. KYC Submission Flow

```
User Fills Form (4 Steps)
    ↓
Validate Each Step
    ├→ Invalid: Show error
    └→ Valid: Continue
    ↓
Step 3 Complete → Click Submit
    ↓
Call submitKYC(formData)
    ↓
FormData Encoded (multipart/form-data)
    ↓
POST /api/v1/kyc/submit
    ↓
Server Response
    ├→ Success (201): Show success screen
    │  └→ Redirect to profile after 3s
    └→ Error: Show error message
```

### 3. Status Update Flow

```
User in App
    ↓
Call useKYCStatus()
    ↓
Hook Calls checkKYCStatus()
    ↓
GET /api/v1/kyc/status
    ↓
Response with status
    ├→ Cache in useState
    └→ Cache in localStorage
    ↓
Update UI Components
    ├→ StatusBanner shows current status
    └→ Features gated based on status
```

---

## 🎯 Component Hierarchy

```
App
├── AppInitializer
│   └── Routes
│       ├── Route(/kyc) → KycPage
│       │   ├── Step 1: PAN Form
│       │   ├── Step 2: Aadhaar Form
│       │   ├── Step 3: Video Form
│       │   └── Step 4: Success Screen
│       │
│       ├── Route(/dashboard) → Dashboard
│       │   ├── KYCStatusBanner (using useKYCStatus)
│       │   ├── FeatureAccessGuard (metals)
│       │   ├── FeatureAccessGuard (orders)
│       │   └── Content
│       │
│       ├── Route(/kyc-pending) → KYCPendingScreen
│       ├── Route(/kyc-rejected) → KYCRejectedScreen
│       └── Route(/profile) → ProfilePage
│           ├── KYCStatusBanner
│           └── KYC Action Button
```

---

## 🔐 Security Layers

```
┌────────────────────────────────────┐
│     Client Validation              │
│  - PAN format check                │
│  - Aadhaar length check            │
│  - File size/type check            │
│  - Required field validation       │
└────────────────────────────────────┘
           ↓ (valid data)
┌────────────────────────────────────┐
│     Request Preparation            │
│  - Append JWT token in header      │
│  - Encode as multipart/form-data   │
│  - Add content-type header         │
└────────────────────────────────────┘
           ↓ (valid request)
┌────────────────────────────────────┐
│     API Request                    │
│  - HTTPS only                      │
│  - JWT authentication              │
│  - POST to /api/v1/kyc/submit      │
└────────────────────────────────────┘
           ↓ (request sent)
┌────────────────────────────────────┐
│     Server Processing              │
│  - Server-side validation          │
│  - File virus scan                 │
│  - Data storage                    │
│  - Status update                   │
└────────────────────────────────────┘
           ↓ (response)
┌────────────────────────────────────┐
│     Response Handling              │
│  - Parse response                  │
│  - Check success flag              │
│  - Mask sensitive data             │
│  - Update local state              │
└────────────────────────────────────┘
```

---

## 🧩 State Management

```
localStorage
├── kycStatus: Current KYC status
└── auth-storage: Existing auth data

React State (useState)
├── KycPage
│   ├── step: Current form step
│   ├── formData: PAN, Aadhaar, files
│   ├── error: Error messages
│   ├── isSubmitting: Loading state
│   └── success: Success message
│
├── useKYCStatus Hook
│   ├── kycStatus: Fetched status
│   ├── loading: Fetch loading state
│   └── error: Fetch error
│
└── AppInitializer
    ├── initialized: Setup complete
    └── kycStatus: Initial status
```

---

## 📊 Feature Access Matrix

```
Status          │ Dashboard │ Wallet │ Metals │ Orders │ Profile │ KYC
────────────────┼───────────┼────────┼────────┼────────┼─────────┼─────
NOT_SUBMITTED   │     ✗     │   ✗    │   ✗    │   ✗    │    ✓    │  ✓
PENDING         │     ✓     │   ✓    │   ✗    │   ✗    │    ✓    │  ✓
UNDER_REVIEW    │     ✓     │   ✓    │   ✗    │   ✗    │    ✓    │  ✓
REJECTED        │     ✗     │   ✗    │   ✗    │   ✗    │    ✓    │  ✓
VERIFIED        │     ✓     │   ✓    │   ✓    │   ✓    │    ✓    │  ✓
```

---

## 🔄 API Call Sequence

```
1. App Load
   └─→ GET /auth/profile (existing)
   └─→ GET /kyc/status

2. KYC Form Submission
   └─→ POST /kyc/submit (multipart/form-data)

3. Check Status (refresh)
   └─→ GET /kyc/status

4. Get Full Details
   └─→ GET /kyc/details

5. Update After Rejection
   └─→ PUT /kyc/update (multipart/form-data)

6. Verify Documents
   └─→ POST /kyc/{kycId}/verify/pan
   └─→ POST /kyc/{kycId}/verify/aadhaar/init
   └─→ POST /kyc/{kycId}/verify/aadhaar/otp
```

---

## 📱 Responsive Breakpoints

```
Mobile (320px - 767px)
├── Single column layout
├── Full width forms
└── Touch-friendly buttons

Tablet (768px - 1023px)
├── Optimized spacing
├── Centered containers
└── Readable font sizes

Desktop (1024px+)
├── max-width: 500px for forms
├── Centered containers
└── Hover states
```

---

## 🚀 Deployment Checklist

- [ ] All files in correct directories
- [ ] Routes added to router
- [ ] AppInitializer wrapping app
- [ ] Environment variables set (.env)
- [ ] API base URL configured
- [ ] JWT token handling verified
- [ ] Error handling tested
- [ ] Mobile responsiveness checked
- [ ] Cross-browser compatibility
- [ ] Performance optimized
- [ ] Security review completed
- [ ] Documentation updated
