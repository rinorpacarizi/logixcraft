import _ from "lodash";
import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, Dropdown } from "semantic-ui-react";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import "../css/Order.css";

const CreateOrder = (props) => {
  const auth = useContext(AuthContext);

  const [order, setOrder] = useState({
    id: "",
    amount: 1,
    image: props.product.image,
    status: "Awaiting delivery",
    creator: auth.userId,
    productName: props.product.name,
    price: props.product.price,
  });
  const history = useHistory();

  const getOptions = (number) =>
    _.times(number, (index) => ({
      key: index + 1,
      text: `${index + 1}`,
      value: index + 1,
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
    formData.append("productName", order.productName);
    formData.append("price", order.price);
    console.log(formData.values);
    await axios
      .post("http://localhost:5000/api/orders/", formData, {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      })
      .then((response) => {
        if (response.status !== 201) {
          throw new Error("Order creation failed");
        }
        history.push("/products");
        props.closeForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form
        autoComplete="off"
        className="create-order-form"
      >
        <Form.Group>
          <Form.Group>
            <label>Amount: </label>
            <Dropdown
              className="amount-dropdown"
              selection
              compact
              search
              scrolling
              options={getOptions(props.product.stock)}
              name="amount"
              value={order.amount}
              onChange={changeHandler}
            />
          </Form.Group>
          <label>Total Price : {order.price}$</label>
        </Form.Group>
      </Form>
      <div className="create-order-buttons">
        <Button floated="right" positive type="submit" content="Create" onClick={createOrderHandler}/>
        <Button
          floated="left"
          type="button"
          content="Cancel"
          onClick={props.closeForm}
        />
      </div>
    </>
  );
};

export default CreateOrder;
