import axios from "axios";
import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button, TextArea } from "semantic-ui-react";
import { AuthContext } from "../../../../shared/components/context/auth-context";
import ImageUpload from "../../../../shared/components/Form-Elements/ImageUpload";

const CreateProduct = (props) => {
  const auth = useContext(AuthContext);

  const [product, setProduct] = useState({
    id: "",
    name: "",
    image: "",
    price: "",
    description: "",
    stock:0,
    creator: auth.userId,
  });
  const history = useHistory();
  
  const changeHandler = (event) => {
      setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const createProductHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("type", product.type);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("stock",product.stock); 
    formData.append("description",product.description); 
    console.log(formData.values);
    await axios
      .post("http://localhost:5000/api/products/", formData, {headers: {
        Authorization: 'Bearer ' + auth.token
      }})
      .then((response) => {
        console.log(response);
        if (response.status !== 201) {
          throw new Error("Product creation failed");
        }
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleImageUpload = (id, pickedFile) => {
    setProduct({ ...product, image: pickedFile });
  };

  const cancelHandler = () => {
    props.closeForm();
  };

  return (
    <Form
      onSubmit={createProductHandler}
      autoComplete="off"
      style={{ width: "25rem", position: "relative", left: "6rem" }}
    >
      <label>Name</label>
      <Form.Input name="name" onChange={changeHandler} />
      <label>Type</label>
      <Form.Input name="type" onChange={changeHandler} />
      <label>Image</label>
      <ImageUpload id="image" name="image" onChange={handleImageUpload} />
      <label>Stock</label>
      <Form.Input name="stock" onChange={changeHandler} />
      <label>Price</label>
      <Form.Input name="price" onChange={changeHandler} />
      <label>Description</label>
      <TextArea name="description" onChange={changeHandler} />
      <Button floated="right" positive type="submit" content="Create" />
      <Button
        floated="left"
        type="button"
        content="Cancel"
        onClick={cancelHandler}
      />
    </Form>
  );
};

export default CreateProduct;
