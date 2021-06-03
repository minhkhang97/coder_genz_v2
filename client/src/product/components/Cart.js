import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  removeOrder,
  minusAmountOrder,
  plusAmountOrder,
} from "../slice/cartSlice";

const Cart = ({ cart }) => {
  const dispatch = useDispatch();
  const getTotalPriceCart = (cart) => {
    const totalPrice = cart.reduce(
      (acc, curr) => acc + curr.price * curr.amount,
      0
    );
    return totalPrice;
  };
  const getTotalAmountCart = (cart) => {
    const totalAmount = cart.reduce((acc, curr) => acc + curr.amount, 0);
    return totalAmount;
  };
  return (
    <div>
      <p>Thông tin giỏ hàng</p>
      <div>
        <div className="uppercase">
          {cart.map((order, index) => (
            <div
              key={index}
              className="mb-2 py-2 border-b border-solid border-gray-200"
            >
              <div className="flex justify-between">
                <h4 className="text-md font-semibold text-sm pb-2">
                  {order.name}
                </h4>
                <button onClick={() => dispatch(removeOrder(order.id))}>
                  <i class="far fa-trash-alt text-gray-500 text-sm"></i>
                </button>
              </div>
              <div>
                {order.properties.map((el, index2) => (
                  <div key={index2} className="flex text-xs">
                    <p className="text-xs w-1/4 font-light text-gray-500">
                      {el.name}
                    </p>
                    <div className="w-3/4 flex flex-col">
                      {el.options.map((el2, index3) => (
                        <span key={index3}>
                          {el2.value} x {el2.amount}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between my-1">
                <div className="flex">
                  <button onClick={() => dispatch(minusAmountOrder(order.id))}>
                    <i className="fas fa-minus text-white text-xs p-1 bg-red-700 rounded-full"></i>
                  </button>
                  <span className="mx-2">{order.amount}</span>
                  <button onClick={() => dispatch(plusAmountOrder(order.id))}>
                    <i className="fas fa-plus text-white text-xs p-1 bg-red-700 rounded-full"></i>
                  </button>
                </div>
                <div className="">
                  <p>{Number(order.price) * Number(order.amount)} vnd</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between my-2">
          <p>Tổng {getTotalAmountCart(cart)} món</p>
          <p className="text-red-700">{getTotalPriceCart(cart)} vnd</p>
        </div>
        <Link to="/thanh-toan">
          <button className="block w-full font-medium uppercase py-2 px-4 bg-red-700 text-white rounded-md">
            Đặt hàng
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
