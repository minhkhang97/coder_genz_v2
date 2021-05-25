import Input from "../../common/Input";
import { useDispatch } from "react-redux";
import {
  addProperty,
  setName,
  setPrice,
  setIntroduce,
  setDescription,
  postProduct,
  setDiscount,
  setPhotos,
  setQuantity,
  setStatus,
  setPublic,
  addCategory,
  removeCategory,
} from "../slice/productSlice";
import Upload from "../../common/Upload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Property from "./Property";
import Select from "../../common/Select";
import { useEffect, useState } from "react";
import { setActive, setActiveInit } from "../../category/slice/categoriesSlice";

const ProductDetail = ({ product, categories }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveInit({ categories: product.categories }));
  }, []);

  const [search, setSearch] = useState("");

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];
  return (
    <div>
      <div className="flex justify-end">
        <button
          className="mx-4 py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
          onClick={() => dispatch(setPublic())}
        >
          công khai
        </button>
      </div>

      <div className="flex">
        <div className="w-2/3">
          <Input
            label="tên sản phẩm"
            type="text"
            value={product.name}
            onChange={(value) => dispatch(setName({ name: value }))}
          />
          <div>
            <p className="font-semibold text-sm text-gray-900 py-1 capitalize">
              giới thiệu
            </p>
            <ReactQuill
              theme="snow"
              value={product.introduce}
              onChange={(value) => dispatch(setIntroduce({ introduce: value }))}
            />
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-900 py-1 capitalize">
              mô tả chi tiết
            </p>
            <ReactQuill
              modules={modules}
              formats={formats}
              value={product.description}
              theme="snow"
              onChange={(value) =>
                dispatch(setDescription({ description: value }))
              }
            />
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900 py-1 capitalize">
              hình ảnh
            </p>
            <Upload
              value={product.photos}
              onChange={(value) => {
                console.log(value);
                dispatch(setPhotos({ photos: value }));
              }}
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 capitalize py-1">
              thuộc tính
            </p>
            <div className="">
              {product.properties.map((property, index) => (
                <Property
                  key={index}
                  index={index}
                  propertyId={property.id}
                  isRequire={property.isRequire}
                  options={property.options}
                  name={property.name}
                  quantityMax={property.quantityMax}
                  quantityMin={property.quantityMin}
                />
              ))}
            </div>
            <button
              onClick={() => dispatch(addProperty())}
              className="py-2 px-4 rounded-xl shadow-md text-xs bg-indigo-600 text-white font-semibold tracking-wider uppercase"
            >
              thêm thuộc tính
            </button>
          </div>
        </div>

        <div className="w-1/3 ml-4">
          <Input
            label="giá bán"
            type="number"
            value={product.price}
            onChange={(value) => dispatch(setPrice({ price: value }))}
          />
          <Input
            label="giảm giá"
            type="number"
            value={product.discount}
            onChange={(value) => dispatch(setDiscount({ discount: value }))}
          />
          <Input
            label="số lượng tồn kho"
            type="number"
            value={product.quantity}
            onChange={(value) => dispatch(setQuantity({ quantity: value }))}
          />

          <Select
            value={product.status.code}
            label="trình trạng"
            list={[
              { code: "001", mess: "còn hàng" },
              { code: "002", mess: "hết hàng" },
              { code: "003", mess: "ngưng bán" },
            ]}
            onChange={(value) =>
              dispatch(setStatus({ status: { code: value, mess: "" } }))
            }
          />

          <div className="flex flex-col">
            <p>danh mục</p>
            <input
              placeholder="search..."
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
            <div>
              <ul>
                {categories
                  .filter((el) => el.isActive === true)
                  .map((el, index) => (
                    <li key={index}>
                      {el.name}
                      <i
                        className="fas fa-plus"
                        onClick={() => {
                          dispatch(
                            addCategory({
                              category: { _id: el._id, name: el.name },
                            })
                          );
                          dispatch(setActive({ id: el._id }));
                        }}
                      ></i>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p>ddax chon</p>
              <ul>
                {product.categories.map((el, index) => (
                  <li key={index}>
                    {el.name}{" "}
                    <i
                      className="fas fa-minus"
                      onClick={() => {
                        dispatch(removeCategory({ id: el._id }));
                        dispatch(setActive({ id: el._id }));
                      }}
                    ></i>{" "}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
