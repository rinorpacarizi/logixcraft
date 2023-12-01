import React, { useState, useContext } from "react";
import { Form, Button } from "semantic-ui-react";
//import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import ImageUpload from "../../../../shared/components/Form-Elements/ImageUpload";

const EditProduct = (props) => {
  const auth = useContext(AuthContext);
  const [product, setProduct] = useState({
    id: props.product.id,
    name: props.product.name,
    image: props.product.image,
    price: props.product.price,
    type: props.product.type,
    stock: props.product.stock,
    preOrdered: props.product.preOrdered,
    creator: auth.userId,
  });
 // const history = useHistory();
  
  const changeHandler = (event) => {
        setProduct({ ...product, [event.target.name]: event.target.value });
  };
  const handleImageUpload = (id, pickedFile) => {
    setProduct({ ...product, image: pickedFile });
  };

  const updateProductHandle = async (event) => {
    event.preventDefault();
    await axios
      .patch(`http://localhost:5000/api/products/${props.product.id}`,product, {headers: {
        Authorization: 'Bearer ' + auth.token
      }})
      .then(() => {
        //history.push("/" + auth.userId + "/products");
        props.closeForm();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Form
        onSubmit={updateProductHandle}
        autoComplete="off"
        style={{ width: "25rem", position: "relative", left: "6rem" }}
      >
        <label>Image</label>
      <ImageUpload id="image" name="image" onChange={handleImageUpload} />
        <label>Name</label>
        <Form.Input value={product.name} name="name" onChange={changeHandler} />
        <label>Type</label>
        <Form.Input value={product.type} name="type" onChange={changeHandler} />
        <label>Stock</label>
        <Form.Input
          value={product.stock}
          name="stock"
          onChange={changeHandler}
        />
        <label>PreOreded</label>
        <Form.Input
          value={product.preOrdered}
          name="preOrdered"
          onChange={changeHandler}
        />
        <label>Price</label>
        <Form.Input
          value={product.price}
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

export default EditProduct;
