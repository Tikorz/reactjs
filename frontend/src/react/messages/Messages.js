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
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditModal from "./EditModal";
function Messages({ forum }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [selectedMessage, setSelectedMessage] = useState()
  const [messageTitle, setMessageTitle] = useState();
  const messageList = useSelector((state) => state.messageList);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const { messages } = messageList;
  const [open, setOpen] = React.useState(false);
  const handleOpen = (message) => { 
 setSelectedMessage(message) 
    setOpen(true) };
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    await dispatch(createMessageAction(forum._id, message, messageTitle));
    dispatch(listMessage());
  };

  useEffect(() => {
    dispatch(listMessage());
  }, [dispatch]);

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure? you want to delete")) {
      dispatch(deleteMessageAction(_id));
      dispatch(listMessage());
    }
  };

  return (
    <div>
      {console.log(userInfo)}
      <div className={classes.messagesOuterContainer}>
        <div
          style={{ flexGrow: "1" }}
          className={classes.messagesInnerContainer}
        >
          <Typography gutterBottom variant="h6">
            Comment List
          </Typography>
          {messages &&
            messages
              .filter((message) => message.forum === forum._id)
              .map((message) => (
                <div>
                  <Typography
                    style={{ display: "flex" }}
                    key={message._id}
                    gutterBottom
                    variant="subtitle1"
                  >
                    <div>
                      <strong>{`Title: ${message.messageTitle} `}</strong>
                      <br />

                      {`Comment: ${message.authorID}: ${message.messageText}`}
                    </div>
                    {userInfo && message.authorID === userInfo.userID && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginLeft: "auto",
                          marginRight: "20px",
                        }}
                      >
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => deleteHandler(message._id)}
                        />
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={()=>handleOpen(message)}

                        >
                          Open modal
                        </EditIcon>
                        
                      </div>
                    )}
{selectedMessage &&<EditModal
                          open={open}
                          handleClose={handleClose}
                          message={selectedMessage}
                          userID={userInfo.userID}
                        />}
                  </Typography>
                  <hr />
                </div>
              ))}
        </div>
        {userInfo?.userID && (
          <div
            style={{ width: "30%", display: "flex", flexDirection: "column" }}
          >
            <Typography gutterBottom variant="h6">
              Create Comment
            </Typography>

            <TextField
              fullwidth
              rows={1}
              variant="outlined"
              label="Add a Title"
              value={messageTitle}
              onChange={(e) => setMessageTitle(e.target.value)}
            />
            <TextField
              style={{ marginTop: "10px" }}
              fullwidth
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


