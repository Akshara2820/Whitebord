import React, { useRef, useState } from "react";
import styled from 'styled-components';
import { tool } from "./utils";
import Konva, { Stage, Layer, Rect, Text, Line } from "react-konva";
import Holder from "./Holder";
import { BsPencilFill, BsCircle, BsTriangle, BsSquare } from "react-icons/bs";
import { FaRedo, FaUndo } from "react-icons/fa";
import { BiRectangle } from "react-icons/bi";
import { MdClear } from "react-icons/md";
import ColorPicker from "./colorPicker";

function PaintBox() {
  const [elements, setElements] = useState([]);
  const [redo, setRedo] = useState([]);
  const [activeType, setActiveType] = useState(tool.pen);
  const [activeTab, setActiveTab] = useState(0);
  console.log(elements, "ele");
  const [dataGetLocal, setDataGetLocal] = useState(
    JSON.parse(localStorage.getItem("whitebord")) || []
  );
  let isDraw = useRef(false);
  var sceneWidth = 1000;
  var sceneHeight = 1000;

  const onMouseDown = (e) => {
    isDraw.current = true;
    setElements((s) => [
      ...s,
      {
        id: activeType + "-" + Date.now(),
        type: activeType,
        points: [
          e.target?.getStage().getPointerPosition().x,
          e.target?.getStage().getPointerPosition().y,
        ],
        x: e.target?.getStage().getPointerPosition().x,
        y: e.target?.getStage().getPointerPosition().y,
        width: 0,
        height: 0,
        sides: 3,
        stroke: "#000",
        draggable: false,
      },
    ]);
  };

  const onMouseMove = (e) => {
    if (!isDraw.current) return;
    const st = e.currentTarget;
    const pos = st.getPointerPosition();
    if (elements.length > 0) {
      let lastId = [...elements].pop().id;
      const shapeAttrs = e.target.getStage().findOne("#" + lastId);

      if (activeType === tool.pen) {
        return shapeAttrs.setAttrs({
          points: shapeAttrs.attrs.points.concat(pos.x, pos.y),
          x: 0,
          y: 0,
        });
      } else if (activeType === tool.circle) {
        return shapeAttrs.setAttrs({
          radius: Math.abs(pos.x - shapeAttrs.attrs.x),
        });
      } else if (activeType === tool.rectangle) {
        return shapeAttrs.setAttrs({
          width: pos.x - shapeAttrs.attrs.x,
          height: pos.y - shapeAttrs.attrs.y,
        });
      } else if (activeType === tool.triangle) {
        return shapeAttrs.setAttrs({
          points: shapeAttrs.attrs.points.concat(pos.x, pos.y),
          radius: Math.abs(pos.x - shapeAttrs.attrs.x),
        });
      } else if (activeType === tool.square) {
        return shapeAttrs.setAttrs({
          sides: 4,
          points: shapeAttrs.attrs.points.concat(pos.x, pos.y),
          radius: Math.abs(pos.x - shapeAttrs.attrs.x),
        });
      }
    }
  };

  const onMouseUp = (e) => {
    isDraw.current = false;
    let lastId = [...elements].pop().id;
    const shapeAttrs = e.target.getStage().findOne("#" + lastId);
    localStorage.setItem(
      "whitebord",
      JSON.stringify([
        ...elements.map((i) => {
          if (i.id === lastId) {
            return {
              ...i,
              ...shapeAttrs.attrs,
            };
          } else {
            console.log(e.target.getStage().findOne("#" + i.id).attrs, "i");
            return e.target.getStage().findOne("#" + i.id).attrs;
          }
        }),
        ...dataGetLocal,
      ])
    );
  };

  const removeMe = () => {
    const rem = dataGetLocal.pop();
    setRedo((s) => [...s, rem] );
    setDataGetLocal(dataGetLocal.filter((i, ind) => ind !== dataGetLocal.length - i));
  };
  const handleRedo = () => {
    if (redo.length > 0) {
      setDataGetLocal([...dataGetLocal, redo[redo.length - 1]]);
      setRedo(redo.filter((i, ind) => ind !== redo.length - 1));
    }
  };
  const handleClear = () => {
    localStorage.removeItem("whitebord");
  };

  const shapeStore = [...elements, ...dataGetLocal];
  return (
    <PaintBox1>
      <div className="border w-full h-full">
        <Stage
          className="canvas-size"
          // width={`${window.ishapeAttrserWidth}`}
          // height={window.ishapeAttrserHeight}
          width={1400}
          height={700}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
        >
          <Layer>
            {shapeStore.map((i) => {
              return <Holder key={i.id} {...i} />;
            })}
          </Layer>
        </Stage>
      </div>
      <div className="flex justify-center  items-center mx-auto mt-3">
        <div className=" bg-gray-300 rounded-full shadow-lg p-2 px-4 flex gap-4 justify-between">
          <div
            onClick={() => setActiveType(tool.pen)}
            className={
              activeType === tool.pen
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsPencilFill className="text-[20px]" />
          </div>
          <div
            onClick={() => setActiveType(tool.circle)}
            className={
              activeType === tool.circle
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsCircle className=" text-[20px]" />
          </div>

          <div
            onClick={() => setActiveType(tool.rectangle)}
            className={
              activeType === tool.rectangle
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BiRectangle className="text-[20px]" />
          </div>

          <div
            onClick={() => setActiveType(tool.triangle)}
            className={
              activeType === tool.triangle
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsTriangle className="text-[20px]" />
          </div>

          <div
            onClick={() => setActiveType(tool.square)}
            className={
              activeType === tool.square
                ? "bg-blue-600 p-3 rounded-full text-white"
                : "p-3 "
            }
          >
            <BsSquare className="text-[20px]" />
          </div>

          <div className={dataGetLocal ? "flex " : "hidden"}>
            <div
              onClick={() => {
                removeMe();
                setActiveTab(1);
              }}
              className={
                activeTab === 1
                  ? "bg-blue-600 p-3 rounded-full text-white"
                  : "p-3 "
              }
            >
              <FaUndo className="text-[20px]" />
            </div>
            <div
              onClick={() => {
                {
                  handleRedo();
                  setActiveTab(2);
                }
              }}
              className={
                activeTab === 2
                  ? "bg-blue-600 p-3 rounded-full text-white"
                  : "p-3 "
              }
            >
              <FaRedo className="text-[20px]" />
            </div>
          </div>

          <div
            onClick={() => {
              handleClear();
              setActiveTab(3);
            }}
            className={
              activeTab === 3
                ? "bg-red-600 p-3 text-[18px] rounded-full text-white"
                : "text-[18px] p-3"
            }
          >
            <MdClear className="text-[20px]" />
          </div>
        </div>
      </div>
    </PaintBox1>
  );
}
export default PaintBox;
const PaintBox1 = styled.div``
