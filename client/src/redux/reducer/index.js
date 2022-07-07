import {
    GET_ALLPLAYERS,
} from "../actions/types";
  
const initialState = {
    allPlayers: [],
    gameControl: [],
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

        default:
    return state;
  }
}