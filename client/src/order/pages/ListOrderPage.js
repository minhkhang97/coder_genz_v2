import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrder } from '../slice/orderSlice';
import {Link} from 'react-router-dom';

const ListOrderPage = () => {
    const {status, orders} = useSelector(state => state.ordersReducer)
    const dispatch = useDispatch();
    useEffect(() => {
        (async() => {
            await dispatch(fetchAllOrder());
        })()
    }, [])
    if (status === "loading") return <div>loading</div>;
  if (status === "failed") return <div>error</div>;
    return (
        <div>
            <div className="bg-indigo-50 p-6">
      <div class="mb-1 mt-5">
        <h1 class="uppercase text-xl font-semibold text-gray-800 tracking-wide ">
          đơn hàng
        </h1>
      </div>
      <div class="bg-white grid grid-cols-6 gap-2 py-3 px-4 rounded-md uppercase font-medium text-sm text-gray-800">
        <span>
          <p>id</p>
        </span>
        <span>
          <p>họ tên</p>
        </span>
        <span>
          <p>số điện thoại</p>
        </span>
        <span>
          <p>địa chỉ</p>
        </span>
        <span>
          <p>tổng tiền</p>
        </span>
        <span>
          <p>trạng thái</p>
        </span>
      </div>
      <div className="bg-white my-4 rounded-md uppercase font-semibold text-sm text-gray-900">
        {orders.map((el, index) => (
          <Link to="" key={index}>
            <div class="px-4 grid grid-cols-6 border-b border-solid border-gray-200 py-3 hover:shadow-md hover:rounded-md capitalize">
              <span>
                <p class="font-semibold text-gray-700">{index}</p>
              </span>
              <span>
                <p>{el.contact.fullname}</p>
              </span>
              <span>
                <p class="text-red-700">{el.contact.phone}</p>
              </span>
              <span>
                <p class="text-red-700">{el.specific_address}</p>
              </span>
              <span>
                <p>{el.totalPrice}</p>
              </span>
              <span>
                <p>{el.status.mess}</p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
        </div>
    )
}

export default ListOrderPage
