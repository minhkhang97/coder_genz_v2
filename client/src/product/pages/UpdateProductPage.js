import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, updateProduct } from "../slice/productSlice";
import ProductDetail from "../components/ProductDetail";
import { fetchAllCategories, setActiveInit } from "../../category/slice/categoriesSlice";

const UpdateProductPage = () => {
  const { status, product } = useSelector((state) => state.productReducer);
  const categoriesReducer = useSelector((state) => state.categoriesReducer);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(fetchProductById({ id }));
      await dispatch(fetchAllCategories());
      dispatch(setActiveInit({categories: product.categories}))
    })();
  }, [id]);

  if (status === "loading" || categoriesReducer.status === "loading")
    return <div>loading</div>;
  if (status === "failed" || categoriesReducer.status === "failed")
    return <div>failed</div>;
  return (
    <div>
      <div class="mb-1 mt-5">
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          chi tiết sản phẩm
        </h1>
      </div>
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          await dispatch(updateProduct(product));
        }}
      >
        cap nhat
      </button>

      <ProductDetail
        product={product}
        categories={categoriesReducer.categories}
      />
    </div>
  );
};

export default UpdateProductPage;
