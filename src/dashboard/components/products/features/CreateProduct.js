import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";

const CreateProduct = (props) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    amount: { stock: 0, preOrdered: 0 },
    creator: "",
  });

  const changeSubmit = event =>{
    event.preventDefault();

  }

  const changeHandler = (event) => {
    const { name, value } = event.target;
    console.log(value)
    setProduct({ ...product, [name]: value });
  };

  const cancelHandler = () => {
    props.closeForm(); 
  };

  return (
    <Form
      onSubmit={changeSubmit}
      autoComplete="off"
      style={{ width: "25rem", position: "relative", left: "6rem" }}
    >
      <label>Name</label>
      <Form.Input value={product.name} name="name" onChange={changeHandler} />
      <label>Trype</label>
      <Form.Input value={product.type} name="type" onChange={changeHandler} />
      <label>Stock</label>
      <Form.Input
        value={product.amount.stock}
        name="stock"
        onChange={changeHandler}
      />
      <label>Pre-Ordered</label>
      <Form.Input
        value={product.amount.preOrdered}
        name="preOrdered"
        onChange={changeHandler}
      />
      <Button floated="right" positive type="submit" content="Edit" />
      <Button floated="left" type="button" content="Cancel" onClick={cancelHandler} />
    </Form>
  );
};

export default CreateProduct;
