import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupMPIN, validateMPIN } from '../../api/mpinapi';
import useMpinStore from '../../store/useMpinStore';

function MPINSetupPage() {
  const navigate = useNavigate();

 const {
    loading,
    error,
    success,

    mpinData,
    mpinValidation,

    handleSetupMPIN,
    handleDigitChange,
    handleBackspace,
  } = useMpinStore();

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-6 text-center">
          <h1 className="text-3xl font-serif text-white/70"> Set Your MPIN</h1>
          <p className="text-sm mt-2 text-white/50">
            Secure your account and authorize transactions
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-100 border border-red-200/40 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-sm">
              ✓ {success}
            </div>
          )}

          {/* Info Section */}
          <div className="mb-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
            <h3 className="text-blue-400 font-semibold mb-3">What is MPIN?</h3>
            <ul className="text-white/70 text-sm space-y-2">
              <li>✓ A 6 digit PIN to authorize withdrawals</li>
              <li>✓ Required for selling digital gold</li>
              <li>✓ Adds an extra layer of security</li>
              <li>✓ Expires every 90 days (auto-renewal available)</li>
            </ul>
          </div>

          {/* Form Section */}
          <div className="space-y-6 ">
            {/* MPIN Input */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Enter MPIN (6 digits)
              </label>
              <div className="flex gap-3 justify-center">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    value={mpinData.mpin[index] || ''}
                  onChange={(e) =>
                 handleDigitChange( 'mpin', index, e.target.value, e.target.nextSibling )
}
       onKeyDown={(e) => handleBackspace( e, 'mpin', index, e.target.previousSibling )
}
          className=" w-9 h-10 rounded-xl border border-white/20 bg-secondary text-background text-center
        text-xl font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 " />
                ))}
              </div>
              {mpinValidation && (
                <div
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    mpinValidation.valid ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {mpinValidation.valid ? '✓ Strong MPIN' : '✗ ' + mpinValidation.error}
                </div>
              )}
            </div>

            {/* Confirm MPIN Input */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Confirm MPIN</label>
              <div className="flex gap-2 justify-center p-2">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="password"
                    maxLength={1}
                    value={mpinData.confirmMpin[index] || ''}
                   onChange={(e) =>
  handleDigitChange(
    'confirmMpin',
    index,
    e.target.value,
    e.target.nextSibling
  )
}
                    onKeyDown={(e) =>
  handleBackspace(
    e,
    'confirmMpin',
    index,
    e.target.previousSibling
  )
}
                    className="
        w-9 h-10
        rounded-xl
        border border-white/20
        bg-secondary
        text-background
        text-center
        text-xl
        font-semibold
        outline-none
        focus:border-accent
        focus:ring-2
        focus:ring-accent/40
      "
                  />
                ))}
              </div>
              {mpinData.mpin && mpinData.confirmMpin && (
                <div
                  className={`text-xs mt-2 flex items-center gap-1 ${
                    mpinData.mpin === mpinData.confirmMpin ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  {mpinData.mpin === mpinData.confirmMpin ? '✓ Matches' : '✗ Does not match'}
                </div>
              )}
            </div>

            {/* Security Rules */}
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-xs text-white/70">
              <p className="font-semibold text-yellow-300 mb-2">Security Rules:</p>
              <ul className="space-y-1">
                <li>✓ 4-6 digits (only numbers)</li>
                <li>✗ No repeating patterns (1111, 2222)</li>
                <li>✗ No sequences (1234, 4321)</li>
                <li>✓ Keep it different from passwords</li>
              </ul>
            </div>

            {/* Buttons */}
            <div className="gap-3 pt-4 flex items-center">
              <button
               onClick={() => handleSetupMPIN(navigate)}
                disabled={loading}
                className="flex-1 bg-accent py-3 rounded-lg font-semibold border border-white/20 text-black hover:bg-accent/90 transition disabled:opacity-50"
              >
                {loading ? 'Setting up...' : 'Set MPIN'}
              </button>
            </div>
            <button
            onClick={() => navigate('/profile')}
              disabled={loading}
              className="flex-1 items-center text-center justify-s rounded-lg font-semibold text-white/70 hover:bg-white/10 transition"
            >
              Skip for Now
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg text-white/60 text-xs">
            <p>
              <strong>Note:</strong> You can set up MPIN later from your profile settings. It's
              recommended to set it up soon to enable all features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MPINSetupPage;
