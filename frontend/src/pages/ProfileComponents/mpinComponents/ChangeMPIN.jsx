import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
function ChangeMPIN() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [mpinData, setMpinData] = useState({
    oldMpin: "",
    newMpin: "",
    confirmNewMpin: "",
  });

  const handleDigitChange = (field, index, value, nextInput) => {
    if (!/^\d?$/.test(value)) return;

    const currentValue = mpinData[field];
    const chars = currentValue.split("");

    while (chars.length < 6) chars.push("");

    chars[index] = value;

    setMpinData((prev) => ({
      ...prev,
      [field]: chars.join(""),
    }));

    if (value && nextInput) {
      nextInput.focus();
    }
  };

  const handleBackspace = (e, field, index, prevInput) => {
    if (e.key !== "Backspace") return;

    const currentValue = mpinData[field];
    const chars = currentValue.split("");

    if (!chars[index] && prevInput) {
      prevInput.focus();
    }
  };

  const handleChangeMPIN = async () => {
    setError("");
    setSuccess("");

    if (mpinData.oldMpin.length !== 6) {
      setError("Please enter your current 6-digit MPIN");
      return;
    }

    if (mpinData.newMpin.length !== 6) {
      setError("Please enter a valid 6-digit new MPIN");
      return;
    }

    if (mpinData.newMpin !== mpinData.confirmNewMpin) {
      setError("New MPIN and Confirm MPIN do not match");
      return;
    }

    if (mpinData.oldMpin === mpinData.newMpin) {
      setError("New MPIN must be different from current MPIN");
      return;
    }



      const payload = {
        oldMpin: mpinData.oldMpin,
        newMpin: mpinData.newMpin,
        confirmNewMpin: mpinData.confirmNewMpin,
        idempotencyKey: uuidv4(), 
      };
    try {
      setLoading(true);
      console.log(payload);

       const res= await api.post("/security/mpin/change", payload);
      console.log("Change MPIN Response:", res.data);
      setSuccess("MPIN changed successfully");

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.log("err"); 
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);
  console.log("MESSAGE:", err.response?.data?.message);
      setError(err?.response?.data?.message || "Failed to change MPIN");
    } finally {
      setLoading(false);
    }
  };

  const renderMpinBoxes = (field) => (
    <div className="flex gap-2 p-2 justify-center">
      {[...Array(6)].map((_, index) => (
        <input    key={index}type="password" maxLength={1}  value={mpinData[field][index] || ""}
        onChange={(e) =>   handleDigitChange(field,index, e.target.value, e.target.nextSibling
            )
          }
      onKeyDown={(e) =>  handleBackspace( e, field,index, e.target.previousSibling)}
          className="  w-9 h-10 rounded-xl border border-white/20 bg-secondary text-background text-center
        text-xl font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 "
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-accent p-6 text-center">
          <h1 className="text-3xl font-serif text-white/70">
            Change MPIN
          </h1>
          <p className="text-sm mt-2 text-white/50">
            Update your transaction security PIN
          </p>
        </div>

        <div className="p-6 sm:p-8 flex flex-col justify-center">
          {error && (
            <div className="mb-5 flex  justify-center  border-red-300 text-red-700 p-4 rounded-lg text-sm whitespace-nowrap text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-sm">
              ✓ {success}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Current MPIN
              </label>
              {renderMpinBoxes("oldMpin")}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                New MPIN
              </label>
              {renderMpinBoxes("newMpin")}
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Confirm New MPIN
              </label>

              {renderMpinBoxes("confirmNewMpin")}

              {mpinData.newMpin.length === 6 &&
                mpinData.confirmNewMpin.length === 6 && (
                  <div
                    className={`text-xs mt-3 text-center ${
                      mpinData.newMpin === mpinData.confirmNewMpin
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {mpinData.newMpin === mpinData.confirmNewMpin
                      ? " MPIN matches"
                      : "* MPIN does not match"}
                  </div>
                )}
            </div>

            <button
            onClick={handleChangeMPIN} disabled={loading} className="w-full bg-accent
                py-3 rounded-lg font-semibold border border-white/20 text-black
                hover:bg-accent/90 transition disabled:opacity-50"
            >
              {loading ? "Updating..." : "Change MPIN"}
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-white/70 hover:text-white transition">
              Cancel
            </button>
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-xs text-white/70">
              <p className="font-semibold text-yellow-300 mb-2">
                Security Rules:
              </p>

              <ul className="space-y-1">
                <li>✓ MPIN must be 6 digits</li>
                <li>✓ Use only numbers</li>
                <li>✗ Avoid repeating patterns</li>
                <li>✗ Avoid sequences like 123456</li>
                <li>✓ Keep it confidential</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangeMPIN;