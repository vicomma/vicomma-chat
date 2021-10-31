import React, { Component } from "react";
import Panel from "../Panel";
import Sidebar from "../SideBar";
const Content = () => {
  return (
    <React.Fragment>
      <div className="content">
        <Panel bg="#F9FBFC">
          <Sidebar />
        </Panel>
        <Panel>Panel 2</Panel>
        <Panel>Panel 3</Panel>
      </div>
    </React.Fragment>
  );
};

export default Content;
