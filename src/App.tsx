import { css, StyleSheet } from "aphrodite";
import axios from "axios";
import { Reducer, useCallback, useEffect, useReducer, useRef } from "react";
import { MarketCards } from "./MarketCards/MarketCards";
import { CoinGeckoMarket, CoinGeckoResponse } from "./types";

import * as colors from "./colors";

function App() {
  const marketsReducer: Reducer<
    { markets: CoinGeckoMarket[]; fetching: boolean },
    | {
        type: "APPEND_MARKETS";
        markets: CoinGeckoMarket[];
      }
    | {
        type: "FETCHING_MARKETS";
        fetching: boolean;
      }
  > = (state, action) => {
    switch (action.type) {
      case "APPEND_MARKETS":
        return { ...state, markets: [...state.markets, ...action.markets] };
      case "FETCHING_MARKETS":
        return { ...state, fetching: action.fetching };
      default:
        return state;
    }
  };
  const [marketsData, marketsDispatch] = useReducer(marketsReducer, {
    markets: [],
    fetching: true,
  });

  const pageReducer: Reducer<{ page: number }, { type: "ADVANCE_PAGE" }> = (
    state,
    action
  ) => {
    switch (action.type) {
      case "ADVANCE_PAGE":
        return { ...state, page: state.page + 1 };
      default:
        return state;
    }
  };
  const [pager, pagerDispatch] = useReducer(pageReducer, { page: 1 });

  useEffect(() => {
    marketsDispatch({ type: "FETCHING_MARKETS", fetching: true });
    async function fetchMarkets() {
      try {
        const { data } = await axios.get<any, CoinGeckoResponse>(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&price_change_percentage=24h&per_page=10&page=${pager.page}&sparkline=true`
        );
        marketsDispatch({ type: "APPEND_MARKETS", markets: data });
        marketsDispatch({ type: "FETCHING_MARKETS", fetching: false });
      } catch (e) {
        // handle error
        marketsDispatch({ type: "FETCHING_MARKETS", fetching: false });
        console.error(e);
      }
    }
    fetchMarkets();
  }, [marketsDispatch, pager.page]);

  let bottomBoundaryRef = useRef(null);
  const scrollObserver = useCallback(
    (node: Element) => {
      new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.intersectionRatio > 0 && !marketsData.fetching) {
            pagerDispatch({ type: "ADVANCE_PAGE" });
          }
        });
      }).observe(node);
    },
    [pagerDispatch, marketsData]
  );
  useEffect(() => {
    if (bottomBoundaryRef.current) {
      scrollObserver(bottomBoundaryRef.current);
    }
  }, [scrollObserver, bottomBoundaryRef]);

  return (
    <div className={css(styles.wrapper)}>
      <div>
        <MarketCards markets={marketsData.markets} />
      </div>
      {marketsData.fetching && (
        <div>
          <p className="m-0 text-white">Loading...</p>
        </div>
      )}
      <div id="page-bottom-boundary" ref={bottomBoundaryRef}></div>
    </div>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.BLACK,
  },
});

export default App;
