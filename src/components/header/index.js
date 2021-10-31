import React, { Component } from "react";
//import Logo from "../../Logo/vicomma-logo-add.jpeg";
import Nav from "../Navigation";
const Header = () => {
  const links = [
    { url: "#", title: "Sign In" },
    { url: "#", title: "Sign Up" },
    { url: "#", title: "How it works" },
    { url: "#", title: "For the Creators" },
  ];

  return (
    <React.Fragment>
      <div className="header">
        <Nav links={links} />
      </div>
    </React.Fragment>
  );
};

export default Header;
