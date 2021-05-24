import React from "react";
import PropTypes from "prop-types";
import Input from "../../common/Input";
import { useDispatch } from "react-redux";
import {
  removeProperty,
  setNameForProperty,
  setRequireForProperty,
  setQuantityMaxForPropety,
  setQuantityMinForPropety,
  addOption,
} from "../slice/productSlice";
import Option from "./Option";

const Property = ({ propertyId, isRequire, options, name, quantityMax, quantityMin }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-indigo-200 relative border border-solid border-indigo-300 shadow-lg py-2 px-4 my-3 rounded-md">
      <span
        className="absolute top-0 right-0 cursor-pointer"
        onClick={() => dispatch(removeProperty({ propertyId }))}
      >
        <i className="far fa-times-circle text-2xl"></i>
      </span>
      <Input
        id="tt1"
        label="tên thuộc tính"
        type="text"
        value={name}
        onChange={(value) =>
          dispatch(
            setNameForProperty({
              propertyId,
              name: value,
            })
          )
        }
      />
      <div className="flex items-center">
        <label className="my-1 capitalize font-semibold text-sm">
          bắt buộc
        </label>
        <input
          type="checkbox"
          defaultChecked={isRequire}
          className="mx-8 w-6 h-6"
          onChange={() => dispatch(setRequireForProperty({ propertyId }))}
        />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="số lượng tối đa"
          type="number"
          value={quantityMax}
          onChange={(value) =>
            dispatch(
              setQuantityMaxForPropety({
                propertyId,
                quantityMax: value,
              })
            )
          }
        />
        <Input
          label="số lượng tối thiểu"
          type="number"
          value={quantityMin}
          onChange={(value) =>
            dispatch(
              setQuantityMinForPropety({
                propertyId,
                quantityMin: value,
              })
            )
          }
        />
      </div>
      <p className="capitalize font-semibold text-sm">giá trị</p>
      <div>
        {options.map((option, index) => (
          <Option key={index} propertyId={propertyId} optionId={option.id} value={option.value}/>
        ))}
      </div>
      <div className="text-center py-2 ">
        <button
          className="outline-none py-1 px-2 uppercase text-xs font-semibold border-2 rounded-xl text-indigo-800 border-solid border-indigo-700 bg-indigo-50"
          onClick={() => dispatch(addOption({ propertyId }))}
        >
          thêm giá trị
        </button>
      </div>
    </div>
  );
};

Property.propTypes = {};

export default Property;
