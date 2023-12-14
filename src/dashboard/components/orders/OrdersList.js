import React from "react";
import OrdersCard from "./features/OrdersCard";
import { Button } from "semantic-ui-react";
import { useHistory } from 'react-router-dom';

const OrdersList = (props) => {
  const history = useHistory();
  const handleCreateClose = () => {
    history.push('/products');
  };
  return (
    <>
      {props.orders.length === 0 ? (
        <h2>No orders found</h2>
      ) : (
        props.orders.map((order) => (
          <OrdersCard
            key={order.id}
            order={order}
          />
        ))
      )}
          <Button
            basic
            color="green"
            content="Add a new order"
            onClick={handleCreateClose}
          />
    </>
  );
};

export default OrdersList;
