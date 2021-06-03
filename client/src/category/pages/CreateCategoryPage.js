import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../../common/Input";
import {
  addProductForCategory,
  fetchOneCategory,
  postCategory,
  removeProductForCategory,
  setInitCategory,
  setNameCatgory,
} from "../slice/categorySlice";
import { useParams } from "react-router-dom";
import {
  fetchProducts,
  setActiveForProduct,
} from "../../product/slice/productsSlice";
import CategoryDetail from "../components/CategoryDetail";
import { unwrapResult } from "@reduxjs/toolkit";

const CreateCategoryPage = () => {
  const { category } = useSelector((state) => state.categoryReducer);
  const { products, status } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

  const [noti, setNoti] = useState([]);

  setTimeout(() => {
    if(noti) setNoti([]);
  }, 5000)

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
      dispatch(setInitCategory());
    })();
  }, []);
  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>error</div>;
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
          tạo danh mục sản phẩm
        </h1>
      </div>
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          const res = await dispatch(postCategory(category));
          const data = unwrapResult(res);
          if(data.error){
            setNoti([...data.error]);
          }
          else{
            setNoti(['Thêm danh mục thành công']);
          }
        }}
      >
        lưu
      </button>
      <CategoryDetail category={category} products={products} />
    </div>
  );
};

export default CreateCategoryPage;
