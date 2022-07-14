import axios from "axios";
import { 
  GET_ALLPLAYERS, 
  GET_GAMECONTROL, 
  SET_ERRORS,
  GET_ACTIONFORMS,
  GET_ACTIONFORM_ID,
  GET_PLAYER_ID,
  GET_PENDDINGACTIONFORMS,
  GET_MARKETLIVE,
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

export const getGameControl = () => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/adminControl`);
          console.log("gameGet", response)
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
          return dispatch({type: SET_ERRORS, payload: "formulario creado"});

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action createActionForm; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const insertMarketLive = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.post(`http://localhost:3002/market/bulk/insert`, data);
            return dispatch({type: SET_ERRORS, payload: "Stock enviado al mercado"});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action insertMarketLive; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
  }

  export const purchaseMarketLive = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.post(`http://localhost:3002/market/bulik/purchase`, data);
            return dispatch({type: SET_ERRORS, payload: "Stock enviado al mercado"});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action purchaseMarketLive; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
  }

export const getAllForms = () => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form`);
          return dispatch({ type: GET_ACTIONFORMS, payload: response.data.response });

      } catch (e) {

          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getAllForms; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const getPenddingActionForms = () => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/form/pendding`);
            return dispatch({ type: GET_PENDDINGACTIONFORMS, payload: response.data.response });
  
        } catch (e) {
  
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getPenddingActionForms; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
  }

export const getFormById = (id) => {
  return async function (dispatch) {

      try {

          var response = await axios.get(`http://localhost:3002/form/${id}`);
          return dispatch({ type: GET_ACTIONFORM_ID, payload: response.data.response});

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

export const updateGameControl = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/adminControl`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action updateGameControl; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const validateActionForm = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/adminControl/form`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action validateActionForm; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const deleteActionForm = (data) => {
    return async function (dispatch) {
  
        try {
            var response = await axios.delete(`http://localhost:3002/adminControl`, data={data});
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action deleteActionForm; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}


export const getMarketLive = () => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/market`);
            return dispatch({ type: GET_MARKETLIVE, payload: response.data.response });
  
        } catch (e) {
  
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getMarketLive; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
  }