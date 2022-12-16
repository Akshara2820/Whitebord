import React, { useContext, useEffect, useState } from "react";
import { Circle } from "react-konva";
import Clock from "react-live-clock";
import styled from "styled-components";
import { CartContext } from "../context/context";
import PaintBox from "./paintBox";

function DashBoard() {
  const [clock, setClock] = useState(0);
  const { onLogout } = useContext(CartContext);

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
    <Dahsbord1>
      <div className="flex justify-between items-center p-4">
        <div className="text-[20px] p-4">
          <Clock
            format={"h:mm:ssa"}
            style={{ fontSize: "1.5em" }}
            ticking={true}
          />
        </div>
        <div
          className={
            clock < "0:9"
              ? "p-4  bg-red-600 rounded-full font-bold "
              : "p-4 bg-slate-300 rounded-full font-bold "
          }
        >
          {clock}
        </div>
      </div>
      <div>
        <div>
          
          <PaintBox/>
        </div>
      </div>
    </Dahsbord1>
  );
}
export default DashBoard;
const Dahsbord1 = styled.div`
  max-width: 1400px;
  width: 95%;
  margin: auto;
`;
