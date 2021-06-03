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

  const [search, setSearch] = useState("");

  // useEffect(() => {
  //   dispatch(setActiveInit({ categories: product.categories }));
  // }, [product, dispatch]);

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
          className={`mx-4 py-1 px-4 rounded-md text-white font-medium ${
            product.isPublic ? "bg-indigo-600" : "bg-gray-600"
          }`}
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
                //console.log(value);
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

          <div className="bg-white rounded-md py-2 px-4 my-4">
            <p className="uppercase font-medium">danh mục</p>
            <div className="flex my-2">
              {categories
                .filter((el) => el.isActive === true)
                .map((el, index) => (
                  <p
                    onClick={() => {
                      dispatch(
                        addCategory({
                          category: { _id: el._id, name: el.name },
                        })
                      );
                      dispatch(setActive({ id: el._id }));
                    }}
                    key={index}
                    className="px-2 cursor-pointer uppercase text-sm font-medium rounded-md text-gray-900 bg-gray-300 mr-4 "
                  >
                    {el.name}
                    <i className="fas fa-plus text-xs ml-1"></i>
                  </p>
                ))}
            </div>
            <div className="">
              <p className="uppercase font-medium">đã chọn</p>
              <div className="flex my-2">
                {product.categories.map((el, index) => (
                  <p
                    key={index}
                    className="px-2 cursor-pointer uppercase text-sm font-medium rounded-md text-indigo-50 bg-indigo-400 mr-4 "
                    onClick={() => {
                      dispatch(removeCategory({ id: el._id }));
                      dispatch(setActive({ id: el._id }));
                    }}
                  >
                    {el.name} <i className="fas fa-minus text-xs"></i>{" "}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
