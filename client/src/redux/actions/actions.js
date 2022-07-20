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
  MAKE_CART,
  CART_CONTROL,
  LOGIN,
  LOGOUT,
  SET_USER_LOGGED,
  GET_STUDENT_ID,
} from "./types";

var tokenjson = localStorage.getItem("loggedUser")
if (tokenjson) {
    var tokenSet = JSON.parse(tokenjson).token
}//var tokenSet = localStorage.getItem("token")

export const setToken = (token) => {
    return tokenSet = token
}

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
          if (response.data.response.length === 0) var response = await axios.get(`http://localhost:3002/adminControl`)
          return dispatch({ type: GET_GAMECONTROL, payload: response.data.response[0].variables });

      } catch (e) {

          console.log(e);
          return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getGameControl; status: ${e.response.status}; code: ${e.code}`});

      }
  }
}

export const createActionForm = (id, actionForm, loan, investment) => {
  return async function (dispatch) {

      try {

        console.log(loan, investment)

          var config = {
            headers: {
                Authorization: `Bearer ${tokenSet}`
            }
          }

          var response = await axios.post(`http://localhost:3002/form/${id}`, actionForm, config);
          if (loan) if (loan.amount > 0) var responseLoan = await axios.post(`http://localhost:3002/dinamicForm/${id}`, loan, config);
          if (investment) if (investment.amount > 0) var responseInvestment = await axios.post(`http://localhost:3002/dinamicForm/${id}`, investment, config);  
          console.log(response, responseLoan, responseInvestment)
          return dispatch({type: SET_ERRORS, payload: "Form sent"});
          
        } catch (e) {
            
          console.log(e);
          return setTimeout(() => {
            dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action createActionForm; status: ${e.response.status}; code: ${e.code}`})
          }, 3000); 

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
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action insertMarketLive; status: ${e.response.status}; code: ${e.code}`})
            
        }
    }
  }

export const createResultsData = (id, data) => {
    return async function (dispatch) {

        try {

            var response = await axios.post(`http://localhost:3002/resultsData/${id}`, data);
            return dispatch({type: SET_ERRORS, payload: "Formulario de resultados creado"});

        } catch (e) {

            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action createResultsData; status: ${e.response.status}; code: ${e.code}`})
            
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

export const getPenddingForms = () => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/adminControl/getFormsValidate`);
            return dispatch({ type: GET_PENDDINGACTIONFORMS, payload: response.data.response });
  
        } catch (e) {   
  
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getPenddingForms; status: ${e.response.status}; code: ${e.code}`});
  
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

export const getStudentById = (id) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/student/${id}`);
            return dispatch({ type: GET_STUDENT_ID, payload: response.data.response});
  
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

            var config = {
                headers: {
                    Authorization: `Bearer ${tokenSet}`
                }
              }
  
            var response = await axios.put(`http://localhost:3002/adminControl`, data, config);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action updateGameControl; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const validateForm = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/adminControl/validate`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action validateActionForm; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}


export const closeDinamicForm = (data) => {

    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/dinamicForm/closeDinamicForm`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
            console.log(response)
  
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

export const makeCart = (data) => {
    return function (dispatch) {
        return dispatch ({ type: MAKE_CART, payload: data})
    }
}

export const cartControlFunc = (data, acc) => {
    return function (dispatch) {
        return dispatch ({ type: CART_CONTROL, payload: data, ctrl: acc})
    }
}

export const decrementMarket = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/market/bulk/decrement`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action decrementMarket; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const loginFunction = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.post(`http://localhost:3002/login`, data);
            const logged = response.data.response
            localStorage.setItem("loggedUser", JSON.stringify(logged))
            setToken(logged.token)
            return dispatch({ type: LOGIN, payload: response.data.response});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action login; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const logoutFunction = () => {
    return function (dispatch) {
        localStorage.removeItem("loggedUser")
        setToken("")
        return dispatch ({ type: LOGOUT })
    }
}

export const setUserLogged = (data) => {
    return function (dispatch) {
        return dispatch ({ type: SET_USER_LOGGED, payload: data })
    }
}