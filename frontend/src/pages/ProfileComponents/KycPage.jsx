import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useKycStore from '../../store/useKYCStore.JS';
import useMpinStore from '../../store/useMpinStore';
import {
  submitKYC,
  verifyPanOtp,
  sendPanOtp,
  sendAadhaarOtp,
  verifyAadhaarOtp,
  resumeKYC,
  checkKYCStatus,
} from '../../api/kycapi';

function KycPage() {
  const navigate = useNavigate();
  const {
    currentStep,
    kycStatus,
    loading,
    initialLoading,
    error,
    success,
    formData,
    verified,
    setCurrentStep,
    handleInputChange,
    handleFileChange,
    handleSendPanOtp,
    handleVerifyPanOtp,
    handleSendAadhaarOtp,
    handleVerifyAadhaarOtp,
    handleFinalSubmit,
    loadKycProgress,
  } = useKycStore();
  const mpinCreated = useMpinStore((state) => state.mpinCreated);

  useEffect(() => {
    loadKycProgress();
    // console.log('hello');
  }, []);

  
  if (initialLoading) {
    return (
      <div className="min-h-screen max-w-7xl  p-4 flex flex-col items-center gap-2 ">
       <div className='flex gap-2  mb-10'>
        <div className='rounded-full h-10 w-10 bg-secondary/8'></div>
        <div className='rounded-full h-10 w-10 bg-secondary/8'></div>
        <div className='rounded-full h-10 w-10 bg-secondary/8'></div>
         </div>
         <div className="h-2 bg-secondary/8 rounded-lg w-65 mb-10"></div>
         <div className="h-10 bg-secondary/8 rounded-lg w-65 mb-3"></div>
         <div className="h-2 bg-secondary/8 rounded-lg w-65 "></div>
         <div className="h-2 bg-secondary/8 rounded-lg w-65 mb-15 "></div>
         <div className="h-20 bg-secondary/8 rounded-lg w-65 "></div>




      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className=" md:max-w-2xl xl:max-w-4xl 2xl:max-w-6xl mx-auto bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-6 text-center">
          <h1 className="text-3xl font-serif text-white/70">KYC Verification</h1>
          <p className="text-sm mt-2 text-white/50">Complete verification step by step</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center px-6 py-5 border-b pl-13">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${currentStep > step ? 'bg-green-900/60 border border-background text-white/90' : 'bg-gray-200 text-gray-500'}`}
              >
                {step}
              </div>

              {step !== 3 && (
                <div
                  className={`flex-1 h-1 ${currentStep > step ? 'bg-green-800/70' : 'bg-gray-200'}`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="p-6 sm:p-8">
          {/* Error */}
          {error && (
            <div className="mb-5 bg-red-100 border border-red-200/40 text-red-700/60 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="mb-5 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-sm">
              {success}
            </div>
          )}

          {/* STEP 1 - PAN */}

          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-white/90 mb-6">PAN Verification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm text-white/70 font-medium">PAN Number</label>

                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleInputChange}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    disabled={verified.pan}
                    className="w-full text-secondary border border-gray-300 rounded-lg px-4 py-3 uppercase"
                  />
                </div>

                {!verified.pan && (
                  <>
                    <button
                      onClick={handleSendPanOtp}
                      disabled={loading}
                      className="w-full bg-accent py-3 text-black border rounded-lg font-semibold"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    <div>
                      <label className="block text-black mb-2 text-sm font-medium">Enter OTP</label>

                      <input
                        type="text"
                        name="panOtp"
                        value={formData.panOtp}
                        onChange={handleInputChange}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="w-full  text-secondary border border-white/20 rounded-lg px-4 py-3"
                      />
                    </div>

                    <button
                      onClick={handleVerifyPanOtp}
                      disabled={loading}
                      className="w-full bg-white/70 text-background py-3 rounded-lg font-semibold"
                    >
                      {loading ? 'Verifying...' : 'Verify PAN'}
                    </button>
                  </>
                )}

                {verified.pan && (
                  <div>
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="mb-4 text-sm text-primary/70 border border-white/20 px-4 py-2 rounded-lg"
                    >
                      Next
                    </button>
                    <div className="bg-green-100 text-green-700 p-4 rounded-lg">
                      ✓ PAN verified successfully
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 2 - AADHAAR */}

          {currentStep === 2 && (
            <div>
              <button
                onClick={() => setCurrentStep(1)}
                className="mb-4 text-sm text-primary/70 border border-white/20 px-4 py-2 rounded-lg"
              >
                Previous
              </button>

              <h2 className="text-2xl font-bold text-white/90 mb-6">Aadhaar Verification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">
                    Aadhaar Number
                  </label>

                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleInputChange}
                    placeholder="XXXXXXXXXXXX"
                    maxLength={12}
                    className="w-full text-secondary border border-gray-300 rounded-lg px-4 py-3"
                  />
                </div>

                {!verified.aadhaar && (
                  <>
                    <button
                      onClick={handleSendAadhaarOtp}
                      disabled={loading}
                      className="w-full bg-accent py-3 rounded-lg font-semibold text-white/70 bg-[#111112] border"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    <div>
                      <label className="block mb-2 text-sm font-medium text-white/70">
                        Enter OTP
                      </label>

                      <input
                        type="text"
                        name="aadhaarOtp"
                        value={formData.aadhaarOtp}
                        onChange={handleInputChange}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="w-full border text-white/70 border-gray-300 rounded-lg px-4 py-3"
                      />
                    </div>

                    <button
                      onClick={handleVerifyAadhaarOtp}
                      disabled={loading}
                      className="w-full bg-[#111112] text-white py-3 rounded-lg font-semibold"
                    >
                      {loading ? 'Verifying...' : 'Verify Aadhaar'}
                    </button>
                  </>
                )}

                {verified.aadhaar && (
                  <div className="bg-green-100/70 text-green-700 p-4 rounded-lg">
                    ✓ Aadhaar verified successfully
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 3 - DOCUMENTS */}

          {currentStep === 3 && (
            <div>
              <button
                onClick={() => setCurrentStep(2)}
                className="mb-4 text-sm text-primary/70 border border-white/20 px-4 py-2 rounded-lg"
              >
                Previous
              </button>
              <h2 className="text-2xl font-bold text-white/90 mb-6">Upload Documents</h2>

              <div className="space-y-6">
                {/* PAN */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">PAN Front</label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'panFile')}
                    className="w-full border border-gray-300 text-secondary bg-[#111112] rounded-lg px-4 py-3"
                  />
                </div>

                {/* Aadhaar Front */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">
                    Aadhaar Front
                  </label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarFileFront')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary bg-[#111112]"
                  />
                </div>

                {/* Aadhaar Back */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">
                    Aadhaar Back
                  </label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarFileBack')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary bg-[#111112]"
                  />
                </div>

                <button
                  onClick={handleFinalSubmit}
                  disabled={loading}
                  className="w-full bg-accent py-4 rounded-lg font-bold text-black"
                >
                  {loading ? 'Submitting...' : 'Submit KYC'}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 - SUCCESS */}

          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✓</span>
              </div>

              <h2 className="text-3xl font-normal text-green-600/40 mb-4 uppercase">{kycStatus}</h2>
              <p className="text-gray-600 mb-8">Your KYC is under review.</p>

              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-accent py-4 rounded-lg font-bold text-black"
              >
                Back to Profile
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-12 ">
              {/* <div className="w-24 h-24 bg-green-400/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-5xl">✓</span>
              </div> */}

              <h2 className="text-3xl font-serif text-green-600 p-2 bg-green-400/20 rounded-2xl mb-2">KYC Approved!</h2>
              <p className="text-white/60 mb-8">Your account is verified and ready to use.</p>

{mpinCreated ?(
  <p className='text-md  py-1 text-green-400'>Mpin Created ✓</p>
):(   <button
       onClick={() => navigate('/mpin-setup')}
       className="w-full border border-white/20 bg-accent/20 p-3 rounded-lg hover:bg-accent/40 uppercase font-semibold text-white/70 mb-4"
        >
                Set up MPIN
              </button>)}
           

              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-accent py-4 rounded-lg font-bold text-black"
              >
                Back to Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default KycPage;
