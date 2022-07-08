import {
    GET_ALLPLAYERS, GET_GAMECONTROL,
} from "../actions/types";
  
const initialState = {
    allPlayers: [],
    gameControl: {},
    allForms: [],
    oneForm: [],
    errors: []
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

        default:
    return state;
  }
}