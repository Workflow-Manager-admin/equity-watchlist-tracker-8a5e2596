import React, { useContext } from "react";
import "./App.css";
import { AppProvider, AppContext } from "./context/AppContext";
import TopNav from "./components/TopNav";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";

/**
 * Entry point of the SPA.
 * Wraps everything in AppProvider for context management.
 */
// PUBLIC_INTERFACE
function AppContainer() {
  const { theme } = useContext(AppContext);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="app-root">
      <TopNav />
      <div className="layout">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContainer />
    </AppProvider>
  );
}
