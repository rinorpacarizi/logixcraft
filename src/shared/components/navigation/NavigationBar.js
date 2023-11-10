import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Menu } from "semantic-ui-react";

const NavigationBar = () => {
  //const [activeItem, setActiveItem] = useState["dashboard"];

//const handleItemClick = () => {};
  return (
    <>
      <Menu size='large' vertical>
        <Menu.Item
          name="home"
          // active={activeItem === "home"}
          // onClick={this.handleItemClick}
        >
          <NavLink to="/" exact>
            Dashboard
          </NavLink>
        </Menu.Item>
        <Menu.Item
          name="products"
          // active={activeItem === "messages"}
          // onClick={this.handleItemClick}
        >
          <NavLink to="/products">Products</NavLink>
        </Menu.Item>
        <Menu.Item
          name="orders"
          // active={activeItem === "messages"}
          // onClick={this.handleItemClick}
        >
          <NavLink to="/orders">Orders</NavLink>
        </Menu.Item>
        <Menu.Item
          name="users"
          // active={activeItem === "messages"}
          // onClick={this.handleItemClick}
        >
          <NavLink to="/users">Suppliers</NavLink>
        </Menu.Item>
        <Menu.Item
          name="reports"
          // active={activeItem === "messages"}
          // onClick={this.handleItemClick}
        >
          <NavLink to="/reports">Reports</NavLink>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default NavigationBar;
