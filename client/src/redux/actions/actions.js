import axios from "axios";
import { GET_ALLPLAYERS, GET_GAMECONTROL, SET_ERRORS } from "./types";

// ejemplos:

/* export const getBooks = (dispatch) => {
    axios
      .get(`http://localhost:3001/books`)
      .then((res) => dispatch({ type: GET_BOOKS, payload: res.data }))
      .catch((e) => console.log(e));
  };

  export function getDetail(id) {
    return async function (dispatch) {
      try {
        var response = await axios.get(`http://localhost:3001/books/${id}`);
        return dispatch({ type: GET_DETAIL, payload: response.data });
      } catch (e) {
        console.log(e);
      }
    };
  } */

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