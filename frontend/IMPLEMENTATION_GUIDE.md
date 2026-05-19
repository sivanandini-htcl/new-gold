# KYC Frontend Integration Implementation Guide

## 📁 Files Created

1. **`src/api/kycapi.js`** - All KYC API endpoints and validators
2. **`src/pages/ProfileComponents/KycPage.jsx`** - Main KYC submission form (4-step)
3. **`src/hooks/useKYC.js`** - KYC status hook and UI components
4. **`src/pages/ProfileComponents/KYCStatusScreen.jsx`** - Status-specific screens
5. **`src/utils/kycUtils.js`** - KYC routing and protection utilities

---

## 🚀 Integration Steps

### Step 1: Add Routes to Your Router

Update your main router file (e.g., `App.jsx` or `router.js`):

```jsx
import KycPage from './pages/ProfileComponents/KycPage';
import {
  KYCVerifiedScreen,
  KYCPendingScreen,
  KYCRejectedScreen,
} from './pages/ProfileComponents/KYCStatusScreen';

// Add these routes to your router
const routes = [
  // ... existing routes

  // KYC Routes
  {
    path: '/kyc',
    element: <KycPage />,
  },
  {
    path: '/kyc-pending',
    element: <KYCPendingScreen />,
  },
  {
    path: '/kyc-rejected',
    element: <KYCRejectedScreen />,
  },
  {
    path: '/kyc-review',
    element: <KYCPendingScreen />, // Same as pending
  },
];
```

### Step 2: Check KYC Status on App Load

Add KYC status check in your main App component or a wrapper component:

```jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { checkKYCStatus } from "./api/kycapi";
import useAuthStore from "./store/authStore";

function App() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      checkKYCStatusAndRoute();
    }
  }, [isAuthenticated]);

  const checkKYCStatusAndRoute = async () => {
    try {
      const response = await checkKYCStatus("CUSTOMER");
      const status = response.data.status;

      // Route based on status
      if (window.location.pathname === "/" || window.location.pathname === "/dashboard") {
        if (status === "VERIFIED") {
          navigate("/dashboard");
        } else if (status === "NOT_SUBMITTED") {
          navigate("/kyc");
        } else if (status === "PENDING" || status === "UNDER_REVIEW") {
          navigate("/kyc-pending");
        } else if (status === "REJECTED") {
          navigate("/kyc-rejected");
        }
      }
    } catch (error) {
      console.error("KYC status check failed:", error);
    }
  };

  return (
    // Your app components
  );
}
```

### Step 3: Update Profile Component to Show KYC Status

In your Profile component, add KYC status display:

```jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useKYCStatus } from '../hooks/useKYC';
import { KYCStatusBanner } from '../hooks/useKYC';

function ProfilePage() {
  const navigate = useNavigate();
  const { kycStatus, loading, refresh } = useKYCStatus();

  return (
    <div className="profile-container">
      {/* Show KYC Status Banner */}
      {kycStatus && <KYCStatusBanner status={kycStatus} onRefresh={refresh} />}

      {/* KYC Action Button */}
      {kycStatus === 'NOT_SUBMITTED' && (
        <button
          onClick={() => navigate('/kyc')}
          className="w-full bg-accent text-black py-3 rounded-lg font-semibold mb-4"
        >
          Complete KYC Verification
        </button>
      )}

      {kycStatus === 'REJECTED' && (
        <button
          onClick={() => navigate('/kyc')}
          className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold mb-4"
        >
          Resubmit KYC
        </button>
      )}

      {/* Rest of profile content */}
    </div>
  );
}

export default ProfilePage;
```

### Step 4: Protect Features Based on KYC Status

Use the KYCFeatureGate in components where features need KYC verification:

```jsx
import { KYCFeatureGate } from './utils/kycUtils';
import { useKYCStatus } from './hooks/useKYC';

function MetalsPage() {
  const { kycStatus } = useKYCStatus();

  return (
    <KYCFeatureGate feature="metals" kycStatus={kycStatus}>
      <div className="metals-content">{/* Your metals trading UI */}</div>
    </KYCFeatureGate>
  );
}
```

### Step 5: Use KYC Status Hook in Components

```jsx
import { useKYCStatus } from './hooks/useKYC';

function Dashboard() {
  const { kycStatus, loading, error, refresh } = useKYCStatus();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Your KYC Status: {kycStatus}</p>
      <button onClick={refresh}>Refresh Status</button>

      {kycStatus === 'VERIFIED' && <p className="text-green-600">✓ Full access enabled</p>}
      {kycStatus === 'PENDING' && <p className="text-blue-600">⏳ Awaiting verification</p>}
      {kycStatus === 'REJECTED' && <p className="text-red-600">✕ Resubmit required</p>}
    </div>
  );
}
```

---

## 📊 KYC Status Flow

```
User Opens App
    ↓
Check Authentication
    ↓
Fetch KYC Status (GET /kyc/status)
    ↓
    ├─ VERIFIED → Dashboard with full access
    ├─ PENDING → Limited access + "Under Review" message
    ├─ UNDER_REVIEW → Limited access + "Being Reviewed" message
    ├─ REJECTED → Rejection notice + Resubmit option
    └─ NOT_SUBMITTED → KYC form (4 steps)
```

---

## 🔧 API Integration

All API functions are in `src/api/kycapi.js`:

### Submit KYC

```javascript
import { submitKYC } from './api/kycapi';

const formData = {
  panNumber: 'ABCDE1234F',
  panName: 'John Doe',
  panDob: '1990-01-01',
  panFile: File,
  aadhaarNumber: '123412341234',
  aadhaarFileFront: File,
  aadhaarFileBack: File,
  videoFile: File,
};

try {
  const response = await submitKYC(formData);
  console.log('KYC submitted:', response);
} catch (error) {
  console.error('Submission failed:', error);
}
```

### Check KYC Status

```javascript
import { checkKYCStatus } from './api/kycapi';

const response = await checkKYCStatus('CUSTOMER');
// Returns: { status, submittedAt, documents, etc. }
```

### Update KYC (if Rejected)

```javascript
import { updateKYC } from './api/kycapi';

const response = await updateKYC(updatedFormData);
```

### Get KYC Details

```javascript
import { getKYCDetails } from './api/kycapi';

const response = await getKYCDetails('CUSTOMER');
// Returns full KYC details with masked sensitive data
```

---

## ✅ Validation

File validation is built in:

```javascript
import { validators } from './api/kycapi';

// Validate PAN
validators.validatePAN('ABCDE1234F'); // true

// Validate Aadhaar
validators.validateAadhaar('123412341234'); // true

// Validate File
validators.validateFile(fileObject); // true/false

// Validate Multiple Files
validators.validateFiles([file1, file2]); // { valid: true/false, error: "" }
```

---

## 🎨 UI Components

### KYC Status Banner

```jsx
import { KYCStatusBanner } from './hooks/useKYC';

<KYCStatusBanner status="PENDING" onRefresh={handleRefresh} />;
```

Displays different banners based on status:

- **VERIFIED**: Green banner with full access message
- **PENDING**: Blue banner with "under review" message
- **REJECTED**: Red banner with rejection notice
- **NOT_SUBMITTED**: Orange banner with call-to-action

### Feature Access Guard

```jsx
import { KYCStatusBanner, FeatureAccessGuard } from './hooks/useKYC';

<FeatureAccessGuard feature="metals" status={kycStatus}>
  <MetalsSection />
</FeatureAccessGuard>;
```

Blocks access to features based on KYC status and shows restriction message.

---

## 🛡️ Error Handling

All API functions include error handling. Catch errors like this:

```javascript
try {
  const response = await submitKYC(formData);
} catch (error) {
  // error.message contains error message
  // error.statusCode contains HTTP status code
  // error.errorType contains error type (e.g., "VALIDATION_ERROR")

  if (error.statusCode === 400) {
    // Validation error - show user-friendly message
  } else if (error.statusCode === 401) {
    // Unauthorized - redirect to login
  } else if (error.statusCode === 500) {
    // Server error
  }
}
```

---

## 📱 Responsive Design

All KYC components are fully responsive:

- Mobile-first approach
- Works on screens as small as 320px
- Optimized for tablets and desktops

---

## 🔐 Security Features

1. **Token Management**: Automatically includes JWT in all requests
2. **HTTPS Only**: All API calls are over HTTPS
3. **File Validation**: Server-side and client-side validation
4. **Data Masking**: Sensitive data (PAN, Aadhaar) are masked in responses
5. **Secure Upload**: Files are uploaded via multipart/form-data

---

## 🧪 Testing Checklist

- [ ] Test all 4 steps of KYC form with valid data
- [ ] Test validation errors (invalid PAN, Aadhaar, etc.)
- [ ] Test file upload errors (too large, wrong format)
- [ ] Test successful submission
- [ ] Test KYC status retrieval
- [ ] Test feature access restrictions
- [ ] Test rejection and resubmission flow
- [ ] Test on mobile devices
- [ ] Test error handling with network issues
- [ ] Test with different browsers

---

## 📞 Support

For API issues or questions, refer to the main KYC_FRONTEND_INTEGRATION_GUIDE.md file.
