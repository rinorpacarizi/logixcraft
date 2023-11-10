import React from "react";
import { Form, Button } from "semantic-ui-react";

const EditProduct = (props) => {
  console.log(props);
  return (
    <>
      <Form
        onSubmit={"do smth"}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <label>Name</label>
        <Form.Input value={props.name} name="name" onChange={props.closeForm} />
        <label>Type</label>
        <Form.Input value={props.type} name="type" onChange={props.closeForm} />
        <label>Stock</label>
        <Form.Input
          value={props.amount.stock}
          name="phoneNum"
          onChange={props.closeForm}
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

export default EditProduct;
