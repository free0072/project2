import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImg from "../assets/register.svg";
import { GlobalState } from "../middlewares/global-states";
import Cookies from "js-cookie";
import axios from "axios";

const Signup = ({currentRole}) => {
  const { dispatch } = useContext(GlobalState);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .post(`${process.env.REACT_APP_API_URL}/user/create`, {
        name: name,
        email: email,
        password: password,
        role: {currentRole}
      })
      .then((res) => {
        Cookies.set("authToken", res.data.token);
        console.log(res.data);
        dispatch({ type: "FIRE_MODAL", payload: "" });
        navigate(`/${currentRole}`);
      })
      .catch((err) => alert(err.message));
    setIsLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center split-bg">
      <div className="max-w-6xl w-full flex justify-between ">
        <div className="w-1/2">
          <img className="-top-10 w-full" src={heroImg} alt="heroImg" />
        </div>
        <div className="w-1/2 flex flex-col justify-center bg-whitee">
          <form onSubmit={handleSubmit} className="p-8">
            <div className="space-y-3">
              <h3 className="text-4xl text-blackk mb-4">Sign up as {currentRole}</h3>
              <label htmlFor="name" className="flex flex-col">
                <span className="text-2xl">Name</span>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
              <label htmlFor="uid" className="flex flex-col">
                <span className="text-2xl">UID</span>
                <input
                  type="text"
                  id="uid"
                  className="input-form"
                  placeholder="UID"
                  value={uid}
                  onChange={(e) => setUid(e.target.value)}
                />
              </label>
              <label htmlFor="email" className="flex flex-col">
                <span className="text-2xl">Email</span>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="input-form"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="password" className="flex flex-col">
                <span className="text-2xl">Password</span>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  className="input-form"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div className="my-6 space-y-3">
              <button
                type="submit"
                className={`w-full py-4 bg-primary rounded-md text-whitee font-bold ${
                  isLoading ? "opacity-60" : ""
                }`}
                disabled={isLoading}
              >
                {!isLoading ? "Sign up" : "Submiting..."}
              </button>
              <p className="font-bold text-center">
                Already have an account?
                <span
                  className="text-primary cursor-pointer"
                  onClick={(e) => navigate(`/${currentRole}/verify`)}
                >
                  Login Now
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
