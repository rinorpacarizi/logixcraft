import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "../../../dashboard/Dashboard.js";
import User from "../../../user/User.js";
import ProductsList from "../../../dashboard/components/products/ProductsList.js";

const NavLinks = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/products" exact>
          <ProductsList />
        </Route>
        <Route path="/users" exact>
          <User />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default NavLinks;
