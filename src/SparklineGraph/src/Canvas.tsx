import { StyleSheet, css } from "aphrodite";
import React, { useEffect, useRef } from "react";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => void;
}

export const Canvas = ({ draw }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      if (context == null) {
        return console.error("Context is null");
      }
      draw(context, canvas);
    }
  }, [draw]);

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const canvas = tooltipCanvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      if (context == null) {
        return console.error("Context is null");
      }
      var cw = canvas.width;
      var ch = canvas.height;
      context.clearRect(0, 0, cw, ch);

      const BB = canvasRef.current!.getBoundingClientRect();
      const offsetX = BB.left;
      const offsetY = BB.top;

      const mouseX = event.clientX - offsetX;
      const mouseY = event.clientY - offsetY;
      if (context == null) {
        return console.error("Context is null");
      }
      context.fillText("hello", mouseX, mouseY);
    }
  };

  return (
    <div className={css(styles.wrapper)}>
      <canvas
        ref={canvasRef}
        style={{
          width: 300,
          height: 150,
          zIndex: 0,
          gridColumn: 1,
          gridRow: 1,
        }}
      />
      <canvas
        ref={tooltipCanvasRef}
        onMouseMove={handleMouseMove}
        style={{
          width: 300,
          height: 150,
          zIndex: 1,
          gridColumn: 1,
          gridRow: 1,
        }}
      />
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "grid",
  },
});
