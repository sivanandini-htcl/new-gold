# KYC Integration Checklist

Complete this checklist to fully integrate the KYC system into your app.

---

## 📋 Pre-Integration Review

- [ ] Review `KYC_README.md` for overview
- [ ] Review `IMPLEMENTATION_GUIDE.md` for step-by-step
- [ ] Review `KYC_ARCHITECTURE.md` for architecture
- [ ] Review all created files
- [ ] Understand the KYC flow
- [ ] Check backend API is ready

---

## ✅ Step 1: Copy Files

- [ ] Create `src/api/kycapi.js` ← Copy from created file
- [ ] Update `src/pages/ProfileComponents/KycPage.jsx` ← Replace existing
- [ ] Create `src/hooks/useKYC.js` ← Copy from created file
- [ ] Create `src/pages/ProfileComponents/KYCStatusScreen.jsx` ← Copy
- [ ] Create `src/utils/kycUtils.js` ← Copy from created file
- [ ] Create `src/components/AppInitializer.jsx` ← Copy from created file

---

## ✅ Step 2: Update Router

Location: `src/App.jsx` or `src/router.js` or wherever routes are defined

```jsx
import KycPage from "./pages/ProfileComponents/KycPage";
import {
  KYCVerifiedScreen,
  KYCPendingScreen,
  KYCRejectedScreen,
} from "./pages/ProfileComponents/KYCStatusScreen";

// Add these routes
{
  path: "/kyc",
  element: <KycPage />,
},
{
  path: "/kyc-pending",
  element: <KYCPendingScreen />,
},
{
  path: "/kyc-rejected",
  element: <KYCRejectedScreen />,
},
{
  path: "/kyc-review",
  element: <KYCPendingScreen />,
},
```

Tasks:

- [ ] Added `/kyc` route
- [ ] Added `/kyc-pending` route
- [ ] Added `/kyc-rejected` route
- [ ] Added `/kyc-review` route
- [ ] Routes tested in browser

---

## ✅ Step 3: Wrap App with AppInitializer

Location: `src/main.jsx` or `src/App.jsx` - wherever your app is mounted

Before:

```jsx
<App />
```

After:

```jsx
import AppInitializer from './components/AppInitializer';

<Router>
  <AppInitializer>
    <App />
  </AppInitializer>
</Router>;
```

Tasks:

- [ ] Imported AppInitializer
- [ ] Wrapped Routes/App with AppInitializer
- [ ] App loads without errors
- [ ] No console errors in browser

---

## ✅ Step 4: Update Profile Component

Location: `src/pages/ProfileComponents/Profile.jsx` or similar

Add KYC Status Display:

```jsx
import { useNavigate } from 'react-router-dom';
import { useKYCStatus } from '../../hooks/useKYC';
import { KYCStatusBanner } from '../../hooks/useKYC';

function ProfilePage() {
  const navigate = useNavigate();
  const { kycStatus, loading, refresh } = useKYCStatus();

  return (
    <div>
      {/* Show KYC banner at top */}
      {kycStatus && !loading && <KYCStatusBanner status={kycStatus} onRefresh={refresh} />}

      {/* Add KYC action buttons */}
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
```

Tasks:

- [ ] Imported useKYCStatus hook
- [ ] Imported KYCStatusBanner component
- [ ] Added KYCStatusBanner to profile
- [ ] Added KYC action buttons
- [ ] Profile shows KYC status correctly

---

## ✅ Step 5: Protect Dashboard/Home

Location: `src/pages/Dashboard.jsx` or similar

Add Feature Gating:

```jsx
import { KYCStatusBanner } from '../hooks/useKYC';
import { useKYCStatus } from '../hooks/useKYC';

function Dashboard() {
  const { kycStatus, loading } = useKYCStatus();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {/* Show status banner */}
      {kycStatus && <KYCStatusBanner status={kycStatus} />}

      {/* Show limited features message if needed */}
      {kycStatus !== 'VERIFIED' && (
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
          <p className="text-yellow-800">Complete your KYC to unlock all features</p>
        </div>
      )}

      {/* Your dashboard content */}
    </div>
  );
}
```

Tasks:

- [ ] Added KYCStatusBanner to dashboard
- [ ] Added status check to dashboard
- [ ] Dashboard displays status correctly
- [ ] Dashboard shows appropriate message

---

## ✅ Step 6: Restrict Features

Location: Components with restricted features (e.g., `Metals.jsx`, `Orders.jsx`)

Use Feature Gate:

```jsx
import { KYCFeatureGate } from '../../hooks/useKYC';
import { useKYCStatus } from '../../hooks/useKYC';

function MetalsPage() {
  const { kycStatus } = useKYCStatus();

  return (
    <KYCFeatureGate feature="metals" status={kycStatus}>
      <div className="metals-content">{/* Your metals content */}</div>
    </KYCFeatureGate>
  );
}
```

For each restricted feature:

- [ ] Metals page wrapped with KYCFeatureGate
- [ ] Orders page wrapped with KYCFeatureGate
- [ ] Wallet page wrapped with KYCFeatureGate
- [ ] Features show restriction message when needed

---

## ✅ Step 7: Test KYC Form

Test with valid data:

Endpoint: http://localhost:5173/kyc (or your port)

Test Data:

- PAN: `ABCDE1234F` (uppercase)
- Name: `John Doe`
- DOB: `01/01/1990`
- Aadhaar: `123412341234` (12 digits)

Files to upload:

- Use small JPG/PNG images (<5MB each)
- Or use PDF documents

Tasks:

- [ ] Step 1 (PAN): Submit valid data
- [ ] Step 2 (Aadhaar): Submit valid data
- [ ] Step 3 (Selfie): Upload valid file
- [ ] Step 4 (Success): See confirmation screen
- [ ] Form redirects to profile after 3s

---

## ✅ Step 8: Test Validation

Test form validation:

Invalid PAN:

- [ ] "abcde1234f" (lowercase) - Shows error
- [ ] "ABCDE123" (too short) - Shows error
- [ ] "ABCDE12345" (too long) - Shows error

Invalid Aadhaar:

- [ ] "12341234123" (11 digits) - Shows error
- [ ] "1234123412345" (13 digits) - Shows error
- [ ] "abcd1234abcd" (letters) - Shows error

Invalid Files:

- [ ] File >5MB - Shows error message
- [ ] Wrong file type (.exe, .zip) - Shows error
- [ ] No file selected - Shows error

Tasks:

- [ ] All validations work correctly
- [ ] Error messages display clearly
- [ ] Form doesn't submit invalid data

---

## ✅ Step 9: Test Status Routing

Test user routing based on KYC status:

Case 1: NOT_SUBMITTED user

- [ ] Login
- [ ] Redirected to `/kyc`

Case 2: PENDING user

- [ ] Login
- [ ] Redirected to `/dashboard` (with banner)
- [ ] Limited features available

Case 3: VERIFIED user

- [ ] Login
- [ ] Redirected to `/dashboard`
- [ ] All features available

Case 4: REJECTED user

- [ ] Login
- [ ] Redirected to `/kyc-rejected`
- [ ] Can resubmit

Tasks:

- [ ] All routing scenarios work
- [ ] Correct status displayed
- [ ] Feature access is correct

---

## ✅ Step 10: Mobile Testing

Test on mobile devices/browser:

- [ ] KYC form displays correctly on mobile
- [ ] Form is fully usable on small screens
- [ ] File upload works on mobile
- [ ] Touch buttons are properly sized
- [ ] No console errors
- [ ] Layout responsive at 320px, 375px, 425px

---

## ✅ Step 11: Error Handling

Test error scenarios:

- [ ] Network error: Shows error message
- [ ] Invalid token: Redirects to login
- [ ] File upload fails: Shows error message
- [ ] API error: Shows user-friendly message
- [ ] Retry works after error

---

## ✅ Step 12: Browser Compatibility

Test on different browsers:

- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile Safari

---

## ✅ Step 13: Security Check

- [ ] No PAN/Aadhaar logged to console
- [ ] No sensitive data in localStorage (except status)
- [ ] HTTPS used in production
- [ ] JWT token properly managed
- [ ] Files validated on client and server

---

## ✅ Step 14: Performance

- [ ] Page load time acceptable (<3s)
- [ ] Form submission responsive (<2s)
- [ ] No memory leaks
- [ ] Images optimized
- [ ] Network requests efficient

Tasks:

- [ ] Lighthouse score >90
- [ ] No console warnings
- [ ] No broken images/assets

---

## ✅ Step 15: Documentation

- [ ] Update README with KYC info
- [ ] Document API endpoints used
- [ ] Add KYC guide to developer docs
- [ ] Comment code where needed
- [ ] Create troubleshooting guide

---

## 🎉 Final Checklist

- [ ] All files in place
- [ ] All routes working
- [ ] Form submitting successfully
- [ ] Status displaying correctly
- [ ] Features gated properly
- [ ] Mobile responsive
- [ ] Error handling working
- [ ] No console errors
- [ ] Documentation complete
- [ ] Ready for QA testing

---

## 🚀 Deployment

When everything is tested:

- [ ] Code reviewed
- [ ] Tests passing
- [ ] No console errors in production build
- [ ] Environment variables configured
- [ ] API endpoints correct
- [ ] Feature flags updated
- [ ] Monitoring/logging enabled
- [ ] Rollback plan prepared
- [ ] Deployed to staging
- [ ] Smoke tests passed
- [ ] Deployed to production

---

## 📞 Troubleshooting

### KYC form not submitting?

- [ ] Check network tab for API errors
- [ ] Verify JWT token is valid
- [ ] Check file sizes (<5MB)
- [ ] Check backend is running
- [ ] Check CORS headers

### Status not updating?

- [ ] Refresh page
- [ ] Click refresh button
- [ ] Check browser console for errors
- [ ] Check backend is returning status
- [ ] Clear localStorage and retry

### Features still accessible when locked?

- [ ] Check KYCFeatureGate is imported correctly
- [ ] Check `feature` prop matches status
- [ ] Check kycStatus is correct
- [ ] Check component is wrapped properly

### Mobile layout broken?

- [ ] Check tailwind responsive classes
- [ ] Test on actual mobile device
- [ ] Check viewport meta tag present
- [ ] Check image sizes responsive
- [ ] No fixed widths that break layout

---

## ✨ Success Criteria

When complete, you should have:

✅ Fully functional KYC form
✅ Real API integration
✅ Status-based routing
✅ Feature access control
✅ Error handling
✅ Mobile responsive
✅ Fully documented
✅ Tested thoroughly
✅ Ready for production

---

**Last Updated:** May 12, 2026

For questions, refer to the documentation files or contact the development team.
