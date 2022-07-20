import {
    GET_ALLPLAYERS, 
    GET_ACTIONFORMS, 
    GET_ACTIONFORM_ID, 
    GET_GAMECONTROL,
    GET_PLAYER_ID,
    SET_ERRORS,
    GET_PENDDINGACTIONFORMS,
    GET_MARKETLIVE,
    MAKE_CART,
    CART_CONTROL,
    LOGIN,
    LOGOUT,
    SET_USER_LOGGED,
    GET_STUDENT_ID,
} from "../actions/types";
  
const initialState = {
    userLogin: [],
    allPlayers: [],
    dataPlayerId: {},
    dataStudentId: {},
    gameControl: {},
    allForms: [],
    penddingForms: [],
    oneForm: [],
    errors: [],
    playerForms: [],
    marketLive: [],
    cart: [],
    cartControl: [],
    errors: ""
};
  
export default function rootReducer(state = initialState, action) {
    const { type, payload, ctrl } = action;
    switch (type) {

        case SET_ERRORS:
        return {
            ...state,
            errors: payload,
        };

        case LOGIN:
        return {
            ...state,
            userLogin: payload,
            errors: "Login done"
        };

        case SET_USER_LOGGED:
        return {
            ...state,
            userLogin: payload,
            errors: "Session recovery"
        };

        case LOGOUT:
        return {
            ...state,
            userLogin: [],
            errors: "Logout done"
        };

        case GET_ALLPLAYERS:
        return {
            ...state,
            allPlayers: payload,
            errors: "All players obtained"
        };

        case GET_PLAYER_ID:
        return {
            ...state,
            dataPlayerId: payload,
            errors: "Player obtained"
        };

        case GET_STUDENT_ID:
        return {
            ...state,
            dataStudentId: payload,
            errors: "Student obtained"
        };

        case GET_GAMECONTROL:
        return {
            ...state,
            gameControl: payload,
            errors: "gameControl setted"
        };

        case GET_ACTIONFORMS:
        return {
            ...state,
            allForms: payload,
            errors: "All forms obtained"
        };

        case GET_PENDDINGACTIONFORMS:
        return {
            ...state,
            penddingForms: payload,
            errors: "All pendding forms obtained"
        };

        case GET_ACTIONFORM_ID:
        return {
            ...state,
            playerForms: payload,
            errors: "Forms by ID obtained"
        };

        case GET_MARKETLIVE:
        return {
            ...state,
            marketLive: payload,
            errors: "Market live obtained"
        };

        case MAKE_CART:

            var clean = [...state.cart]
            var test = parseInt(payload[1])
            test = test || 0

            var newpayload = [payload[0], test, payload[2]]

            if (test === 0) {
                var filtEqual = clean.filter(m => m[0] !== payload[0])
            } else {
                var filtEqual = clean.filter(m => m[0] !== payload[0])
                filtEqual.push(newpayload)
            }
            
            return {
                ...state,
                cart: filtEqual,
                errors: "Adding to cart"
        };

        case CART_CONTROL:

            var valuation = [...state.cartControl]
            
            if (valuation.includes(payload) && ctrl === "rm") {
                valuation = valuation.filter(m => m !== payload)
            } else if (!valuation.includes(payload) && ctrl === "add") {
                valuation.push(payload)
            }

            return {
                ...state,
                cartControl: valuation,
                errors: "Market valuation done"
            };

        default:
    return state;
  }
}