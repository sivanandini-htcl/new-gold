import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { ArrowLeft, Edit3, Save, X, CreditCard, Eye, EyeOff } from "lucide-react";

function BankAccount() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  const [formData, setFormData] = useState({
    accountNumber: "",
    confirmAccount: "",
    IFSC_Code: "",
    branchName: "",
    accountHolder: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formData.accountNumber !== formData.confirmAccount) {
      toast.error("Account numbers do not match!");
      return;
    }
    console.log("data saved", formData);
    toast.success("Bank account saved successfully!");
    setIsEditing(false);
  };

  const maskAccount = (num) => {
    if (!num) return "Not provided";
    return "•".repeat(num.length - 4) + num.slice(-4);
  };
  const displayValue = (val, fallback = "Not provided") => val || fallback;

  return (
    <>
      <div className="bank-root min-h-screen py-8 px-4 sm:px-6 lg:px-10 
       bg-gradient-to-br from-amber-50 via-stone-100 to-amber-100" >

        <div className="max-w-2xl mx-auto">

          {/* ── Back Button ── */}
          <button
            onClick={() => navigate("/profile")}
            className="inline-flex items-center gap-2 mb-6 text-xs uppercase tracking-widest transition">
            <ArrowLeft className="w-4 h-4"/>
            Back to Profile
          </button>

          {/* ── Page Title ── */}
          <div className="mb-3">
            <div className="divider-gold h-0.5 w-12 rounded-full mb-3" />
            <h1 className="heading-font  text-2xl font-bold font-serif text-black" >
              Account <span className="text-2xl font-bold font-serif bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-700 bg-clip-text text-transparent">Details</span>
            </h1>
            <p className="mt-1 text-xs uppercase tracking-widest "style={{ color: "#a09070" }}>
              {isEditing ? "Editing Mode · Update your bank details" : "Your saved bank information"}
            </p>
          </div>
           <div className="bg-yellow-700 h-px md:w-167 ml-4 opacity-40 mb-6 flex  md:ml-1 " />

          {/* ── Form Card ── */}
          <div
            className="rounded-3xl p-6 sm:p-8 shadow-md mb-6 bg-white"      >
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-6">
              <div
              
                className="w-9 h-9 rounded-xl flex items-center justify-center">
                    <div className="w-1 h-5 rounded-full bg-amber-800 mr-3" />
                <CreditCard className="w-4 h-4"/>
              </div>
              
              <div>            
                <p className="text-xs uppercase tracking-widest font-medium"style={{ color: "#7a6a50" }} >
                  Bank Account Information
                </p>
                <p className="text-xs " style={{ color: "#7a6a50" }}>
                  Used for receiving sell proceeds
                </p>                
              </div>
              
            </div>
            <div className="bg-yellow-700 h-px md:w-150 ml-4 opacity-40 mb-6 flex  md:ml-2 " />   
            <div className="divider-gold h-px w-full opacity-30 mb-6" />
            <div className="space-y-5 bg-white">

              {/* Account Holder */}
              <div>
                <label className="block  uppercase tracking-widest mb-1.5 text-sm font-semibold text-amber-800 ">
                  Account Holder Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="accountHolder"
                    value={formData.accountHolder}
                    onChange={handleChange}
                    placeholder="Full name as per bank records  " 
                    className="border border-amber-500/30  "
                  />
                ) : (
                  <div className=" border border-amber-500/30  rounded-xl p-2 text-amber-800">{displayValue(formData.accountHolder)}</div>
                )}
              </div>

              {/* Account Number */}
              <div>
                <label className="block  uppercase tracking-widest mb-1.5 text-sm font-semibold text-amber-800 " >
                  Account Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleChange}
                    placeholder="Enter account number"
                    className="field-focus  border border-amber-500/30 "                   
                  />
                ) : (
                  <div className="relative flex items-center  border border-amber-500/30 rounded-xl p-2 text-amber-800" >
                    <span className="flex-1" >
                      {formData.accountNumber
                        ? showAccount
                          ? formData.accountNumber
                          : maskAccount(formData.accountNumber)
                        : "Not provided"}
                    </span>
                    {formData.accountNumber && ( 
                      <button
                        onClick={() => setShowAccount(!showAccount)}
                        className="ml-2 shrink-0"                       
                      >
                        {showAccount
                          ? <EyeOff className="w-4 h-4" />
                          : <Eye className="w-4 h-4" />
                        }
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Confirm Account — only shown when editing */}
              {isEditing && (
                <div>
                  <label className="block  uppercase tracking-widest mb-1.5 text-sm font-semibold text-amber-800" >
                    Confirm Account Number
                  </label>
                  <input
                    type="text"
                    name="confirmAccount"
                    value={formData.confirmAccount}
                    onChange={handleChange}
                    placeholder="Re-enter account number"
                    className="field-focus  border border-amber-500/30 " 
                  />
                  {formData.confirmAccount && formData.accountNumber !== formData.confirmAccount && (
                    <p className="mt-1 text-xs border border-amber-500/30 text-amber-800" >
                      Account numbers do not match
                    </p>
                  )}
                  {formData.confirmAccount && formData.accountNumber === formData.confirmAccount && formData.confirmAccount !== "" && (
                    <p className="mt-1 text-xs  border border-amber-500/30 text-amber-800 ">
                      Account numbers match ✓
                    </p>
                  )}
                </div>
              )}

              {/* IFSC & Branch — 2 col */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block  uppercase tracking-widest mb-1.5 text-sm font-semibold text-amber-800" >
                    IFSC Code
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="IFSC_Code"
                      value={formData.IFSC_Code}
                      onChange={handleChange}
                      placeholder="e.g. SBIN0001234"
                      className=" border border-amber-500/30 "                      
                    />
                  ) : (
                    <div className=" border border-amber-500/30 rounded-xl p-2 text-amber-800">{displayValue(formData.IFSC_Code)}</div>
                  )}
                </div>

                <div>
                  <label className="block  uppercase tracking-widest mb-1.5 text-sm font-semibold text-amber-800" >
                    Branch Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="branchName"
                      value={formData.branchName}
                      onChange={handleChange}
                      placeholder="Branch name"
                      className="field-focus  border border-amber-500/30 "                    
                    />
                  ) : (
                    <div className=" border border-amber-500/30 rounded-xl p-2 text-amber-800 " >{displayValue(formData.branchName)}</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ── Security Note ── */}
          {!isEditing && (
            <div
              className="rounded-2xl px-5 py-4 mb-6 flex items-start gap-3">
              <span>◈</span>
              <p className="text-xs leading-relaxed text-amber-800" >
                Your bank details are encrypted and stored securely. They are only used to process sell requests and redemptions.
              </p>
            </div>
          )}

          {/* ── Action Buttons ── */}
          <div className="flex flex-wrap justify-center gap-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-yellow-800 via-yellow-300 to-yellow-700 text-sm uppercase tracking-widest font-semibold transition hover:opacity-90 ">
                  <Edit3 className="w-4 h-4  " />
                  Edit Details
                </button>

                <button
                  onClick={() => navigate("/profile")}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white border border-gray-200"
                  >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-90"
                >
                  <Save className="w-4 h-4" />
                  Save Details
                </button>

                <button
                  onClick={() => setIsEditing(false)}
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm uppercase tracking-widest font-semibold transition hover:opacity-80 bg-white"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}

export default BankAccount;