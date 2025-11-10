import React, { useState, useEffect, useRef } from 'react';
import './LiveImageViewer.css';

const LiveImageViewer = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [error, setError] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const intervalRef = useRef(null);
  const imageRef = useRef(null);

  const BACKEND_URL = '';

  const fetchImage = async () => {
    try {
      setError('');
      const timestamp = Date.now();
      const newUrl = `${BACKEND_URL}?t=${timestamp}`;

      // Preload image before switching to prevent flicker
      const img = new Image();
      img.src = newUrl;
      img.onload = () => {
        setImageUrl(newUrl);
        setLastUpdated(new Date().toLocaleTimeString());
      };
      img.onerror = () => {
        setError('❌ Failed to load image.');
      };
    } catch (err) {
      console.error('Error fetching image:', err);
      setError('❌ Could not reach backend.');
    }
  };

  const startAutoRefresh = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(fetchImage, 3000);
  };

  const stopAutoRefresh = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toggleAutoRefresh = () => {
    if (isAutoRefresh) stopAutoRefresh();
    else {
      startAutoRefresh();
      fetchImage();
    }
    setIsAutoRefresh(!isAutoRefresh);
  };

  useEffect(() => {
    fetchImage();
    if (isAutoRefresh) startAutoRefresh();
    return () => stopAutoRefresh();
  }, []);

  return (
    <div className="live-image-viewer">
      <header className="viewer-header">
        <h1>📸 Live Camera Feed</h1>
        {lastUpdated && <p>Last updated: {lastUpdated}</p>}
      </header>

      <div className="controls">
        <button onClick={toggleAutoRefresh} className="toggle-btn">
          {isAutoRefresh ? '⏸️ Pause Auto-Refresh' : '▶️ Resume Auto-Refresh'}
        </button>
        <button onClick={fetchImage} className="refresh-btn">🔄 Refresh</button>
      </div>

      <div className="image-container">
        {error ? (
          <p className="error-text">{error}</p>
        ) : (
          <img
            ref={imageRef}
            src={imageUrl}
            alt="Live Camera"
            className="camera-image"
          />
        )}
      </div>

      <footer className="viewer-footer">
        <p>{isAutoRefresh ? '🔄 Refreshing every 3s' : '⏸️ Auto-refresh paused'}</p>
        <small>Backend: {BACKEND_URL}</small>
      </footer>
    </div>
  );
};

export default LiveImageViewer;
