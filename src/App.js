import React from "react";
import Settings from "./components/settings";
import Content from "./components/Content";
import Header from "./components/header";
import "./index.scss";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Content />
      {/* <Settings /> */}
    </React.Fragment>
  );
}
export default App;
