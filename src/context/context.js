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

  const [circleSet, setcircleSet] = useState([]);
  const [rectSet, setRectSet] = useState([]);
  const [newCircleAdd, setNewCircleAdd] = useState([]);
  const [newRectAdd, setNewRectAdd] = useState([]);
  const [tool, setTool] = useState("pen");
  const [circleTool, setCircleTool] = useState("circle");
  const [rectTool, setRectTool] = useState("Rect");
  const [lines, setLines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [redo, setRedo] = useState([]);
  const [dataSetLocal, setDataSetLocal] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );
  const isDrawing = React.useRef(false);

  const [user1, setUser1] = useState();

  useEffect(() => {
    console.log(user1, 'user1')
    if (user1) {
      navigate("/dashbord");
    }
  }, [user1]);
  const onLogin = () => {
    setUser1(localStorage.getItem("userRegister"));
  };
  const onLogout = () => {
    navigate("/");
  };

  const handleMouseStart = (e) => {
    console.log("Start");
    if (activeTab === 0) {
      if (newCircleAdd.length === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewCircleAdd([
          ...newCircleAdd,
          { circleTool, x, y, width: 0, height: 0, key: "0" },
        ]);
      }
    } else if (activeTab === 1) {
      if (activeTab === 1) {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
      }
    }
  };

  const handleMouseLeave = (e) => {
    console.log("Leave");
    if (activeTab === 0) {
      if (newCircleAdd.length === 1) {
        const sx = parseInt(newCircleAdd[0].x);
        const sy = parseInt(newCircleAdd[0].y);
        const { x, y } = e.target.getStage().getPointerPosition();
        const annotationToAdd = {
          circleTool,
          x: sx,
          y: sy,
          width: Math.abs(x - sx),
          height: Math.abs(y - sy),
          key: circleSet.length + 1,
        };
        circleSet.push(annotationToAdd);
        setNewCircleAdd([]);
        setcircleSet(circleSet);
        localStorage.setItem(
          "whitebord",
          JSON.stringify([...circleSet, ...newCircleAdd, ...dataSetLocal])
        );
      }
      setDataSetLocal([...circleSet, ...newCircleAdd, ...dataSetLocal]);
    } else if (activeTab === 1) {
      if (activeTab === 1) {
        isDrawing.current = false;

        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
      }
    }
  };

  const handleMouseMove = (e) => {
    console.log("move");
    if (activeTab === 0) {
      if (newCircleAdd.length === 1) {
        const sx = parseInt(newCircleAdd[0].x);
        const sy = parseInt(newCircleAdd[0].y);
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewCircleAdd([
          {
            x: sx,
            y: sy,
            width: Math.abs(x - sx),
            height: Math.abs(y - sy),
            key: "0",
          },
        ]);
      }
    } else if (activeTab === 1) {
      if (!isDrawing.current) {
        return;
      }
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...lines, ...dataSetLocal])
      );
    }
  };

  const removeMe = () => {
    const rem = dataSetLocal.pop();
    setRedo((s) => [...s, rem]);
    setDataSetLocal(
      dataSetLocal.filter((i, ind) => ind !== dataSetLocal.length - i)
    );
  };
  const handleRedo = () => {
    if (redo.length > 0) {
      setDataSetLocal([...dataSetLocal, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
    }
  };
  const handleClear = () => {
    localStorage.removeItem("whitebord");
  };

  return (
    <CartContext.Provider
      value={{
        removeMe,
        handleRedo,
        handleClear,
        rectSet,
        setRectSet,
        newRectAdd,
        setNewRectAdd,
        handleMouseStart,
        handleMouseMove,
        handleMouseLeave,
        circleSet,
        setcircleSet,
        newCircleAdd,
        setNewCircleAdd,
        tool,
        setTool,
        lines,
        setLines,
        dataSetLocal,
        setDataSetLocal,
        activeTab,
        setActiveTab,
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
