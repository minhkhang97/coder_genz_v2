import React, { useState } from "react";
import PropTypes from "prop-types";
import ProductDetail from "../components/ProductDetail";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  fetchAllCategories,
  setActiveInit,
} from "../../category/slice/categoriesSlice";
import { setInitialState, postProduct } from "../slice/productSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const CreateProductPage = (props) => {
  const { product } = useSelector((state) => state.productReducer);
  const { status, categories } = useSelector(
    (state) => state.categoriesReducer
  );

  //thong bao tao san pham thanh cong hoac that baij
  const [noti, setNoti] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setInitialState());
    (async () => {
      await dispatch(fetchAllCategories());

      dispatch(setActiveInit({ categories: product.categories }));
    })();
  }, []);

  setTimeout(() => {
    setNoti([]);
  }, 4000)

  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>failed</div>;

  return (
    <div className="relative">
      {noti.length > 0 && (
        <div className="bg-white fixed inset-x-1/2 w-1/6 p-6 rounded-md shadow-md text-center">
          {noti.map((el) => (
            <p className="text-red-700 font-medium">{el}</p>
          ))}
        </div>
      )}
      <div class="mb-1 mt-5">
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          thêm mới sản phẩm
        </h1>
      </div>
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          const result = await dispatch(postProduct(product));
          const resultUnwrap = unwrapResult(result);
          if (result.error) {
            setNoti(result.error);
          } else {
            setNoti(["thêm sản phẩm thành công"]);
          }
        }}
      >
        lưu
      </button>
      <ProductDetail product={product} categories={categories} />
    </div>
  );
};

CreateProductPage.propTypes = {};

export default CreateProductPage;
