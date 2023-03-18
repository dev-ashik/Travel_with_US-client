import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { serverPort } from "../Port";
import { UserContext } from "../UserContext";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUser } = useContext(UserContext);

  const handleLoginSubmit = async (ev) => {
    ev.preventDefault();

    try {
      const response = await axios.post(`${serverPort}/login`, { email, password }, {withCredentials: true});
      setUser(response.data);
      // console.log(response.data);
      alert("Login Successful");
      setRedirect(true);
    } catch (e) {
      alert("Login faild");
    }
  };

  if(redirect) {
    return <Navigate to={'/'} />
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-16">
        <h1 className="text-4xl text-center mb-4 font-bold">Login</h1>
        <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="primary">Login</button>

          <div className="text-center py-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
