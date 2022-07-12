import axios from "axios";
import { 
  GET_ALLPLAYERS, 
  GET_GAMECONTROL, 
  SET_ERRORS,
  CREATE_FORM,
  GET_FORMS,
  GET_FORM_ID
} from "./types";

export const getAllPlayers = (dispatch) => {
    return async function (dispatch) {

        try {

            var response = await axios.get(`http://localhost:3002/player`);
            return dispatch({ type: GET_ALLPLAYERS, payload: response.data });

        } catch (e) {

            console.log(e);
            return dispatch({ type: SET_ERRORS });

        }
    }
}

export const getGameControl = (dispatch) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/adminControl`);
          return dispatch({ type: GET_GAMECONTROL, payload: response.data.response[0].variables });

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS });

      }
  }
}

export const createActionForm = (id, actionForm) => {
  return async function (dispatch) {

      try {

          var response = await axios.post(`http://localhost:3002/form/${id}`, actionForm);
          console.log("Form enviado")
          return dispatch({type: CREATE_FORM, payload: response.data});

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS });

      }
  }
}

export const getAllForms = (dispatch) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form`);
          return dispatch({ type: GET_FORMS, payload: response.data });

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS });

      }
  }
}

export const getFormById = (id) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form/${id}`);
          console.log(response.data.response)
          return dispatch({ type: GET_FORM_ID, payload: response.data.response});

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS });

      }
  }
}