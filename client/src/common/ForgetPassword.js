import React, { useState } from "react";
import { forgetPassword } from "../api/authApi";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [noti, setNoti] = useState([]);
  return (
    <div className="bg-indigo-200 h-screen flex">
      <div className="bg-white w-1/2 py-6 px-6 m-auto rounded-md justify-center items-center shadow-md">
        <h1 className="text-center uppercase font-semibold text-2xl">
          Quên mật khẩu
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            //await dispatch(fetchLogin({email, password}));
            const data = await forgetPassword(email);
            console.log(data);
            if (data.error) {
              setErrors(data.error);
            } else {
              setNoti([...noti, "Mật khẩu đã được gủi lại qua email, vui lòng kiểm tra"]);
            }
          }}
        >
          <div className="flex flex-col my-1">
            <label className="">Email</label>
            <input
              className="border border-solid outline-none border-gray-500 rounded-md py-1 px-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <ul>
            {errors.map((el, index) => (
              <li key={index} className="text-red-700 text-sm">
                {el}
              </li>
            ))}
          </ul>
          <ul>
            {noti.map((el, index) => (
              <li key={index} className="text-green-600  text-sm">
                {el}
              </li>
            ))}
          </ul>
          <div className="text-center mt-4">
            <button
              type="submit"
              className="bg-indigo-700 py-2 px-8 rounded-md shadow-md text-white uppercase font-semibold"
            >
              quên mật khẩu
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
