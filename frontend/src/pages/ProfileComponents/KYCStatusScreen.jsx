import { useNavigate } from 'react-router-dom';

/**
 * KYC Status Screen Components
 */

export const KYCVerifiedScreen = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-green-50 border-b-4 border-green-500 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-4">
            <span className="text-5xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-green-600">KYC Verified</h1>
          <p className="text-gray-600 mt-2">Your identity has been verified successfully!</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-green-900 mb-2">✓ Full Access Enabled</p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>✓ Access Dashboard</li>
              <li>✓ Manage Wallet</li>
              <li>✓ Invest in Metals</li>
              <li>✓ Place Orders</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Next Steps:</strong> You can now enjoy all DigiGold features. Start investing
              or managing your portfolio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KYCPendingScreen = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-blue-50 border-b-4 border-blue-500 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 rounded-full mb-4 animate-pulse">
            <span className="text-4xl">⏳</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-600">Under Review</h1>
          <p className="text-gray-600 mt-2">Your KYC is being reviewed by our team</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">⏱️ Expected Timeline</p>
            <p className="text-xs text-blue-800">
              Usually takes <strong>1-2 business days</strong> for review
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-green-900 mb-2">✓ Limited Access Available</p>
            <ul className="text-xs text-green-800 space-y-1">
              <li>✓ View Dashboard</li>
              <li>✓ Access Wallet</li>
              <li>✗ Cannot invest yet</li>
              <li>✗ Cannot place orders</li>
            </ul>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-xs text-yellow-900">
              <strong>📧 Notification:</strong> You'll receive an email once your KYC is verified
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const KYCRejectedScreen = ({ rejectionReason, onResubmit }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-red-50 border-b-4 border-red-500 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-red-100 rounded-full mb-4">
            <span className="text-5xl">✕</span>
          </div>
          <h1 className="text-2xl font-bold text-red-600">KYC Rejected</h1>
          <p className="text-gray-600 mt-2">Your KYC submission could not be verified</p>
        </div>

        <div className="p-6 space-y-4">
          {rejectionReason && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
              <p className="text-sm font-semibold text-red-900 mb-2">⚠️ Reason for Rejection</p>
              <p className="text-xs text-red-800">{rejectionReason}</p>
            </div>
          )}

          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-yellow-900 mb-2">📋 How to Resubmit</p>
            <ol className="text-xs text-yellow-800 space-y-1 list-decimal pl-4">
              <li>Address the issues mentioned above</li>
              <li>Ensure documents are clear and readable</li>
              <li>Resubmit your KYC with corrected documents</li>
            </ol>
          </div>

          <button
            onClick={() => navigate('/kyc')}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Resubmit KYC
          </button>

          <button
            onClick={() => navigate('/profile')}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50"
          >
            Back to Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export const KYCNotSubmittedScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-orange-50 border-b-4 border-orange-500 p-8 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-orange-100 rounded-full mb-4">
            <span className="text-5xl">📝</span>
          </div>
          <h1 className="text-2xl font-bold text-orange-600">Complete Your KYC</h1>
          <p className="text-gray-600 mt-2">Get verified to unlock full DigiGold features</p>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">✓ Why KYC is Important</p>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>✓ Regulatory compliance</li>
              <li>✓ Account security</li>
              <li>✓ Prevent fraud</li>
              <li>✓ Enable transactions</li>
            </ul>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm font-semibold text-green-900 mb-2">⏱️ Takes ~5 minutes</p>
            <p className="text-xs text-green-800">
              Have your PAN, Aadhaar, and a recent selfie ready
            </p>
          </div>

          <button
            onClick={() => navigate('/kyc')}
            className="w-full bg-accent text-black py-3 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Start KYC Verification
          </button>
        </div>
      </div>
    </div>
  );
};
