import React from "react";
import { palette } from "../context/AppContext";

/**
 * Renders a simple interactive line chart for stock price trend.
 * @param {string} symbol
 * @param {Array<{t: number, price: number}>} trend
 */
// PUBLIC_INTERFACE
export default function StockGraph({ symbol, trend }) {
  // If trend not present, show nothing
  if (!trend || trend.length === 0)
    return <div>No data for {symbol}.</div>;

  // Chart sizing
  const width = 520;
  const height = 260;
  const margin = 32;

  // Extrema for scaling
  const prices = trend.map((p) => p.price);
  const minP = Math.min(...prices);
  const maxP = Math.max(...prices);
  const time0 = Math.min(...trend.map((d) => d.t));
  const time1 = Math.max(...trend.map((d) => d.t));

  // Scale functions
  const x = (t) =>
    margin + ((t - time0) / (time1 - time0 || 1)) * (width - 2 * margin);
  const y = (price) =>
    height - margin - ((price - minP) / (maxP - minP || 1)) * (height - 2 * margin);

  // SVG path shape
  const pathD = trend
    .map((point, idx) =>
      idx === 0
        ? `M${x(point.t)},${y(point.price)}`
        : `L${x(point.t)},${y(point.price)}`
    )
    .join(" ");

  return (
    <div className="stock-graph" style={{ width, height }}>
      <svg width={width} height={height}>
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#fff"
          stroke={palette.secondary}
        />
        {/* Axes */}
        <line
          x1={margin}
          y1={height - margin}
          x2={width - margin}
          y2={height - margin}
          stroke={palette.secondary}
        />
        <line
          x1={margin}
          y1={margin}
          x2={margin}
          y2={height - margin}
          stroke={palette.secondary}
        />
        {/* Trend line */}
        <path d={pathD} fill="none" stroke={palette.primary} strokeWidth="3" />
        {/* Area fill (optional) */}
        <polyline
          fill={palette.accent + "33"}
          stroke="none"
          points={
            [
              ` ${margin},${height - margin} `,
              trend
                .map((d) => `${x(d.t)},${y(d.price)}`)
                .join(" "),
              ` ${x(trend[trend.length - 1].t)},${height - margin} `,
            ].join("")
          }
        />
        {/* Circles on each point */}
        {trend.map((point, i) => (
          <circle
            key={i}
            cx={x(point.t)}
            cy={y(point.price)}
            r="4"
            fill={palette.primary}
            stroke="#fff"
            strokeWidth="2"
          >
            <title>
              {new Date(point.t).toLocaleDateString()} - {point.price.toFixed(2)}
            </title>
          </circle>
        ))}
        {/* Y-Axis min/max labels */}
        <text
          x={margin / 2}
          y={height - margin}
          fontSize="12"
          fill={palette.secondary}
        >
          {minP.toFixed(2)}
        </text>
        <text x={margin / 2} y={margin + 4} fontSize="12" fill={palette.secondary}>
          {maxP.toFixed(2)}
        </text>
      </svg>
    </div>
  );
}
