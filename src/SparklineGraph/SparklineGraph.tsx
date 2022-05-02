import { StyleSheet, css } from "aphrodite";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as colors from "../colors";
import { Tooltip } from "./src/Tooltip";

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
  const [tooltipLeftPosition, setTooltipLeftPosition] = useState<number | null>(
    null
  );

  const getDomainCallback = useCallback(
    (index: number) => {
      if (canvasRef.current != null) {
        return canvasRef.current.width * (index / (points.length - 1));
      }
    },
    [canvasRef, points.length]
  );

  useEffect(() => {
    const draw = (ctx: CanvasRenderingContext2D, ref: HTMLCanvasElement) => {
      ctx.strokeStyle = isPositive ? colors.GREEN : colors.RED;
      const maxPoint = Math.max(...points) + Math.max(...points) * 0.1;
      const minPoint = Math.min(...points) - Math.min(...points) * 0.1;
      const scale = maxPoint - minPoint;

      const getRange = (point: number) =>
        ref.height - ((point - minPoint) * ref.height) / scale;

      points.forEach((point, index) => {
        if (index === 0) {
          ctx.beginPath();
          ctx.lineWidth = lineWidth;
          const x = getDomainCallback(index);
          const y = getRange(point);
          ctx.moveTo(x!, y);
        } else {
          const x = getDomainCallback(index);
          const y = getRange(point);
          ctx.lineTo(x!, y);
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
  }, [isPositive, points, lineWidth, getDomainCallback]);

  useEffect(() => {
    const newPointDates: Date[] = [];
    points.forEach((_, index) => {
      const currentDate = new Date();
      currentDate.setMinutes(0, 0);
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
      const pointIndex = Math.round(
        ((mouseXPosition - (horizontalPadding - 1)) / canvasWidth) *
          (points.length - 1)
      );
      setHoverPoint(+points[pointIndex].toFixed(2));
      setHoverDate(pointDates[pointIndex]);
      setTooltipLeftPosition(
        getDomainCallback(pointIndex)! + horizontalPadding - 1
      );
    } else {
      setHoverPoint(null);
      setHoverDate(null);
      setTooltipLeftPosition(null);
    }
  }, [points, mouseXPosition, pointDates, canvasWidth, getDomainCallback]);

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
        {withTooltip &&
        tooltipLeftPosition != null &&
        hoverPoint != null &&
        hoverDate != null ? (
          <Tooltip
            canvasHeight={canvasHeight}
            leftPosition={tooltipLeftPosition}
            value={hoverPoint}
            date={hoverDate}
          />
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
});
