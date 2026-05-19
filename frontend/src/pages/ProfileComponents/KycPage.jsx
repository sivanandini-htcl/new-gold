import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  submitKYC,
  verifyPanOtp,
  sendPanOtp,
  sendAadhaarOtp,
  verifyAadhaarOtp,
  resumeKYC,
} from '../../api/kycapi';

function KycPage() {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [aadharsession, setaadharSession] = useState('');
  const [docSessionId, setDocSession] = useState('');
  const [formData, setFormData] = useState({
    panNumber: '',
    panOtp: '',

    aadhaarNumber: '',
    aadhaarOtp: '',

    panFile: null,
    aadhaarFileFront: null,
    aadhaarFileBack: null,
    selfieFile: null,
  });

  const [verified, setVerified] = useState({
    pan: false,
    aadhaar: false,
  });

  const loadKycProgress = async () => {
    try {
      setInitialLoading(true);

      const data = await resumeKYC();

      console.log('full response', data);

      // restore verification state
      setVerified({
        pan: Boolean(data.pan?.verified),
        aadhaar: Boolean(data.aadhaar?.verified),
      });
      console.log('aadhaar verified from backend', data.aadhaar?.verified);
      console.log('pan  verified from backend', data.pan?.verified);

      // restore step
      if (data.currentPhase === 'pan') {
        setCurrentStep(1);
      } else if (data.currentPhase === 'aadhaar') {
        setCurrentStep(2);
      } else if (data.currentPhase === 'submit') {
        setCurrentStep(3);
      }

      // restore form values
      setFormData((prev) => ({
        ...prev,
        panNumber: data.pan?.identifier || '',
        aadhaarNumber: data.aadhaar?.identifier || '',
      }));
    } catch (err) {
      console.log(err);
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadKycProgress();
    console.log('hello');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError('');
    setSuccess('');
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));
  };

  // =========================
  // PAN OTP
  // =========================
  const handleSendPanOtp = async () => {
    if (!formData.panNumber) {
      setError('Enter PAN number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log(formData.panNumber);
      const response = await sendPanOtp(formData.panNumber);

      if (response.success) {
        setSuccess('PAN OTP sent successfully');
        setSessionId(response.data?.sessionId);
      }
    } catch (err) {
      setError(err.message || 'Failed to send PAN OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPanOtp = async () => {
    if (!formData.panOtp) {
      setError('Enter PAN OTP');
      return;
    }

    setLoading(true);
    setError('');
    try {
      console.log(formData.panOtp);
      const response = await verifyPanOtp(sessionId, formData.panOtp);

      if (response.success) {
        setSuccess('PAN verified successfully');
        await loadKycProgress();
      }
    } catch (err) {
      setError(err.message || 'PAN verification failed');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // AADHAAR OTP
  // =========================
  const handleSendAadhaarOtp = async () => {
    if (!formData.aadhaarNumber) {
      setError('Enter Aadhaar number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await sendAadhaarOtp(formData.aadhaarNumber);

      if (response.success) {
        setSuccess('Aadhaar OTP sent successfully');
        console.log('otp sent');
        setaadharSession(response.data?.sessionId);
      }
    } catch (err) {
      setError(err.message || 'Failed to send Aadhaar OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAadhaarOtp = async () => {
    if (!formData.aadhaarOtp) {
      setError('Enter Aadhaar OTP');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await verifyAadhaarOtp(aadharsession, formData.aadhaarOtp);

      if (response.success) {
        setSuccess('Aadhaar verified successfully');
        await loadKycProgress();
        setDocSession(response.data?.sessionId);
      }
    } catch (err) {
      setError(err.message || 'Aadhaar verification failed');
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FINAL SUBMIT
  // =========================

  const handleFinalSubmit = async () => {
    console.log(formData);

    if (!formData.panFile) {
      setError('Upload PAN front image');
      return;
    }

    if (!formData.aadhaarFileFront) {
      setError('Upload Aadhaar front image');
      return;
    }

    if (!formData.aadhaarFileBack) {
      setError('Upload Aadhaar back image');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const documents = [
        formData.panFile,
        formData.aadhaarFileFront,
        formData.aadhaarFileBack,
      ].filter(Boolean);

      const payload = {
        entityType: 'CUSTOMER',
        panVerificationSessionId: sessionId,
        aadhaarVerificationSessionId: aadharsession,
        // pan: formData.panNumber,
        documentCategory: 'identity',
        documents,
      };
      const response = await submitKYC(payload);

      if (response.success) {
        await loadKycProgress();
      }
    } catch (err) {
      console.log(err.response);
      console.log(err.response?.data);
      console.log(err.response?.data?.data);
      setError(err.message || 'KYC submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-black text-lg font-medium">Loading KYC...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-6 text-center">
          <h1 className="text-3xl font-bold text-white/70">KYC Verification</h1>

          <p className="text-sm mt-2 text-white/50">Complete verification step by step</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1 flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                ${currentStep > step ? 'bg-green-900 border border-background text-white/90' : 'bg-gray-200 text-gray-500'}`}
              >
                {step}
              </div>

              {step !== 3 && (
                <div
                  className={`flex-1 h-1
                  ${currentStep > step ? 'bg-green-800/70' : 'bg-gray-200'}`}
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

          {/* ========================= */}
          {/* STEP 1 - PAN */}
          {/* ========================= */}
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
                        className="w-full  text-secondary border border-gray-300 rounded-lg px-4 py-3"
                      />
                    </div>

                    <button
                      onClick={handleVerifyPanOtp}
                      disabled={loading}
                      className="w-full bg-white/90 text-white py-3 rounded-lg font-semibold"
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

          {/* ========================= */}
          {/* STEP 2 - AADHAAR */}
          {/* ========================= */}
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
                      <label className="block mb-2 text-sm font-medium text-white/70">Enter OTP</label>

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

          {/* ========================= */}
          {/* STEP 3 - DOCUMENTS */}
          {/* ========================= */}
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
                  <label className="block mb-2 text-sm font-medium text-white/70">Aadhaar Front</label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarFileFront')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary bg-[#111112]"
                  />
                </div>

                {/* Aadhaar Back */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">Aadhaar Back</label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'aadhaarFileBack')}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-secondary bg-[#111112]"
                  />
                </div>

                {/* Selfie */}
                {/* <div>
                  <label className="block mb-2 text-sm font-medium text-black">Selfie</label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'selfieFile')}
                    className="w-full border border-gray-300 rounded-lg px-4 py- text-black"
                  />
                </div> */}

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

          {/* ========================= */}
          {/* STEP 4 - SUCCESS */}
          {/* ========================= */}
          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-5xl">✓</span>
              </div>

              <h2 className="text-3xl font-bold text-green-600 mb-4">KYC Submitted</h2>

              <p className="text-gray-600 mb-8">Your KYC is under review.</p>

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
