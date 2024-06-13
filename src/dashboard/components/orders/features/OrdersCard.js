import React, { useState, useContext, useEffect } from "react";
import { Item, Image, Button, Modal, List, Popup } from "semantic-ui-react";
import EditOrder from "./EditOrder";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import axios from "axios";
import "../css/Card.css";

const OrdersCard = (props) => {
  const [order,setOrder]=useState({
    ...props.order,
    status:props.order.status
  })

  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openStatus, setOpenStatus] = useState(false);
  const auth = useContext(AuthContext);

  function handleEditClose() {
    setOpenEdit(!openEdit);
  }
  function handleDeleteClose() {
    setOpenDelete(!openDelete);
  }
  function handleStatusClose() {
    setOpenStatus(!openStatus);
  }

  const changeHandler = (event) => {
    setOrder((prevOrder) => {
      const updatedOrder={
        ...prevOrder,
        status: "Delivered"
      }
      handleChangeStatus(updatedOrder);
    })
};


  const handleChangeStatus = async (updatedOrder) => {
    await axios
      .patch(`http://localhost:5000/api/orders/${order.id}`, updatedOrder, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then(() => {
        handleStatusClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteOrderHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/orders/${order.id}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then(() => {
        handleDeleteClose();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <List celled verticalAlign="middle" relaxed="very" className="order">
      <List.Item>
        <List.Content className="list-image">
          <Image
            src={`http://localhost:5000/${props.order.image}`}
            alt={props.order.productName}
            wrapped
          />
        </List.Content>
        <List.Content className="list-body">
          <List.Header>{props.order.productName}</List.Header>
          <List.Description>{props.order.amount}</List.Description>
          <List.Description>{props.order.price} $</List.Description>
          <List.Description>
            <Modal
              size="tiny"
              onClose={() => setOpenStatus(false)}
              onOpen={() => setOpenStatus(true)}
              open={openStatus}
              trigger={ <Button
                color={props.order.status === "Delivered" ? "purple" : "blue"}
                disabled={props.order.status === "Delivered"}
              >
                {props.order.status}
              </Button>}
            >
              <Modal.Header>Change status</Modal.Header>
              <Modal.Content
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <p>Are you sure you want to change status to delivered?</p>
                <Modal.Actions>
                  <Button negative onClick={handleStatusClose}>
                    No
                  </Button>
                  <Button positive onClick={changeHandler}>
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal.Content>
            </Modal>
          </List.Description>
        </List.Content>
      </List.Item>
      <Item.Extra>
        {auth.userId === props.order.creator && (
          <Modal
            size="tiny"
            onClose={() => setOpenDelete(false)}
            onOpen={() => setOpenDelete(true)}
            open={openDelete}
            trigger={
              <Popup
                content="Remove Order"
                position="bottom center"
                trigger={
                  <Button
                    basic
                    color="red"
                    icon="x"
                    name={props.id}
                    onClick={handleDeleteClose}
                  />
                }
              />
            }
          >
            <Modal.Header>Remove order</Modal.Header>
            <Modal.Content
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <p>Are you sure you want to delete your order?</p>
              <Modal.Actions>
                <Button negative onClick={handleDeleteClose}>
                  No
                </Button>
                <Button positive onClick={deleteOrderHandler}>
                  Yes
                </Button>
              </Modal.Actions>
            </Modal.Content>
          </Modal>
        )}
      </Item.Extra>
    </List>
  );
};

export default OrdersCard;
