import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div className="w-2/12 bg-green-50 flex flex-col items-center cursor-pointer text-gray-800">
      <div className="my-6">
        <h1 className="capitalize text-2xl font-bold">
          coder gen<span className="uppercase">z</span>
        </h1>
      </div>
      <div className="capitalize tracking-wide font-semibold text-gray-500 text-sm">
        <div className="my-2">
          <p className="py-2 px-2 rounded-md hover:bg-green-100 hover:text-gray-900">
            <i class="fas fa-pager pr-2"></i>dashboard
          </p>
        </div>
        <div className="">
          <p className="py-2 px-2 rounded-md ">
            <i class="fas fa-pager pr-2"></i>page
          </p>
          <ul className="text-sm pl-6">
            <li className="hover:">home</li>
            <li>new feed</li>
            <li>about us</li>
          </ul>
        </div>
        <div className="">
          <p className="py-2 px-2 rounded-md ">
            <i class="fas fa-pager pr-2"></i>e-commerce
          </p>
          <ul className="text-sm pl-6">
            <li className=""><Link to="/admin/products/">product</Link></li>
            <li><Link to="/admin/category">Category</Link></li>
            <li>order</li>
          </ul>
        </div>
        <div>
          <p className="py-2 px-2 rounded-md ">
            <i class="fas fa-pager pr-2"></i>customer
          </p>
        </div>
        <div>
          <p className="py-2 px-2 rounded-md ">
            <i class="fas fa-pager pr-2"></i>message
          </p>
        </div>
      </div>
    </div>
  );
};

Home.propTypes = {};

export default Home;
