import React, { useState } from "react";
import {  Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context.js";
import { useContext } from "react";
import { useAuth } from "../../hooks/auth-hook.js";

const SideBar = () => {
  const auth = useContext(AuthContext);
  const { userId, role } = useAuth();
  const [activeItem, setActiveItem] = useState();

  const handleItemClick = (value) => {
    setActiveItem(value);
  };

  return (
    <>
      {auth.isLoggedIn && role === "Supplier" && (
        <Menu size="large" vertical>
          <Menu.Item
            name="dashboard"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            name="products"
            as={NavLink}
            to={`/${userId}/products`}
            exact
            active={activeItem === "products"}
            onClick={() => handleItemClick("products")}
          >
            Products
          </Menu.Item>
          <Menu.Item
            name="reports"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "reports"}
            onClick={() => handleItemClick("reports")}
          >
            Reports
          </Menu.Item>
        </Menu>
      )}
      {auth.isLoggedIn && role === "Customer" && (
        <Menu size="large" vertical>
          <Menu.Item
            name="dashboard"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            name="products"
            as={NavLink}
            to="/products"
            exact
            active={activeItem === "products"}
            onClick={() => handleItemClick("products")}
          >
            Products
          </Menu.Item>
          <Menu.Item
            name="orders"
            as={NavLink}
            to={`orders/user/${userId}`}
            exact
            active={activeItem === "orders"}
            onClick={() => handleItemClick("orders")}
          >
            Orders
          </Menu.Item>
          <Menu.Item
            name="reports"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "reports"}
            onClick={() => handleItemClick("reports")}
          >
            Reports
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default SideBar;
