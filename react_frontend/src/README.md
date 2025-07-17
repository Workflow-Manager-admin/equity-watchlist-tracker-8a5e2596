# Equity Watchlist Tracker - React Frontend

This directory contains the full React single-page application for the equity watchlist tracker.

## Features

- User authentication (demo login, ready to connect to your backend)
- Watchlists (add/remove/select stocks to track)
- Live stock market data fetching (via Yahoo or backend integration)
- Interactive price/performance graphs with SVG (no heavy dependencies)
- Responsive, modern, material-inspired layout: Top Nav, Sidebar, Main Content, Footer
- Light/dark theme toggling
- Minimal dependencies and clean state management (`React.Context` and hooks)

## Main Components

- **App.js**: Entry point, layout
- **context/AppContext.js**: Application-wide state (auth, watchlist, stocks, theme)
- **components/**: UI components (TopNav, Sidebar, MainContent, StockGraph, Footer)
- **utils/stockApi.js**: Stock price/trend fetch utility

## Customization

- Specify color palettes and theming in `App.css` as CSS variables.
- Replace `stockApi.js` with integration to your backend REST API for authentication and live stocks.

## Development

After installing dependencies (`npm install` in parent), run:

```bash
npm start
```

Open the app in your browser (default: http://localhost:3000).

## License

MIT
