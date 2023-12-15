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
import { AuthContext } from "../context/auth-context.js";
import Products from "../../../dashboard/components/products/Products.js";
import { useAuth } from "../../hooks/auth-hook.js";
import Reports from "../../../dashboard/components/Reports/Reports.js";
import CustomerOrders from "../../../dashboard/components/customers/CustomerOrders.js";
import SideBar from "./SideBar.js";
import Homepage from "../../../homepage/Homepage.js";
import Header from "./Header.js";

const NavLinks = () => {
  const { token, login, logout, userId, role } = useAuth();
  let routes;

  if (token) {
    if (role === "Supplier") {
      routes = (
        <>
        <Header/>
          <SideBar />
          <Switch>
            <Route path="/dashboard" exact>
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
            <Redirect to="/dashboard" />
          </Switch>
        </>
      );
    } else if (role === "Customer") {
      routes = (
        <>
        <Header/>
          <SideBar />
          <Switch>
            <Route path="/dashboard" exact>
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
            <Redirect to="/dashboard" />
          </Switch>
        </>
      );
    }
  } else {
    routes = (
      <>

        <Route path="/home" exact>
          <Homepage />
        </Route>
        <Redirect to="/home" />
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
