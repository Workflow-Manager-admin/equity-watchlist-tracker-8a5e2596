import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
export default function Footer() {
  const { palette } = useContext(AppContext);

  return (
    <footer className="footer" style={{ background: palette.secondary }}>
      <span className="footer-content">
        &copy; {new Date().getFullYear()} Equity Watchlist | Powered by React | Theme by Kavia
      </span>
    </footer>
  );
}
