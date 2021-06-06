import React from 'react'
import { useSelector } from 'react-redux'

const ProductPage = () => {
    const {product, status} = useSelector(state => state.productReducer);
    
    return (
        <div className="bg-red-50">
            
        </div>
    )
}

export default ProductPage
