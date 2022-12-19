import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FaFacebookF, FaLinkedinIn, FaGoogle, FaTwitter } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { CartContext } from "../context/context";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [checkEmail, setCheckEmail] = useState("");
  const [load, setLoad] = useState(false);
  const obj = { email: email, password: password };

  const { minutes, setMinutes, onLogin } = useContext(CartContext);

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

  const handelSubmit = (e) => {
    const tt = localStorage.getItem("userRegister")?.toString();

    let data = JSON.parse(tt);
    console.log(data,'opop');
    {
      data.map((i) => {
        if (i.email === email && i.password === password) {
          console.log('iii');
          onLogin();
          return;
        } 
      });
    }
  };

  function Submit() {
    const tt = new Date().getTime() + 5 * 60 * 1000;
    setMinutes(tt);
    const obj = {
      min: minutes || tt,
    };
    localStorage.setItem("timer", JSON.stringify(obj));
  }

  return (
    <div>
      <Contanier>
        <div className="p-6">
          <div className=" text-center">
            <h3 className="text-[24px] font-bold">Login</h3>
            <p className="text-[20px]">Login into your Account</p>
          </div>
          <div className="mt-4">
            <input
              className="input"
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
          <div className="sm:flex justify-between mt-4">
            <div className="flex gap-3">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            Forgot your password ?
          </div>
          <div>
            <button
              className="button"
              onClick={() => {
                handelSubmit();
                Submit();
              }}
            >
              {" "}
              Login
            </button>
          </div>

          <div className="flex mt-6 items-center gap-2">
            <hr className="style-four" />
            or login with
            <hr className="style-four" />
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
            <p>Dont have account</p><Link to='/'><p className="font-semibold" style={{ color: "#2ad4bc" }}>
                Sign-up
              </p></Link>
            {/* <Link href={"/signup"}>
              <p className="font-semibold" style={{ color: "#2ad4bc" }}>
                Sign-up
              </p>
            </Link> */}
          </div>
        </div>
      </Contanier>
    </div>
  );
}

export default Login;
export const Contanier = styled.div`
  background-color: white;
  box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
  width: 30%;
  margin: auto;
  margin-top: 10%;
  margin-bottom: 10%;
  @media (max-width: 1024px) {
    width: 50%;
  }
  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 455px) {
    width: 90%;
  }
  .input {
    padding: 11px 20px 9px;
    font-size: 16px;
    outline: none;
    width: 100%;
    color: #535353;
    border-radius: 3px;
    border: 1px solid transparent;
    background-color: #f7f7f7;
  }
  .button {
    margin-top: 15px;
    padding: 11px 20px 9px;
    font-size: 16px;
    outline: none;
    width: 100%;
    color: white;
    border-radius: 3px;
    border: #51d4bc;
    background-color: #2ad4bc;
    transition: transform 0.4s linear, transform 0.4s linear;
  }
  .button:hover {
    transition: all 0.3s linear;
    background-color: #2da393;
    overflow: hidden;
  }

  hr.style-four {
    padding: 0;
    color: #333;
    text-align: center;
  }
  hr.style-four:after {
    content: "www.formget.com";
    display: inline-block;
    position: relative;
    top: -0.7em;
    font-size: 1.5em;
    padding: 0 0.25em;
    background: white;
  }
  .social-icon {
    color: #fff;
    border-radius: 3px;
    font-size: 20px;
    overflow: hidden;
  }
  .facebook:hover {
    transition: all 1s linear;
    border-bottom-right-radius: 128px;
    border-top-left-radius: 128px;
    border-top-right-radius: 128px;
    border-bottom-left-radius: 128px;
  }
  .twitter:hover {
    transition: all 1s linear;
    border-bottom-right-radius: 128px;
    border-top-left-radius: 128px;
    border-top-right-radius: 128px;
    border-bottom-left-radius: 128px;
  }
  .google:hover {
    transition: all 1s linear;
    border-bottom-right-radius: 128px;
    border-top-left-radius: 128px;
    border-top-right-radius: 128px;
    border-bottom-left-radius: 128px;
  }
  .linkdin:hover {
    transition: all 1s linear;
    border-bottom-right-radius: 128px;
    border-top-left-radius: 128px;
    border-top-right-radius: 128px;
    border-bottom-left-radius: 128px;
  }
`;
