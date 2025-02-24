import React from 'react';

const Header = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      height: "60px",
      display: "flex",
      alignItems: "center",
      padding: "0 20px",
      background: "#212121",
      color: "#fff",
      fontSize: "18px",
      fontWeight: "bold",
      zIndex: 1000,
      width: "100%",
    }}
  >
    PixelForge
  </div>
);

export default Header; 