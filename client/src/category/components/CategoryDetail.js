import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/Input";
import {
  addProductForCategory,
  removeProductForCategory,
  setNameCatgory,
} from "../slice/categorySlice";
import {
  setActiveForProduct,
  setActiveInitForProduct,
} from "../../product/slice/productsSlice";

const CategoryDetail = ({ category, products }) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Input
        type="text"
        lable="ten danh muc"
        value={category.name}
        onChange={(value) => dispatch(setNameCatgory({ name: value }))}
      />
      <div className="bg-white rounded-md py-2 px-4">
        <p className="uppercase font-medium">sản phẩm</p>
        <div className="flex my-2">
          {products
            .filter((el) => el.isActive === true)
            .map((el, index) => (
              <p
                key={index}
                className="px-2 cursor-pointer uppercase text-sm font-medium rounded-md text-gray-900 bg-gray-300 mr-4 "
                onClick={() => {
                  dispatch(
                    addProductForCategory({
                      product: { _id: el._id, name: el.name },
                    })
                  );
                  dispatch(setActiveForProduct({ id: el._id }));
                }}
              >
                {el.name}
                <i className="fas fa-plus text-xs ml-1"></i>
              </p>
            ))}
        </div>
        <div>
          <div>
            <p className="uppercase font-medium">đã chọn</p>
            <div className="flex my-2">
            {category.products.map((el, index) => (
                <p
                  key={index}
                  className="px-2 cursor-pointer uppercase text-sm font-medium rounded-md text-indigo-50 bg-indigo-400 mr-4 "
                  onClick={() => {
                    dispatch(removeProductForCategory({ id: el._id }));
                    dispatch(setActiveForProduct({ id: el._id }));
                  }}
                >
                  {el.name} <i className="fas fa-minus text-xs ml-1"></i>{" "}
                </p>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
