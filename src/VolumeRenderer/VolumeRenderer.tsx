import { StyleSheet, css } from "aphrodite";

interface VolumeRendererProps {
  volume: number;
  symbol: string;
}

export const VolumeRenderer = ({ symbol, volume }: VolumeRendererProps) => {
  return (
    <div>
      <div>{`${volume.toLocaleString()} ${symbol.toLocaleUpperCase()}`}</div>
      <div>24h volume</div>
    </div>
  );
};

const styles = StyleSheet.create({});
