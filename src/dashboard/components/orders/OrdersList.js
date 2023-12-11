import React, { useState } from "react";
import OrdersCard from "./features/OrdersCard";
import CreateOrder from "./features/CreateOrder";
import { Modal, Button } from "semantic-ui-react";

const OrdersList = (props) => {
  const [openCreate, setOpenCreate] = useState(false);
//  const [selectedProduct, setSekectedProduct] = useState(undefined);

  const handleCreateClose = () => {
    setOpenCreate(!openCreate);
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
      <Modal
        onClose={() => setOpenCreate(false)}
        onOpen={() => setOpenCreate(true)}
        open={openCreate}
        trigger={
          <Button
            basic
            color="green"
            content="Create Order"
            onClick={handleCreateClose}
          />
        }
      >
        <Modal.Header>Create Order</Modal.Header>
        <CreateOrder closeForm={() => setOpenCreate(false)} />
      </Modal>
    </>
  );
};

export default OrdersList;
