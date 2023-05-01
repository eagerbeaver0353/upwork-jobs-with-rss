import { GET_FILTER_DATA } from "./types";

export const getFilterData = (data) => {
    return (dispatch) => {
        dispatch({
            type: GET_FILTER_DATA,
            payload: data
        })
    }
}