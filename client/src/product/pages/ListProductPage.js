import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../slice/productsSlice";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../../category/slice/categoriesSlice";

const ListProductPage = (props) => {
  const productsReducer = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchProducts());
      await dispatch(fetchAllCategories());
    })();
  }, [dispatch]);

  if (productsReducer.status === "loading") return <div>loading</div>;
  if (productsReducer.status === "failed") return <div>error</div>;

  return (
    <div className="bg-indigo-50 p-6">
      <div class="mb-1 mt-5">
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          sản phẩm
        </h1>
      </div>
      <div className="text-right my-4">
        <p className="py-1 px-4 bg-indigo-500 text-white inline-block rounded-md capitalize text-sm font-medium">
          <Link to="/admin/products/create">create product</Link>
        </p>
      </div>
      <div class="bg-white grid grid-cols-6 gap-2 py-3 px-4 rounded-md uppercase font-medium text-sm text-gray-800">
        <span>
          <p>id</p>
        </span>
        <span>
          <p>tên sản phẩm</p>
        </span>
        <span>
          <p>giá bán</p>
        </span>
        <span>
          <p>giảm giá</p>
        </span>
        <span>
          <p>ngày tạo</p>
        </span>
        <span>
          <p>trạng thái</p>
        </span>
      </div>
      <div className="bg-white my-4 rounded-md uppercase font-semibold text-sm text-gray-900">
        {productsReducer.products.map((el, index) => (
          <Link to={"/admin/products/" + el._id} key={index}>
            <div class="px-4 grid grid-cols-6 border-b border-solid border-gray-200 py-3 hover:shadow-md hover:rounded-md capitalize">
              <span>
                <p class="font-semibold text-gray-700">{index}</p>
              </span>
              <span>
                <p>{el.name}</p>
              </span>
              <span>
                <p class="text-red-700">{el.price}</p>
              </span>
              <span>
                <p class="text-red-700">{el.discount}</p>
              </span>
              <span>
                <p class="text-gray-500">{el.create_at}</p>
              </span>
              <span>
                <p class="inline bg-indigo-700 text-white text-xs font-semibold px-2 py-1 rounded-lg">
                  {el.status.mess}
                </p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

ListProductPage.propTypes = {};

export default ListProductPage;
