import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Cart from "../components/Cart";
import { postOrder } from "../slice/cartSlice";

const ThanhToanPage = () => {
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState("");
  const [specific_address, setSpecificAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [noti, setNoti] = useState([]);
  return (
    <div className="bg-red-100">
      <div className="w-4/5 m-auto">
      <div className="flex bg-white p-4 rounded-lg">
        {noti.length > 0 && (
          <div className="bg-white fixed inset-x-1/2 w-1/4 p-6 rounded-md shadow-md text-center">
            {noti.map((el) => (
              <p className="text-red-700 font-medium">{el}</p>
            ))}
            <button
              onClick={() => setNoti([])}
              className="rounded-md my-2 px-4 py-1 uppercase font-medium text-sm bg-red-700 text-white"
            >
              Đồng ý
            </button>
          </div>
        )}
        <div className="w-1/2 mr-8">
          <p>xác nhận thông tin</p>
          <div>
            <label className="my-2 font-medium flex-col flex">
              Họ và tên
              <input
                className="border border-gray-300 border-solid rounded-md px-3"
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </label>
            <label className="my-2 font-medium flex-col flex">
              Số điện thoại
              <input
                className="border border-gray-300 border-solid rounded-md px-3"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label className="my-2 font-medium flex-col flex">
              Địa chỉ
              <input
                className="border border-gray-300 border-solid rounded-md px-3"
                type="text"
                value={specific_address}
                onChange={(e) => setSpecificAddress(e.target.value)}
              />
            </label>
          </div>
        </div>
        <div className="w-1/2 ml-8">
          <Cart cart={cart} />
        </div>
      </div>
      <button
      className="my-4 bg-red-700 text-white rounded-md shadow-md py-2 px-6 font-medium uppercase text-sm"
        onClick={async () => {
          if (cart.length < 1) {
            setNoti(["vui lòng thêm sản phẩm vào giỏ hàng"]);
          } else {
            const res = await dispatch(
              postOrder({
                contact: { fullname, phone, specific_address },
                cart,
              })
            );
            const data = unwrapResult(res);
            console.log(data);
            if (data.error) {
              setNoti(data.error);
            } else {
              setNoti(["thêm sản phẩm thành công"]);
            }
          }
        }}
      >
        xác nhận đơn hàng
      </button>
      </div>
    </div>
  );
};

export default ThanhToanPage;
