import api from "./axiosInstance";

 const fetchHoldingsData = async () => {
  try {
    const [holdingsRes, summaryRes] = await Promise.all([
      api.post("/holdings"),
      api.get("/holdings/summary"),

    ]);
  console.log("Holdings Response:", holdingsRes);
    console.log("Summary Response:", summaryRes);

    return {
      wallet: holdingsRes.data?.data,
      metalWallet: summaryRes.data?.data,
      
      
    };
  } catch (error) {
    console.log("Holdings API Error:", error);
    throw error;
  }
};export default fetchHoldingsData;