import React, { useState, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { Table, TableHead, TableCell, Paper, TableRow, TableBody, Button, makeStyles } from '@material-ui/core'
import MainScreen from "../components/MainScreen";
import "./ProfileEdit.css";
import Link from "react-dom";
import axios from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers, deleteUser } from "../../redux/actions/userActions";

const UserManagement = ({ history }) => {
 
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user")
      .then((response) => setForum(response.data));
  }, []);
  
 
  {/*return (
    <MainScreen title="User Management">
          <div className="App">
          <thead className='thead-dark'>
          <tr>
            <th scope='col'>Edit</th>
            <th scope='col'>Delete</th>
            <th scope='col' id='id' >
              id 
            </th>
            <th scope='col' id='userName' >
              userID
            </th>
            <th scope='col' id='userName' >
              userName 
            </th>
            <th scope='col' id='password' >
              password
            </th>
            <th scope='col' id='isAdministrator' >
              isAdministrator
            </th>
          </tr>
        </thead>
            </div>
            </MainScreen>
  );*/}

  return (
    <MainScreen title={`List of Users`}>
      {users &&
        users.map((users) => (
          <Accordion>
            <Card style={{ margin: 10 }} key={user._id}>
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
              </Card.Header>
            
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{users.userName}</ReactMarkdown>
                  <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          
                          {users.userID}
                          
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
