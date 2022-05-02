import { StyleSheet, css } from "aphrodite";

import * as colors from "../colors";

interface VolumeRendererProps {
  volume: number;
}

export const VolumeRenderer = ({ volume }: VolumeRendererProps) => {
  return (
    <div className={css(styles.wrapper)}>
      <span className={css(styles.text, styles.volumeNumber)}>
        ${volume.toLocaleString()}
      </span>
      <div className={css(styles.text, styles.label)}>24h volume</div>
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    width: 150,
    textAlign: "right",
  },
  text: {
    fontWeight: "normal",
    lineHeight: 1.5,
    wordBreak: "normal",
    display: "inline",
    textAlign: "left",
  },
  volumeNumber: {
    fontFamily: "atlas-typewriter, monospace, btcglyph",
    fontSize: 13,
    textTransform: "inherit",
    color: colors.WHITE,
    whiteSpace: "nowrap",
  },
  label: {
    color: colors.GREY,
    fontFamily: "atlas, opensans, sans-serif, btcglyph",
    fontSize: 11,
  },
});
