import React from "react";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import { Button, Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth-context";
import { useContext } from "react";

const NavigationBar = () => {
  const auth = useContext(AuthContext);

  //const [activeItem, setActiveItem] = useState["dashboard"];

  //const handleItemClick = () => {};
  return (
    <>
      <Menu size="large">
        <Menu.Menu position="right">
          <Menu.Item
            name="home"
            // active={activeItem === "home"}
            // onClick={this.handleItemClick}
          >
            {!auth.isLoggedIn && (
              <NavLink to="/auth" exact>
                Enter
              </NavLink>
            )}
            {auth.isLoggedIn && <Button onClick={auth.logout}>Log out</Button>}
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {auth.isLoggedIn && (
        <Menu size="large" vertical>
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
      )}
    </>
  );
};

export default NavigationBar;
