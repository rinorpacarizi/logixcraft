import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "../../../dashboard/Dashboard.js";
import User from "../../../user/User.js";
import SupplierProducts from "../../../dashboard/components/suppliers/SupplierProducts.js";
import Authenticate from "../../../user/components/Authenticate.js";
import { AuthContext } from "../context/auth-context.js";
import Products from "../../../dashboard/components/products/Products.js";
import { useAuth } from "../../hooks/auth-hook.js";
import Reports from "../../../dashboard/components/Reports/Reports.js";
import OrdersList from "../../../dashboard/components/orders/OrdersList.js";
import Orders from "../../../dashboard/components/orders/Orders.js";
import CustomerOrders from "../../../dashboard/components/customers/CustomerOrders.js";
import NavigationBar from "./NavigationBar.js";

const NavLinks = () => {
  const { token, login, logout, userId, role } = useAuth();
  let routes;

  if (token) {
    if (role === "Supplier") {
      routes = (
        <>
        <NavigationBar/>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/users" exact>
            <User />
          </Route>
          <Route path="/:userId/products" exact>
            <SupplierProducts />
          </Route>
          <Redirect to="/" />
        </Switch>
        </>
      );
    } else if (role === "Customer") {
      routes = (
        
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/orders/user/:userId" exact>
            <CustomerOrders />
          </Route>
          <Route path="/:userId/products" exact>
            <Reports />
          </Route>
          <Redirect to="/" />
        </Switch>
      );
    }
  } else {
    routes = (
      <>
        <Route path="/auth" exact>
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          role: role,
          login: login,
          logout: logout,
        }}
      >
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </>
  );
};

export default NavLinks;
