import { StyleSheet, css } from "aphrodite";

import { MarketCard } from "../MarketCard/MarketCard";
import { CoinGeckoMarket } from "../types";

interface MarketCardsProps {
  markets: CoinGeckoMarket[];
}

export const MarketCards = ({ markets }: MarketCardsProps) => {
  return (
    <div className={css(styles.wrapper)}>
      {markets.map((market) => (
        <div className={css(styles.marketCardWrapper)}>
          {<MarketCard market={market} key={market.id} />}
        </div>
      ))}
    </div>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "RGB(0, 0, 0)",
  },
  marketCardWrapper: {
    marginBottom: 4,
  },
});
