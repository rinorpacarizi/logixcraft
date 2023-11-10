import React, { useState } from "react";
import { useReducer } from "react";
import { Form, Button } from "semantic-ui-react";

const formReducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE':
            return{
                ...state,
                inputs:{
                    ...state.inputs,
                    [action.id]:{value: action.value}
                }
            };
        default:
            return state;
    }
}


const CreateProduct = (props) => {
  const [initialState, dispatch] = useReducer(formReducer, {
    inputs:{
        id: "",
        name: "",
        image: "",
        price: "",
        amount: { stock: 0, preOrdered: 0 },
        creator: "", 
    }});
  const changeHandler = (event) => {
    dispatch({ type: "UPDATE", val: event.target.value });
  };

  return (
    <Form
      onSubmit={"do smth"}
      autoComplete="off"
      style={{ width: "25rem", position: "relative", left: "6rem" }}
    >
      <label>Name</label>
      <Form.Input value={initialState.name} name="name" onChange={props.closeForm} />
      <label>Type</label>
      <Form.Input value={initialState.type} name="type" onChange={props.closeForm} />
      <label>Stock</label>
      <Form.Input
        value={initialState.amount.stock}
        name="phoneNum"
        onChange={initialState.closeForm}
      />
      <label>Stock</label>
      <Form.Input
        value={initialState.amount.stock}
        name="phoneNum"
        onChange={initialState.amount.preOrdered}
      />
      <Button floated="right" positive type="submit" content="Edit" />
      <Button
        onClick={initialState.closeForm}
        floated="left"
        type="submit"
        content="Cancel"
      />
    </Form>
  );
};

export default CreateProduct;
