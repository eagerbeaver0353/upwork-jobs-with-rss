import { ITEM_SELECTED } from "./types";

//DropDown action creator to select a dropdown item
export const selectDropdownItem = (name, item) => {
    return(dispatch) => {
        dispatch ({
            type: `${name}/${ITEM_SELECTED}`,
            name,
            item
        })
    }
}