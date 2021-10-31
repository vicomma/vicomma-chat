import React, { Component } from "react";

const Nav = ({ links }) => {
  return (
    <React.Fragment>
      <div className="nav">
        <img
          style={{ float: "left", marginTop: "7px" }}
          src="../src/Logo/vicomma-logo-add.jpeg"
          width="150px"
          height="40px"
        />
        <div className="left-nav">
          <ul style={{ float: "right" }}>
            {links.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.url}> {link.title} </a>
                </li>
              );
            })}
          </ul>
          <button
            style={{
              borderRadius: "45px",
              padding: "3px",
              background: "#93CB52",
              border: "none",
              padding: "8px",
              color: "white",
              float: "right",
              marginTop: "6px",
              marginBottom: "6px",
              fontWeight: "600",
            }}
            onClick={() => console.log("pressing")}
          >
            Start a Vendor Station
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Nav;
