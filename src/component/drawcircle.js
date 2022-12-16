import { useEffect, useState } from "react";
import React from "react";
import { BsPencilFill, BsCircleFill } from "react-icons/bs";
import { FaRedo, FaUndo } from "react-icons/fa";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { MdClear } from "react-icons/md";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";

const DrawingPage = () => {
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


  // pen functions

  const handleMouseDownPen = (e) => {
    if (activeTab === 1) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    } else {
      if (newCircleAdd.length === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewCircleAdd([{ x, y, width: 0, height: 0, key: "0" }]);
      }
    }
  };

  const handleMouseMovePen = (e) => {
    console.log("activeTab pen ");
    if (activeTab === 1) {
      if (!isDrawing.current) {
        return;
      }
      // console.log("ptn000");
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
      localStorage.setItem("whitebord",JSON.stringify([...lines, ...dataSetLocal]));
      // console.log(lines.map((i) => i.tool))
    } else {
      handleMouseMove(e);
    }
  };

  const handleMouseUpPen = (e) => {
    if (activeTab === 1) {
      isDrawing.current = false;
    } else {
      console.log("circlr+++");
      if (newCircleAdd.length === 1) {
        const sx = newCircleAdd[0].x;
        const sy = newCircleAdd[0].y;
        const { x, y } = e.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: circleSet.length + 1,
        };
        circleSet.push(annotationToAdd);
        setNewCircleAdd([]);
        setcircleSet(circleSet);
        localStorage.setItem(
          "whitebord",
          JSON.stringify([...circleSet, ...newCircleAdd, ...dataSetLocal])
        );
        console.log(circleSet, "llll");
      }
    }
  };

// circle functions

  const handleMouseDown = (e) => {
    if (newCircleAdd.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewCircleAdd([{ circleTool, x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (e) => {
    // console.log("activeTab circle   ", activeTab);
    // console.log("circlr+++");
    if (newCircleAdd.length === 1) {
      const sx = newCircleAdd[0].x;
      const sy = newCircleAdd[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: circleSet.length + 1,
      };
      circleSet.push(annotationToAdd);
      setNewCircleAdd([]);
      setcircleSet(circleSet);
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...circleSet, ...newCircleAdd, ...dataSetLocal])
      );
      console.log(circleSet, "llll");
    }
  };

  const handleMouseMove = (e) => {
    if (newCircleAdd.length === 1) {
      const sx = newCircleAdd[0].x;
      const sy = newCircleAdd[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewCircleAdd([
        {
          circleTool,
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };
  
// Rect Functions


  const handleMouseDownRect = (e) => {
    if (newRectAdd.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewRectAdd([{ rectTool, x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUpRect = (e) => {
    // console.log("activeTab circle   ", activeTab);
    // console.log("circlr+++");
    if (newRectAdd.length === 1) {
      const sx = newRectAdd[0].x;
      const sy = newRectAdd[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: rectSet.length + 1,
      };
      rectSet.push(annotationToAdd);
      setNewRectAdd([]);
      setRectSet(rectSet);
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...rectSet, ...newRectAdd, ...dataSetLocal])
      );
      console.log(rectSet, "llll");
    }
  };

  const handleMouseMoveRect = (e) => {
    if (newRectAdd.length === 1) {
      const sx = newRectAdd[0].x;
      const sy = newRectAdd[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewRectAdd([
        {
          rectTool,
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
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


  const penSetToDraw = [...lines, ...dataSetLocal];
  const circleSetToDraw = [...circleSet, ...newCircleAdd, ...dataSetLocal];
  const rectToDraw = [...rectSet, ...newRectAdd, ...dataSetLocal];

  return (
    <>
      <div className=" border w-full h-full">
        <Stage
          width={1400}
          height={750}
          onMouseDown={(e) => {
            if (activeTab === 0) {
              handleMouseDown(e);
            } else if (activeTab === 1) {
              handleMouseDownPen(e);
            } else {
              handleMouseDownRect(e);
            }
          }}
          onMouseUp={(e) => {
            if (activeTab === 0) {
              handleMouseUp(e);
            } else if (activeTab === 1) {
              handleMouseUpPen(e);
            } else {
              handleMouseUpRect(e);
            }
          }}
          onMouseMove={(e) => {
            if (activeTab === 0) {
              handleMouseMove(e);
            } else if (activeTab === 1) {
              handleMouseMovePen(e);
            } else {
              handleMouseMoveRect(e);
            }
          }}

          // onMouseDown={activeTab === 0 ? handleMouseDown (e): handleMouseDownPen(e)}
          // onMouseUp= {activeTab === 0 ? handleMouseUp(e) : handleMouseUpPen ()}
          // onMouseMove={activeTab === 0 ? handleMouseMove(e) : handleMouseMovePen(e)}
        >
          <Layer>
            {circleSetToDraw.map((value) => {
              return (
                <Circle
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.width}
                  tension={0.5}
                  fill="transparent"
                  stroke="black"
                />
              );
            })}

            {rectToDraw.map((value) => {
              return (
                <Rect
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.width}
                  tension={0.5}
                  fill="transparent"
                  stroke="black"
                />
              );
            })}

            {penSetToDraw.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="#000"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
                globalCompositeOperation={
                  line.tool === "eraser" ? "destination-out" : "source-over"
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <div className="flex justify-center items-center mx-auto mt-3">
        <div className=" bg-gray-300 rounded-full shadow-lg p-2 px-4 flex gap-4 justify-between">
          <div
            onClick={() => setActiveTab(1)}
            className={
              activeTab === 1
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsPencilFill />
          </div>
          <div
            onClick={() => setActiveTab(0)}
            className={
              activeTab === 0
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsCircleFill />
          </div>

          <div
            onClick={() => setActiveTab(2)}
            className={
              activeTab === 2
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <GrStatusDisabledSmall />
          </div>
          <div
            className={
              penSetToDraw.length > 0 || circleSetToDraw.length > 0
                ? "flex gap-4"
                : "hidden"
            }
          >
            <div
              onClick={() => {
                removeMe();
                setActiveTab(3);
              }}
              className={
                activeTab === 3
                  ? "bg-blue-600 p-3 rounded-full text-white"
                  : "p-3 "
              }
            >
              <FaUndo />
            </div>
            <div
              onClick={() => {
                handleRedo();
                setActiveTab(4);
              }}
              className={
                activeTab === 4
                  ? "bg-blue-600 p-3 rounded-full text-white"
                  : "p-3 "
              }
            >
              <FaRedo />
            </div>
          </div>
          <div
            onClick={() => {
              handleClear();
              setActiveTab(5);
            }}
            className={
              activeTab === 5
                ? "bg-blue-600 p-3 text-[18px] rounded-full text-white"
                : "text-[18px] p-3"
            }
          >
            <MdClear />
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawingPage;
