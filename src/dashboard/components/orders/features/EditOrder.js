import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../shared/components/context/auth-context";

const EditOrder = (props) => {
  const auth = useContext(AuthContext);
  const [order, setOrder] = useState({
    id: props.order.id,
    image: props.order.image,
    price: props.order.price,
    amount: props.order.amount,
    status: props.order.status,
    productName:props.order.productName,
    creator: auth.userId,
  });
 // const history = useHistory();
  
  const changeHandler = (event) => {
    setOrder({ ...order, [event.target.name]: event.target.value });
  };

  const updateOrderHandle = async (event) => {
    event.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/orders/${props.order.id}`,order, {headers: {
        Authorization: 'Bearer ' + auth.token
      }})
      .then(() => {
        //history.push("/" + auth.userId + "/orders");
        props.closeForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form
        onSubmit={updateOrderHandle}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <label>Amount</label>
        <Form.Input value={order.amount} name="amount" onChange={changeHandler} />
        <label>Price</label>
        <Form.Input value={order.price} name="type" onChange={changeHandler} />
        <label>Status</label>
        <Form.Field
          value={order.status}
          name="status"
        />
        <label>Price</label>
        <Form.Input
          value={order.price}
          name="price"
          onChange={changeHandler}
        />
        <Button floated="right" positive type="submit" content="Edit" />
        <Button
          onClick={props.closeForm}
          floated="left"
          type="submit"
          content="Cancel"
        />
      </Form>
    </>
  );
};

export default EditOrder;
