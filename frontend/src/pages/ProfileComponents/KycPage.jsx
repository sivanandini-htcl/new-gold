import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import useKycStore from '../../store/useKYCStore';
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
import { ArrowLeft } from 'lucide-react';

function KycPage() {
  const navigate = useNavigate();
  const[onClick,setOnclick]=useState(false);
  const {
    currentStep,
    kycStatus,
    statusReason,
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
    click,
  } = useKycStore();
  const mpinCreated = useMpinStore((state) => state.mpinCreated);
  const panRegex=/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  const aadharRegex=/^\d{12}$/;
  const[ValidationError,setValidationError]=useState({
    panError:'',
    adhaarError:'',
  })
  
  const validatePan=()=>{
     console.log("Validate called");
    let newError={};
    if(!formData.panNumber.trim()){
      newError.panError="Pan number is required"

    }
    else if(!panRegex.test(formData.panNumber.trim().toUpperCase())){
      newError.panError="Enter a valid Pan number"
    }
      setValidationError(newError)
      console.log(newError);
      return Object.keys(newError).length===0;
  }

 const validateAadhaar=()=>{
     console.log("Validate called");
    let newError={};
    if(!formData.aadhaarNumber.trim()){
      newError.adhaarError="Adhaar number is required"

    } else if(!aadharRegex.test(formData.aadhaarNumber.trim())){
  newError.adhaarError="Enter a valid adhaar number"}
      setValidationError(newError)
      console.log(newError);
      return Object.keys(newError).length===0;
  }


   const validateDocuments=()=>{
    let formErrors={};
    if(!formData.panFile){
      formErrors.panFile="Pan photo is required"
    }
    if(!formData.aadhaarFileFront){
      formErrors.aadhaarFileFront="Adhaar front Page is required"
    }
    if(!formData.aadhaarFileBack){
      formErrors.aadhaarFileBack="Adhaar back page is required"
    }
    setValidationError((prev)=>({
      ...prev,
      ...formErrors
    }))
    return Object.keys(formErrors).length===0
  }
  

  
  useEffect(() => {
    loadKycProgress();
    // console.log('hello');
  }, []);

  if (initialLoading) {
    return (
      <div className="min-h-screen max-w-7xl  p-4 flex flex-col items-center gap-2 ">
        <div className="flex gap-2  mb-10">
          <div className="rounded-full h-10 w-10 bg-secondary/8"></div>
          <div className="rounded-full h-10 w-10 bg-secondary/8"></div>
          <div className="rounded-full h-10 w-10 bg-secondary/8"></div>
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
      <div className=" md:max-w-xl xl:max-w-xl 2xl:max-w-6xl mx-auto bg-gradient-to-r from-[38393E] via-[#38393E] to-[#1A1A22] border border-white/20  rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-6 text-center flex flex-col justify-center items-center">
          <h1 className="text-3xl font-serif text-white/70">KYC Verification</h1>
          <p className="text-sm mt-2 text-white/50">Complete verification step by step</p>
          {kycStatus === 'rejected' && (
            <div className="flex text-red-600/80/60">
              <p className=" mb-8 uppercase">kyc {kycStatus} - </p>
              <p className=" mb-8">{statusReason}</p>
            </div>
          )}
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
              <h2 className="text-2xl font-serif text-white/90 mb-6">PAN Verification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm text-white/70 font-medium uppercase">PAN Number</label>

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
                {ValidationError.panError &&(
                <p className='text-red-600/80 text-xs'>{ValidationError.panError}</p>
                )}

                {!verified.pan && (
                  < >
                    <button
                      onClick={()=>{
                        if(validatePan()){
                            console.log("Inside handleSendPanOtp");
                          handleSendPanOtp();
                        }}}
                      disabled={loading}
                      className="block mb-2 text-sm text-white/70 font-medium uppercase border border-white/70 p-3 rounded-xl bg-[#111117] "
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
{click &&(<>
                    <div>
                      <label className="block mb-2 text-sm text-white/70 font-medium uppercase">Enter OTP</label>

                      <input
                        type="text"
                        name="panOtp"
                        value={formData.panOtp}
                        onChange={handleInputChange}
                        placeholder="Enter OTP"
                        maxLength={6}
                        className="w-full  text-secondary 
                        border border-white/20 rounded-lg px-4 py-3"
                      />
                    </div>

                    <button
                      onClick={handleVerifyPanOtp}
                      disabled={loading}
                      className="block mb-2 text-sm text-white/70 font-medium uppercase border border-white/70 p-3 rounded-xl bg-[#111117] hover:scale-[1.0]"
                    >
                      {loading ? 'Verifying...' : 'Verify PAN'}
                    </button>
                    </>)}
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
                    <div className="text-center text-green-700 p-4 rounded-lg">
                      ✓ PAN submitted successfully
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

              <h2 className="text-2xl font-serif text-white/90 mb-6">Adhaar Verification</h2>

              <div className="space-y-5">
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70 uppercase">
                    Adhaar Number
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
                {ValidationError.adhaarError &&(
                <p className='text-red-600/80 text-xs'>{ValidationError.adhaarError}</p>
                )}
                {!verified.aadhaar && (
                  <>
                    <button
                      onClick={()=>{
                        if(validateAadhaar()){
                        handleSendAadhaarOtp()}
                      }}
                      disabled={loading}
                      className="w-full bg-accent py-3 rounded-lg font-semibold text-white/70 bg-[#111112] border"
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </button>
{click &&(<>
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
                      className="w-full bg-[#111112] text-white/70 py-3 rounded-lg font-semibold"
                    >
                      {loading ? 'Verifying...' : 'Verify Aadhaar'}
                    </button>
                  </>
                  
                )}
                </>)}

                {verified.aadhaar && (
                  <div className=" text-green-700 text-center p-4 rounded-lg">
                    ✓ Aadhaar submitted successfully
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

              <div className="space-y-6 ">
                {/* PAN */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-white/70">PAN Front</label>

                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => handleFileChange(e, 'panFile')}
                    className="w-full border border-gray-300 text-secondary bg-[#111112] rounded-lg px-4 py-3"
                  />
                     {ValidationError.panFile &&(
                <p className='text-red-600/80 text-xs pt-2'>{ValidationError.panFile}</p>
                )}
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
                    {ValidationError.aadhaarFileFront &&(
                <p className='text-red-600/80 text-xs pt-2'>{ValidationError.aadhaarFileFront}</p>
                )}

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
                   {ValidationError.aadhaarFileBack &&(
                <p className='text-red-600/80 text-xs pt-2'>{ValidationError.aadhaarFileBack}</p>
                )}
                </div>
                 

                <div className="flex justify-center items-center">
                  <button
                  onClick={()=>{
                    if(validateDocuments()){
                      handleFinalSubmit()}}}
                  disabled={loading}
                  className="max-w-2xl bg-accent py-2 px-2 rounded-lg font-serif  bg-black text-white/70"
                >
                  {loading ? 'Submitting...' : 'Submit KYC'}
                </button>
                  </div>

                
              </div>
            </div>
          )}

          {/* STEP 4 - SUCCESS */}

          {currentStep === 4 && (
            <div className="text-center py-12">
              <div className="bg-green-800 px-2 rounded-2xl">
                <h2 className="text-lg md:text-3xl font-normal text-secondary mb-4 uppercase ">
                  {kycStatus}
                </h2>
              </div>

              <p className="text-gray-600 mb-8 text-sm">{statusReason}</p>

              <button
                onClick={() => navigate('/profile')}
                className="w-full bg-accent py-4 rounded-lg font-bold text-white/70 pt-2"
              >
                Back to Profile
              </button>
            </div>
          )}

          {currentStep === 5 && (
            <div className="text-center py-12">
              {/* <div className="w-24 h-24 bg-green-400/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
                <span className="text-5xl">✓</span>
              </div> */}

              <h2 className="text-lg md:text-3xl font-serif text-green-600 p-2 rounded-2xl mb-2 uppercase">
                KYC {kycStatus}{' '}
              </h2>
              <p className="text-white/60 mb-8">{statusReason}</p>

              {mpinCreated ? (
                <p className="text-md  py-1 text-green-400">Mpin Created ✓</p>
              ) : (
                <button
                  onClick={() => navigate('/mpin-setup')}
                  className="w-full border border-white/20 bg-accent/20 p-3 rounded-lg hover:bg-accent/40 uppercase font-semibold text-white/70 mb-4"
                >
                  Set up MPIN
                </button>
              )}
              
             
            </div>
            
          )}
          <div className="flex gap-2 justify-center hover:text--background items-center   w-fit mx-auto p-1 pt-2 rounded-lg">
                <ArrowLeft />
                 <button
                onClick={() => navigate('/profile')}
                className="   rounded-lg font-serif text-white/70 "
              >
                
                Back to Profile
              </button>
              </div>
        </div>
      </div>
    </div>
  );
}

export default KycPage;
