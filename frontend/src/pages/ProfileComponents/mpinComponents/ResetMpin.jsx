import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../api/axiosInstance";
import { v4 as uuidv4 } from "uuid";

function ResetMPIN() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    otp: "",
    newMpin: "",
    confirmNewMpin: "",
  });

  const handleDigitChange = (field, index, value, nextInput) => {
    if (!/^\d?$/.test(value)) return;

    const currentValue = formData[field];
    const chars = currentValue.split("");

    while (chars.length < 6) {
      chars.push("");
    }

    chars[index] = value;

    setFormData((prev) => ({
      ...prev,
      [field]: chars.join(""),
    }));

    if (value && nextInput) {
      nextInput.focus();
    }
  };

  const handleBackspace = (e, field, index, prevInput) => {
    if (e.key !== "Backspace") return;

    const currentValue = formData[field];
    const chars = currentValue.split("");

    if (!chars[index] && prevInput) {
      prevInput.focus();
    }
  };

  const renderBoxes = (field) => (
    <div className="flex gap-2 p-2 justify-center">
      {[...Array(6)].map((_, index) => (
        <input
          key={index}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={formData[field][index] || ""}
          onChange={(e) =>
            handleDigitChange(
              field,
              index,
              e.target.value,
              e.target.nextSibling
            )
          }
          onKeyDown={(e) =>
            handleBackspace(
              e,
              field,
              index,
              e.target.previousSibling
            )
          }
          className=" w-9 h-10 rounded-xl border border-white/20 bg-secondary text-background text-center
        text-xl font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 "
        />
      ))}
    </div>
  );

  const handleResetMPIN = async () => {
    setError("");
    setSuccess("");

    if (formData.otp.length !== 6) {
      setError("Please enter a valid OTP");
      return;
    }

    if (formData.newMpin.length !== 6) {
      setError("Please enter a valid 6-digit MPIN");
      return;
    }

    if (formData.confirmNewMpin.length !== 6) {
      setError("Please confirm your MPIN");
      return;
    }

    if (formData.newMpin !== formData.confirmNewMpin) {
      setError("MPINs do not match");
      return;
    }

    const payload = {
      otp: formData.otp,
      newMpin: formData.newMpin,
      confirmNewMpin: formData.confirmNewMpin,
      idempotencyKey: uuidv4(),
    };

    try {
      setLoading(true);

      console.log("Reset MPIN Payload:", payload);

      const res = await api.post(
        "/security/mpin/reset",
        payload
      );

      console.log("Reset MPIN Response:", res.data);

      setSuccess("MPIN reset successfully");

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err) {
      console.log("RESPONSE:", err.response);
      console.log("DATA:", err.response?.data);

      setError(
        err?.response?.data?.message ||
          "Failed to reset MPIN"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="max-w-2xl mx-auto bg-gradient-to-r from-[#38393E] via-[#38393E] to-[#1A1A22] border border-white/20 rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-accent p-6 text-center">
          <h1 className="text-3xl font-serif text-white/70">
            Reset MPIN
          </h1>
          <p className="text-sm mt-2 text-white/50">
            Enter OTP and create a new MPIN
          </p>
        </div>

        <div className="p-6 sm:p-8">
          {error && (
            <div className="mb-5 bg-red-100 border border-red-300 text-red-700 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 bg-green-100 border border-green-300 text-green-700 p-4 rounded-lg text-sm">
              ✓ {success}
            </div>
          )}

          <div className="space-y-6">
            {/* OTP */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                OTP
              </label>
              {renderBoxes("otp")}
            </div>

            {/* New MPIN */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                New MPIN
              </label>
              {renderBoxes("newMpin")}
            </div>

            {/* Confirm MPIN */}
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">
                Confirm New MPIN
              </label>

              {renderBoxes("confirmNewMpin")}

              {formData.newMpin.length === 6 &&
                formData.confirmNewMpin.length === 6 && (
                  <div
                    className={`text-xs mt-3 text-center ${
                      formData.newMpin === formData.confirmNewMpin
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {formData.newMpin === formData.confirmNewMpin
                      ? "✓ MPIN matches"
                      : "✗ MPIN does not match"}
                  </div>
                )}
            </div>

            <button
              onClick={handleResetMPIN}
              disabled={loading}
              className="w-full  bg-accent py-3 rounded-lg font-semibold  border border-white/20  text-black
                hover:bg-accent/90 transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset MPIN"}
            </button>

            <button
              onClick={() => navigate("/profile")}
              className="w-full text-white/70 hover:text-white transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetMPIN;