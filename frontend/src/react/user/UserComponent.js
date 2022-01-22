import React from "react";
import { Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { deleteUserAction } from "../../redux/user/userActions";
import { useDispatch } from "react-redux";

function UserComponent(props) {
  
  const user = props.user;
  const id = props.id;
  const key = props.key;

  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? you want to delete")) {
      dispatch(deleteUserAction(id));
    }
  };

  return <Accordion.Item style={{ margin: 10 }} key={key} id={id}>
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
      {user.userID}
    </span>
    <div>
      <Link
        to={{
          pathname: "/profileedit",
          query: { user },
        }}
      >
        <Button id="EditButton">Edit</Button>
      </Link>
      <Button
        id={"DeleteButton"+ user.userID}
        variant="danger"
        className="mx-2"
        onClick={() => deleteHandler(user.userID)}
      >
        Delete
      </Button>
    </div>
  </Accordion.Header>

  <Accordion.Body>
    <blockquote className="blockquote mb-0">
      <ReactMarkdown>{user.userName}</ReactMarkdown>
      <footer className="blockquote-footer">
        ID by user:<div>{user.userID}</div>
        UserID:<div>{user.userID}</div>
        userName:<div>{user.userName}</div>
        isAdministrator:<div>{user.isAdministrator}</div>
      </footer>
    </blockquote>
  </Accordion.Body>
</Accordion.Item>
}

export default UserComponent;