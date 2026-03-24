import { useOrders } from "../components/OrderContext";
import { useCart } from "../components/CartContext";
import { useState,useEffect } from "react";

const OrdersPage = () => {

 const [orders, setOrders] = useState([]);
   useEffect(() => {
    const data = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(data);
  }, []);
  

  return (
    <div className=" min-h-screen bg-gradient-to-br from-amber-50 via-amber-50 to-amber-100   p-1 md:p-20  min-w-screen md:min-w-screen lg:min-w-screen ">
        {/* heading */}
      <div className="grid grid-cols-1 justify-center">
<     div className="flex justify-center text-4xl items-center gap-3 font-serif"><span>My</span>
      <span>Orders</span>
      </div>
      <div className="flex justify-center items-center font-serif text-amber-900 text-sm"><p>3 Items places</p></div>
      </div>

      {/* orders */}
      
      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4 rounded-lg bg-white w-70 ml-2 mr-2 mt-2 text-sm md:w-full">
          <p><b>Order ID:</b> {order.id}</p>
          <p><b>Date:</b> {order.date}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Payment:</b> {order.paymentMethod}</p>

          <div className="mt-2">
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      

      </div>
  );
};

export default OrdersPage;