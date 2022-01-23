import React from "react";
import Messages from "../messages/Messages";
import { useLocation } from "react-router";
import MainScreen from "../components/MainScreen";

const Forum = () => {
  // const name = location.get("name");
  const { state } = useLocation();
  const { forum } = state;
  const { forumName, ownerID } = forum;
  return (
    <MainScreen title={forumName}>
      <div className="messages">
        <Messages forum={forum} />
      </div>
      <h6>Forum Created By: {ownerID}</h6>
    </MainScreen>
  );
};

export default Forum;
