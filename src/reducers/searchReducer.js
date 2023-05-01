import { SEARCH_SUBMIT } from "../actions/types";

const INITIAL_STATE = {
    term: ''
}

const searchReducer = name => (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case `${name}/${SEARCH_SUBMIT}`:
            console.log(`search ${action.term.search} submitted from the ${name}!`);
            return {
                ...state,
                term: action.term.search
            }   
    default:
        return state;
    } 
}

export default searchReducer;