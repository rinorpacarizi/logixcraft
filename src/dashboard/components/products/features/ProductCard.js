import React, { useState, useContext } from "react";
import { Item, Card, Image, Button, Modal, Popup } from "semantic-ui-react";
import EditProduct from "./EditProduct";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import { useAuth } from "../../../../shared/hooks/auth-hook.js";
import CreateOrder from "../../orders/features/CreateOrder.js";
import axios from "axios";
import "../css/Card.css";

const ProductsCard = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const auth = useContext(AuthContext);

  const { role } = useAuth();

  function handleEditHandler() {
    setOpenEdit(!openEdit);
  }
  function handleDeleteHandler() {
    setOpenDelete(!openDelete);
  }
  function handleOrderHandler() {
    setOpenOrder(!openOrder);
  }
  const deleteProductHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/products/${props.product.id}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then(() => {
        handleDeleteHandler();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!props.product) {
    return <h2>No product</h2>;
  }
  return (
    <Card className="product">
      <Image
        src={`http://localhost:5000/${props.product.image}`}
        alt={props.product.fullName}
        wrapped
        className="card-image"
      />
      <Card.Group  className="card-body">
        <Card.Header>{props.product.name}</Card.Header>
        <Card.Content>
          <Card.Description>{props.product.type}</Card.Description>
          <Card.Description>{props.product.price} $</Card.Description>
        </Card.Content>
        <Card.Meta>
          {role === "Supplier" ? (
            <span> Stock: {props.product.stock}</span>
          ) : (
            ""
          )}
        </Card.Meta>
      </Card.Group>
      <Card.Content>
        {auth.userId === props.product.creator && (
          <Item.Extra className="buttons">
            <Modal
              onClose={() => setOpenEdit(false)}
              onOpen={() => setOpenEdit(true)}
              open={openEdit}
              trigger={
                <Button
                  basic
                  color="green"
                  content="Edit"
                  floated="left"
                  onClick={handleEditHandler}
                />
              }
            >
              <Modal.Header>Edit Product</Modal.Header>
              <EditProduct
                closeForm={handleEditHandler}
                product={props.product}
              ></EditProduct>
            </Modal>

            <Modal
              size="tiny"
              onClose={() => setOpenDelete(false)}
              onOpen={() => setOpenDelete(true)}
              open={openDelete}
              trigger={
                <Button
                  basic
                  color="red"
                  content="Delete"
                  floated="left"
                  name={props.name}
                />
              }
            >
              <Modal.Header>Delete product</Modal.Header>
              <Modal.Content
                content="none"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <p>Are you sure you want to delete this product?</p>
                <Modal.Actions>
                  <Button negative onClick={handleDeleteHandler}>
                    No
                  </Button>
                  <Button positive onClick={deleteProductHandler}>
                    Yes
                  </Button>
                </Modal.Actions>
              </Modal.Content>
            </Modal>
          </Item.Extra>
        )}
        {role === "Customer" && (
          <Item.Extra className="order-button">
            <Modal
              onClose={() => setOpenOrder(false)}
              onOpen={() => setOpenOrder(true)}
              open={openOrder}
              size="mini"
             
              trigger={
                <Button
                  basic
                  color="pink"
                  content="Order"
                  onClick={handleOrderHandler}
                />
              }
            >
              <Modal.Header>Order Product</Modal.Header>
              <CreateOrder
                closeForm={handleOrderHandler}
                product={props.product}
              ></CreateOrder>
            </Modal>
          </Item.Extra>
        )}
      </Card.Content>
    </Card>
  );
};

export default ProductsCard;
