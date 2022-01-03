import React, { useState, useEffect } from "react";
import { Card,Accordion, Button} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import { useSelector, useDispatch } from 'react-redux';
import { deleteUserAction } from "../../redux/actions/userActions";
import "./ProfileEdit.css";

import axios from "axios";

import ReactMarkdown from "react-markdown";

function UserManagement({ history }) {
 
  const dispatch = useDispatch
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteUser = useSelector((state) => state.deleteUser);

  const createUser = useSelector((state) => state.createUser);

  const updateUser = useSelector((state) => state.updateUser);



  const [users, setUsers] = useState([]);
  const api = "http://localhost:8080/user";
  const token = userInfo.token.token;

  useEffect(() => {
    axios
      .get(api,{
        headers: {
          "Authorization" : `Bearer ${token}`}})      
      .then((response) => setUsers(response.data));
  }, []);

  const deleteHandler = (_id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUserAction(_id));
    }
  };

  return (
    <MainScreen title={`List of Users`}>
       <Link to="/createUser">
        <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
          Create new User
        </Button>
      </Link>
     
      {users &&
        users.map((users) => (
          <Accordion>
            <Card style={{ margin: 10 }} key={users._id}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  // onClick={() => ModelShow(note)}
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                      
                      {users.userName}               
                </span>
                <div>
                    <Button to='updateUser'>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(users._id)}
                    >
                      Delete
                    </Button>
                  </div>
              </Card.Header>
            
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>
                    {users.userName}
                  </ReactMarkdown>
                  <footer className="blockquote-footer">
                        ID by user:{" "}
                        <cite title="Source Title">
                          
                          {users._id}
                          
                          
                        </cite>
                      </footer>
                </blockquote>
              </Card.Body>
             
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
};

export default UserManagement;
