import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ children }) {

  const user = useAuthStore((state) => state.user);
  const isLoading = useAuthStore((state) => state.isLoading);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute; 




// import { useEffect } from "react";
// import axios from "axios";
// import { usePriceStore } from "../store/priceStore";

// function PriceFetcher() {
//   const setPrices = usePriceStore((state) => state.setPrices);

//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         const res = await axios.get("/price");

//         setPrices(res.data.gold, res.data.silver);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchPrices();
//   }, []);

//   return null;
// }

// export default PriceFetcher;

