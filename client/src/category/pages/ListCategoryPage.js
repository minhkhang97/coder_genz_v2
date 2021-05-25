import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAllCategories } from "../slice/categoriesSlice";

const ListCategoryPage = () => {
  const { categories, status } = useSelector(
    (state) => state.categoriesReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchAllCategories());
    })();
  }, []);

  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>error</div>;

  return (
    <div>
      <h1>danh sach danh muc</h1>
      <div className="text-right my-4">
        <p className="py-1 px-4 bg-indigo-500 text-white inline-block rounded-md capitalize text-sm font-medium">
          <Link to="/admin/categories/create">create category</Link>
        </p>
      </div>
      <div>
        <div class="bg-white grid grid-cols-6 gap-2 py-3 px-4 rounded-md uppercase font-medium text-sm text-gray-800">
          <span>
            <p>id</p>
          </span>
          <span>
            <p>tên danh muc</p>
          </span>
        </div>
        <div className="bg-white my-4 rounded-md uppercase font-semibold text-sm text-gray-900">
          {categories.map((el, index) => (
            <Link to={"/admin/categories/" + el._id} key={index}>
              <div class="px-4 grid grid-cols-6 border-b border-solid border-gray-200 py-3 hover:shadow-md hover:rounded-md capitalize">
                <span>
                  <p class="font-semibold text-gray-700">{index}</p>
                </span>
                <span>
                  <p>{el.name}</p>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default ListCategoryPage;
