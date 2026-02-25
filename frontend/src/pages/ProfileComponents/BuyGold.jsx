import { useLocation } from "react-router-dom";

function BuyGold() {
  const location = useLocation();
  const { conversionMode, inputValue, result, goldPrice } = location.state || {};

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Buy Gold Summary</h1>

      <div className="bg-white text-black p-6 rounded-xl max-w-md">
        <p><strong>Gold Price:</strong> ₹{goldPrice}/gram</p>
        <p><strong>Mode:</strong> {conversionMode}</p>
        <p><strong>Input:</strong> {inputValue}</p>
        <p><strong>Calculated:</strong>{result}</p>

        <button className="mt-4 bg-primary px-4 py-2 rounded">
        Confirm Purchase
        </button>
      </div>
    </div>
  );
}

export default BuyGold;
