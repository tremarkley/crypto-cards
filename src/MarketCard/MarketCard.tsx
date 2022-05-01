import { StyleSheet, css } from "aphrodite";
import { useState } from "react";

import { LastTradePriceRenderer } from "../LastTradePriceRenderer.tsx/LastTradePriceRenderer";
import { Logo } from "../Logo/Logo";
import { PairRenderer } from "../PairRenderer/PairRenderer";
import { PriceRenderer } from "../PriceRenderer/PriceRenderer";
import { SparkLineGraph } from "../SparklineGraph/SparklineGraph";
import { CoinGeckoMarket } from "../types";
import { VolumeRenderer } from "../VolumeRenderer/VolumeRenderer";

interface MarketCardProps {
  market: CoinGeckoMarket;
}

export const MarketCard = ({ market }: MarketCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <div className={css(styles.condensedWrapper)}>
        <PairRenderer
          symbol={market.symbol}
          name={market.name}
          image={market.image}
        />
        <VolumeRenderer volume={market.total_volume} symbol={market.symbol} />
        <PriceRenderer
          currentPrice={market.current_price}
          priceChangePercent={market.price_change_percentage_24h_in_currency}
        />
        <LastTradePriceRenderer />
      </div>
      {expanded ? (
        <div>
          <SparkLineGraph points={market.sparkline_in_7d.price} />
        </div>
      ) : null}
    </div>
  );
};

const styles = StyleSheet.create({
  condensedWrapper: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgb(18, 29, 39)",
    alignItems: "center",
    justifyContent: "space-between",
    height: 45,
    padding: "4px 10px",
    cursor: "pointer",
  },
});
