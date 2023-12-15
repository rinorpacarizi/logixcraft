import React from "react";
import { useState, useContext } from "react";
import { Form, Button, Select, Icon } from "semantic-ui-react";
import { AuthContext } from "../../shared/components/context/auth-context";
import ImageUpload from "../../shared/components/Form-Elements/ImageUpload";
import axios from "axios";
import "../css/Authenticate.css";

const Authenticate = (props) => {
  const roleOptions = [
    { key: "sp", value: "Supplier", text: "Supplier" },
    { key: "cs", value: "Customer", text: "Customer" },
  ];

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
  const [error, setErrors] = useState({
    personalNum: "",
    phoneNumber: "",
  });

  const auth = useContext(AuthContext);

  const handleInput = (event, data) => {
    const { name, value } = data ? data : event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleKeyDown = (event) => {
    const allowedKeys = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "Backspace",
    ];
    if (!allowedKeys.includes(event.key)) {
      event.preventDefault();
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (name === "personalNum" || name === "phoneNumber") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: /^\d+$/.test(value)
          ? ""
          : `${
              name === "personalNum" ? "Personal number" : "Phone number"
            } must be a valid number.`,
      }));
    }
  };

  const handleImageUpload = (id, pickedFile) => {
    setUser({ ...user, image: pickedFile });
  };

  const authLoginHandler = async (event) => {
    event.preventDefault();
    if (props.isLogin) {
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
          auth.login(
            response.data.userId,
            response.data.token,
            response.data.role
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {props.isLogin && (
        <Form onSubmit={authLoginHandler}>
          <Form.Field>
            <Icon name="user" size="large" />
            <input
              placeholder="Email"
              name="email"
              onChange={handleInput}
              required
            />
          </Form.Field>
          <Form.Field>
            <Icon name="lock" size="large" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleInput}
              required
            />
          </Form.Field>
          <Button type="submit" inverted color="orange" className="auth-button">
            Enter
          </Button>
          <hr
            style={{
              backgroundColor: "#ea62ed8a",
              height: "2px",
              width: "36rem",
              marginTop: "15px",
            }}
          />
        </Form>
      )}
      {!props.isLogin && (
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
              type="password"
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
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </Form.Field>
          {error.personalNum && (
            <div className="error-message">{error.personalNum}</div>
          )}
          <Form.Field>
            <label>Phone Number</label>
            <input
              placeholder="Phone Number"
              name="phoneNumber"
              onChange={handleInput}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </Form.Field>
          {error.phoneNumber && (
            <div className="error-message">{error.phoneNumber}</div>
          )}
          <Form.Field>
            <label>Position</label>
            <Select
              placeholder="Select your position"
              name="role"
              options={roleOptions}
              onChange={handleInput}
            />
          </Form.Field>
          {!props.isLogin && (
            <ImageUpload
              className="image-button"
              id="image"
              onChange={handleImageUpload}
            />
          )}
          <Button type="submit" inverted color="orange" className="auth-button">
            Sign Up
          </Button>
        </Form>
      )}
      <br />
      {props.isLogin && (
        <div className="form-switch">
          <label>Not a member?</label>
          <Button
            onClick={props.switchModeHandler}
            className="switch-button"
            style={{ paddingLeft: "5px" }}
          >
            Sign Up
          </Button>
        </div>
      )}
      {!props.isLogin && (
        <div className="form-switch">
          <label>Already a member?</label>
          <Button
            onClick={props.switchModeHandler}
            className="switch-button"
            style={{ paddingLeft: "5px" }}
          >
            Login
          </Button>
        </div>
      )}
    </>
  );
};

export default Authenticate;
