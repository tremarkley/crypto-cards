import { StyleSheet, css } from "aphrodite";
import { useEffect } from "react";
import { Canvas } from "./src/Canvas";

interface SparkLineGraphProps {
  points: number[];
}

export const SparkLineGraph = ({ points }: SparkLineGraphProps) => {
  const draw = (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => {
    // var grad = ctx.createLinearGradient(0, 0, ref.width, ref.height);
    // grad.addColorStop(0, "#007AC9"); // Initial path colour
    // grad.addColorStop(1, "#00c972"); // End stroke colour
    // ctx.strokeStyle = grad;
    // ctx.fillStyle = grad;
    ctx.fillStyle = "#000000";
    const maxPoint = Math.max(...points);
    const minPoint = Math.min(...points);
    const scale = maxPoint - minPoint;
    const margin = 10;
    const ratioW = ((ref.width - margin * 2) * 1) / points.length;
    var ratioH = ((ref.height - margin * 2) * 0.8) / scale;
    points.forEach((point, index) => {
      if (index === 0) {
        ctx.beginPath();
        // const currentHeight = ref.height - (point * ratioH + margin);
        const x = 0;
        const y = ref.height - (point * ref.height) / maxPoint;
        ctx.moveTo(x, y);
        // ctx.moveTo(0, maxPoint - point);
      } else {
        // const x = index * ratioW + margin;
        const x = ref.width * (index / (points.length - 1));
        // const y = ref.height - (point * ratioH + margin);
        // const currentHeight = ref.height - (point * ref.height) / maxPoint;
        const currentHeight =
          ref.height - ((point - minPoint) * ref.height) / scale;
        ctx.lineTo(x, currentHeight);
        // ctx.lineTo(index, maxPoint - point);
        if (index === points.length - 1) {
          ctx.stroke();
        }
      }
    });
  };

  return <Canvas draw={draw} />;
};

const styles = StyleSheet.create({});
