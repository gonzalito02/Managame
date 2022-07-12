import {
    GET_ALLPLAYERS, 
    GET_FORMS, 
    GET_FORM_ID, 
    GET_GAMECONTROL,
} from "../actions/types";
  
const initialState = {
    allPlayers: [],
    gameControl: {},
    allForms: [],
    oneForm: [],
    errors: [],
    allForms: [],
    playerForms: []
};
  
export default function rootReducer(state = initialState, action) {
    const { type, payload } = action;
    switch (type) {

        case GET_ALLPLAYERS:
        return {
            ...state,
            allPlayers: payload,
        };

        case GET_GAMECONTROL:
        return {
            ...state,
            gameControl: payload,
        };

        case GET_FORMS:
        return {
            ...state,
            allForms: payload,
        };

        case GET_FORM_ID:
        return {
            ...state,
            playerForms: payload,
        };

        default:
    return state;
  }
}