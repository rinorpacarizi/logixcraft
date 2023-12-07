import React, { useState, useContext } from "react";
import { Item, Card, Image, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import EditProduct from "./EditProduct";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import { useAuth } from "../../../../shared/hooks/auth-hook.js";
import CreateOrder from "../../orders/features/CreateOrder.js";
import axios from "axios";

const ProductsCard = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const auth = useContext(AuthContext);

  const { role } = useAuth();

  function handleEditHandler() {
    openEdit ? setOpenEdit(false) : setOpenEdit(true);
  }
  function handleOrderHandler() {
    openOrder ? setOpenOrder(false) : setOpenOrder(true);
  }
  const deleteProductHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/products/${props.product.id}`, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!props.product) {
    return <h2>No product</h2>;
  }
  return (
    <Card>
      <Link to={`/products/${props.id}`}>
        <Image
          src={`http://localhost:5000/${props.product.image}`}
          alt={props.product.fullName}
          wrapped
          ui={false}
        />

        <Card.Content>
          <Card.Header>{props.product.name}</Card.Header>
          <Card.Description>{props.product.type}</Card.Description>
          <Card.Description>{props.product.price}</Card.Description>
          <Card.Meta>{props.product.stock}</Card.Meta>
          <Card.Meta>{props.product.ordered}</Card.Meta>
          <Card.Meta>{props.product.description}</Card.Meta>
        </Card.Content>
      </Link>
      <Item.Extra>
        {auth.userId === props.product.creator && (
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
        )}
        {auth.userId === props.product.creator && (
          <Button
            basic
            color="red"
            content="Delete"
            //loading={target === props.id}
            name={props.id}
            onClick={deleteProductHandler}
            floated="right"
          />
        )}
        {role === "Customer" && (
          <Modal
            onClose={() => setOpenEdit(false)}
            onOpen={() => setOpenEdit(true)}
            open={openEdit}
            trigger={
              <Button
                basic
                color="pink"
                content="Order"
                floated="left"
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
        )}
      </Item.Extra>
    </Card>
  );
};

export default ProductsCard;
