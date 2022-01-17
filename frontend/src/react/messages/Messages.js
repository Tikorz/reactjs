import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteMessageAction,
  listMessage,
  createMessageAction,
} from "../../redux/messages/messageActions";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import useStyles from "./styles.js";

function Messages({ forum }) {
  console.log(forum);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const messageList = useSelector((state) => state.messageList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { messages } = messageList;

  const handleClick = async () => {
    const finalMessage = `${userInfo.userName}: ${message}`;
    await dispatch(createMessageAction(forum._id, finalMessage));
    dispatch(listMessage());
    setMessage("");
  };

  useEffect(() => {
    dispatch(listMessage());
  }, []);

  console.log(messages);

  return (
    <div>
      <div className={classes.messagesOuterContainer}>
        <div className={classes.messagesInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>
          {messages
            ?.filter((message) => message.forumID === forum._id)
            ?.map((c) => (
              <Typography key={c._id} gutterBottom variant="subtitle1">
                <strong>{c.messageText} </strong>
              </Typography>
            ))}
        </div>
        {userInfo?.userName && (
          <div style={{ width: "70%" }}>
            <Typography gutterBottom variant="h6">
              Comments
            </Typography>
            <Button classname="btn text-end">Edit</Button>
            <TextField
              fullwidth="false"
              rows={4}
              variant="outlined"
              label="add a Comment"
              multiline
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              style={{ marginTop: "10px" }}
              fullwidth="false"
              disabled={!message}
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Send
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Messages;
