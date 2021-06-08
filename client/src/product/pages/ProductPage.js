import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router';
import { fetchProductById } from '../slice/productSlice';
import {Link} from 'react-router-dom'
import parse from 'html-react-parser';

const ProductPage = () => {
    const {id} = useParams();

    const {product, status} = useSelector(state => state.productReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        (async() => {
            await dispatch(fetchProductById({id}));
        })()
    }, [id, dispatch])

    if(status === 'loading') return <div>loading</div>
    if(status === 'failed') return <div>failed</div>
    console.log(product);
    return (
        <div className="bg-red-50">
            
            <div className="w-4/5 m-auto">
                <div className="py-6">
                    <p className="uppercase text-sm font-medium text-gray-700">Menu / {product.name}</p>
                </div>
                <div className="flex">
                    <div className="w-1/2 mr-6">
                        <img className="" src={product?.photos[0]?.url} alt={product.name} />
                    </div>

                    <div className="w-1/2 ml-6">
                        <p className="uppercase font-medium text-2xl">{product.name}</p>
                        <div className="my-4">{parse(product.introduce)}</div>

                        <div className="uppercase text-2xl font-semibold my-2">
                            {product.discount > 0 ? <div className="flex">
                                <p className="text-red-700">{product.discount} vnd</p>
                                <del className="font-light mx-2">{product.price} vnd</del>
                            </div> : <p className="text-red-700">{product.price}vnd</p>}
                        </div>
                        <Link to="/dat-mon"><button className="py-2 px-8 bg-red-700 text-white uppercase font-medium rounded-md">dat mon</button></Link>
                    </div>
                </div>

                <div>
                    <p>Co the ban se thich</p>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage
