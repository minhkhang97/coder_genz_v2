import React from 'react'
import { Route, Switch } from 'react-router'
import Home from '../common/Home'
// import ProductsPage from '../product/pages/ProductsPage'
// import CategoryPage from '../category/CategoryPage'
// import CreateProductPage from '../product/pages/CreateProductPage'
// import ProductDetailPage from '../product/pages/ProductDetailPage'
import ProductRouter from '../product/ProductRouter'

const DashBoard = () => {
    return (
        <div className="flex">
            <Home/>
            <div className="w-10/12 bg-indigo-50 p-4">
            <Switch>
                <Route path="/admin/products" component={ProductRouter} />

                {/* <Route path="/admin/category" exact component={CategoryPage} />
                <Route path="/admin/category/:id" exact component={ProductDetailPage} /> */}
            </Switch>
            </div>
            
        </div>
    )
}

export default DashBoard;
