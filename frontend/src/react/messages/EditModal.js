import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMessageAction,
  listMessage,
} from "../../redux/messages/messageActions";
import Typography from "@material-ui/core/Typography";
import { TextField } from "@material-ui/core";
import { Button } from "react-bootstrap";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, handleClose, message,userID }) => {
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState(message.messageText);
  const handleEdit = (messageText) => {
    console.log(messageText)
    dispatch(updateMessageAction(message._id, messageText));
    dispatch(listMessage());
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TextField
          disabled
          style={{ width: "100%" }}
          value={message.messageTitle}
          id="outlined-basic"
          label="Title"
        />
        <TextField
          multiline
          rows={3}
          style={{ width: "100%" }}
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          id="outlined-basic"
          label="Body"
        />

        <Button
          style={{ marginTop: "10px" }}
          onClick={() => handleEdit(messageText)}
          
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );
};

export default EditModal;

