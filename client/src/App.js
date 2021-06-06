import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { useForm, useFieldArray } from "react-hook-form";
import ProductDetail from "./product/components/ProductDetail";
import CreateProductPage from "./product/pages/CreateProductPage";
import PrivateRouter from './guards/PrivateRouter';
import DashBoard from './guards/DashBoard';
import Login from './common/Login';
import DatMonPage from "./product/pages/DatMonPage";
import ThanhToanPage from "./product/pages/ThanhToanPage";
import ForgetPassword from "./common/ForgetPassword";
import MenuPage from "./product/pages/MenuPage";
import ProductPage from "./product/pages/ProductPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRouter path="/admin" component={DashBoard} />
        <Route path="/dat-mon" component={DatMonPage} />
        <Route path="/thanh-toan" component={ThanhToanPage} />
        <Route path="/forget-password" component={ForgetPassword} />
        <Route path="/menu" exact component={MenuPage} />
        <Route path="/menu/:id" exact component={ProductPage} />
      </Switch>
    </Router>
  );
};

export default App;
