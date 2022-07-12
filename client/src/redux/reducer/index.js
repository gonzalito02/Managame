import {
    GET_ALLPLAYERS, 
    GET_FORMS, 
    GET_FORM_ID, 
    GET_GAMECONTROL,
    GET_PLAYER_ID,
    SET_ERRORS,
} from "../actions/types";
  
const initialState = {
    allPlayers: [],
    dataPlayerId: {},
    gameControl: {},
    allForms: [],
    oneForm: [],
    errors: [],
    allForms: [],
    playerForms: [],
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

        case GET_FORMS:
        return {
            ...state,
            allForms: payload,
            errors: "All forms obtained"
        };

        case GET_FORM_ID:
        return {
            ...state,
            playerForms: payload,
            errors: "Forms by ID obtained"
        };

        default:
    return state;
  }
}