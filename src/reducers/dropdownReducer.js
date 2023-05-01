import { ITEM_SELECTED } from "../actions/types";

const INITIAL_STATE = {
    name: '',
    item: ''
}

const dropdownReducer = (name) => (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case `${name}/${ITEM_SELECTED}`:
            console.log(`${name} dropdown selected`);
            return {
                ...state,
                name: action.name,
                item: action.item
            }
        default:
            return INITIAL_STATE; //return dropdown to initial/blank state when it is inactive
    }
}

export default dropdownReducer;