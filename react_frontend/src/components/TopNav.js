import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

// PUBLIC_INTERFACE
export default function TopNav() {
  const { auth, dispatchAuth, theme, setTheme, palette } = useContext(AppContext);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = () => {
    dispatchAuth({ type: "LOGOUT" });
  };

  return (
    <nav className="topnav" style={{ background: palette.primary }}>
      <div className="brand">
        <span style={{ color: palette.accent, fontWeight: 800, fontSize: "1.25rem" }}>
          EQUITY TRACKER
        </span>
      </div>
      <div className="nav-actions">
        <button
          className="theme-btn"
          title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          onClick={toggleTheme}
          style={{ background: palette.accent, color: "#fff" }}
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
        {!auth.isAuthenticated ? (
          <>
            <LoginModalButton />
          </>
        ) : (
          <div className="profile-block">
            <span className="user-name">
              {auth.user?.username || "User"}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/**
 * Modal login/signup button component for demo. Replace with actual modal logic as needed.
 */
function LoginModalButton() {
  const { dispatchAuth } = useContext(AppContext);
  const [show, setShow] = React.useState(false);

  // Fake login for demo
  const handleLogin = (e) => {
    e.preventDefault();
    // For demonstration, any username logs in:
    const uname = e.target.username.value || "demo";
    dispatchAuth({ type: "LOGIN_SUCCESS", payload: { username: uname } });
    setShow(false);
  };

  return (
    <>
      <button className="auth-btn" onClick={() => setShow(true)}>
        Login / Signup
      </button>
      {show && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                minLength={2}
                required
                autoFocus
              />
              <input type="password" name="password" placeholder="Password" required />
              <div style={{ marginTop: 12 }}>
                <button className="btn primary" type="submit">
                  Login
                </button>
                <button
                  className="btn"
                  type="button"
                  style={{ marginLeft: 8 }}
                  onClick={() => setShow(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
