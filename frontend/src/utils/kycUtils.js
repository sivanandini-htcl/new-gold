import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkKYCStatus } from '../../api/kycapi';

/**
 * KYC Protected Route - Routes user based on KYC status
 */
export const KYCProtectedRoute = ({ children, requiredStatus = null, onStatusUpdate = null }) => {
  const navigate = useNavigate();
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        setLoading(true);
        const response = await checkKYCStatus('CUSTOMER');
        if (response.success) {
          const status = response.data.status;
          setKycStatus(status);
          if (onStatusUpdate) {
            onStatusUpdate(status);
          }

          // Route based on status
          if (requiredStatus && status !== requiredStatus) {
            routeBasedOnStatus(status);
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch KYC status');
        setKycStatus('NOT_SUBMITTED');
      } finally {
        setLoading(false);
      }
    };

    fetchKYCStatus();
  }, [requiredStatus, onStatusUpdate]);

  const routeBasedOnStatus = (status) => {
    switch (status) {
      case 'VERIFIED':
        navigate('/dashboard');
        break;
      case 'PENDING':
        navigate('/kyc-pending');
        break;
      case 'UNDER_REVIEW':
        navigate('/kyc-review');
        break;
      case 'REJECTED':
        navigate('/kyc-rejected');
        break;
      case 'NOT_SUBMITTED':
        navigate('/kyc');
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Checking KYC status...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background px-4">
        <div className="text-center bg-white p-8 rounded-lg max-w-md">
          <p className="text-red-600 font-semibold mb-4">Error</p>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-accent text-black px-4 py-2 rounded-lg font-semibold"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return children;
};

/**
 * Feature gate based on KYC status
 */
export const KYCFeatureGate = ({ feature, kycStatus, children, fallback }) => {
  const canAccess = {
    NOT_SUBMITTED: {
      dashboard: false,
      wallet: false,
      metals: false,
      orders: false,
      profile: true,
      kyc: true,
    },
    PENDING: {
      dashboard: true,
      wallet: true,
      metals: false,
      orders: false,
      profile: true,
      kyc: true,
    },
    UNDER_REVIEW: {
      dashboard: true,
      wallet: true,
      metals: false,
      orders: false,
      profile: true,
      kyc: true,
    },
    REJECTED: {
      dashboard: false,
      wallet: false,
      metals: false,
      orders: false,
      profile: true,
      kyc: true,
    },
    VERIFIED: {
      dashboard: true,
      wallet: true,
      metals: true,
      orders: true,
      profile: true,
      kyc: true,
    },
  };

  const hasAccess = canAccess[kycStatus]?.[feature] ?? false;

  if (!hasAccess) {
    return (
      fallback || (
        <div className="border border-yellow-400 bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-yellow-800 font-medium">⚠️ Feature Restricted</p>
          <p className="text-yellow-700 text-sm mt-1">
            Complete your KYC verification to access this feature.
          </p>
        </div>
      )
    );
  }

  return children;
};

/**
 * Helper to route based on KYC status
 */
export const routeByKYCStatus = (status, navigate) => {
  const routes = {
    VERIFIED: '/dashboard',
    PENDING: '/kyc-pending',
    UNDER_REVIEW: '/kyc-review',
    REJECTED: '/kyc-rejected',
    NOT_SUBMITTED: '/kyc',
  };

  const route = routes[status] || '/dashboard';
  navigate(route);
};

/**
 * Get KYC status label for display
 */
export const getKYCStatusLabel = (status) => {
  const labels = {
    VERIFIED: { label: 'Verified', color: 'green', icon: '✓' },
    PENDING: { label: 'Under Review', color: 'blue', icon: '⏳' },
    UNDER_REVIEW: { label: 'Under Review', color: 'blue', icon: '👀' },
    REJECTED: { label: 'Rejected', color: 'red', icon: '✕' },
    NOT_SUBMITTED: { label: 'Not Started', color: 'orange', icon: '📝' },
  };

  return labels[status] || { label: 'Unknown', color: 'gray', icon: '?' };
};
