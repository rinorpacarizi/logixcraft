import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import OrdersCard from "./features/OrdersCard";
import "./css/Order.css"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        await axios
          .get(`http://localhost:5000/api/orders/`)
          .then((response) => {
            setOrders(response.data.orders);
            console.log(response);
          });
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  return (
    <>
      <div className="group-products">
        <div className="products">
          {orders.map((order) => (
            <OrdersCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Orders;
