import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../slice/productSlice";
import ProductDetail from "../components/ProductDetail";
import {
  fetchAllCategories,
  setActiveInit,
  setCategories,
} from "../../category/slice/categoriesSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import { deleteProductById } from "../../api/productApi";

const UpdateProductPage = () => {
  const [noti, setNoti] = useState([]);
  const { status, product } = useSelector((state) => state.productReducer);
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      const data = await dispatch(fetchAllCategories());
      await dispatch(fetchProductById({ id }));
      //dispatch(setActiveInit({ categories: product.categories }));

      // const categoriesRedult = unwrapResult(data);
      // dispatch(setCategories(categoriesRedult));
    })();
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setActiveInit({ categories: product.categories }));
  }, [product, dispatch]);

  if (status === "loading" || categoriesReducer.status === "loading")
    return <div>loading</div>;
  if (status === "failed" || categoriesReducer.status === "failed")
    return <div>failed</div>;
  return (
    <div>
      <div class="mb-1 mt-5 relative">
        {noti.length > 0 && (
          <div className="bg-white fixed inset-x-1/2 w-1/4 p-6 rounded-md shadow-md text-center">
            {noti.map((el) => (
              <p className="text-red-700 font-medium">{el}</p>
            ))}
            <button
              onClick={() => setNoti([])}
              className="rounded-md my-2 px-4 py-1 uppercase font-medium text-sm bg-red-700 text-white"
            >
              Đồng ý
            </button>
          </div>
        )}
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          chi tiết sản phẩm
        </h1>
      </div>
      <div className="mt-4">
        <button
          className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
          onClick={async () => {
            const res = await dispatch(updateProduct(product));
            const data = unwrapResult(res);
            console.log(data);
            if (data.error) {
              setNoti([...noti, data.error]);
            } else {
              setNoti([...noti, "cập nhật sản phẩm thành công"]);
            }
          }}
        >
          cập nhật
        </button>
        <button
          className="mx-6 py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
          onClick={async () => {
            const result = await deleteProductById(product._id);
            console.log(result);
            if (result.success) {
              history.push("admin/products");
            }
          }}
        >
          xoá sản phẩm
        </button>
      </div>

      <ProductDetail
        product={product}
        categories={categoriesReducer.categories}
      />
    </div>
  );
};

export default UpdateProductPage;
