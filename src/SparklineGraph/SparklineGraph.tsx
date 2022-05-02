import { StyleSheet, css } from "aphrodite";
import React, { useEffect, useRef, useState } from "react";
import * as colors from "../colors";

interface SparkLineGraphProps {
  points: number[];
  canvasWidth: number;
  canvasHeight: number;
  withTooltip: boolean;
  lineWidth: number;
  isPositive: boolean;
}

const horizontalPadding = 10;

export const SparkLineGraph = ({
  points,
  canvasWidth,
  canvasHeight,
  withTooltip,
  lineWidth,
  isPositive,
}: SparkLineGraphProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouseXPosition, setMouseXPosition] = useState<number | null>(null);
  const [hoverPoint, setHoverPoint] = useState<number | null>(null);
  const [pointDates, setPointDates] = useState<Date[]>([]);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  useEffect(() => {
    const draw = (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => {
      ctx.strokeStyle = isPositive ? colors.GREEN : colors.RED;
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
          ctx.lineWidth = lineWidth;
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

    const canvas = canvasRef.current;
    if (canvas != null) {
      const context = canvas.getContext("2d");
      if (context == null) {
        return console.error("Context is null");
      }
      draw(context, canvas);
    }
  }, [isPositive, points, lineWidth]);

  useEffect(() => {
    const newPointDates: Date[] = [];
    points.forEach((_, index) => {
      const currentDate = new Date();
      const nextDate = new Date(
        currentDate.setHours(currentDate.getHours() - index)
      );
      newPointDates.unshift(nextDate);
    });
    setPointDates(newPointDates);
  }, [points]);

  const handleMouseMove: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setMouseXPosition(event.clientX);
  };

  const handleMouseLeave = () => {
    setMouseXPosition(null);
  };

  useEffect(() => {
    if (mouseXPosition != null) {
      const pointIndex =
        Math.round(
          ((mouseXPosition - (horizontalPadding - 1)) / canvasWidth) *
            points.length
        ) - 1;
      setHoverPoint(+points[pointIndex].toFixed(2));
      setHoverDate(pointDates[pointIndex]);
    } else {
      setHoverPoint(null);
      setHoverDate(null);
    }
  }, [points, mouseXPosition, pointDates, canvasWidth]);

  return (
    <div className={css(styles.wrapper)}>
      <div
        className={css(styles.canvasWrapper)}
        onMouseOut={withTooltip ? handleMouseLeave : undefined}
      >
        <canvas
          onMouseMove={withTooltip ? handleMouseMove : undefined}
          ref={canvasRef}
          style={{
            width: canvasWidth,
            height: canvasHeight,
            zIndex: 1,
            gridColumn: 1,
            gridRow: 1,
          }}
        />
        {mouseXPosition != null && hoverPoint != null && hoverDate != null ? (
          <React.Fragment>
            <div
              style={{
                position: "absolute",
                height: canvasHeight,
                left: `${mouseXPosition}px`,
                border: "1px solid black",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                left: `${mouseXPosition}px`,
                border: "1px solid black",
                display: "flex",
                flexDirection: "column",
                padding: "1px 10px 4px",
                backgroundColor: colors.BLUE_300,
              }}
            >
              <span className={css(styles.text, styles.price)}>
                ${hoverPoint.toLocaleString()}
              </span>
              <span className={css(styles.text, styles.date)}>
                {`${hoverDate.toDateString()} ${hoverDate.toLocaleTimeString()}`}
              </span>
            </div>
          </React.Fragment>
        ) : null}
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  canvasWrapper: {
    display: "grid",
  },
  wrapper: {
    marginTop: 1,
    padding: `4px ${horizontalPadding}px`,
  },
  text: {
    fontWeight: "normal",
    lineHeight: 1.5,
    wordBreak: "normal",
    display: "inline",
    textAlign: "left",
  },
  price: {
    fontFamily: "atlas-typewriter, monospace, btcglyph",
    fontSize: 11,
    color: colors.WHITE,
  },
  date: {
    fontFamily: "atlas, opensans, sans-serif, btcglyph",
    color: colors.GREY,
    fontSize: 9,
  },
});
