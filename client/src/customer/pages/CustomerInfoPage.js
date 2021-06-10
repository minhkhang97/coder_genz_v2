import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { fetchCustomer } from "../slice/customerSlice";

const CustomerInfoPage = () => {
  const { customer, status } = useSelector((state) => state.customerReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(fetchCustomer());
    })();
  }, [dispatch]);

  if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <Redirect to="/menu" />;
  return (
    <div>
      <p>{customer.email}</p>

      <div>
        <p>don hang da dat</p>
        <div>
          {customer.orders.map((el, index) => (
            <div
              key={index}
              className="border-solid border bg-red-50 my-4 border-red-200 shadow-md py-2 px-4 rounded-md"
            >
              <div>
                <p className="uppercase text-red-700 text-sm font-medium">
                  Thông tin giao hàng
                </p>
                <div className="px-8">
                  <p className="font-medium">
                    Họ và tên:{" "}
                    <span className="font-normal">{el.contact.fullname}</span>
                  </p>
                  <p className="font-medium">
                    Số điện thoại:{" "}
                    <span className="font-normal">{el.contact.phone}</span>
                  </p>
                  <p className="font-medium">
                    Địa chỉ:{" "}
                    <span className="font-normal">
                      {el.contact.specific_address}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <p className="uppercase font-medium text-sm text-red-700">
                  Đơn hàng
                </p>
                {el.order_details.map((order_detail, index2) => (
                  <div className="px-8">
                    <div>
                      <p className="uppercase font-semibold text-gray-800">{order_detail.name}</p>
                    </div>

                    <div className="ml-4">
                      {order_detail.properties.map((property, index3) => (
                        <div className="text-xs uppercase">
                          <div className="flex" key={index3}>
                            <p className="text-gray-600">{property.name}</p>
                            <div className="flex flex-col ml-4">
                              {property.options.map((option, index4) => (
                                <p key={index4}>
                                  {option.value} x {option.amount}
                                </p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex font-medium text-gray-800">
                      <p>Số lượng: {order_detail.quantity}</p>
                      <p className="mx-6">Thành tiền: {order_detail.price} VNĐ</p>
                    </div>
                  </div>
                ))}

                <p className="my-2 font-medium text-red-700">Tổng tiền: {el.totalPrice} VND</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoPage;
