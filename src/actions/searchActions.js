import { SEARCH_SUBMIT } from "./types";

//SearchBar Action Creator
export const submitSearch = (name, term) => {
    return (dispatch) => {
        dispatch({
            type: `${name}/${SEARCH_SUBMIT}`,
            term
        })
    }
}