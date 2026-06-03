import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const MpinModal = ({
  open,
  onClose,
  onSubmit,
  loading = false,
  title = "Enter MPIN",
  subtitle = "Enter your 6-digit MPIN",
}) => {

  const [pin, setPin] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!open) {
      setPin([]);
      setError(false);
    }
  }, [open]);

  const handleKey = (val) => {

    if (loading) return;

    if (val === "del") {
      setPin((prev) => prev.slice(0, -1));
      return;
    }

    if (pin.length >= 6) return;

    setPin((prev) => [...prev, val]);
  };

  const handleSubmit = async () => {

    if (pin.length < 6) return;

    try {

      await onSubmit(pin.join(""));

    } catch (err) {

      setError(true);

      setTimeout(() => {
        setPin([]);
        setError(false);
      }, 700);
    }
  };

  const keys = [
    "1","2","3",
    "4","5","6",
    "7","8","9",
    "del","0","check"
  ];

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 bg-[#0f0f17] flex items-end justify-center">
<div
  className="
    w-full
    h-full
    md:max-w-3xl
    lg:max-w-9xl
    bg-[#0f0f17] !bg-opacity-100
    p-5 py-10  md:p-12 xl:py-20  2xl:py-50 mt-9
  "
>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">

          <div>
            <h2 className="text-white text-lg font-bold font-serif">
              {title}
            </h2>

            <p className="text-white/40 text-xs mt-1">
              {subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/50"
          >
            <X size={18} />
          </button>

        </div>

        <div className="text-lg font-serif text-center w-full mb-4">
         <p >Enter Your pin</p>
        </div>

        {/* PIN Dots */}
        <div className="flex justify-center gap-4 mb-8">

          {[...Array(6)].map((_, i) => {

            const filled = pin[i];

            return (
              <div
                key={i}
                className={`
                  w-4 h-4 rounded-full border-2 transition-all
                  ${
                    error
                      ? "bg-red-500 border-red-500"
                      : filled
                      ? "bg-primary border-primary"
                      : "border-white/20"
                  }
                `}
              />
            );
          })}

        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center mb-4">

            <div className="w-6 h-6 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />

          </div>
        )}

        {/* Number Pad */}
        <div className="grid grid-cols-3 gap-3">

          {keys.map((key, idx) => {

            if (key === "del") {
              return (
                <button
                  key={idx}
                  onClick={() => handleKey("del")}
                  className="h-14 rounded-2xl bg-white/[0.04]"
                >
                  ⌫
                </button>
              );
            }

            if (key === "check") {
              return (
                <button
                  key={idx}
                  disabled={pin.length < 6 || loading}
                  onClick={handleSubmit}
                  className="h-14 rounded-2xl bg-primary text-background font-bold"
                >
                  ✓
                </button>
              );
            }

            return (
              <button
                key={idx}
                onClick={() => handleKey(key)}
                className="h-14 rounded-2xl bg-white/[0.04] text-white text-lg font-semibold"
              >
                {key}
              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
};

export default MpinModal;