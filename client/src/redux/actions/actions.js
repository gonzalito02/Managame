import axios from "axios";
import { 
  GET_ALLPLAYERS, 
  GET_GAMECONTROL, 
  SET_ERRORS,
  GET_FORMS,
  GET_FORM_ID,
  GET_PLAYER_ID,
} from "./types";

export const getAllPlayers = (dispatch) => {
    return async function (dispatch) {

        try {

            var response = await axios.get(`http://localhost:3002/player`);
            return dispatch({ type: GET_ALLPLAYERS, payload: response.data });

        } catch (e) {

            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getAllPlayers; status: ${e.response.status}; code: ${e.code}`});

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
          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getGameControl; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const createActionForm = (id, actionForm) => {
  return async function (dispatch) {

      try {

          var response = await axios.post(`http://localhost:3002/form/${id}`, actionForm);
          console.log(response)
          return dispatch({type: SET_ERRORS, payload: "formulario creado"});

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action createActionForm; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const getAllForms = (dispatch) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form`);
          return dispatch({ type: GET_FORMS, payload: response.data });

      } catch (e) {

          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getAllForms; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const getFormById = (id) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form/${id}`);
          return dispatch({ type: GET_FORM_ID, payload: response.data.response});

      } catch (e) {

          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getFormById; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const getPlayerById = (id) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/player/${id}`);
            return dispatch({ type: GET_PLAYER_ID, payload: response.data.response});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getPlayerById; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const updateDataPlayer = (id, data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/player/${id}`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action updateDataPlayer; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
  }