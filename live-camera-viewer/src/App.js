<<<<<<< HEAD
import React, { useState } from "react";
import LiveFeed from "./LiveFeed";

function App() {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
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
=======
import React from 'react';
import LiveImageViewer from './LiveImageViewer';
import './App.css';

function App() {
  return (
    <div className="App">
      <LiveImageViewer />
>>>>>>> 8b00055
    </div>
  );
}

export default App;
