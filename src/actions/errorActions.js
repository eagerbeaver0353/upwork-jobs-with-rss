import { CATCH_ERROR } from "./types";

//Error action creator to catch errors
export const catchErrors = (name, error) => {
    return (dispatch) => {
        dispatch ({
            type: `${name}/${CATCH_ERROR}`,
            payload: error
        })
    }
}