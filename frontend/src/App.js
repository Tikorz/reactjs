import React ,{useState} from "react";
import './App.css';
import TopMenu from "./react/components/TopMenu";
import "./index.css";
import Footer from "./react/components/Footer";
import { BrowserRouter, Route} from 'react-router-dom';
import Homepage from "./screens/Homepage/Homepage";
import Notes from "./react/forum/Notes";
import NotesMe from "./react/forum/NotesMe";
import CreateNote from "./react/forum/CreateNote";
import Login from "./react/user/Login";
import Register from "./react/user/Register";
import About from "./screens/About/About";
import Impressum from "./screens/Impressum/Impressum";
import Profile from "./react/user/Profile";
import ProfileEdit from "./react/user/ProfileEdit";
import UserManagement from "./react/user/UserManagement";
import CreateUser from "./react/user/CreateUser";


 
function App  () {
  const [search, setSearch] = useState("");
  
  return (
  <BrowserRouter>
    <TopMenu />
    <main>
      <Route path='/' component={Homepage} exact/>
      <Route path='/notes' component={Notes} exact />
      <Route
          path="/notesMe"
          component={({ history }) => (
            <NotesMe search={search} history={history} />
          )}
        />
      <Route path='/login' component={Login} exact />
      <Route path='/register' component={Register} exact />
      <Route path='/about' component={About} exact />
      <Route path='/impressum' component={Impressum} exact />
      <Route path='/profile' component={Profile} exact />
      <Route path='/profileedit' component={ProfileEdit} exact />
      <Route path='/userManagement' component={UserManagement} exact />
      <Route path='/createUser' component={CreateUser} exact />
      <Route path='/createForum' component={CreateNote} exact />
    </main>
    <Footer />
  </BrowserRouter>
  );
}
  
export default App;

