import React, { useCallback, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Dashboard from "../../../dashboard/Dashboard.js";
import User from "../../../user/User.js";
import ProductsList from "../../../dashboard/components/products/ProductsList.js";
import SupplierProducts from "../../../dashboard/components/suppliers/SupplierProducts.js";
import Authenticate from "../../../user/components/Authenticate.js";
import { AuthContext } from "../context/auth-context.js";

const NavLinks = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  });
  const logout = useCallback(() => {
    setIsLoggedIn(false);
  });
  let routes;

  if (isLoggedIn) {
    routes = (
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
        <Route path="/:userId/products" exact>
          <SupplierProducts />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
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
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <Router>
          {routes}
      </Router>
    </AuthContext.Provider>
  );
};

export default NavLinks;
