import React, { useEffect, useState } from "react";
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
        defaultValue={value}
      >
        {list.map((el, index) => (
          <option key={index} value={el.code} label={el.mess}>{el.mess}</option>
        ))}
      </select>
    </div>
  );
};

Select.propTypes = {};

export default Select;
