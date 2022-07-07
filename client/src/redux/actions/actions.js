import axios from "axios";
import { GET_ALLPLAYERS, SET_ERRORS } from "./types";

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
            console.log(response.data)
            return dispatch({ type: GET_ALLPLAYERS, payload: response.data });

        } catch (e) {

            console.log(e);
            return dispatch({ type: SET_ERRORS });

        }
    }
}