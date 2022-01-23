import React, { useState, useEffect } from "react";
import { Card, Accordion, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import MainScreen from "../components/MainScreen";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../components/Loading";
import {
  deleteUserAction /*, updateUser*/ /*, register*/,
  getUsers,
} from "../../redux/user/userActions";
import "./ProfileEdit.css";

import UserComponent from "./UserComponent";

//import axios from "axios";

function UserManagement({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const userList = useSelector((state) => state.userList);
  const { loading } = userLogin;
  const { users } = userList;

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch, history]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure? you want to delete")) {
      dispatch(deleteUserAction(id));
      dispatch(getUsers());
    }
  };
  return (
    <MainScreen title={`List of Users`}>
      <Link to="/createUser" id="OpenCreateUserDialogButton">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new User
        </Button>
      </Link>

      {users &&
        users.map((user) => (
          <Accordion defaultActiveKey="0">
            <UserComponent
              id={"UserItem" + user.userID}
              key={user.userID}
              user={user}
            />
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default UserManagement;
