import React, { useContext, useEffect, useState } from "react";
import { Contanier } from "./login";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaGoogle,
  FaTwitter,
  FaCheck,
} from "react-icons/fa";

import Loading from "./loading";
import { CartContext } from "../context/context";
import DashBoard from "./dashbord";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(load);

  function isValidEmail(email_) {
    setEmail(email_);
    return /\S+@\S+\.\S+/.test(email_);
  }
  const checkEmailVaild = (e) => {
    if (!isValidEmail(e.target.value)) {
      setErrorEmail("Email is invalid");
    } else {
      setCheckEmail(<FaCheck />);
      setLoad(true);
    }

    setMessage(e.target.value);
  };

  const { minutes, setMinutes,onLogin } = useContext(CartContext);

  function SignUp_Details() {
  
    const obj = {
      name: name,
      email: email,
      password: password,
      token: name + password,
      
    };
    let arr1 = [];

    if (email === "" && name === "" && password === "") {
      return;
    } else if (localStorage.getItem("userRegister")) {
      arr1 = [...JSON.parse(localStorage.getItem("userRegister"))];
    }
    arr1 = [...arr1, obj];
    localStorage.setItem("userRegister", JSON.stringify(arr1));
    onLogin()
    return arr1;
   
  }

  function Submit() {
    const tt = new Date().getTime() + 5 * 60 * 1000;
    setMinutes(tt);
    const obj = {
      min: minutes,
    };
    localStorage.setItem("timer", JSON.stringify(obj));
  
  }

 

  return (
    <div>
      <Contanier>
        <div className="p-6">
          <div className="text-center">
            <h3 className="text-[24px] font-bold">Sign Up</h3>
            <p className="text-[20px]">Sign into your Account</p>
          </div>
          <div className="mt-4">
            <input
              className="input"
              type="text"
              placeholder="User Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input mt-4"
              type="text"
              placeholder="Email Address"
              value={message}
              onChange={checkEmailVaild}
            />
            {load
              ? checkEmail && <h2 style={{ color: "green" }}>{checkEmail}</h2>
              : errorEmail && <h2 style={{ color: "red" }}>{errorEmail}</h2>}

            <input
              className="input mt-4"
              type="text"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <input type="checkbox" />
              <p>
                I read and agreeto <span>Terms & Conditions</span>
              </p>
            </div>
          </div>
          <div>
            <>
              <button
                className="button"
                onClick={() => {
                  SignUp_Details()
                  Submit()
                }}
              >
                Create Account
              </button>
            </>
          </div>
          <div className="social-icon flex justify-center gap-4 mt-6">
            <div
              className="facebook"
              style={{ background: "#4867aa", padding: "10px" }}
            >
              <FaFacebookF />{" "}
            </div>
            <div
              className="twitter"
              style={{ background: "#33CCFF", padding: "10px" }}
            >
              <FaTwitter />
            </div>
            <div
              className="google"
              style={{ background: "#db4437", padding: "10px" }}
            >
              <FaGoogle />
            </div>
            <div
              className="linkdin"
              style={{ background: "#2392e0", padding: "10px" }}
            >
              <FaLinkedinIn />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <p> Allready have an account</p>
            {/* <Link href={"/login"}>
              <p className="font-semibold" style={{ color: "#2ad4bc" }}>
                {" "}
                Login
              </p>
            </Link> */}
          </div>
        </div>
      </Contanier>
    </div>
  );
}

export default SignUp;
