import { useEffect } from "react";
import usePriceStore from "../store/priceStore";

function PriceProvider() {
  const setPrices = usePriceStore((state) => state.setPrices);

  useEffect(() => {
    const eventSource = new EventSource(
      `${import.meta.env.VITE_API_BASE_URL}/metals/subscribe-live`
    );

    eventSource.onopen = () => console.log(" SSE connected");

    eventSource.onmessage = (event) => {
      console.log(" SSE data:", event.data);

      try {
        const data = JSON.parse(event.data);

        if (data.prices && Array.isArray(data.prices)) {
          data.prices.forEach((item) => {
            const metal = item.metal?.toLowerCase();

            if (metal === "gold" || metal === "silver") {
              setPrices({
                [`${metal}Price`]: item.price,
                [`${metal}Percentage`]: item.changePercent,
              });
            }
          });
        }
      } catch (err) {
        console.log(" SSE parse error", err);
      }
    };

    eventSource.onerror = (err) => {
      console.log(" SSE error", err);
    };

    return () => eventSource.close();
  }, [setPrices]);

  return null;
}

export default PriceProvider;




// import { createContext, useState, useEffect } from "react";

// export const PriceContext = createContext();

// export function PriceProvider({ children }) {
//   const [goldPrice, setGoldPrice] = useState(null);
//   const [goldPercentage, setGoldPercentage] = useState(null);

//   const [silverPrice, setSilverPrice] = useState(null);
//   const [silverPercentage, setSilverPercentage] = useState(null);

//   const prevGoldPrice = 12000;
//   const prevSilverPrice = 250;

//   useEffect(() => {
//     fetchPrices();
//     const interval = setInterval(fetchPrices, 30000);
//     return () => clearInterval(interval);
//   }, []);

//   const fetchPrices = async () => {
//     try {
//       const [goldRes, silverRes] = await Promise.all([
//         // fetch("https://api.gold-api.com/price/XAU"),
//         // fetch("https://api.gold-api.com/price/XAG"),
//       ]);

//       const goldData = await goldRes.json();
//       const silverData = await silverRes.json();
//       const usdToInr = 90.62;
//       const gst = 1.03;

//       // GOLD

//       const goldFinal =
//         (goldData.price / 31.1035) * usdToInr * 1.06 * gst;

//       setGoldPrice(goldFinal.toFixed(2));

//       const goldPercent = (
//         ((goldFinal - prevGoldPrice) / prevGoldPrice) *
//         100
//       ).toFixed(2);

//       setGoldPercentage(goldPercent);

//       //SILVER
//       const silverFinal =
//         (silverData.price / 31.1035) * usdToInr * 1.05 * gst;

//       setSilverPrice(silverFinal.toFixed(2));

//       const silverPercent = (
//         ((silverFinal - prevSilverPrice) / prevSilverPrice) *  100).toFixed(2);

//       setSilverPercentage(silverPercent);

//     } catch (error) {
//       console.log("Error fetching prices:", error);
//     }
//   };

//   return (
//     <PriceContext.Provider
//       value={{
//         goldPrice,
//         goldPercentage,
//         silverPrice,
//         silverPercentage,
//       }}
//     >
//       {children}
//     </PriceContext.Provider>
//   );
// }

