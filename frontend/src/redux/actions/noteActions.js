import {
  NOTES_CREATE_FAIL,
  NOTES_CREATE_REQUEST,
  NOTES_CREATE_SUCCESS,
  NOTES_DELETE_FAIL,
  NOTES_DELETE_REQUEST,
  NOTES_DELETE_SUCCESS,
  NOTES_LIST_FAIL,
  NOTES_LIST_REQUEST,
  NOTES_LIST_SUCCESS,
  NOTES_UPDATE_FAIL,
  NOTES_UPDATE_REQUEST,
  NOTES_UPDATE_SUCCESS,
} from "../constants/notesConstants";
import axios from "axios";

export const listForum = () => async (dispatch) => {
  try {
    dispatch({
      type: NOTES_LIST_REQUEST,
    });

    const url = "http://localhost:8080/forum/";

    const data = {};
    const response = await axios.get(url, data);

    dispatch({
      type: NOTES_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem("forumInfo", JSON.stringify(response));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_LIST_FAIL,
      payload: message,
    });
  }
};

export const listForumUser = () => async (dispatch, getState) => {
    try {
        dispatch({
          type: NOTES_LIST_REQUEST,
        });
    
        const {
          userLogin: { userInfo },
        } = getState();
    
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token.token}`,
          },
        };

       
        const url = "http://localhost:8080/forum/getByToken";
        
        const {data}= await axios.get(url, config);

    
        dispatch({
          type: NOTES_LIST_SUCCESS,
          payload: data,
        });
      
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({
          type: NOTES_LIST_FAIL,
          payload: message,
        });
      }
};

export const createNoteAction =
  (forumName, forumDescription) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token.token}`,
        },
      };
      const url = "http://localhost:8080/forum/";

      const { data } = await axios.post(
        url,
        { forumName, forumDescription },
        config
      );

      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteNoteAction = (_id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NOTES_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const url = "http://localhost:8080/forum/delete";

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token.token}`,
      },
    };
    console.log(userInfo.token.token);
    const { data } = await axios.delete(url,{_id}, config);

    dispatch({
      type: NOTES_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: NOTES_DELETE_FAIL,
      payload: message,
    });
  }
};

export const updateNoteAction =
  (forumName, forumDescription) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();
      const url = "http://localhost:8080/forum/";

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        url,
        { forumName, forumDescription },
        config
      );

      dispatch({
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };
