import React, { useState,useContext } from "react";
import loginBg from "../sources/signinBg.jpg";
import icon from "../sources/icon.png";
import { useNavigate } from "react-router-dom";
import context  from "../contextAPI/context";


export default function Login() {
  const alertContext = useContext(context)
  const {showAlert} = alertContext

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
 
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const json = await response.json();
    if (!json.success) {
      if(json.error){
        showAlert( json.error, "danger")
      }else{
        showAlert( "Invelid credentials", "danger")
      }
    } else {
      const token = json.token;
      localStorage.setItem("blogToken", token);
      showAlert("Login Successfully.", "success")
      navigate("/");
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
          top: "22%",
          left: "38%",
        }}
      >
        <div className="form-signin">
          <form className="">
            <img className="mb-4" src={icon} alt="" width="100" />
            <h1 className="h3 mb-3 text-white fw-normal">Please sign in</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={credentials.email}
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
                value={credentials.password}
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
              Sign in
            </button>
            <p className="mt-4 mb-3 text-white">© 2023</p>
          </form>
        </div>
      </div>
    </>
  );
}
