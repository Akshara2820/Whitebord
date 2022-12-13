import React, { useContext, useEffect, useState } from "react";
import Clock from "react-live-clock";
import { CartContext } from "../context/context";
import DrawingPage from "./drawcircle";

function DashBoard() {
  const [clock, setClock] = useState(0);
  const { onLogout } = useContext(CartContext);
  const [toggle, setToggle] = useState(false);
  console.log(toggle, "kklkll");

  const [timeSec, setTimeSec] = useState(0);
  const timeDifference = (date1) => {
    let difference = date1 - new Date().getTime();

    let minutesDifference = Math.floor(difference / 1000 / 60);
    difference -= minutesDifference * 1000 * 60;

    let secondsDifference = Math.floor(difference / 1000);

    return `${minutesDifference}:${secondsDifference}`;
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("timer"));
    const timer = setInterval(() => {
      if (new Date().getTime() > data.min) {
        clearInterval(timer);
        onLogout();
      } else {
        setClock(timeDifference(data.min));
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center p-4">
        {/* <div className="text-[20px] p-4">
          <Clock
            format={"h:mm:ssa"}
            style={{ fontSize: "1.5em" }}
            ticking={true}
          />
        </div> */}
        <div
          className={
            clock < "0:9"
              ? "p-4  bg-red-400 rounded-full font-bold "
              : "p-4 bg-slate-300 rounded-full font-bold "
          }
        >
          {clock}
        </div>
      </div>
      <div>
        <div>
          <DrawingPage />
        </div>
      </div>
    </>
  );
}
export default DashBoard;
