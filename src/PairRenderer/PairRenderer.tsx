import * as _ from "lodash";
import { StyleSheet, css } from "aphrodite";
import { Logo } from "../Logo/Logo";

interface PairRendererProps {
  symbol: string;
  name: string;
  image: string;
}

export const PairRenderer = ({ image, name, symbol }: PairRendererProps) => {
  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.logoWrapper)}>
        <Logo src={image} name={name} />
      </div>
      <div className={css(styles.pairWrapper)}>
        <span
          className={css(styles.text, styles.pairText)}
        >{`${symbol.toLocaleUpperCase()}-USD`}</span>
        <span className={css(styles.text, styles.nameText)}>
          {_.upperFirst(name)}
        </span>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: 125,
  },
  logoWrapper: {
    marginRight: 8,
  },
  pairWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  text: {
    lineHeight: 1.5,
    wordBreak: "normal",
    display: "inline",
    textAlign: "left",
    fontFamily: "atlas, opensans, sans-serif, btcglyph",
  },
  pairText: {
    fontWeight: "bold",
    color: "rgb(255, 255, 255)",
    fontSize: 13,
  },
  nameText: {
    fontWeight: "normal",
    color: "rgb(138, 147, 159)",
    fontSize: 9,
  },
});
