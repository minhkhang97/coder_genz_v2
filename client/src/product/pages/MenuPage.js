import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllCategories } from "../../category/slice/categoriesSlice";
import { Link } from "react-router-dom";
import Header from "../../common/Header";
import { fetchCustomer } from "../../customer/slice/customerSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const MenuPage = () => {
  const { categories, status } = useSelector(
    (state) => state.categoriesReducer
  );

  const customerReducer = useSelector((state) => state.customerReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllCategories());
      const res = await dispatch(fetchCustomer());
      const data = unwrapResult(res);
      console.log(data);
    })();
  }, []);

  if (status === "loading" | customerReducer.status === 'loading') return <h1>loading</h1>;
  if (status === "failed") return <h1>failed</h1>;
  return (
    <div className="bg-red-50">
      {customerReducer.status === 'success' ? <Header /> : <div>dang nhap thanh cong</div>}
      <div className="py-6">
        <h1 className="text-4xl uppercase font-semibold text-gray-900 text-center">
          Thực đơn sườn nướng
        </h1>
      </div>
      <div className="flex w-4/5 m-auto">
        <div className="w-3/12">
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

        <div className="w-9/12 ml-4">
          {categories.map((category, index1) => (
            <div key={index1} className="mb-6">
              <h3 className="uppercase font-medium text-xl mb-3">
                {category.name}
              </h3>
              <div className="grid grid-cols-3 gap-8">
                {category.products
                  .filter((product) => product.isPublic === true)
                  .map((product, index2) => (
                    <Link key={index2} to={"/menu/" + product._id}>
                      <div
                        key={index2}
                        className="rounded-lg bg-white overflow-hidden shadow-md"
                      >
                        <div>
                          <img src={product.photos[0].url} alt={product.name} />
                        </div>

                        <div className="py-2 px-6 uppercase font-medium">
                          <p className="text-lgs">{product.name}</p>
                          <p className="my-2 text-red-700">
                            {product.discount > 0
                              ? product.discount
                              : product.price}{" "}
                            vnd
                          </p>
                          <Link to="/dat-mon">
                            <button className="py-1 px-3 bg-red-700 text-white uppercase font-medium rounded-md">
                              dat mon
                            </button>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
