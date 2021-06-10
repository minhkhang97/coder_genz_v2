import React, { useState } from "react";
import apiHandler from "../api/apiHandler";
import {useDispatch } from 'react-redux';
import { fetchCustomer } from "../customer/slice/customerSlice";

const Header = () => {
  const [isRegister, setRegister] = useState(false);
  const [isLogin, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfiguration, setPasswordConfiguration] = useState("");

  const [noti, setNoti] = useState([]);

  const dispatch = useDispatch();
  return (
    <div>
      {/* khi chua danh nhap */}
      <div>
        <div>
          <button
            onClick={() => {
              setLogin(true);
              setRegister(false);
              setNoti([]);
            }}
            className="px-4 py-1 text-sm uppercase font-medium text-white rounded-md bg-red-700"
          >
            Dang nhap
          </button>
          <button
            className="px-4 py-1 text-sm uppercase font-medium text-white rounded-md bg-red-700"
            onClick={() => {
              setRegister(true);
              setLogin(false);
              setNoti([]);
            }}
          >
            Dang ky
          </button>
        </div>

        {isRegister && (
          <div className="fixed bg-white inset-x-1/4 w-1/2 px-6 py-4 rounded-lg shadow-md">
            <p className="uppercase font-medium text-xl text-center">dang ky</p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await apiHandler.post("/customer/register", {
                  email,
                  password,
                  passwordConfiguration,
                });
                console.log(res);
                if (!res.success) {
                  setNoti([res.error]);
                }
              }}
            >
              <label className="flex flex-col text-sm">
                email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-1 px-2 py-1 rounded-md border border-solid border-gray-300"
                />
              </label>
              <label className="flex flex-col text-sm">
                mat khau
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-1 px-2 py-1 rounded-md border border-solid border-gray-300"
                />
              </label>
              <label className="flex flex-col text-sm">
                xac nhan mat khau
                <input
                  type="password"
                  onChange={(e) => setPasswordConfiguration(e.target.value)}
                  className="my-1 px-2 py-1 rounded-md border border-solid border-gray-300"
                />
              </label>
              <div>
                {noti && (
                  <div>
                    {noti.map((el, index) => (
                      <span className="block text-sm text-red-700" key={index}>
                        {el}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button
                  value="submit"
                  className="border-2 text-red-700 border-solid border-red-700 px-3 rounded-md py-1"
                >
                  dang ky
                </button>
              </div>
            </form>
            <p
              onClick={() => {
                setRegister(false);
                setNoti([]);
              }}
            >
              tat
            </p>
          </div>
        )}

        {isLogin && (
          <div className="fixed bg-white inset-x-1/4 w-1/2 px-6 py-4 rounded-lg shadow-md">
            <p className="uppercase font-medium text-xl text-center">
              dang nhap
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const res = await apiHandler.post("/customer/login", {
                  email,
                  password,
                });
                console.log(res);
                if (!res.success) {
                  setNoti([res.error]);
                } else {
                  localStorage.setItem("accessToken", res.token.accessToken);
                  await dispatch(fetchCustomer());
                }
              }}
            >
              <label className="flex flex-col text-sm">
                email
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  className="my-1 px-2 py-1 rounded-md border border-solid border-gray-300"
                />
              </label>
              <label className="flex flex-col text-sm">
                mat khau
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="my-1 px-2 py-1 rounded-md border border-solid border-gray-300"
                />
              </label>
              <div>
                {noti && (
                  <div>
                    {noti.map((el, index) => (
                      <span className="block text-sm text-red-700" key={index}>
                        {el}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-center">
                <button
                  value="submit"
                  className="border-2 text-red-700 border-solid border-red-700 px-3 rounded-md py-1"
                >
                  dang nhap
                </button>
              </div>
            </form>
            <p
              onClick={() => {
                setNoti([]);
                setLogin(false);
              }}
            >
              tat
            </p>
          </div>
        )}
      </div>

      {/* khi da dang nhap */}
      <div></div>
    </div>
  );
};

export default Header;
