import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { useAuth } from "../../hooks/auth-hook.js";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const { userId,role } = useAuth();


  //const [activeItem, setActiveItem] = useState["dashboard"];

  //const handleItemClick = () => {};
  return (
    <>
    { auth.isLoggedIn &&(
      <Menu size="large">
        <Menu.Menu position="right">
          <Menu.Item name="home">
            {!auth.isLoggedIn && (
              <NavLink to="/auth" exact>
                Enter
              </NavLink>
            )}
            {auth.isLoggedIn && <Button onClick={auth.logout}>Log out</Button>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      )}
      { auth.isLoggedIn && role=== "Supplier" && (
        <Menu size="large" vertical>
          <Menu.Item name="home">
            <NavLink to="/" exact>
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item name="products">
            <NavLink to={`/${userId}/products`}>Products</NavLink>
          </Menu.Item>
          <Menu.Item name="reports">
            <NavLink to={`/${userId}/reports`}>Reports</NavLink>
          </Menu.Item>
        </Menu>
      )}
      {auth.isLoggedIn && role=== "Customer" && (
        <Menu size="large" vertical>
          <Menu.Item name="home">
            <NavLink to="/" exact>
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item name="products">
            <NavLink to="/products">Products</NavLink>
          </Menu.Item>
          <Menu.Item name="orders">
            <NavLink to="/orders">Orders</NavLink>
          </Menu.Item>
          <Menu.Item name="users">
            <NavLink to="/users">Suppliers</NavLink>
          </Menu.Item>
          <Menu.Item name="reports">
            <NavLink to="/reports">Reports</NavLink>
          </Menu.Item>
        </Menu>
      )}
  
    </>
  );
};

export default NavigationBar;
