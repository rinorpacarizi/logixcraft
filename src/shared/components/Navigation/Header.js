import React, { useContext, useState } from "react";
import { Menu, Button, Modal } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import Authenticate from '../../../user/components/Authenticate.js'

const Header = () => {
  const auth = useContext(AuthContext);
  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginClose = () => {
    setOpenLogin(!openLogin);
  };

  return (
    <>
      <Menu size="large">
        <Menu.Menu position="right">
          <Menu.Item name="home">
            {!auth.isLoggedIn && (
              <Modal
                onClose={() => setOpenLogin(false)}
                onOpen={() => setOpenLogin(true)}
                open={openLogin}
                trigger={
                  <Button
                    basic
                    color="green"
                    content="Login  "
                    onClick={handleLoginClose}
                  />
                }
              >
                <Modal.Header>Login</Modal.Header>
                <Authenticate closeForm={handleLoginClose} />
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
