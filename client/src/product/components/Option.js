import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { setValueForOption, removeOption } from "../slice/productSlice";

const Option = ({ optionId, propertyId }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="py-1 group flex justify-between items-center"
    >
      <input
        type="text"
        placeholder="nhập giá trị"
        className="w-11/12 py-2 px-4 bg-white-50 rounded-md text-gray-900 outline-none"
        onChange={(e) =>
          dispatch(
            setValueForOption({
              propertyId,
              optionId,
              value: e.target.value,
            })
          )
        }
      />
      <div className="w-1/12 text-center">
        <button
          onClick={() =>
            dispatch(
              removeOption({
                propertyId,
                optionId,
              })
            )
          }
        >
          <i className="text-lg opacity-0 group-hover:opacity-100 hover:text-indigo-700 far fa-trash-alt"></i>
        </button>
      </div>
    </div>
  );
};

Option.propTypes = {};

export default Option;
