import React from "react";
import { Route, Switch } from "react-router";
import CategoryRouter from "../category/CategoryRouter";
import CreateCategoryPage from "../category/pages/CreateCategoryPage";
import ListCategoryPage from "../category/pages/ListCategoryPage";
import UpdateCategoryPage from "../category/pages/UpdateCategoryPage";
import Home from "../common/Home";
import ListOrderPage from "../order/pages/ListOrderPage";
// import ProductsPage from '../product/pages/ProductsPage'
// import CategoryPage from '../category/CategoryPage'
// import CreateProductPage from '../product/pages/CreateProductPage'
// import ProductDetailPage from '../product/pages/ProductDetailPage'
import ProductRouter from "../product/ProductRouter";

const DashBoard = () => {
  return (
    <div className="flex">
      <Home />
      <div className="w-10/12 bg-indigo-50 p-4">
        <Switch>
          <Route path="/admin/categories" exact component={ListCategoryPage} />
          <Route path="/admin/categories/create" exact component={CreateCategoryPage} />
          <Route path="/admin/categories/:id" exact component={UpdateCategoryPage} />
          
          <Route path="/admin/products" component={ProductRouter} />
          <Route path="/admin/orders/" component={ListOrderPage} />

          {/* <Route path="/admin/category" exact component={CategoryPage} />
                <Route path="/admin/category/:id" exact component={ProductDetailPage} /> */}
        </Switch>
      </div>
    </div>
  );
};

export default DashBoard;
