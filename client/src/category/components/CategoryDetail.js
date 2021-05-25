import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import Input from "../../common/Input";
import {
  addProductForCategory,
  removeProductForCategory,
  setNameCatgory,
} from "../slice/categorySlice";
import { setActiveForProduct, setActiveInitForProduct } from "../../product/slice/productsSlice";

const CategoryDetail = ({ category, products }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveInitForProduct({ products: category.products }));
  }, []);
  return (
    <div>
      <Input
        type="text"
        lable="ten danh muc"
        value={category.name}
        onChange={(value) => dispatch(setNameCatgory({ name: value }))}
      />
      <div>
        <p>san pham</p>
        <div>
          <ul>
            {products
              .filter((el) => el.isActive === true)
              .map((el, index) => (
                <li
                  key={index}
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
                  <i className="fas fa-plus"></i>
                </li>
              ))}
          </ul>
          <div>
            <p>ddax chon</p>
            <ul>
              {category.products.map((el, index) => (
                <li
                  key={index}
                  onClick={() => {
                    dispatch(removeProductForCategory({ id: el._id }));
                    dispatch(setActiveForProduct({ id: el._id }));
                  }}
                >
                  {el.name} <i className="fas fa-minus"></i>{" "}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetail;
