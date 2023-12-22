import React from "react";
import OrdersCard from "./features/OrdersCard";
import { Button, List, Popup } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import "./css/Order.css";

const OrdersList = (props) => {
  const history = useHistory();
  const handleCreateClose = () => {
    history.push("/products");
  };
  return (
    <>
      {props.orders.length === 0 ? (
        <h2>No orders found</h2>
      ) : (
        <>
          <div className="group-orders">
            <div className="orders">
              <List
                verticalAlign="middle"
                relaxed="very"
                className="order"
              >
                <List.Item>
                  <List.Header>Image</List.Header>
                  <List.Content className="list-header">
                    <List.Header>Name</List.Header>
                    <List.Description>Amount</List.Description>
                    <List.Description>Total Price</List.Description>
                    <List.Description>Status</List.Description>
                  </List.Content>
                </List.Item>
              </List>
    
              {props.orders.map((order) => (
                <OrdersCard key={order.id} order={order} />
              ))}
            </div>
          </div>
          <Popup
            content="Order a new product"
            position='bottom center'
            trigger={
              <Button
              basic
              size="big"
              color="green"
              icon="add"
              className="create-order-button"
              onClick={handleCreateClose}
            />
            }
          />
          
        </>
      )}
      ;
    </>
  );
};

export default OrdersList;
