import { StyleSheet, css } from "aphrodite";
import { useState } from "react";

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

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div onClick={toggleExpanded}>
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
      </div>
      {expanded ? (
        <div>
          <SparkLineGraph
            points={market.sparkline_in_7d.price}
            color={
              market.price_change_percentage_24h_in_currency > 0
                ? "rgb(46, 174, 52)"
                : "rgb(249, 103, 45)"
            }
          />
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
    ":hover": {
      backgroundColor: "rgb(38, 53, 67)",
    },
  },
});
