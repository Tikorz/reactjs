import React, { useEffect, useState } from "react";
import {  Card, Accordion } from "react-bootstrap";

import MainScreen from "../components/MainScreen";
import axios from "axios";
import ReactMarkdown from "react-markdown";
//import { useDispatch} from "react-redux";


function Notes({ search }) {
  /*const dispatch = useDispatch();*/

  const [forum, setForum] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/forum")
      .then((response) => setForum(response.data));
  }, []);

  return (
    <MainScreen title={`List of Forum`}>
      {forum &&
        forum.map((forum) => (
          <Accordion>
            <Card style={{ margin: 10 }} key={forum._id}>
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
                  
                      {forum.forumName}
               
                </span>
              </Card.Header>
      
              <Card.Body>
                <blockquote className="blockquote mb-0">
                  <ReactMarkdown>{forum.forumDescription}</ReactMarkdown>
                  <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {forum.published_on.substring(0, 300)}
                          {forum.user}
                          
                        </cite>
                      </footer>
                </blockquote>
              </Card.Body>
             
            </Card>
          </Accordion>
        ))}
    </MainScreen>
  );
}

export default Notes;
