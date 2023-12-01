import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Select } from "semantic-ui-react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ImageUpload from "../../shared/components/Form-Elements/ImageUpload";
import axios from "axios";

const Authenticate = () => {
  const roleOptions = [
    { key: "sp", value: "Supplier", text: "Supplier" },
    { key: "cs", value: "Customer", text: "Customer" },
  ];

  const [isLogin, setIsLogin] = useState(true);

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
    image: "",
    personalNum: 0,
    phoneNumber: 0,
    role: "",
  });

  const auth = useContext(AuthContext);

  const handleInput = (event, data) => {
    const { name, value } = data ? data : event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  };

  const switchModeHandler = () => {
    setIsLogin((prevMode) => !prevMode);
  };

  const handleImageUpload = (id, pickedFile) => {
    setUser({ ...user, image: pickedFile });
  };

  const authLoginHandler = async (event) => {
    event.preventDefault();
    if (isLogin) {
      await axios
        .post("http://localhost:5000/api/users/login", user)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("User login failed");
          }
          auth.login(
            response.data.userId,
            response.data.token,
            response.data.role
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const formData = new FormData();
      formData.append("email", user.email);
      formData.append("fullName", user.fullName);
      formData.append("password", user.password);
      formData.append("address", user.address);
      formData.append("personalNum", user.personalNum);
      formData.append("phoneNumber", user.phoneNumber);
      formData.append("role", user.role);
      formData.append("image", user.image);
      await axios
        .post("http://localhost:5000/api/users/signup", formData)
        .then((response) => {

          if (response.status !== 201) {
            throw new Error("User creation failed"); //not working
          }
          auth.login(response.data.userId, response.data.role);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {isLogin && (
        <Form onSubmit={authLoginHandler}>
          <Form.Field>
            <label>Email</label>
            <input placeholder="Email" name="email" onChange={handleInput} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
          </Form.Field>
          <Button type="submit">Enter</Button>
        </Form>
      )}
      {!isLogin && (
        <Form onSubmit={authLoginHandler}>
          <Form.Field>
            <label>Full Name</label>
            <input
              placeholder="FullName"
              name="fullName"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder="Email" name="email" onChange={handleInput} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              name="password"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Address</label>
            <input
              placeholder="Address"
              name="address"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Personal Number</label>
            <input
              placeholder="Personal Number"
              name="personalNum"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Phone Number</label>
            <input
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInput}
            />
          </Form.Field>
          <Form.Field>
            <label>Position</label>
            <Select
              placeholder="Select your position"
              name="role"
              options={roleOptions}
              onChange={handleInput}
            />
          </Form.Field>
          {!isLogin && <ImageUpload id="image" onChange={handleImageUpload} />}
          <Button type="submit">Sign Up</Button>
        </Form>
      )}
      <br />
      <Button onClick={switchModeHandler}>
        {isLogin ? "Sign Up?" : "Login?"}
      </Button>
    </>
  );
};

export default Authenticate;
