import React, { useState } from "react";
import { Menu, Icon } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth-context.js";
import { useContext } from "react";
import { useAuth } from "../../hooks/auth-hook.js";
import "./css/SideBar.css";

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
        <Menu size="large" vertical className="sidebar-menu">
          <Menu.Item
            name="dashboard"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          >
            <Icon name="table"></Icon>Dashboard
          </Menu.Item>
          <Menu.Item
            name="products"
            as={NavLink}
            to={`/${userId}/products`}
            exact
            active={activeItem === "products"}
            onClick={() => handleItemClick("products")}
          >
            <Icon name="shop"></Icon>Products
          </Menu.Item>
          <Menu.Item
            name="reports"
            as={NavLink}
            to="/"
            exact
            active={activeItem === "reports"}
            onClick={() => handleItemClick("reports")}
          >
            <Icon name="chart bar"></Icon>Reports
          </Menu.Item>
        </Menu>
      )}
      {auth.isLoggedIn && role === "Customer" && (
        <Menu size="large" vertical className="sidebar-menu">
          <Menu.Item
            name="dashboard"
            as={NavLink}
            to="/dashboard"
            exact
            active={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          >
            <Icon name="table"></Icon>Dashboard
          </Menu.Item>
          <Menu.Item
            name="products"
            as={NavLink}
            to="/products"
            exact
            active={activeItem === "products"}
            onClick={() => handleItemClick("products")}
          >
            <Icon name="shop"></Icon>Products
          </Menu.Item>
          <Menu.Item
            name="orders"
            as={NavLink}
            to={`orders/user/${userId}`}
            exact
            active={activeItem === "orders"}
            onClick={() => handleItemClick("orders")}
          >
            <Icon name="book"></Icon>
            Orders
          </Menu.Item>
          <Menu.Item
            name="reports"
            as={NavLink}
            to="/"
            exact
            active={activeItem === "reports"}
            onClick={() => handleItemClick("reports")}
          >
            <Icon name="chart bar"></Icon>Reports
          </Menu.Item>
        </Menu>
      )}
    </>
  );
};

export default SideBar;
