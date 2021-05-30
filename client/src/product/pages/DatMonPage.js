import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";
import { fetchAllCategories } from "../../category/slice/categoriesSlice";
import Cart from "../components/Cart";
import {
  addCart,
  minusAmountOrder,
  plusAmountOrder,
  removeOrder,
} from "../slice/cartSlice";
import {
  minusAmountValueOfProperty,
  plusAmountValueOfProperty,
  setInitOrderDetail,
} from "../slice/orderDetailSlice";
import { setValueOfProperty } from "../slice/orderDetailSlice";
import { fetchProducts } from "../slice/productsSlice";

const DatMonPage = () => {
  const { status, categories } = useSelector(
    (state) => state.categoriesReducer
  );
  const { orderDetail } = useSelector((state) => state.orderDetailReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  const [productCurrent, setProductCurrent] = useState();
  const [showProduct, setShowProduct] = useState(false);
  const dispatch = useDispatch();

  const [error, setError] = useState([]);

  const check = (propertyId) => {
    const totalQuantity = orderDetail.properties
      .filter((el) => el.id === propertyId)[0]
      .options.map((el) => el.amount)
      .reduce((acc, curr) => acc + curr, 0);
    const quantityMax = orderDetail.properties.filter(
      (el) => el.id === propertyId
    )[0].quantityMax;

    return totalQuantity >= quantityMax;
  };
  const check2 = (propertyId, optionId) => {
    const isAmount = orderDetail.properties
      .filter((el) => el.id === propertyId)[0]
      .options.filter((el) => el._id === optionId)[0]?.amount;
    return isAmount > 0;
  };

  setTimeout(() => {
    if (error) setError([]);
  }, 4000);

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllCategories());
    })();
  }, []);
  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>failed</div>;
  return (
    <div className="bg-red-50">
      <h1>dat mon</h1>
      <div className="flex flex-grow mx-2">
        <div className="w-2/12">
          <ul className="bg-red-100 rounded-md text-gray-800 uppercase px-3 py-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className="rounded-md py-1 px-3 my-1 hover:bg-red-700 hover:text-gray-50"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-7/12 mx-4">
          {categories.map((category, index) => (
            <div key={index}>
              <h4 className="uppercase font-semibold text-2xl text-gray-800">
                {category.name}
              </h4>
              <div>
                {category.products.map((el, index) => (
                  <div
                    className="bg-white border border-solid border-gray-50 shadow-md my-2"
                    key={index}
                    onClick={() => {
                      setProductCurrent(el);
                      setShowProduct(true);
                      dispatch(
                        setInitOrderDetail({
                          _id: el._id,
                          name: el.name,
                          price: el.price,
                          properties: el.properties.map((property) => ({
                            id: property.id,
                            name: property.name,
                            quantityMax: property.quantityMax,
                            quantityMin: property.quantityMin,
                            options: [],
                          })),
                        })
                      );
                    }}
                  >
                    <div className="flex p-2 flex-grow">
                      <div className="w-20 h-20 rounded-md overflow-hidden">
                        <img src={el.photos[0].url} alt="asdashgj" />
                      </div>
                      <div className="flex mx-4 justify-between flex-grow">
                        <div>
                          <h5 className="uppercase text-lg font-semibold text-gray-900">
                            {el.name}
                          </h5>
                          <p className="text-red-700 font-semibold uppercase">
                            {el.price} VND
                          </p>
                        </div>
                        <div>
                          <i class="fas fa-plus text-white p-2 rounded-full bg-red-700"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="W-3/12 flex-grow bg-white rounded-md py-4 px-2 shadow-md">
          <Cart cart={cart} />
        </div>
      </div>
      
      {showProduct && (
        <div className="border border-solid border-gray-50 shadow-lg rounded-lg fixed top-4 w-3/4 bg-white">
          {error.length > 0 && <div className="py-1 px-2 bg-red-700 text-white inline-block">vui long dien day du thong tin</div>}
          <div className="flex py-4 px-6">
            <div className="w-2/3 uppercase pr-6">
              <h4 className="text-2xl font-semibold text-gray-900">
                {productCurrent.name}
              </h4>
              <div className="text-sm mt-4">
                {productCurrent.properties.map((property, index1) => (
                  <div key={index1}>
                    <p className="font-semibold my-2">{property.name}</p>
                    <div>
                      {property.options.map((option, index2) => (
                        <div key={index2} className="py-1">
                          <div className="flex flex-grow justify-between">
                            <label htmlFor={option._id}>
                              <input
                                type="checkbox"
                                className="mr-2"
                                id={option._id}
                                disabled={
                                  check(property.id) &&
                                  !check2(property.id, option._id)
                                    ? true
                                    : false
                                }
                                value={option.value}
                                name={property.name}
                                onChange={(e) => {
                                  dispatch(
                                    setValueOfProperty({
                                      propertyId: property.id,
                                      value: e.target.value,
                                      optionId: option._id,
                                    })
                                  );
                                }}
                              />
                              {option.value}
                            </label>
                            <div>
                              {orderDetail.properties
                                .filter((el) => el.id === property.id)[0]
                                .options.filter(
                                  (el) => el._id === option._id
                                )[0]?.amount && (
                                <div>
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        minusAmountValueOfProperty({
                                          propertyId: property.id,
                                          optionId: option._id,
                                        })
                                      )
                                    }
                                  >
                                    <i className="fas fa-minus text-white p-1 bg-red-700 rounded-full"></i>
                                  </button>
                                  <span className="mx-2">
                                    {
                                      orderDetail.properties
                                        .filter(
                                          (el) => el.id === property.id
                                        )[0]
                                        .options.filter(
                                          (el) => el._id === option._id
                                        )[0]?.amount
                                    }
                                  </span>
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        plusAmountValueOfProperty({
                                          propertyId: property.id,
                                          optionId: option._id,
                                        })
                                      )
                                    }
                                  >
                                    <i className="fas fa-plus text-white p-1 bg-red-700 rounded-full"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-1/3">
              <img
                src={productCurrent.photos[0].url}
                alt={productCurrent.name}
              />
            </div>
          </div>

          <button
            className="bg-red-700 text-white py-2 px-4 uppercase font-semibold"
            onClick={() => {
              console.log(orderDetail.properties);
              const temp = orderDetail.properties
                .map((el) => el.options)
                .map((el) => el.length);
              setError([...error, "hgsadhas"]);
              console.log(temp);
              console.log(error);
              if (!temp.includes(0)) {
                dispatch(
                  addCart({ ...orderDetail, amount: 1, id: shortid.generate() })
                );
                setShowProduct(false);
              }
            }}
          >
            thêm vào giỏ hàng + {productCurrent.price} VNĐ
          </button>
          <button onClick={() => setShowProduct(false)}>tat</button>
        </div>
      )}
    </div>
  );
};

export default DatMonPage;
