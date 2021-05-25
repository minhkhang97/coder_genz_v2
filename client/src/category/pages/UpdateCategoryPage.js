import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import { fetchProducts } from "../../product/slice/productsSlice";
import CategoryDetail from "../components/CategoryDetail";
import { fetchOneCategory, updateCategory } from "../slice/categorySlice";

const UpdateCategoryPage = () => {
  const productsReducer = useSelector((state) => state.productsReducer);
  const categoryReducer = useSelector((state) => state.categoryReducer);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    (async () => {
      await dispatch(fetchOneCategory(id));
      await dispatch(fetchProducts());
    })();
  }, []);

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
      cap nhat
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {await dispatch(updateCategory(categoryReducer.category))}}
      >
        cap nhat
      </button>
      <CategoryDetail
        category={categoryReducer.category}
        products={productsReducer.products}
      />
    </div>
  );
};

export default UpdateCategoryPage;
