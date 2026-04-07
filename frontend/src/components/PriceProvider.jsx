import { useEffect } from "react";
import { subscribeMetalPrices } from "../api/livestreamapi";
import usePriceStore from "../store/priceStore";

const PriceProvider = ({ children }) => {

  const setPrices = usePriceStore((state) => state.setPrices);
  const setStatus = usePriceStore((state) => state.setStatus);

  useEffect(() => {

    const eventSource = subscribeMetalPrices(

      (data) => {
        setStatus("Live Connected");

        if (data.prices) {
          setPrices(data.prices);
        }
      },

      () => {
        setStatus("Disconnected");
      }

    );

    return () => eventSource.close();

  }, []);

  return children;
};

export default PriceProvider;
