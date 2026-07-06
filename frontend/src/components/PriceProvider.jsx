import { useEffect } from "react";
// import { subscribeMetalPrices } from "../api/livestreamapi";
import usePriceStore from "../store/priceStore";
import api from "../api/axiosInstance";

const PriceProvider = ({ children }) => {

  const setPrices = usePriceStore((state) => state.setPrices);
  const setStatus = usePriceStore((state) => state.setStatus);

  // useEffect(() => {
  //   const eventSource = subscribeMetalPrices(
  //     (data) => {
  //       setStatus("Live Connected");
  //       if (data.prices) {
  //         setPrices(data.prices);
  //       }
  //     },

  //     () => {
  //       setStatus("Disconnected");
  //     }
  //   );
  //   return () => eventSource.close();
  // }, []);



  // uncomment this for live price
useEffect(() => {
  const fetchprices = async () => {
    try {
      const response = await api.get('metals/price/live');
      setPrices(response.data.data);
      console.log('Fetched prices:', response.data);
    } catch (error) {
      console.error('Error fetching prices:', error);
    }
  };

  fetchprices(); 
}, []);
  return children;
};

export default PriceProvider;
