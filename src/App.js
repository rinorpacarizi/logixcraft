import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import Product from "./places/components/products/Product";
import Dashboard from "./places/Dashboard";
import User from "../user/User.js";

function App() {
  3
  
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route path="/product" exact>
          <Product />
        </Route>
        <Route path="/user" exact>
          <User />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
