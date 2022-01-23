import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/user/userActions";

import "./ProfileEdit.css";
import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const CreateUser = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [isAdministrator, setisAdministrator] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, error, loading } = userLogin;

  const resetHandler = () => {
    setuserID("");
    setuserName("");
    setPassword("");
    setisAdministrator("");
  };

  useEffect(() => {
    if (!userInfo) {
      history.push("/userManagement");
    } else {
      resetHandler();
    }
  }, [history, userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    resetHandler();
    dispatch(register(userID, userName, password, isAdministrator));
    if (!userID || !userName || !password) return;
    history.push("/userManagement");
  };
  return (
    <MainScreen title="Create an User">
      <div>
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Row className="userCreate">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  id="UserIDInput"
                  type="text"
                  placeholder="User ID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  id="UserNameInput"
                  type="text"
                  placeholder="userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  id="PasswordInput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="isAdministrator">
                <Form.Label>isAdministrator</Form.Label>
                <Form.Control
                  id="isAdministratorInput"
                  type="boolean"
                  placeholder="isAdministrator"
                  value={isAdministrator}
                  onChange={(e) => setisAdministrator(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button id="CreateUserButton" type="submit" variant="primary">
                Create User
              </Button>
              <Button className="mx-2" onClick={resetHandler} variant="danger">
                Reset Feilds
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

export default CreateUser;
