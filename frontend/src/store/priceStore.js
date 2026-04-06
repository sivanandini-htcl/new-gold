import { create } from "zustand";

const usePriceStore = create((set) => ({
  goldPrice: null,
  goldPercentage: null,
  silverPrice: null,
  silverPercentage: null,

  setPrices: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));

export default usePriceStore;







// import { create } from "zustand";
// const usePriceStore=create((state)=>({
//     goldPrice:null,
//     goldPercentage:null,
//     silverPrice:null,
//     silverPercentage:null,


//     fetchPrices: async () => {
//     try {
//       const prevGoldPrice = 12000;
//       const prevSilverPrice = 250;

//       const [goldRes, silverRes] = await Promise.all([
//         fetch("https://api.gold-api.com/price/XAU"),
//         fetch("https://api.gold-api.com/price/XAG"),
//       ]);
//     const goldData=await goldRes.json();
//     const silverData=await silverRes.json();

//      const goldFinal =(goldData.price / 31.1035) * usdToInr * 1.06 * gst;

//     const goldPercent = ( ((goldFinal - prevGoldPrice) / prevGoldPrice) * 100).toFixed(2);

//     const silverFinal =
//         (silverData.price / 31.1035) * usdToInr * 1.05 * gst;

//         const silverPercent = (
//         ((silverFinal - prevSilverPrice) / prevSilverPrice) *  100).toFixed(2);

//     set({
//         goldPrice: goldFinal.toFixed(2),
//         goldPercentage: goldPercent,
//         silverPrice: silverFinal.toFixed(2),
//         silverPercentage: silverPercent,
//       });
    
//     }
      
//       catch(error){
//          console.log("Error fetching prices:", error);
//       }},
// }))
// export default usePriceStore;