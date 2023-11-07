import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const NavigationBar = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink to="/">Orders</NavLink>
      </li>
      <li>
        <NavLink to="/users">Suppliers</NavLink>
      </li>
      <li>
        <NavLink to="/">Reports</NavLink>
      </li>
    </ul>
  );
};

export default NavigationBar;
