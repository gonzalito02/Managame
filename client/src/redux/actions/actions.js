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
  GET_STUDENTS,
  GET_RESULTSPLAYER_ID,
  GET_ALLRESULTSPLAYER,
  GET_QUALITYREGISTER_ID,
  GET_STUDENTSHOPREG_ID,
  GET_PLAYERSHOPREG_ID,
  SUBMIT_UPDATE,
} from "./types";

var tokenjson = localStorage.getItem("loggedUser")

console.log(tokenjson)

export const setToken = (token) => {
    return tokenSet = token
}

if (tokenjson) {
    try {
        var tokenSet = JSON.parse(tokenjson).token
    } catch (e) {
        console.log("error en token", e)
        localStorage.removeItem("loggedUser")
        setToken("")
    }
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

export const getAllStudents = (dispatch) => {
    return async function (dispatch) {

        try {

            var response = await axios.get(`http://localhost:3002/student`);
            return dispatch({ type: GET_STUDENTS, payload: response.data });

        } catch (e) {

            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getAllStudents; status: ${e.response.status}; code: ${e.code}`});

        }
    }
}

export const createPlayer = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.post(`http://localhost:3002/player`, data);
            return dispatch({type: SET_ERRORS, payload: `Player whit ID ${data.id}`});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action insertMarketLive; status: ${e.response.status}; code: ${e.code}`})
            
        }
    }
}

export const createStudent = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.post(`http://localhost:3002/student`, data);
            return dispatch({type: SET_ERRORS, payload: `Student whit ID ${data.id}`});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action insertMarketLive; status: ${e.response.status}; code: ${e.code}`})
            
        }
    }
}

export const allowToPlay = (id) => {
    return async function (dispatch) {
  
        try {

            var response = await axios.put(`http://localhost:3002/player/allowToPlay/${id}`);
            return dispatch({type: SET_ERRORS, payload: `Player allowed to play ID ${id}`});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action allowToPlay; status: ${e.response.status}; code: ${e.code}`})
            
        }
    }
}

export const setToNullBusiness = (id) => {
    return async function (dispatch) {
  
        try {

            var response = await axios.put(`http://localhost:3002/student/player/remove`, id);
            return dispatch({type: SET_ERRORS, payload: `Set business to null for ${id}`});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action setToNullBusiness; status: ${e.response.status}; code: ${e.code}`})
            
        }
    }
}

export const setBusinessStudent = (data) => {
    return async function (dispatch) {
  
        try {

            var response = await axios.put(`http://localhost:3002/student/player/add`, data);
            return dispatch({type: SET_ERRORS, payload: `Student ${data.id} add to ${data.playerId}`});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action setBusinessStudent; status: ${e.response.status}; code: ${e.code}`})
            
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

          var config = {
            headers: {
                Authorization: `Bearer ${tokenSet}`
            }
          }

          var response = await axios.post(`http://localhost:3002/form/${id}`, actionForm, config);
          if (loan) if (loan.amount > 0) var responseLoan = await axios.post(`http://localhost:3002/dinamicForm/${id}`, loan, config);
          if (investment) if (investment.amount > 0) var responseInvestment = await axios.post(`http://localhost:3002/dinamicForm/${id}`, investment, config);  
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

export const getAllResultsData = () => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/resultsData`);
            return dispatch({ type: GET_ALLRESULTSPLAYER, payload: response.data.response });
  
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

export const getResultsPlayerById = (id) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.get(`http://localhost:3002/resultsData/${id}`);
            return dispatch({ type: GET_RESULTSPLAYER_ID, payload: response.data.response});
  
        } catch (e) {
  
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getFormById; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const getQualityRegisterById = (id) => {
    return async function (dispatch) {

    try {

        var response = await axios.get(`http://localhost:3002/qualityRegister/${id}`);
        return dispatch({ type: GET_QUALITYREGISTER_ID, payload: response.data.response});

    } catch (e) {

        return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getFormById; status: ${e.response.status}; code: ${e.code}`});

    }
}
}

export const getShopRegStudentById = (id) => {
    return async function (dispatch) {

    try {

        var response = await axios.get(`http://localhost:3002/shoppingRegister/student/${id}`);
        return dispatch({ type: GET_STUDENTSHOPREG_ID, payload: response.data.response});

    } catch (e) {

        return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getShopRegStudentById; status: ${e.response.status}; code: ${e.code}`});

    }
}
}

export const getShopRegPlayerById = (id) => {
    return async function (dispatch) {

    try {

        var response = await axios.get(`http://localhost:3002/shoppingRegister/player/${id}`);
        return dispatch({ type: GET_PLAYERSHOPREG_ID, payload: response.data.response});

    } catch (e) {

        return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action getShopRegPlayerById; status: ${e.response.status}; code: ${e.code}`});

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

export const deleteStudent = (id) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.delete(`http://localhost:3002/student/${id}`);
            return dispatch({ type: SET_ERRORS, payload: `student ${id} deleted`});
  
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

export const updateDataStudent = (id, data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/student/${id}`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action updateDataStudent; status: ${e.response.status}; code: ${e.code}`});
  
        }
    }
}

export const updateResultsData = (id, data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/resultsData/${id}`, data);
            return dispatch({ type: SET_ERRORS, payload: response.data.message});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action updateResultsData; status: ${e.response.status}; code: ${e.code}`});
  
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

export const setWallet = (data) => {
    return async function (dispatch) {
  
        try {
  
            var response = await axios.put(`http://localhost:3002/adminControl/wallet/set`, data);
            return dispatch({ type: SET_ERRORS, payload: "wallet set succesfully"});
  
        } catch (e) {
  
            console.log(e);
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action setWallet; status: ${e.response.status}; code: ${e.code}`});
  
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

export const destroyMarketLive = () => {
    return async function (dispatch) {
  
        try {
            var response = await axios.delete(`http://localhost:3002/market`);
            return dispatch({ type: SET_ERRORS, payload: "Market destroyed succesfully" });
  
        } catch (e) {
  
            return dispatch({ type: SET_ERRORS, payload: `${e.response.data}; action destroyMarketLive; status: ${e.response.status}; code: ${e.code}`});
  
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

export const handlePurchase = (global, wallet, id) => {
    return async function (dispatch) {

        const data = {
            wallet: {
                id: id,
                wallet: wallet
            },
            global: global
        }
        
        // 0:
        //     id: 12345678
        //     purchase:
        //         period: 1
        //         playerId: 1003
        //         priceProduct: 20000
        //         qualityProduct: 22
        //         stockProduct: 2
        //         typeProduct: "A"

        try {
  
            var response = await axios.put(`http://localhost:3002/manager`, data);

            return dispatch({ type: SET_ERRORS, payload: "Purchase done succesfully"});

        } catch (e) {
            
            console.log(e)
            return dispatch({ type: SET_ERRORS, payload: `${e.response}; action purchase; status: ${e.response.status}; code: ${e.code}`});
        
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

export const checkLog = (log) => {
    if (!tokenjson || log !== JSON.parse(tokenjson).rol) {
        return window.location.replace("http://localhost:3000/home")
    } 
}

export const submitUpdate = () => {
    return function (dispatch) {
        return dispatch ({ type: SUBMIT_UPDATE })
    }
}

export const parseCurrency = (value) => {
    return `$ ${value.toString()}`
}