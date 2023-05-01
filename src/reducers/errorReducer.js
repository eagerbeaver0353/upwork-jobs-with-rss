import { CATCH_ERROR } from "../actions/types";

const INITIAL_STATE = {
    error: false
}

const errorReducer = name => (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case `${name}/${CATCH_ERROR}`: 
            return {
                ...state,
                error: action.payload 
            }
        default:
            return state;
        }
    }

export default errorReducer;