import React, { useState,useContext } from "react";
import loginBg from "../sources/signinBg.jpg";
import icon from "../sources/icon.png";
import { useNavigate } from "react-router-dom";
import context  from "../contextAPI/context";


export default function Signup() {
  const alertContext = useContext(context)
  const {showAlert} = alertContext
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUser({ ...user, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const json = await response.json();
    if (!json.success) {
      if (json.error) {
        showAlert( json.error, "danger")
      } else {
        showAlert( "Invelid credentials", "danger")
      }
    } else {
      showAlert("Login Successfully.", "success")
      navigate("/login");
    }
  };
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "83%",
          backgroundImage: `url("${loginBg}")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
          backgroundPosition: "0% 0%",
          position: "absolute",
          filter: "brightness(0.5)",
          top: "6%",
          left: "0",
        }}
      ></div>
      <div
        className="container text-center"
        style={{
          width: "24%",
          maxHeight: "25%",
          position: "absolute",
          zIndex: "100",
          top: "15%",
          left: "38%",
        }}
      >
        <div className="form-signin">
          <form className="">
            <img className="mb-4" src={icon} alt="" width="100" />
            <h1 className="h3 mb-3 text-white fw-normal">Please sign up</h1>

            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={user.name}
                onChange={handleOnChange}
                placeholder="Full Name"
              />
              <label htmlFor="name">Full Name</label>
            </div>
            <div className="form-floating">
              <input
                type="phone"
                className="form-control"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={user.email}
                onChange={handleOnChange}
                placeholder="name@example.com"
              />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={user.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
              <label htmlFor="password">Password</label>
            </div>

            <div className="checkbox text-white mb-3 my-1">
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <button
              className="w-100 btn btn-lg btn-primary"
              type="submit"
              onClick={handleOnSubmit}
            >
              Sign up
            </button>
            <p className="mt-4 mb-3 text-white">© 2023</p>
          </form>
        </div>
      </div>
    </>
  );
}
