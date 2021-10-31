import React, { Component } from "react";

const Panel = ({ children, bg }) => {
  const bgColor = bg || "white";

  return (
    <>
      <div className="panel" style={{ backgroundColor: bgColor }}>
        {children}
      </div>
    </>
  );
};

export default Panel;
