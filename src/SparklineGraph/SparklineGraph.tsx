import { StyleSheet, css } from "aphrodite";
import { useEffect } from "react";
import { Canvas } from "./src/Canvas";

interface SparkLineGraphProps {
  points: number[];
  color: string;
}

export const SparkLineGraph = ({ color, points }: SparkLineGraphProps) => {
  const draw = (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => {
    ctx.strokeStyle = color;
    const maxPoint = Math.max(...points) + Math.max(...points) * 0.1;
    const minPoint = Math.min(...points) - Math.min(...points) * 0.1;
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

  return (
    <div className={css(styles.wrapper)}>
      <Canvas draw={draw} />
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 1,
    padding: "4px 10px",
    backgroundColor: "rgb(18, 29, 39)",
  },
});
