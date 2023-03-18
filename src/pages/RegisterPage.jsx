import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { serverPort } from "../Port";

export const RegisterPage = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

   const  registerUser = async (ev) => {
    ev.preventDefault();
    // console.log(ev.target.value);
    try {
      await axios.post(`${serverPort}/register`, {
        name,
        email,
        password
      });
      alert('Registration successful. Now you can login.')
    } catch(e) {
      alert('Registration fails. Please try again later.')
    }
    
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="-mt-16">
        <h1 className="text-4xl text-center mb-4 font-bold">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(ev) => setname(ev.target.value)}
          />
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
          <button className="primary">Register</button>

          <div className="text-center py-2 text-gray-500">
            Allready a member{" "}
            <Link className="underline text-black" to={"/login"}>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
