import React, { useContext, useState } from "react";
import { Menu, Button, Modal } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import Authenticate from "../../../user/components/Authenticate.js";
import './Header.css'

const Header = (props) => {
  const auth = useContext(AuthContext);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginClose = () => {
    setOpenLogin(!openLogin);
  };

  return (
    <>
      <Menu size="small">
        <Menu.Menu position="right">
          <Menu.Item name="home">
            {!auth.isLoggedIn && (
              <Modal
                onClose={() => setOpenLogin(false)}
                onOpen={() => setOpenLogin(true)}
                open={openLogin}
                size="tiny"
                dimmer="blurring"
                trigger={
                  <Button
                    basic
                    color="green"
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
            )}
            {auth.isLoggedIn && <Button onClick={auth.logout}>Log out</Button>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </>
  );
};

export default Header;
