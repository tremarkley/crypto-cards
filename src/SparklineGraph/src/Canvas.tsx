import { StyleSheet, css } from "aphrodite";
import React, { useEffect, useRef } from "react";

interface CanvasProps {
  draw: (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => void;
}

export const Canvas = ({ draw }: CanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

  return <canvas ref={canvasRef} />;
};

const styles = StyleSheet.create({});
