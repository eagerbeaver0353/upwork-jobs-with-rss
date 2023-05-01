import { FETCH_FEED } from "../actions/types";

const INITIAL_STATE = {
    feed: []
}

const feedReducer = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case FETCH_FEED: 
            return {
                ...state,
                feed: action.payload 
            }
        default:
            return state;
        }
    }

export default feedReducer;