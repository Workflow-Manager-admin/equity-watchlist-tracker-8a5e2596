/**
 * Minimal utility for fetching live stock data.
 * Replace the implementation with production finance API/backend calls as needed.
 * For demo, uses Yahoo Finance's unofficial API or fallback mock.
 */

/**
 * PUBLIC_INTERFACE
 * @param {string} symbol
 * @param {string} range - e.g. '1d', '1w', '1mo', '6mo', '1y'
 * @returns {Promise<{meta, prices, trend}>}
 */
export async function fetchStockData(symbol, range = "1mo") {
  // Attempt fetch via Yahoo (unofficial, CORS may block; replace with real backend in production)
  try {
    let histRange = "1mo";
    let interval = "1d";
    if (range === "1d") {
      histRange = "1d";
      interval = "5m";
    } else if (range === "1w") {
      histRange = "5d";
      interval = "15m";
    } else if (range === "6mo") {
      histRange = "6mo";
    } else if (range === "1y") {
      histRange = "1y";
    }
    const res = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(
        symbol
      )}?range=${histRange}&interval=${interval}`
    );
    const data = await res.json();
    if (!data.chart || !data.chart.result || !data.chart.result[0])
      throw new Error("No data");
    const result = data.chart.result[0];
    const meta = result.meta;
    const prices = result.indicators.quote[0];
    const timestamps = result.timestamp;
    // Compose trend as array of {t, price, volume}
    const trend = timestamps.map((t, i) => ({
      t: t * 1000,
      price: prices.close[i],
      volume: prices.volume[i],
    }));

    return { meta, prices, trend };
  } catch (err) {
    // Fallback: local mock data for demonstration
    return {
      meta: { symbol, currency: "USD", exchangeName: "MOCK" },
      prices: { close: [120, 121, 122, 123, 121], volume: [10, 12, 8, 15, 13] },
      trend: [
        { t: Date.now() - 4 * 86400000, price: 120, volume: 10 },
        { t: Date.now() - 3 * 86400000, price: 121, volume: 12 },
        { t: Date.now() - 2 * 86400000, price: 122, volume: 8 },
        { t: Date.now() - 86400000, price: 123, volume: 15 },
        { t: Date.now(), price: 121, volume: 13 },
      ],
    };
  }
}
