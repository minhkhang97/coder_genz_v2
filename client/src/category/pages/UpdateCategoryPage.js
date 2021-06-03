import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router";
import { deleteCategoryById } from "../../api/categoryApi";
import {
  fetchProducts,
  setActiveInitForProduct,
} from "../../product/slice/productsSlice";
import CategoryDetail from "../components/CategoryDetail";
import { fetchOneCategory, updateCategory } from "../slice/categorySlice";

const UpdateCategoryPage = () => {
  const productsReducer = useSelector((state) => state.productsReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);

  const [noti, setNoti] = useState([]);
  const dispatch = useDispatch();

  const history = useHistory();

  const { id } = useParams();


  setTimeout(() => {
    if(noti) setNoti([]);
  }, 5000)
  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchOneCategory(id));
    })();
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(
      setActiveInitForProduct({ products: categoryReducer.category.products })
    );
  }, [dispatch, categoryReducer]);

  if (
    productsReducer.status === "loading" ||
    categoryReducer.status === "loading"
  )
    return <div>loading</div>;
  if (
    productsReducer.status === "failed" ||
    categoryReducer.status === "failed"
  )
    return <div>error</div>;
  return (
    <div>
      <div>
        {noti.length > 0 && (
          <div className="bg-white fixed inset-x-1/2 w-1/6 p-6 rounded-md shadow-md text-center">
            {noti.map((el) => (
              <p className="text-red-700 font-medium">{el}</p>
            ))}
          </div>
        )}
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          chi tiết sản phẩm
        </h1>
      </div>
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          const res = await dispatch(updateCategory(categoryReducer.category));
          const data = unwrapResult(res);
          if (data.error) {
            setNoti([...data.error]);
          } else {
            setNoti(["Cập nhật danh mục thành công"]);
          }
        }}
      >
        cập nhật
      </button>
      <button
        className="mx-6 py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          const result = await deleteCategoryById(categoryReducer.category._id);
          console.log(result);
          if(result.success){
            history.push('/admin/categories');
          }
        }}
      >
        xoá danh mục
      </button>
      <CategoryDetail
        category={categoryReducer.category}
        products={productsReducer.products}
      />
    </div>
  );
};

export default UpdateCategoryPage;
