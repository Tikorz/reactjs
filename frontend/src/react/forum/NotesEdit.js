import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction } from "../../redux/forum/noteActions";

import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const NotesEdit = ({ history }) => {
  const [forumName, setforumName] = useState("");
  const [forumDescription, setforumDescription] = useState("");


  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const noteList = useSelector((state) => state.noteList);
  const { notes } = noteList;


  useEffect(() => {
    if (!userInfo) {
      history.push("/notesMe");
    } else {
      setforumName(notes.forumName);
      setforumDescription(notes.forumDescription);
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction({ forumName, forumDescription }));
  };

  console.log(notes.forumName);
  console.log(notes.forumDescription);
  console.log(notes);
  console.log(noteList);
  return (
    <MainScreen title="EDIT MyNote">
      <div id="ForumEdit">
        <Row className="ForumContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="forumName">
                <Form.Label>forumName</Form.Label>
                <Form.Control
                  id="forumNameInput"
                  type="text"
                  placeholder="Enter forumName"
                  value={notes.forumName}
                  onChange={(e) => setforumName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="forumDescription">
                <Form.Label>forumDescription</Form.Label>
                <Form.Control
                  id="forumDescriptionInput"
                  type="text"
                  placeholder="Enter forumDescription"
                  value={notes.forumDescription}
                  onChange={(e) => setforumDescription(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Button type="submit" varient="primary" onClick={submitHandler}>
                Update
              </Button>
            </Form>
          </Col>
          <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          ></Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default NotesEdit;
