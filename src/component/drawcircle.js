import { useEffect, useState } from "react";
import React from "react";
import { BsPencilFill, BsCircleFill } from "react-icons/bs";
import { GrStatusDisabledSmall } from "react-icons/gr";
import { Stage, Layer, Rect, Circle, Line } from "react-konva";

const DrawingPage = () => {
  const [circleSet, setcircleSet] = useState([]);
  const [newAnnotation, setNewAnnotation] = useState([]);
  const [tool, setTool] = useState("pen");
  const [lines, setLines] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const [dataSetLocal, setDataSetLocal] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );

  const isDrawing = React.useRef(false);

  const handleMouseDownPen = (e) => {
    if (activeTab === 1) {
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    } else {
      if (newAnnotation.length === 0) {
        const { x, y } = e.target.getStage().getPointerPosition();
        setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
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
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...lines, ...dataSetLocal])
      );
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
      if (newAnnotation.length === 1) {
        const sx = newAnnotation[0].x;
        const sy = newAnnotation[0].y;
        const { x, y } = e.target.getStage().getPointerPosition();
        const annotationToAdd = {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: circleSet.length + 1,
        };
        circleSet.push(annotationToAdd);
        setNewAnnotation([]);
        setcircleSet(circleSet);
        localStorage.setItem(
          "whitebord",
          JSON.stringify([...circleSet, ...newAnnotation, ...dataSetLocal])
        );
        console.log(circleSet, "llll");
      }
    }
  };

  const handleMouseDown = (e) => {
    if (newAnnotation.length === 0) {
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewAnnotation([{ x, y, width: 0, height: 0, key: "0" }]);
    }
  };

  const handleMouseUp = (e) => {
    // console.log("activeTab circle   ", activeTab);
    // console.log("circlr+++");
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      const annotationToAdd = {
        x: sx,
        y: sy,
        width: x - sx,
        height: y - sy,
        key: circleSet.length + 1,
      };
      circleSet.push(annotationToAdd);
      setNewAnnotation([]);
      setcircleSet(circleSet);
      localStorage.setItem(
        "whitebord",
        JSON.stringify([...circleSet, ...newAnnotation, ...dataSetLocal])
      );
      console.log(circleSet, "llll");
    }
  };

  const handleMouseMove = (e) => {
    if (newAnnotation.length === 1) {
      const sx = newAnnotation[0].x;
      const sy = newAnnotation[0].y;
      const { x, y } = e.target.getStage().getPointerPosition();
      setNewAnnotation([
        {
          x: sx,
          y: sy,
          width: x - sx,
          height: y - sy,
          key: "0",
        },
      ]);
    }
  };

  const circleSetToDraw = [...circleSet, ...newAnnotation, ...dataSetLocal];
  const penSetToDraw = [...lines, ...dataSetLocal];

  return (
    <>
      <div className=" border w-full h-full">
        <Stage
          width={1900}
          height={800}
          onMouseDown={(e) => {
            if (activeTab === 0) {
              handleMouseDown(e);
            } else {
              handleMouseDownPen(e);
            }
          }}
          onMouseUp={(e) => {
            if (activeTab === 0) {
              handleMouseUp(e);
            } else {
              handleMouseUpPen(e);
            }
          }}
          onMouseMove={(e) => {
            if (activeTab === 0) {
              handleMouseMove(e);
            } else {
              handleMouseMovePen(e);
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

            {/* {circleSetToDraw.map((value) => {
              return (
                <Rect
                  x={value.x}
                  y={value.y}
                  width={value.width}
                  height={value.width}
                  fill="transparent"
                  stroke="black"
                />
              );
            })} */}
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
        </div>
      </div>
    </>
  );
};

export default DrawingPage;
