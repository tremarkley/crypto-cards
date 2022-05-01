import { StyleSheet, css } from "aphrodite";
import { useEffect } from "react";
import { Canvas } from "./src/Canvas";

interface SparkLineGraphProps {
  points: number[];
}

export const SparkLineGraph = ({ points }: SparkLineGraphProps) => {
  const draw = (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => {
    ctx.fillStyle = "#000000";
    const maxPoint = Math.max(...points);
    const minPoint = Math.min(...points);
    const scale = maxPoint - minPoint;

    const getDomain = (index: number) =>
      ref.width * (index / (points.length - 1));
    const getRange = (point: number) =>
      ref.height - ((point - minPoint) * ref.height) / scale;

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        const x = getDomain(index);
        const y = getRange(point);
        ctx.moveTo(x, y);
      } else {
        const x = getDomain(index);
        const y = getRange(point);
        ctx.lineTo(x, y);
        if (index === points.length - 1) {
          ctx.stroke();
        }
      }
    });
  };

  return <Canvas draw={draw} />;
};

const styles = StyleSheet.create({});
