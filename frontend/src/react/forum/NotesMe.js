import React, { useEffect } from "react";
import { Button, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listForumUser } from "../../redux/forum/noteActions";

function NotesMe({ history, search }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

   const noteList = useSelector((state) => state.noteList);
   const { notes } = noteList;
   console.log(noteList);

   const deleteHandler = (_id) => {
     if (window.confirm("Are you sure?")) {
       dispatch(deleteNoteAction(_id));
     }
   };

   useEffect(() => {
     dispatch(listForumUser());
   }, [dispatch]);

  return (
    <MainScreen title={` ${userInfo.userName}´s Forum..`}>
      <Link to="createForum">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create New Forum
        </Button>
      </Link>

      {notes &&
        notes.map((forum) => (
          <Accordion key={forum._id} defaultActiveKey="0">
            <Accordion.Item style={{ margin: 10 }} key={forum._id}>
              <Accordion.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  {forum.forumName}
                </span>

                <div>
                  <Link to="/notesEdit">
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(forum._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Accordion.Header>

              <Accordion.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{forum.forumDescription}</ReactMarkdown>
                  <footer className="blockquote-footer">
                    Created on{" "}
                    <cite title="Source Title">
                      {forum.published_on.substring(0, 300)}
                      {forum.user.userName}
                    </cite>
                  </footer>
                </blockquote>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default NotesMe;
