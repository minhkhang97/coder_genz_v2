import React, { useEffect } from "react";
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

const CreateCategoryPage = () => {
  const { category } = useSelector((state) => state.categoryReducer);
  const { products, status } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

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
      <h1>tao danh muc</h1>
      <button
        className="py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
        onClick={async () => {
          await dispatch(postCategory(category));
        }}
      >
        lưu
      </button>
      <CategoryDetail category={category} products={products} />
    </div>
  );
};

export default CreateCategoryPage;
