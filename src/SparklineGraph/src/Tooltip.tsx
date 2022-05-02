import React from "react";
import { StyleSheet, css } from "aphrodite";
import * as colors from "../../colors";

interface TooltipProps {
  canvasHeight: number;
  leftPosition: number;
  value: number;
  date: Date;
}

export const Tooltip = ({
  canvasHeight,
  leftPosition,
  value,
  date,
}: TooltipProps) => {
  return (
    <React.Fragment>
      <div
        style={{
          position: "absolute",
          height: canvasHeight,
          left: `${leftPosition}px`,
        }}
        className={css(styles.line)}
      ></div>
      <div
        style={{
          position: "absolute",
          left: `${leftPosition}px`,
        }}
        className={css(styles.tooltipWrapper)}
      >
        <span className={css(styles.text, styles.price)}>
          ${value.toLocaleString()}
        </span>
        <span className={css(styles.text, styles.date)}>
          {`${date.toDateString()} ${date.toLocaleTimeString()}`}
        </span>
      </div>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  line: {
    border: "1px solid black",
  },
  tooltipWrapper: {
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    padding: "1px 10px 4px",
    backgroundColor: colors.BLUE_300,
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
