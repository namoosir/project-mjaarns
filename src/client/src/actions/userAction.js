import axios from "axios";

import {
  LOADING_USER_SUCCESSFUL,
  LOGOUT_USER_SUCCESSFUL,
  USER_UPDATED_SUCCESFUL,
  UPDATE_UPDATED_USER,
} from "./types";

export const register1 = (user, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/register", user)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: LOADING_USER_SUCCESSFUL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err, "couldn't connect to server");
    });
};

export const login1 = (user, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/login", user)
    .then((res) => {
      console.log("HEREEEEEEEEEE");
      dispatch({
        type: LOADING_USER_SUCCESSFUL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      history.push("/login");
    });
};

export const login2 = (user, history) => (dispatch) => {
  axios
    .post(`http://localhost:3001/profile/auth`, user)
    .then((res) => {
      dispatch({
        type: LOADING_USER_SUCCESSFUL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      history.push("/home");
    });
};

export const updateProfileSuccessful = () => (dispatch) => {
  dispatch({
    type: USER_UPDATED_SUCCESFUL,
  });
};

export const updateUser = (user, history) => (dispatch) => {
  axios
    .get(`http://localhost:3001/user/update/${user.id}`)
    .then((res) => {
      dispatch({
        type: UPDATE_UPDATED_USER,
        payload: res.data,
      });
    })
    .catch((e) => {
      history.push("/profile");
    });
};

export const updateUserHome = (user, history) => (dispatch) => {
  axios
    .get(`http://localhost:3001/user/update/${user.id}`)
    .then((res) => {
      dispatch({
        type: UPDATE_UPDATED_USER,
        payload: res.data,
      });
    })
    .catch((e) => {
      history.push("/home");
    });
};

export const logout = (user, history) => (dispatch) => {
  dispatch({
    type: LOGOUT_USER_SUCCESSFUL,
  });
};
