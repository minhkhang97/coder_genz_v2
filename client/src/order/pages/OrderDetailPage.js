import { unwrapResult } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import apiHandler from "../../api/apiHandler";
import {
  fetchOrderDetailById,
  setInitOrderDetails,
} from "../slice/orderDetailSlice";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { orderDetails, status } = useSelector(
    (state) => state.orderDetailsReducer
  );
  const dispatch = useDispatch();
  const [trangThai, setTrangThai] = useState({});
  const [noti, setNoti] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await dispatch(fetchOrderDetailById(id));
      // const data = unwrapResult(res);
      // dispatch(setInitOrderDetails(data));
    })();
  }, [id, dispatch]);

  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>error</div>;

  return (
    <div>
      <p className="uppercase text-xl font-medium my-2">Chi tiết đơn hàng</p>
      <button
        onClick={async () => {
          const res = await apiHandler.put(`/order/${id}`, {
            status: trangThai,
          });
          if (!res.success) setNoti([res.error]);
          else setNoti(["cập nhật đơn hàng thành công"]);
        }}
        className="mb-2 py-1 px-4 rounded-md bg-indigo-600 text-white font-medium"
      >
        cập nhật
      </button>
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
        <p className="uppercase text-red-700 font-medium text-sm">
          Thông tin giao hàng
        </p>
        <div className="px-8">
          <p className="font-medium">
            Họ và tên:{" "}
            <span className="font-normal">
              {orderDetails.contact?.fullname}
            </span>
          </p>
          <p className="font-medium">
            Số điện thoại:{" "}
            <span className="font-normal">{orderDetails.contact?.phone}</span>
          </p>
          <p className="font-medium">
            Địa chỉ:{" "}
            <span className="font-normal">
              {orderDetails.contact?.specific_address}
            </span>
          </p>
        </div>
        <div>
          <p className="uppercase font-medium text-sm text-red-700">Đơn hàng</p>
          {orderDetails?.order_details?.map((order_detail, index2) => (
            <div className="px-8" key={index2}>
              <div>
                <p className="uppercase font-semibold text-gray-800">
                  {order_detail?.name}
                </p>
              </div>

              <div className="ml-4">
                {order_detail.properties?.map((property, index3) => (
                  <div className="text-xs uppercase" key={index3}>
                    <div className="flex">
                      <p className="text-gray-600">{property?.name}</p>
                      <div className="flex flex-col ml-4">
                        {property?.options?.map((option, index4) => (
                          <p key={index4}>
                            {option?.value} x {option?.amount}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex font-medium text-gray-800">
                <p>Số lượng: {order_detail?.quantity}</p>
                <p className="mx-6">Thành tiền: {order_detail?.price} VNĐ</p>
              </div>
            </div>
          ))}

          <p className="my-2 font-medium text-red-700">
            Tổng tiền: {orderDetails?.totalPrice} VND
          </p>
        </div>

        <div>
          <p>Trạng thái đơn hàng</p>
          <select
            defaultValue={
              orderDetails?.status
                ? orderDetails?.status[orderDetails?.status?.length - 1]?.code
                : "001"
            }
            onChange={(e) => {
              if (e.target.value === "001")
                setTrangThai({ code: "001", mess: "chờ xác nhận" });
              else setTrangThai({ code: "002", mess: "đã xác nhận" });
            }}
          >
            <option value="001">chờ xác nhận</option>
            <option value="002">đã xác nhận</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
