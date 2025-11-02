import React, { useEffect, useState } from "react";

function CheckServerConnection() {
  const [status, setStatus] = useState("Checking connection...");
  const cameraURL = "http://172.20.10.2:5001/video_feed";

  useEffect(() => {
    fetch(cameraURL, { method: "HEAD" })
      .then((res) => {
        if (res.ok) {
          setStatus("✅ Connected to Dog Camera Server!");
        } else {
          setStatus("⚠️ Server found, but feed not streaming.");
        }
      })
      .catch(() => setStatus("❌ Cannot connect to Dog Camera Server."));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>{status}</h2>
      {status.startsWith("✅") && (
        <img
          src={`${cameraURL}?t=${new Date().getTime()}`}
          alt="Live Dog Camera"
          style={{
            width: "640px",
            height: "480px",
            borderRadius: "12px",
            border: "2px solid #ccc",
          }}
        />
      )}
    </div>
  );
}

export default CheckServerConnection;
