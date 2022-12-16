import React, { Component } from "react";
import Konva from "konva";
import { Group, Rect } from "react-konva";

class ColorSquare extends Component {
  componentDidMount() {
    const { shape } = this;
    const { onClick, color } = this.props;
    const stage = shape.getStage();

    shape.on("mouseenter", function() {
      stage.container().style.cursor = "pointer";
    });

    shape.on("mouseleave", function() {
      stage.container().style.cursor = "default";
    });

    shape.on("click", function() {
      onClick(color);
    });
  }

  render() {
    const { x, y, width, height, color } = this.props;

    return (
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={color}
        ref={node => {
          this.shape = node;
        }}
      />
    );
  }
}

export default class ColorsPicker extends Component {
  render() {
    const { x, y, width, height, colors, onChange } = this.props;

    return (
      <Group x={x} y={y}>
        {colors.map((color, idx) => (
          <ColorSquare
            key={colors[idx]}
            x={0}
            y={idx * height}
            width={width}
            height={height}
            color={colors[idx]}
            onClick={onChange}
          />
        ))}
      </Group>
    );
  }
}
