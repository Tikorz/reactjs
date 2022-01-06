import React, { useState , useEffect} from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from "../../redux/actions/userActions";

import "./ProfileEdit.css";
import ErrorMessage from "../components/ErrorMessage";

import Loading from "../components/Loading";

const ProfileEdit = ({ history }) => {
  const [userID, setuserID] = useState("");
  const [userName, setuserName] = useState("");
  const [password, setPassword] = useState("");
  

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  useEffect(() => {
    if(!userInfo){
      history.push("/myProfile")
    }else{
      setuserID(userInfo.userID)
      setuserName(userInfo.userName)
      setPassword(userInfo.password)
    }
    
  }, [history,userInfo])
  const submitHandler = (e) => {
    
    e.preventDefault();
    dispatch(updateUser({ userID, userName, password }));
    
  };
  return (
    <MainScreen title="EDIT PROFILE">
      <div>
        <Row className="profileContainer">
          <Col md={6}>
            <Form onSubmit={submitHandler}>
              <ErrorMessage variant="success">
                Updated Successfully
              </ErrorMessage>

              {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
              <Form.Group  controlId="userID">
                <Form.Label>userID</Form.Label>
                <Form.Control
                  //type="text"
                  //placeholder="Enter userID"
                  readonly={userID}
                  /*onChange={(e) => setuserID(e.target.value)}*/
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
                  //type="password"
                  placeholder="Enter Password"
                  value={""}
                  onChange={(e) => setPassword(e.target.value)}
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
          >
            {/*<img src={pic} alt={userID} className="profilePic" />*/}
          </Col>
        </Row>
      </div>
    </MainScreen>
  );
};

export default ProfileEdit;
