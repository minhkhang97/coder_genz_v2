import React from 'react'
import { Switch, Route } from 'react-router'
import ListCategoryPage from './pages/ListCategoryPage'

const CategoryRouter = () => {
    return (
        <Switch>
            <Route path="/admin/categories/" exact componenet={ListCategoryPage} />
        </Switch>
    )
}

export default CategoryRouter
