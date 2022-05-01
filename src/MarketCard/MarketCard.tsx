import { StyleSheet, css } from "aphrodite";

import { LastTradePriceRenderer } from "../LastTradePriceRenderer.tsx/LastTradePriceRenderer";
import { PairRenderer } from "../PairRenderer/PairRenderer";
import { PricePercentChangeRenderer } from "../PricePercentChangeRenderer/PricePercentChangeRenderer";
import { SparkLineGraph } from "../SparklineGraph/SparklineGraph";
import { CoinGeckoMarket } from "../types";
import { VolumeRenderer } from "../VolumeRenderer/VolumeRenderer";

interface MarketCardProps {
  market: CoinGeckoMarket;
}

export const MarketCard = ({ market }: MarketCardProps) => {
  return (
    <div>
      <PairRenderer />
      <SparkLineGraph points={market.sparkline_in_7d.price} />
      <VolumeRenderer />
      <PricePercentChangeRenderer />
      <LastTradePriceRenderer />
    </div>
  );
};

const styles = StyleSheet.create({});
