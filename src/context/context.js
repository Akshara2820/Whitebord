import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
export const CartContext = React.createContext({});

function CartProvider(props) {
  const [cart, setCart] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [countItem, setCountItem] = useState(0);
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(0);
  const [countDown, setCountDown] = useState(0);
  const [expiry, setExpiry] = useState(0);
  const navigate = useNavigate();

 
  const isDrawing = React.useRef(false);

  const [user1, setUser1] = useState();

  useEffect(() => {
    // console.log(user1, 'user1')
    if (user1) {
      navigate("/dashbord");
    }
  }, [user1]);
  const onLogin = () => {
    setUser1(localStorage.getItem("userRegister"));
  };
  const onLogout = () => {
    navigate("/login");
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        toggle,
        setToggle,
        search,
        setSearch,
        count,
        setCount,
        countItem,
        setCountItem,
        isLoggedin,
        setIsLoggedIn,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        countDown,
        setCountDown,
        expiry,
        setExpiry,
        onLogin,
        onLogout,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
