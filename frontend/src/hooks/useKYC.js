import { useEffect, useState } from 'react';
import { checkKYCStatus } from '../../api/kycapi';

/**
 * Hook to check KYC status and determine user access
 */
export const useKYCStatus = () => {
  const [kycStatus, setKycStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKYCStatus = async () => {
      try {
        setLoading(true);
        const response = await checkKYCStatus('CUSTOMER');
        if (response.success) {
          setKycStatus(response.data.status);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch KYC status');
        // Default to NOT_SUBMITTED if error
        setKycStatus('NOT_SUBMITTED');
      } finally {
        setLoading(false);
      }
    };

    fetchKYCStatus();
  }, []);

  const refresh = async () => {
    try {
      setLoading(true);
      const response = await checkKYCStatus('CUSTOMER');
      if (response.success) {
        setKycStatus(response.data.status);
      }
    } catch (err) {
      setError(err.message || 'Failed to refresh KYC status');
    } finally {
      setLoading(false);
    }
  };

  return { kycStatus, loading, error, refresh };
};

/**
 * Component to display KYC status banners
 */
export const KYCStatusBanner = ({ status, onRefresh }) => {
  const getStatusDisplay = () => {
    switch (status) {
      case 'VERIFIED':
        return {
          icon: '✓',
          title: 'KYC Verified',
          message: 'Your identity is verified. Full access enabled.',
          className: 'bg-green-100 border-green-400 text-green-700',
          iconBg: 'bg-green-200',
        };
      case 'PENDING':
        return {
          icon: '⏳',
          title: 'KYC Under Review',
          message: 'Your documents are being reviewed. This usually takes 1-2 business days.',
          className: 'bg-blue-100 border-blue-400 text-blue-700',
          iconBg: 'bg-blue-200',
        };
      case 'UNDER_REVIEW':
        return {
          icon: '👀',
          title: 'KYC Under Review',
          message: 'Our team is reviewing your documents. Please wait.',
          className: 'bg-yellow-100 border-yellow-400 text-yellow-700',
          iconBg: 'bg-yellow-200',
        };
      case 'REJECTED':
        return {
          icon: '✕',
          title: 'KYC Rejected',
          message: 'Your KYC was rejected. Please resubmit with correct documents.',
          className: 'bg-red-100 border-red-400 text-red-700',
          iconBg: 'bg-red-200',
          action: true,
        };
      case 'NOT_SUBMITTED':
        return {
          icon: '📝',
          title: 'KYC Not Submitted',
          message: 'Complete your KYC to unlock full access to all features.',
          className: 'bg-orange-100 border-orange-400 text-orange-700',
          iconBg: 'bg-orange-200',
          action: true,
        };
      default:
        return null;
    }
  };

  const display = getStatusDisplay();
  if (!display) return null;

  return (
    <div className={`border-l-4 p-4 mb-4 rounded ${display.className}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div
            className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${display.iconBg} text-lg font-bold`}
          >
            {display.icon}
          </div>
          <div>
            <h3 className="font-semibold">{display.title}</h3>
            <p className="text-sm mt-1">{display.message}</p>
          </div>
        </div>
        {onRefresh && (
          <button onClick={onRefresh} className="text-xs font-medium hover:underline mt-1">
            Refresh
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Component to show feature access restrictions
 */
export const FeatureAccessGuard = ({ feature, status, children }) => {
  const featureAccess = {
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

  const canAccess = featureAccess[status]?.[feature] ?? false;

  if (!canAccess) {
    return (
      <div className="border border-yellow-400 bg-yellow-50 p-4 rounded-lg text-center">
        <p className="text-yellow-800 font-medium">⚠️ This feature is not available yet</p>
        <p className="text-yellow-700 text-sm mt-1">
          Complete your KYC verification to access this feature
        </p>
      </div>
    );
  }

  return children;
};
