import { useState } from "react";
import { useNavigate } from "react-router-dom";

function KycPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [formData, setFormData] = useState({
    panNumber: "",
    panName: "",
    panDob: "",
    panFile: null,
    aadhaarNumber: "",
    aadhaarFileFront: null,
    aadhaarFileBack: null,
    videoFile: null, 
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleNext = () => {
    // if (step === 1) {
    //   if (!formData.panNumber || !formData.panName || !formData.panDob || !formData.panFile) {
    //     alert("Please fill all PAN fields and upload file");
    //     return;
    //   }
    // }
    // if (step === 2) {
    //   if (!formData.aadhaarNumber || !formData.aadhaarFileFront || !formData.aadhaarFileBack) {
    //     alert("Please enter Aadhaar number and upload both sides");
    //     return;
    //   }
    // }
    // if (step === 3) {
    //   // Simulate video/selfie
    //   setIsSubmitting(true);
    //   setTimeout(() => {
    //     setIsSubmitting(false);
    //     setStep(4);
    //     setMessage("KYC submitted successfully! Under review");
    //   }, 2500);
    //   return;
    // }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen text-accent bg-gray-50 py-8 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-accent text-white p-6 text-center">
          <h1 className="text-2xl font-bold">Complete Your KYC</h1>
          {/* <p className="text-sm mt-1 opacity-90">RBI compliant • Secure process</p> */}

          <div className="flex justify-center gap-3 mt-5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  step >= s
                    ?"bg-white text-accent"
                    : "bg-gray-700 text-white" 
                }`}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Step 1: PAN Verification</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                 Name as in PAN
                </label>
                <input
                  type="text"
                  name="panName"
                  value={formData.panName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2
                   focus:ring-accent focus:border-indigo-500"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PAN Number
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-indigo-500 uppercase"
                  placeholder="ABCDE1234F"
                  maxLength={10} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth (as in PAN)
                </label>
                <input
                  type="date"
                  name="panDob"
                  value={formData.panDob}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload PAN Card (front side)
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "panFile")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-accent hover:file:bg-indigo-100"
                />
                {formData.panFile && (
                  <p className="mt-2 text-sm text-green-600">Selected:{formData.panFile.name}</p>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button  onClick={() => navigate("/profile")}  className="flex-1 bg-gray-200 
                text-gray-800 py-3 rounded-xl font-medium">
                  Cancel
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-accent text-white py-3 rounded-xl font-medium hover:bg-gray-700">
                  Next → Aadhaar
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-center">Step 2: Aadhaar Verification</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaarNumber"
                  value={formData.aadhaarNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="XXXX XXXX XXXX"
                  maxLength={12}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Aadhaar Front
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "aadhaarFileFront")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg file:mr-4 
                  file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium
                file:bg-indigo-50 file:text-accent hover:file:bg-indigo-100"
                />
                {formData.aadhaarFileFront && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.aadhaarFileFront.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Upload Aadhaar Back
                </label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileChange(e, "aadhaarFileBack")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                  file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 
                  file:text-sm file:font-medium file:bg-indigo-50 file:text-accent hover:file:bg-indigo-100"
                />
                {formData.aadhaarFileBack && (
                  <p className="mt-2 text-sm text-green-600">
                    Selected: {formData.aadhaarFileBack.name}
                  </p>
                )}
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-1 bg-accent text-white py-3 rounded-xl font-medium hover:bg-gray-700">
                  Next → Video Verification
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <h2 className="text-xl font-semibold">Step 3: Video / Selfie Verification</h2>

              <p className="text-gray-600">
                In real flow this would open camera for liveness check or video KYC.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8">
                <p className="text-gray-500 mb-4">Upload selfie or short video</p>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={(e) => handleFileChange(e, "videoFile")}
                  className="mx-auto block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                   file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-indigo-50
                    file:text-accent hover:file:bg-indigo-100"
                />
                {formData.videoFile && (
                  <p className="mt-4 text-sm text-green-600">
                    Selected: {formData.videoFile.name}
                  </p>
                )}
              </div>

              {isSubmitting ? (
                <div className="py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p className="text-lg font-medium">Verifying...</p>
                </div>
              ) : (
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-medium"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-accent text-white py-3 rounded-xl font-medium hover:bg-gray-700"
                  >
                    Submit KYC
                  </button>
                </div>
              )}
            </div>
          )}

          {step === 4 && (
            <div className="text-center py-12">
           
              <h2 className="text-3xl font-bold text-green-600 mb-4">KYC Submitted!</h2>
              <p className="text-gray-700 mb-8">
                {message || "Your documents are under review. You will be notified soon."}
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="w-full bg-accent text-white py-4 rounded-xl font-semibold text-lg
                 hover:bg-accent"
              >
                Back to Profile
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-100 p-4 text-center text-xs text-gray-500 bg-gray-50">
          Your data is encrypted and used only for verification purposes.
        </div>
      </div>
    </div>
  );
}

export default KycPage;