import React, { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { useAuth } from "../../hooks/auth-hook.js";

const NavigationBar = () => {
  const auth = useContext(AuthContext);
  const { userId, role } = useAuth();
  //const location = useLocation();

  const [activeItem, setActiveItem] = useState("/");

  const handleItemClick = (path) => {
    setActiveItem(path);
  };

  return (
    <>
      {auth.isLoggedIn && (
        <Menu size="large">
          <Menu.Menu position="right">
            <Menu.Item name="home">
              {!auth.isLoggedIn && (
                <NavLink to="/auth" exact>
                  Enter
                </NavLink>
              )}
              {auth.isLoggedIn && (
                <Button onClick={auth.logout}>Log out</Button>
              )}
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      )}
      {auth.isLoggedIn && role === "Supplier" && (
        <Menu size="large" vertical>
          <Menu.Item
            name="dashboard"
            as={NavLink}
            to="/"
            exact
            active={activeItem === "/"}
            onClick={() => handleItemClick("/")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item name="products" to={`/${userId}/products`} as={NavLink}>
            Products
          </Menu.Item>
          <Menu.Item
            name="reports"
            active={activeItem === `/${userId}/reports`}
            onClick={() => handleItemClick(`/${userId}/reports`)}
          >
            <NavLink to={`/${userId}/reports`}>Reports</NavLink>
          </Menu.Item>
        </Menu>
      )}
      {auth.isLoggedIn && role === "Customer" && (
        <Menu size="large" vertical>
          <Menu.Item
            name="dashboard"
            active={activeItem === "/"}
            onClick={() => handleItemClick("/")}
          >
            <NavLink to="/" exact>
              Dashboard
            </NavLink>
          </Menu.Item>
          <Menu.Item
            name="products"
            active={activeItem === "/products"}
            onClick={() => handleItemClick("/products")}
          >
            <NavLink to="/products">Products</NavLink>
          </Menu.Item>
          <Menu.Item
            name="orders"
            active={activeItem === `/orders/user/${userId}`}
            onClick={() => handleItemClick(`/orders/user/${userId}`)}
          >
            <NavLink to={`/orders/user/${userId}`}>Orders</NavLink>
          </Menu.Item>
          <Menu.Item
            name="reports"
            active={activeItem === "/reports"}
            onClick={() => handleItemClick("/reports")}
          >
            <NavLink to="/reports">Reports</NavLink>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default NavigationBar;
