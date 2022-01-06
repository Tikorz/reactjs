import React, { useState , useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import { register } from "../../redux/actions/userActions";

import "./ProfileEdit.css";
import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const CreateUser = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userRegister = useSelector((state) => state.userRegister);
  //const { userInfo } = userRegister;
 

  const resetHandler = () => {
    setuserID("");
    setuserName("");
    setPassword("");
   
  };


  useEffect(() => {
    if(!userInfo){
      history.push("/userManagement")
    }else{
      setuserID(userInfo.userID)
      setuserName(userInfo.userName)
      setPassword(userInfo.password)
    }
    
  }, [history,userInfo])
  const submitHandler = (e) => {
    console.log("User is created");
    e.preventDefault();
    resetHandler();
    dispatch(register(userID, userName, password));
    if (!userID || !userName || !password) return;
    
    
  };
  return (
    <MainScreen title="Create an User">
      <div>
        <Row className="userCreat">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              

              <Form.Group  controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter userID"
                  value={userID}
                  onChange={(e) => setuserID(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="userName">
                <Form.Label>userName</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter userName"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit"  variant="primary">
              Create Note
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
          >
            {/*<img src={pic} alt={userID} className="profilePic" />*/}
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default CreateUser;
