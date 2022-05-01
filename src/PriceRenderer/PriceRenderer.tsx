import { StyleSheet, css } from "aphrodite";

interface PriceRendererProps {
  currentPrice: number;
  priceChangePercent: number;
}

export const PriceRenderer = ({
  currentPrice,
  priceChangePercent,
}: PriceRendererProps) => {
  return (
    <div className={css(styles.wrapper)}>
      <span className={css(styles.text, styles.price)}>
        ${currentPrice.toLocaleString()}
      </span>
      <span
        className={`${css(styles.text, styles.percent)} ${
          priceChangePercent > 0 ? css(styles.green) : css(styles.red)
        }`}
      >
        {priceChangePercent > 0 ? "+" : ""}
        {priceChangePercent.toLocaleString()}%
      </span>
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    width: 95,
  },
  text: {
    fontWeight: "normal",
    lineHeight: 1.5,
    wordBreak: "normal",
    display: "inline",
    textAlign: "left",
    fontFamily: "atlas-typewriter, monospace, btcglyph",
  },
  price: {
    fontSize: 13,
    textTransform: "inherit",
    color: "rgb(255, 255, 255)",
    whiteSpace: "nowrap",
  },
  percent: {
    color: "rgb(249, 103, 45)",
    fontSize: 11,
  },
  green: {
    color: "rgb(46, 174, 52)",
  },
  red: {
    color: "rgb(249, 103, 45)",
  },
});
