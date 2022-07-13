import {
    GET_ALLPLAYERS, 
    GET_ACTIONFORMS, 
    GET_ACTIONFORM_ID, 
    GET_GAMECONTROL,
    GET_PLAYER_ID,
    SET_ERRORS,
    GET_PENDDINGACTIONFORMS,
    GET_MARKETLIVE,
} from "../actions/types";
  
const initialState = {
    allPlayers: [],
    dataPlayerId: {},
    gameControl: {},
    allForms: [],
    penddingActionForm: [],
    oneForm: [],
    errors: [],
    playerForms: [],
    marketLive: [],
    errors: ""
};
  
export default function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case SET_ERRORS:
        return {
            ...state,
            errors: payload,
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
            penddingActionForm: payload,
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

        default:
    return state;
  }
}