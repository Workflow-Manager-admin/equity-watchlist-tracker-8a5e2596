import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
export default function Sidebar() {
  const {
    watchlist: { items, selectedSymbol },
    dispatchWatchlist,
    palette,
    auth,
  } = useContext(AppContext);

  const [symbolVal, setSymbolVal] = useState("");

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!symbolVal.trim()) return;
    dispatchWatchlist({
      type: "ADD_STOCK",
      payload: {
        symbol: symbolVal.toUpperCase(),
        name: symbolVal.toUpperCase(),
      },
    });
    setSymbolVal("");
  };

  const handleRemove = (sym) => {
    dispatchWatchlist({ type: "REMOVE_STOCK", payload: sym });
  };

  const handleSelect = (sym) => {
    dispatchWatchlist({ type: "SELECT_STOCK", payload: sym });
  };

  // Demo starter items if empty
  const demoSuggestions = ["AAPL", "GOOGL", "MSFT"];

  return (
    <aside className="sidebar" style={{ background: palette.secondary }}>
      <div className="sidebar-title">Watchlist</div>
      {auth.isAuthenticated && (
        <form className="add-stock-form" onSubmit={handleAddStock}>
          <input
            type="text"
            value={symbolVal}
            placeholder="Add symbol (e.g. TSLA)"
            onChange={(e) => setSymbolVal(e.target.value.toUpperCase())}
            pattern="^[A-Za-z]{1,7}$"
            maxLength={7}
            required
            aria-label="Stock symbol"
          />
          <button type="submit" className="btn add-btn" title="Add to watchlist">
            +
          </button>
        </form>
      )}
      <ul className="watchlist">
        {items.length === 0 &&
          demoSuggestions.map((dsym) => (
            <li
              key={dsym}
              className={
                "watchlist-item" +
                (selectedSymbol === dsym ? " selected" : "")
              }
              onClick={() => handleSelect(dsym)}
            >
              <span>{dsym}</span>
            </li>
          ))}
        {items.map((stock) => (
          <li
            key={stock.symbol}
            className={
              "watchlist-item" +
              (selectedSymbol === stock.symbol ? " selected" : "")
            }
            onClick={() => handleSelect(stock.symbol)}
          >
            <span>{stock.symbol}</span>
            {auth.isAuthenticated && (
              <button
                className="remove-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(stock.symbol);
                }}
                title="Remove"
              >
                ×
              </button>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
}
