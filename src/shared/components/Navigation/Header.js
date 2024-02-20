import React, { useContext, useState } from "react";
import { Menu, Button, Modal, Image, Icon } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Authenticate from "../../../user/components/Authenticate.js";
import "./css/Header.css";
import logo from "../../../images/logo.png";
import logoMain from "../../../images/logoPic.png";

const Header = (props) => {
  const auth = useContext(AuthContext);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginClose = () => {
    setOpenLogin(!openLogin);
  };

  return (
    <>
      {auth.isLoggedIn && (
        <div style={{ position: "relative", zIndex: "6" }}>
          <Menu className="header-menu">
            <Menu.Menu position="left" className="logo-v2">
              <Link to={"/"}>
                {" "}
                <Image src={logoMain} className="" />
              </Link>
            </Menu.Menu>
            <Menu.Item position="right" name="home" className="logout-menu">
              <Button inverted color="red" onClick={auth.logout}>
                <Icon name="sign-out" size="large" color="black" />
              </Button>
            </Menu.Item>
          </Menu>
        </div>
      )}
      {!auth.isLoggedIn && (
        <Menu size="large" className="main-menu">
          <Menu.Menu position="left">
            <Image src={logo} className="logo" />
          </Menu.Menu>
          <Menu.Menu className="center-header-div">
            <p>Home</p>
            <p>About</p>
            <p>Contact Us</p>
          </Menu.Menu>
          <Menu.Menu className="login-button">
            <Menu.Item  position="right" name="home">
              <Modal
                onClose={() => setOpenLogin(false)}
                onOpen={() => setOpenLogin(true)}
                open={openLogin}
                size="tiny"
                dimmer="blurring"
                
                trigger={
                  <Button
                    basic
                    color="orange"
                    content="Login  "
                    onClick={handleLoginClose}
                  />
                }
              >
                <Modal.Header>
                  {props.isLogin ? "Login Form" : "Sign up Form"}
                </Modal.Header>
                <Authenticate
                  isLogin={props.isLogin}
                  switchModeHandler={props.switchModeHandler}
                  closeForm={handleLoginClose}
                />
              </Modal>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )}
    </>
  );
};

export default Header;
