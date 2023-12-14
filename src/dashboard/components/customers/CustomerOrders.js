import React from "react";
import OrdersList from "../orders/OrdersList";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const CustomerOrders = () => {
  const [orders, setOrders] = useState([]);
  const userId = useParams().userId;
  useEffect(() => {
    const getOrders = async () => {
      await axios
        .get(`http://localhost:5000/api/orders/user/${userId}`)
        .then((response) => {
          setOrders(response.data.orders);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getOrders();
  }, [userId]);
  
  return <OrdersList orders={orders} />;
};

export default CustomerOrders;
