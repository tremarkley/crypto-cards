import { StyleSheet, css } from "aphrodite";

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
    color: "rgb(255, 255, 255)",
    whiteSpace: "nowrap",
  },
  label: {
    color: "rgba(138, 147, 159, 0.4)",
    fontFamily: "atlas, opensans, sans-serif, btcglyph",
    fontSize: 11,
  },
});
