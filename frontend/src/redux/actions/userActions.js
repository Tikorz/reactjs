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
    USER_GETUSERS_REQUEST,
    USER_GETUSERS_SUCCESS,
    USER_GETUSERS_FAIL,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
  } from "../constants/userConstants";
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
      
          //config.token = response.data.token;
          const decodedToken = jwt.decode(token);
          console.log(decodedToken);
          data.userName =  decodedToken.userName;
          data.isAdministrator = decodedToken.isAdministrator;
          data.userID = decodedToken.userID;
          data._id = decodedToken._id;
          config.userID = data.userID;
          config.isAdministrator = data.isAdministrator;
          config.userName = data.userName;
          config._id = data._id;
          

          config.token = response.data;

        }
        localStorage.setItem("userInfo", JSON.stringify(config));
        
       
        
      } catch (error) {
        //alert("Sorry, login failed");
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

export const createUser =(userID, userName, password) => async (dispatch) => {
   try {
      dispatch({ type: USER_REGISTER_REQUEST});
      
       const config = {
         headers: {
           "Content-type": "application/json",
         }
       };
       const { data } = await axios.post('http://localhost:8080/user/', 
       {
         userID,
         userName,
         password
       },
       config
       );
       console.log(data);

       dispatch({ type: USER_REGISTER_SUCCESS, payload: config});
       
       dispatch({ type: USER_LOGIN_SUCCESS, payload: config});

       localStorage.setItem("userInfo", JSON.stringify(data));
        
    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
       //setError(error.response.data.message);
       console.log(error);
        
      }
  }


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
      dispatch({ type: USER_GETUSERS_REQUEST });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
  
      const { data } = await axios.get("http://localhost:8080/user", user, config);
  
      dispatch({ type: USER_GETUSERS_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_GETUSERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const deleteUserAction = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: USER_DELETE_REQUEST});
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.delete("http://localhost:8080/user/", user, config);
  
      dispatch({ type: USER_DELETE_SUCCESS, payload: data });
  
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_DELETE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };