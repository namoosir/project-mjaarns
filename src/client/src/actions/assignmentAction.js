import axios from "axios";

import {
  LOAD_ENTREPRENEURS,
  LOAD_ASSIGNMENTS,
  CREATE_ASSIGNMENTS,
  CREATE_ASSIGNMENT_SUCCESSFULLY,
  AFTER_CREATE_ASSIGNMENT
} from "./types";

export const getEntrepreneurs = (history) => (dispatch) => {
  axios
    .get("http://localhost:3001/assignment/entrepreneurs")
    .then((res) => {
      dispatch({
        type: LOAD_ENTREPRENEURS,
        payload: res.data,
      });
    })
    .catch((e) => {
      console.log(e);
      history.push("/module");
    });
};

export const createAssignment = (assignment, history) => (dispatch) => {
  axios
    .post("http://localhost:3001/assignment/create", assignment)
    .then((res) => {
      dispatch({
        type: CREATE_ASSIGNMENTS,
      });
      return res;
    })
    .catch((e) => {
      console.log(e);
      history.push("/module");
    });
};

export const getAssignmentStudent = (id, history) => (dispatch) => {
  // axios
  //   .get(`http://localhost:3001/getAssignment/${id}`)
  //   .then((res) => {
  //     dispatch({
  //       type: LOAD_ASSIGNMENTS,
  //       payload: res.data,
  //     });
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     history.push("/home");
  //   });
};

export const loadAssignments = (user, history) => dispatch => {
  axios
  .get(`http://localhost:3001/assignment/assignments/${user.id}`)
  .then(res => {
    dispatch({
      type: LOAD_ASSIGNMENTS,
      payload: res.data
    })
  })
  .catch(e => {
    console.log(e);
    history.push("/home");
  })
} 

export const createAssignmentSuccesful = () => dispatch => {
  dispatch({
    type: CREATE_ASSIGNMENT_SUCCESSFULLY
  })
}

export const afterCreateAssignment = () => dispatch => {
  dispatch({
    type: AFTER_CREATE_ASSIGNMENT
  })
}
