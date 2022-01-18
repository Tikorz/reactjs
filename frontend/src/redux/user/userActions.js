import { 
    USER_LOGIN_SUCCESS, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_FAIL, 
    USER_LOGOUT, 
    USER_REGISTER_SUCCESS, 
    USER_REGISTER_FAIL, 
    USER_REGISTER_REQUEST,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL, 
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
  } from "./userConstants";
import axios from 'axios';
import jwt from 'jsonwebtoken';



export const login = (userID, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST });
       
        
        const url = "http://localhost:8080/authenticate/";
        
        const config = {
          auth: {
            username: userID,
            password,

          },
        };
    
        const data = {};
        const response = await axios.post(
            url, 
            data, 
            config,
            
        )


        dispatch({ type: USER_LOGIN_SUCCESS, payload: config});
        
        
       
        if (response.status === 200) {
          // Login succeeded
          const token = response.data.token;
      
          config.token = response.data.token;
          const decodedToken = jwt.decode(token);
          console.log(decodedToken);
          //data.userName =  decodedToken.userName;
          data.isAdministrator = decodedToken.isAdministrator;
          data.userID = decodedToken.userID;
          data._id = decodedToken._id;
          data.password = decodedToken.password;
          config.userID = data.userID;
          config.password = data.password;
          config.isAdministrator = data.isAdministrator;
          //config.userName = data.userName;
          config._id = data._id;
          
          

          config.token = response.data;

        }
        localStorage.setItem("userInfo", JSON.stringify(config));
        
       
        
      } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.ErrorMessage
                    ? error.response.data.ErrorMessage
                    : error.message,
        });
      }
};

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_LOGOUT });
  };



  export const register =
  (userID, userName, password) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });


      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const url = "http://localhost:8080/user/";

      const { data } = await axios.post(
        url,
        { userID, userName, password },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: message,
      });
    }
  };


  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_UPDATE_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
      
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      console.log(user);
      const { data } = await axios.put("http://localhost:8080/user/", user, config);
  
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      
    } catch (error) {
      dispatch({
        type: USER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const getUsers = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_LIST_REQUEST });
  
      const {
         userLogin: { userInfo },
        } = getState();
      
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const url = "http://localhost:8080/user/"
      const { data } = await axios.get(url, config);
  
      dispatch({ type: USER_LIST_SUCCESS, payload: data });
  
    
    } catch (error) {
      dispatch({
        type: USER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const deleteUserAction = (_id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: USER_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const url = "http://localhost:8080/user/"+_id;
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      console.log(userInfo.token.token);
      const { data } = await axios.delete(url, config);
  
      dispatch({
        type: USER_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: USER_DELETE_FAIL,
        payload: message,
      });
    }
  };
