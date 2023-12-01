import React, { useState, useContext } from "react";
import { Item, Card, Image, Button, Modal } from "semantic-ui-react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import EditOrder from "./EditOrder";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import axios from "axios";

const OrdersCard = (props) => {
  const [openEdit, setOpenEdit] = useState(false);
  const auth = useContext(AuthContext);

  function handleEditClose() {
    openEdit ? setOpenEdit(false) : setOpenEdit(true);
  }
  const deleteOrderHandler = async () => {
    await axios
      .delete(`http://localhost:5000/api/orders/${props.order.id}`, {headers: {
        Authorization: 'Bearer ' + auth.token
      }})
      .catch((err) => {
        console.log(err);
      });
  };

  if (!props.order) {
    return <h2>No order</h2>;
  }
  return (
    <Card>
      <Link to={`/orders/${props.id}`}>
        <Image
          src={`http://localhost:5000/${props.order.image}`}
          alt={props.order.product.name}
          wrapped
          ui={false}
        />

        <Card.Content>
          <Card.Meta>{props.order.product.name}</Card.Meta>
          <Card.Header>{props.order.amount}</Card.Header>
          <Card.Description>{props.order.price}</Card.Description>
          <Card.Description>{props.order.status}</Card.Description>
        </Card.Content>
      </Link>
      <Item.Extra>
        {auth.userId === props.order.creator && (
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
            <EditOrder
              closeForm={handleEditClose}
              order={props.order}
            ></EditOrder>
          </Modal>
        )}
        {auth.userId === props.order.creator && (
          <Button
            basic
            color="red"
            content="Delete"
            //loading={target === props.id}
            name={props.id}
            onClick={deleteOrderHandler}
            floated="right"
          />
        )}
      </Item.Extra>
    </Card>
  );
};

export default OrdersCard;
