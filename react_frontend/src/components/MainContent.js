import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { fetchStockData } from "../utils/stockApi";
import StockGraph from "./StockGraph";

// PUBLIC_INTERFACE
export default function MainContent() {
  const {
    watchlist: { items, selectedSymbol },
    dispatchWatchlist,
    stocks,
    dispatchStock,
    auth,
    palette,
  } = useContext(AppContext);

  const symbol = selectedSymbol ||
    (items.length > 0 ? items[0].symbol : "AAPL");
  const [range, setRange] = useState("1mo");

  useEffect(() => {
    let isMounted = true;
    async function fetchData() {
      dispatchStock({ type: "FETCH_STOCK_REQUEST", symbol });
      try {
        const data = await fetchStockData(symbol, range);
        if (isMounted)
          dispatchStock({ type: "FETCH_STOCK_SUCCESS", symbol, payload: data });
      } catch (err) {
        if (isMounted)
          dispatchStock({
            type: "FETCH_STOCK_FAILURE",
            symbol,
            payload: err.message || "Error fetching stock",
          });
      }
    }
    if (symbol) fetchData();
    return () => { isMounted = false; }
    // eslint-disable-next-line
  }, [symbol, range, dispatchStock]);

  const stockData = stocks.data[symbol] || {};
  const { meta = {}, trend = [], loading, error } = stockData;

  const timeRanges = [
    { key: "1d", label: "1D" },
    { key: "1w", label: "1W" },
    { key: "1mo", label: "1M" },
    { key: "6mo", label: "6M" },
    { key: "1y", label: "1Y" },
  ];

  return (
    <main className="main-content">
      <div className="stock-header">
        <h1 className="stock-symbol" style={{ color: palette.primary }}>
          {symbol}
          <span className="exchange">
            {meta?.exchangeName ? ` @ ${meta.exchangeName}` : ""}
          </span>
        </h1>
        <div className="range-selector">
          {timeRanges.map((r) => (
            <button
              key={r.key}
              className={"range-btn" + (range === r.key ? " active" : "")}
              style={{
                background: range === r.key ? palette.primary : "#ddd",
                color: range === r.key ? "#fff" : "#333",
              }}
              onClick={() => setRange(r.key)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>
      <div className="stock-details">
        {loading ? (
          <div className="loading">Loading data...</div>
        ) : error ? (
          <div className="error" style={{ color: palette.error }}>
            {error}
          </div>
        ) : (
          <StockGraph symbol={symbol} trend={trend} />
        )}
      </div>
      <div className="stock-meta">
        <div>
          <b>Currency:</b> {meta.currency}
        </div>
        {meta.exchangeName && (
          <div>
            <b>Exchange:</b> {meta.exchangeName}
          </div>
        )}
      </div>
    </main>
  );
}
