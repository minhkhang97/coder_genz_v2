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
    <div>
      <div className="flex">
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
        <div>
          <p>xác nhận thông tin</p>
          <div>
            <input
              type="text"
              placeholder="ho va ten"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <input
              type="text"
              placeholder="so dien thoai"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="text"
              placeholder="ho va ten"
              value={specific_address}
              onChange={(e) => setSpecificAddress(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Cart cart={cart} />
        </div>
      </div>
      <button
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
        xac nhan don hang
      </button>
    </div>
  );
};

export default ThanhToanPage;
