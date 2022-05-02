import { StyleSheet, css } from "aphrodite";
import { useEffect, useState } from "react";

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
  const [isPositive24hChange, setIsPositive24hChange] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setIsPositive24hChange(market.price_change_percentage_24h_in_currency > 0);
  }, [market]);

  return (
    <div onClick={toggleExpanded}>
      <div className={css(styles.condensedWrapper)}>
        <PairRenderer
          symbol={market.symbol}
          name={market.name}
          image={market.image}
        />
        <div>
          <SparkLineGraph
            lineWidth={5}
            withTooltip={false}
            canvasHeight={30}
            canvasWidth={100}
            points={market.sparkline_in_7d.price}
            isPositive={isPositive24hChange}
          />
        </div>
        <VolumeRenderer volume={market.total_volume} />
        <PriceRenderer
          currentPrice={market.current_price}
          priceChangePercent={market.price_change_percentage_24h_in_currency}
        />
      </div>
      {expanded ? (
        <div className={css(styles.expandedDrawer)}>
          <SparkLineGraph
            withTooltip={true}
            lineWidth={2}
            canvasHeight={150}
            canvasWidth={300}
            points={market.sparkline_in_7d.price}
            isPositive={isPositive24hChange}
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
  expandedDrawer: {
    backgroundColor: "rgb(18, 29, 39)",
    cursor: "pointer",
  },
});
