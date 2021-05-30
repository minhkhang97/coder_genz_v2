import React from "react";
import { useState } from "react";
import { useHistory } from "react-router";
import { login } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();
  const [password, setPassword] = useState("");
  return (
    <div className="bg-indigo-200 h-screen flex">
      <div className="bg-white w-1/2 py-6 px-6 m-auto rounded-md justify-center items-center shadow-md">
        <h1 className="text-center uppercase font-semibold text-2xl">Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            //await dispatch(fetchLogin({email, password}));
            const data = await login(email, password);
            console.log(data);
            localStorage.setItem("accessToken", data.token.accessToken);
            history.push('/admin');

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
          <div className="flex flex-col my-1">
            <label>Password</label>
            <input
              className="border border-solid outline-none border-gray-500 rounded-md py-1 px-2"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center mt-4">
            <button type="submit" className="bg-indigo-700 py-2 px-8 rounded-md shadow-md text-white uppercase font-semibold">login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
