import React, { useState,useEffect } from "react";
import { Form, Button} from "react-bootstrap";
import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../../redux/actions/userActions';
import "./CreateUser.css";

function CreateUser ({history}) {

  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userCreate = useSelector((state) => state.userCreate);
  const { userInfo } = userCreate;
  
  const resetHandler = () => {
      setuserID("");
      setuserName("");
      setPassword("");
  };

  const submitHandler = async (e) => {    
    e.preventDefault()
    dispatch(createUser(userID, userName, password));
    if(!userID || !userName || !password) return;

    resetHandler();
    history.push("/userManagement");
  }

  useEffect(() => {}, []);
  
  
  return(
  <MainScreen title='Create User'>
     <div class="form-popup" id="myForm">
     <Form onSubmit={submitHandler}>
          <Form.Group controlId="formBasicuserID">
            <Form.Label>userID</Form.Label>
            <Form.Control
              type="userID"
              value={userID}
              placeholder="Enter userID"
              onChange={(e) => setuserID(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formBasicuserName">
            <Form.Label>userName</Form.Label>
            <Form.Control
              type="userName"
              value={userName}
              placeholder="Enter userName"
              onChange={(e) => setuserName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        
    </div>
  </MainScreen>
  );
}

export default CreateUser;
