# API_DOCUMENTATION.md

# DigiGold API Documentation

## Project Overview

This documentation is derived from the frontend codebase in `frontend/src/`. It documents all backend API endpoints, request/response shapes, authentication flow, third-party integrations, and inferred data contracts as used by the frontend.

> Important: No backend source code was present in the workspace. This documentation is therefore inferred from frontend API calls, stores, and components. Exact backend validation, schema, and response details may require confirmation from the backend implementation.

## Base URL

- Configured from frontend environment:
  - `VITE_API_BASE_URL`
- Axios instance:
  - `frontend/src/api/axiosInstance.js`
  - `withCredentials: true`

## Environment Variables

- `VITE_API_BASE_URL`
- `VITE_TENANT_ID`
- `VITE_RAZORPAY_KEY_ID`

## Authentication

### Supported Flows

- Registration flow:
  - `POST /auth/register/step1`
  - `POST /auth/register/step2`
  - `POST /auth/register/verify-otp`
  - `POST /auth/register/step3`
- Login flow:
  - `POST /auth/login/step1`
  - `POST /auth/login/step2/send-otp`
  - `POST /auth/login/step2/verify-otp`
  - `POST /auth/login/step3`
- Firebase/social login:
  - `POST /auth/firebase-login`
- Token refresh:
  - `POST /auth/refresh-token`
- Logout:
  - `POST /auth/logout`

### Token Handling

- Access token stored in client state and sent in:
  - `Authorization: Bearer <accessToken>`
- Refresh token used for:
  - `POST /auth/refresh-token`
- Backend is expected to support session/state token refresh.
- Axios interceptor retries original request once after refresh.

## Global Headers

- Authorization: `Bearer <accessToken>`
- Content-Type: `application/json` by default
- `idempotency-key` is used on:
  - `POST /orders/checkout`
- `withCredentials: true` is enabled by the Axios instance
- Multipart requests rely on browser-managed:
  - `Content-Type: multipart/form-data`

## API Modules

- Auth
- Profile
- Security / MPIN
- KYC
- Wallet
- Cart
- Orders
- Holdings
- Delivery addresses
- Products
- Analytics
- Live metal prices (SSE)
- External nominee endpoint

---

# Complete Endpoint Documentation

## Auth Module

### POST /auth/register/step1

- Description: Start registration by submitting name and tenant.
- Auth: No
- Body:
  - `firstName` string, required
  - `lastName` string, required
  - `tenantId` string, required
- Success Example:

```json
{
  "success": true,
  "data": {
    "sessionId": "session-id"
  }
}
```

### POST /auth/register/step2

- Description: Submit email/phone for OTP.
- Auth: No
- Body:
  - `registrationSessionId` string, required
  - `contactType` string, required, values: `email` or `phone`
  - `contactValue` string, required
  - `tenantId` string, required

### POST /auth/register/verify-otp

- Description: Verify registration OTP.
- Auth: No
- Body:
  - `registrationSessionId` string, required
  - `otp` string, required
  - `tenantId` string, required

### POST /auth/register/step3

- Description: Complete registration with password.
- Auth: No
- Body:
  - `registrationSessionId` string, required
  - `tenantId` string, required
  - `password` string, required
- Client-side password rules:
  - Minimum 8 characters
  - At least one uppercase, lowercase, number, special character

### POST /auth/login/step1

- Description: Start login by identifier.
- Auth: No
- Body:
  - `tenantId` string, required
  - `screenResolution` string, required
  - `timezone` string, required
  - `phoneNumber` string, optional
  - `email` string, optional
- Response:

```json
{
  "success": true,
  "data": {
    "sessionId": "session-id",
    "otpRequired": true
  }
}
```

### POST /auth/login/step2/send-otp

- Description: Send OTP for login.
- Auth: No
- Body:
  - `sessionId` string, required

### POST /auth/login/step2/verify-otp

- Description: Verify login OTP.
- Auth: No
- Body:
  - `sessionId` string, required
  - `otp` string, required

### POST /auth/login/step3

- Description: Final login; returns access token and refresh token.
- Auth: No
- Body:
  - `sessionId` string, required
  - `password` string, required
  - `deviceName` string, required
  - `deviceType` string, required
  - `screenResolution` string, required
  - `timezone` string, required
- Success Response:

```json
{
  "success": true,
  "data": {
    "accessToken": "...",
    "refreshToken": "...",
    "user": {}
  }
}
```

### POST /auth/firebase-login

- Description: Login using Firebase credential token.
- Auth: No
- Body:
  - `provider` string, required
  - `credential` string, required
  - `tenantId` string, required
- Response: returns `data.data` with tokens and user details.

### POST /auth/logout

- Description: Logout current session.
- Auth: Yes
- Body:
  - `refreshToken` string, required

### POST /auth/refresh-token

- Description: Refresh access token.
- Auth: No (refresh token required)
- Body:
  - `refreshToken` string, required
- Response:

```json
{
  "accessToken": "new-token"
}
```

### GET /auth/profile

- Description: Fetch authenticated user profile.
- Auth: Yes
- Response:

```json
{
  "success": true,
  "data": {...}
}
```

---

## Security / MPIN Module

### GET /security/mpin/status

- Description: Get MPIN setup status.
- Auth: Yes

### POST /security/mpin/setup

- Description: Setup MPIN for the user.
- Auth: Yes
- Body:
  - `mpin` string, required
  - `confirmMpin` string, required
  - `idempotencyKey` string, required
  - `entityType` string, required (`CUSTOMER`)
- Client validation:
  - 6 digits
  - numeric only
  - rejects weak patterns such as repeating digits or sequential values

---

## KYC Module

### GET /kyc/status

- Description: Get KYC status.
- Auth: Yes
- Query:
  - `entityType` string, optional (default `CUSTOMER`)

### GET /kyc/details

- Description: Fetch KYC details.
- Auth: Yes
- Query:
  - `entityType` string, optional

### POST /kyc/verify/pan/otp/send

- Description: Send PAN OTP.
- Auth: Yes
- Body:
  - `panNumber` string, required (uppercased by client)

### POST /kyc/verify/pan/otp/verify

- Description: Verify PAN OTP.
- Auth: Yes
- Body:
  - `sessionId` string, required
  - `otp` string, required

### POST /kyc/verify/aadhaar/init

- Description: Start Aadhaar OTP flow.
- Auth: Yes
- Body:
  - `aadhaar` string, required

### POST /kyc/verify/aadhaar/otp

- Description: Verify Aadhaar OTP.
- Auth: Yes
- Body:
  - `sessionId` string, required
  - `otp` string, required

### POST /kyc/submit

- Description: Submit KYC data and optionally files.
- Auth: Yes
- Body (JSON or multipart):
  - `entityType` string, required
  - `panVerificationSessionId` string, optional
  - `aadhaarVerificationSessionId` string, optional
  - `pan` string, optional
  - `documentCategory` string, optional
  - `documents` file[] if uploading files
- File validation:
  - Allowed types: `image/jpeg`, `image/png`, `application/pdf`
  - Max file size per file: 5MB
  - Max files: 10

### GET /kyc/session/resume

- Description: Resume KYC session.
- Auth: Yes

### PUT /kyc/update

- Description: Update KYC documents and identity fields.
- Auth: Yes
- Body (FormData):
  - `entityType` = `CUSTOMER`
  - `pan` string, optional
  - `aadhaar` string, optional
  - `documentCategory` = `identity`
  - `documents` files: `panFile`, `aadhaarFileFront`, `aadhaarFileBack`

### DELETE /kyc

- Description: Delete KYC.
- Auth: Yes
- Query:
  - `entityType` string (`CUSTOMER`)

---

## Wallet Module

### POST /wallet/balance

- Description: Get wallet balance.
- Auth: Yes
- Note: Request method is `POST` in frontend.
- Response expected:

```json
{
  "success": true,
  "data": {
    "balance": 1234.56
  }
}
```

### POST /wallet/withdrawals/request

- Description: Request withdrawal from wallet.
- Auth: Yes
- Body:
  - `amount` number, required
  - `accountId` string, required
  - `mpin` string, required
  - `deviceFingerprint` string/object, required
  - `idempotencyKey` string, required

### POST /wallet/accounts/add

- Description: Add bank account.
- Auth: Yes
- Body:
  - `accountHolderName` string, required
  - `accountNumber` string, required
  - `confirmAccountNumber` string, required
  - `ifscCode` string, required
  - `bankName` string, required
  - `isDefault` boolean, optional

### GET /wallet/accounts

- Description: Fetch linked bank accounts.
- Auth: Yes
- Response shape:

```json
{
  "success": true,
  "data": {
    "accounts": [
      {
        "id": "...",
        "bankName": "...",
        "accountNumber": "..."
      }
    ]
  }
}
```

### POST /wallet/accounts/{accountId}/verify

- Description: Verify linked bank account.
- Auth: Yes

### DELETE /wallet/accounts/{accountId}

- Description: Remove bank account.
- Auth: Yes

---

## Cart Module

### GET /cart

- Description: Fetch current cart.
- Auth: Yes
- Response inferred:

```json
{
  "success": true,
  "data": {
    "cart": {
      "items": []
    }
  }
}
```

### POST /cart/add

- Description: Add item to cart.
- Auth: Yes
- Body:
  - `type` string, required: `METAL` or `PRODUCT`
  - `productId` string, required for product items
  - `quantity` number, required
  - For metal items, client likely passes additional fields like:
    - `metalType`
    - `unitPrice`
    - `quantityInGrams`

### DELETE /cart/items/{itemId}

- Description: Delete a cart item.
- Auth: Yes
- Body (optional):
  - `reason` string

### PATCH /cart/items/{itemId}

- Description: Update cart item quantity.
- Auth: Yes
- Body:
  - `quantity` number

### DELETE /cart

- Description: Clear entire cart.
- Auth: Yes

### POST /cart/checkout/prepare

- Description: Prepare checkout session.
- Auth: Yes
- Body:
  - `mode` string, values: `WALLET` or `DELIVERY`
- Response expected:

```json
{
  "success": true,
  "data": {
    "cartId": "...",
    "checkoutSessionId": "..."
  }
}
```

---

## Orders Module

### POST /orders/checkout

- Description: Create checkout/order with payment provider.
- Auth: Yes
- Headers:
  - `idempotency-key` string
- Body:
  - `cartId` string, required
  - `mode` string, required: `WALLET` or `DELIVERY`
  - `paymentProvider` string, required: `RAZORPAY`
  - `checkoutSessionId` string, required
  - `addressId` string, conditional if delivery
  - `deliveryAddressId` string, conditional if delivery
- Response includes:
  - `razorpayOrderId`
  - `orderNumber`
  - `id`

### POST /orders/buy/verify-payment

- Description: Verify Razorpay payment.
- Auth: Yes
- Body:
  - `orderId` string, required
  - `razorpayOrderId` string, required
  - `razorpayPaymentId` string, required
  - `razorpaySignature` string, required

### POST /orders/sell

- Description: Create a sell order.
- Auth: Yes
- Body: payload depends on sell UI and is forwarded from the frontend.

### GET /orders/sell/history

- Description: Fetch sell order history.
- Auth: Yes

### GET /orders/sell/{orderId}

- Description: Get single sell order details.
- Auth: Yes

### GET /orders

- Description: Fetch order list.
- Auth: Yes

### GET /orders/{orderId}

- Description: Fetch order details.
- Auth: Yes

### GET /orders/{orderId}/status

- Description: Fetch a single order status.
- Auth: Yes

---

## Holdings Module

### POST /holdings

- Description: Fetch holdings wallet data.
- Auth: Yes

### GET /holdings/summary

- Description: Fetch holdings summary.
- Auth: Yes

### POST /holdings/ledger

- Description: Fetch holdings ledger/transaction history.
- Auth: Yes

---

## Delivery Address Module

### GET /delivery/addresses

- Description: List saved delivery addresses.
- Auth: Yes
- Response:

```json
{
  "success": true,
  "data": {
    "addresses": []
  }
}
```

### POST /delivery/addresses

- Description: Add new delivery address.
- Auth: Yes
- Body:
  - `label` string
  - `fullName` string
  - `phoneNumber` string
  - `addressLine1` string
  - `addressLine2` string
  - `city` string
  - `state` string
  - `pincode` string
  - `isDefault` boolean

### PATCH /delivery/addresses/{addressId}

- Description: Update address.
- Auth: Yes
- Body: same address fields optional

### PATCH /delivery/addresses/{addressId}/default

- Description: Mark address as default.
- Auth: Yes

### DELETE /delivery/addresses/{addressId}

- Description: Delete an address.
- Auth: Yes

---

## Product Module

### GET /products/public

- Description: Fetch list of public products.
- Auth: Not explicitly required
- Response expected:

```json
{
  "success": true,
  "data": {
    "products": []
  }
}
```

### GET /products/public/{id}

- Description: Fetch product detail by id.
- Auth: Not explicitly required

---

## Analytics Module

### GET /analytics/customer/portfolio/overview

### GET /analytics/customer/metals/performance

### GET /analytics/customer/monthly-trends

### GET /analytics/customer/allocation

### GET /analytics/customer/investment-metrics

### GET /analytics/customer/metal-rankings

### GET /analytics/customer/ai-insights

- Description: Analytics endpoints for customer dashboard.
- Auth: Yes
- Response: `res.data.data`

---

## Live Metal Prices (SSE)

### Server-Sent Events

- URL: `https://api.dgi.gold/api/v1/metals/subscribe-live`
- Mechanism: `EventSource`
- Events:
  - default `message`
  - `price-update`
- Payload: JSON object

---

## External Nominee Endpoint

### POST http://localhost:5000/api/nominee

### PUT http://localhost:5000/api/nominee/{nomineeId}

- Description: Managed by secondary host.
- Body fields:
  - `nomineeName`
  - `nomineePhone`
  - `address`
  - `relation`
  - `DOB`
  - `panNumber`
  - `gender`
- Auth: Unknown

---

# Request/Response Examples

### Example login step3 request

```json
POST /auth/login/step3
{
  "sessionId": "abc-123",
  "password": "SecretP@ss1!",
  "deviceName": "Chrome on Windows",
  "deviceType": "web",
  "screenResolution": "1920x1080",
  "timezone": "Asia/Kolkata"
}
```

### Example checkout request

```json
POST /orders/checkout
Headers:
  idempotency-key: 123e4567-e89b-12d3-a456-426614174000

Body:
{
  "cartId": "cart-123",
  "mode": "DELIVERY",
  "paymentProvider": "RAZORPAY",
  "checkoutSessionId": "session-456",
  "addressId": "addr-789",
  "deliveryAddressId": "addr-789"
}
```

### Example Razorpay verify-payment request

```json
POST /orders/buy/verify-payment
{
  "orderId": "backend-order-id",
  "razorpayOrderId": "rzp_order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature"
}
```

### Example KYC multipart request

Fields:

- `entityType`: CUSTOMER
- `pan`: `ABCDE1234F`
- `documentCategory`: identity
- `documents`: files (`panFile`, `aadhaarFileFront`, `aadhaarFileBack`)

---

# Error Handling

Inferred error shapes:

- Validation error:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "field": "reason"
  }
}
```

- Auth error: 401 unauthorized / token expired
- Permission error: 403 forbidden
- Server error: 500
- Client code also checks:
  - `error.response?.data?.message`
  - `error.response?.data?.errors`
  - `error.response?.status`

---

# Database Structure (Inferred)

No backend schema files are present. Inferred entities:

- User
- KYC session + documents
- Cart and CartItem
- Order and OrderStatus
- Wallet/holdings
- BankAccount
- DeliveryAddress
- Product
- Analytics dataset

Relationships:

- User → Cart
- User → Orders
- User → Wallet
- User → KYC
- User → BankAccounts
- User → DeliveryAddresses
- CartItem references product or metal items

---

# File Upload System

- Used by KYC:
  - `/kyc/submit`
  - `/kyc/update`
- Allowed upload types:
  - `image/jpeg`
  - `image/png`
  - `application/pdf`
- Max file size: 5 MB per file
- Max files per request: 10

---

# WebSocket / Real-time

- No WebSocket/socket.io found.
- SSE is used for live metal prices.

---

# Webhooks

- None detected in scanned frontend code.

---

# Third Party Integrations

- Razorpay
  - Used for payment order creation and verification.
  - `POST /orders/checkout` returns `razorpayOrderId`
- Firebase Auth
  - Used for social login and FCM device tokens.
  - Endpoint: `POST /auth/firebase-login`
- SSE pricing endpoint:
  - External `https://api.dgi.gold/api/v1/metals/subscribe-live`

---

# Pagination Standards

- No explicit pagination query parameters were found in frontend code.
- Some list endpoints may return full arrays.
- Order/analytics lists appear to use default backend pagination if any.

---

# Security Notes

- Axios interceptor refresh check is sensitive to backend error format:
  - It checks `error.response?.message === "Token expired"`
  - Real backend may return `error.response.data.message`
- `withCredentials: true` suggests cookie-based state or secure refresh handling.
- MPIN and password flows require TLS.
- Idempotency keys are used only for checkout and withdrawal operations.

---

# Implementation Notes for Frontend Developers

- `Authorization` header is automatically attached if access token exists.
- `api` instance uses `baseURL` from environment.
- KYC file uploads must use FormData.
- `POST /cart/add` supports both product and metal item payloads.
- `POST /wallet/balance` is called as POST, not GET.
- `POST /holdings` is called as POST for holdings data, while summary is GET.

---

# Important Edge Cases

- `refresh-token` logic may fail if backend returns expired token message in a nested field.
- Some endpoints are consumed using different HTTP verbs than standard expectation (`POST /wallet/balance`, `POST /holdings`).
- `Nominee` module uses a separate host (`localhost:5000`) and may not belong to main backend.

---

# Missing or Inconsistent APIs

- No backend controller, model, middleware, or docs were present in this workspace.
- Exact payload shapes for:
  - `/orders/sell`
  - `/orders`
  - `/holdings/ledger`
  - `/analytics/customer/*`
  - `/wallet/accounts/{id}/verify`
    are inferred from client usage only.
- No explicit role-based permission or admin endpoint usage was detected.
- No Swagger/OpenAPI or `.env.example` file found in this repo.

---

# Suggested Improvements

1. Standardize response envelope:
   - `{ success, data, message, errors }`
2. Fix refresh-token check to use `error.response.data.message`.
3. Document API contract on backend with OpenAPI or Postman.
4. Centralize error handling for consistent frontend messaging.
5. Confirm `withCredentials` cookie requirements and CORS policy.
6. Log and validate `idempotency-key` usage server-side.

---

# Source References

- `frontend/src/api/axiosInstance.js`
- `frontend/src/api/kycapi.js`
- `frontend/src/api/mpinapi.js`
- `frontend/src/api/profileapi.js`
- `frontend/src/api/holdingsApi.js`
- `frontend/src/api/sellApi.js`
- `frontend/src/api/livestreamapi.js`
- `frontend/src/api/analyticsService.js`
- `frontend/src/pages/Authentication/Signup.jsx`
- `frontend/src/pages/Authentication/Login.jsx`
- `frontend/src/pages/Checkout.jsx`
- `frontend/src/pages/ProfileComponents/Wallet.jsx`
- `frontend/src/store/cartStore.js`
- `frontend/src/store/bankAccountStore.js`
- `frontend/src/store/addressStore.js`
- `frontend/src/pages/Cart.jsx`
- `frontend/src/pages/ProfileComponents/Transaction.jsx`
- `frontend/src/pages/ProfileComponents/Redeem.jsx`
- `frontend/src/pages/ProductDetails.jsx`
- `frontend/src/pages/ProfileComponents/Nominee.jsx`
