import React, { useEffect} from "react";
import { Button, Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from 'react-redux';
import { deleteNoteAction, listForumUser } from "../../redux/actions/noteActions";




function NotesMe ({ history,search }){
    const dispatch = useDispatch();
  
    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const noteList = useSelector(state => state.noteList);
    const { forum } = noteList;


    const deleteHandler = (_id) => {
      if (window.confirm("Are you sure?")) {
        dispatch(deleteNoteAction(_id));
      }
    }


    useEffect(() => {
      dispatch(listForumUser());
    } , [dispatch]); 
  return (
    
    <MainScreen title={` ${userInfo.auth.username}´s Forum..`}>
      {console.log(forum)}
   

    <Link to="createForum">
      <Button style={{ marginLeft: 10, marginBottom: 6 }} size="lg">
        Create New Forum
      </Button>
    </Link>
  
    {/*{forum.map(forum => (*/}
      {forum &&
        forum?.map((forum) => (
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
            

            <div>
              <Button to='notesEdit'>Edit</Button>
              <Button
                variant="danger"
                className="mx-2"
                onClick={() => deleteHandler(forum._id)}
              >
                Delete
              </Button>
            </div>
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
  



};

export default NotesMe;
