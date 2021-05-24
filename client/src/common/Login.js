
import React from "react";
import { useState } from "react";
import { login } from "../api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <h1>dang nhap</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          //await dispatch(fetchLogin({email, password}));
          const data = await login(email, password);
          console.log(data);
          localStorage.setItem('accessToken', data.token.accessToken);
        }}
      >
        <div>
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;