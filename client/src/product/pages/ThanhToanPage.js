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
  return (
    <div>
      <div className="flex">
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
          await dispatch(
            postOrder({ contact: { fullname, phone, specific_address }, cart })
          );
        }}
      >
        xac nhan don hang
      </button>
    </div>
  );
};

export default ThanhToanPage;
