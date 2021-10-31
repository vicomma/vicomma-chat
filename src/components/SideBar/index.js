import React, { useState, useEffect } from "react";
import CallSvg from "../../Logo/call.svg";
import UserSvg from "../../Logo/user.svg";
import EmailSvg from "../../Logo/email.svg";
import Plus from "../../Logo/plus.svg";
import Search from "../../Logo/search.svg";

import Input from "../../components/Form/TextInput";
const TopNav = () => {
  return (
    <div
      className="chatOptions"
      style={{
        display: "flex",
        flexDirection: "row",
        color: "$vicomma-purple",
        backgroundColor: "#FFFFFF",
        height: "100%",
        padding: "0.9em",
        justifyContent: "space-evenly",
      }}
    >
      <img src={EmailSvg} width="24px" height="24px" />
      <img src={UserSvg} width="24px" height="24px" />
      <img src={CallSvg} width="24px" height="24px" />
    </div>
  );
};

const Sidebar = () => {
  return (
    <React.Fragment>
      <div className="leftSide">
        <TopNav />
        <ChatSection />
      </div>
    </React.Fragment>
  );
};

const ChatSection = () => {
  const [historyQuery, setHistoryQuery] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setHistoryQuery(value);
  };
  return (
    <React.Fragment>
      <div className="sb-chat-header">
        <h1>Chats</h1>
        <div
          style={{
            backgroundColor: "white",
            padding: "5px",
            borderRadius: "45px",
          }}
        >
          <img src={Plus} />
        </div>
      </div>

      <div
        style={{
          marginTop: "2em",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "5px",
          radius: "45px",
        }}
      >
        <img src={Search} width="15px" height="15px" />
        <Input
          style={{
            width: "100%",
            height: "30px",
            border: "none",
          }}
          type={"text"}
          name={"history_q"}
          placeholder={"Search"}
          value={historyQuery}
          onChange={handleChange}
        />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
