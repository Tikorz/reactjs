import React, { useEffect } from "react";
import { Accordion, Button } from "react-bootstrap";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Messages from "../messages/Messages";
import SendIcon from "@mui/icons-material/Send";
import "./Notes.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { listForum } from "../../redux/forum/noteActions";

function Notes({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteList = useSelector((state) => state.noteList);
  const { notes } = noteList;

  useEffect(() => {
    dispatch(listForum());
  }, [dispatch, history]);

  return (
    <MainScreen title={`List of Forum`}>
      {userInfo ? (
        <Link to="createForum">
          <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
            Create New Forum
          </Button>
        </Link>
      ) : (
        <Link></Link>
      )}
      <List>
        {notes &&
          notes?.map((forum) => (
            <Link
              to={{
                pathname: `/forum`,
                state: { forum },
              }}
            >
              <ListItem
                classname="list-item"
                style={{
                  width: "100%",
                  background: "white",
                  padding: "12px",
                  border: "solid",
                  borderWidth: "2px",
                  textDecoration: "none",
                  marginTop: "5px",
                  marginBottom: "5px",
                }}
              >
                {" "}
                {forum.forumName}
              </ListItem>
            </Link>
          ))}
      </List>
    </MainScreen>
  );
}

export default Notes;
