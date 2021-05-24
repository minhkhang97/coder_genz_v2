import React from "react";
import PropTypes from "prop-types";

const Select = ({ label, list, onChange, value }) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-semibold text-gray-900 capitalize py-1">
        {label}
      </label>
      <select
        className="p-2 border border-solid border-gray-400 rounded-xl outline-none"
        onChange={(e) => {onChange(e.target.value)}}
      >
        {list.map((el) => (
          <option value={el.code} label={el.mess} defaultChecked={value === el.code && true} >{el.mess}</option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {};

export default Select;
