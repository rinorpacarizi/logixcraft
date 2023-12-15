import _ from 'lodash'
import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { AuthContext } from "../../../../shared/components/context/auth-context";


const CreateOrder = (props) => {
  const auth = useContext(AuthContext);

  const [order, setOrder] = useState({
    id: "",
    amount: 0,
    image: props.product.image,
    status: "Awaiting delivery",
    creator: auth.userId,
    productName: props.product.name,
    price: props.product.price,
  });
  const history = useHistory();

  const getOptions = (number) =>
  _.times(number, (index) => ({
    key: index,
    text: `${index}`,
    value: index,
  }));
  


  const calculatePrice = (amount) => {
    const productPrice = props.product.price; 
    return amount * productPrice;
  };

  const changeHandler = (event, { name, value }) => {
    const newAmount = value;
    const newPrice = calculatePrice(newAmount);
    setOrder({ ...order, [name]: newAmount, price: newPrice });
  };

  const createOrderHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("amount", order.amount);
    formData.append("image", order.image);
    formData.append("status", order.status);
    formData.append("creator", order.creator);
    formData.append("productName",order.productName);
    formData.append("price", order.price); 
    console.log(formData.values);
    await axios
      .post("http://localhost:5000/api/orders/", formData, {headers: {
        Authorization: 'Bearer ' + auth.token
      }})
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Order creation failed");
        }
        history.push("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form
      onSubmit={createOrderHandler}
      autoComplete="off"
      style={{ width: "25rem", position: "relative", left: "6rem" }}
    >
      <label>{props.product.name}</label>
      <label>Amount: </label>
      <Dropdown scrolling options={getOptions(props.product.stock)} name="amount" value={order.amount} onChange={changeHandler} />
      <label>Image</label>
      <img src={`http://localhost:5000/${props.product.image}`} />
      <label>Price : {order.price}</label>
      <Button floated="right" positive type="submit" content="Create" />
      <Button
        floated="left"
        type="button"
        content="Cancel"
        onClick={props.closeForm}
      />
    </Form>
  );
};

export default CreateOrder;
