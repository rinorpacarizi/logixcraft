import React, { useState, useContext } from "react";
import { Item, Card, Image, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import EditProduct from "./EditProduct";
import { AuthContext } from "../../../../shared/components/context/auth-context";

const ProductsCard = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const [target, setTarget] = useState("");
  const auth = useContext(AuthContext);

  function handleEditClose() {
    openEdit ? setOpenEdit(false) : setOpenEdit(true);
  }
  const handleProductDelete = (event, id) => {
    setTarget(event.currentTarget.name);
    props.deleteProduct(id);
  };

  return (
    <Card>
      <Link to={`/products/${props.id}`}>
        <Image src={props.image} alt={props.fullName} wrapped ui={false} />

        <Card.Content>
          <Card.Header>{props.name}</Card.Header>
          <Card.Description>{props.type}</Card.Description>
          <Card.Description>{props.price}</Card.Description>
          <Card.Meta>{props.amount.stock}</Card.Meta>
          <Card.Meta>{props.amount.ordered}</Card.Meta>
          <Card.Meta>{props.amount.preOrdered}</Card.Meta>
          <Card.Meta>{props.creator}</Card.Meta>
        </Card.Content>
      </Link>
      <Item.Extra>
        {auth.isLoggedIn && (
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
                onClick={handleEditClose}
              />
            }
          >
            <Modal.Header>Edit Product</Modal.Header>
            <EditProduct closeForm={handleEditClose} {...props}></EditProduct>
          </Modal>
        )}
        {auth.isLoggedIn && (
          <Button
            basic
            color="red"
            content="Delete"
            loading={target === props.id}
            name={props.id}
            onClick={(event) => handleProductDelete(event, props.id)}
            floated="right"
          />
        )}
      </Item.Extra>
    </Card>
  );
};

export default ProductsCard;
