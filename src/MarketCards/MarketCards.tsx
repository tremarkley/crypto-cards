import { StyleSheet, css } from "aphrodite";

import { MarketCard } from "../MarketCard/MarketCard";
import { CoinGeckoMarket } from "../types";

interface MarketCardsProps {
  markets: CoinGeckoMarket[];
}

export const MarketCards = ({ markets }: MarketCardsProps) => {
  return (
    <div>
      {markets.map((market, index) => (
        <div className={css(styles.marketCardWrapper)} key={market.id}>
          {<MarketCard market={market} />}
        </div>
      ))}
    </div>
  );
};

const styles = StyleSheet.create({
  marketCardWrapper: {
    marginBottom: 4,
    minWidth: 500,
  },
});
