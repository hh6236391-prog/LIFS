import React, { useState } from "react";
import LiveFeed from "./LiveFeed";
import "./App.css";

function App() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div className="App" style={{ textAlign: "center", marginTop: "30px" }}>
      <h1>🐶 Dog Robot Camera Feed</h1>
      {!connected ? (
        <div>
          <p>Click below to connect to the live camera server (no Wi-Fi needed):</p>
          <button
            onClick={handleConnect}
            style={{
              padding: "12px 24px",
              fontSize: "18px",
              borderRadius: "10px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Connect to Camera
          </button>
        </div>
      ) : (
        <LiveFeed />
      )}
    </div>
  );
}

export default App;
