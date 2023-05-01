import { MIN_SELECTED, MAX_SELECTED } from "../actions/types";

const INITIAL_STATE = (name) => {
    if (name ==="hourlySlider"){
      return {
       name: "",
        slots: 100,
        step: 5,
        start: 35,
        end: 55
      };
    } else if (name==="priceSlider"){
        return {
            name: "",
            slots: 10000,
            step: 500,
            start: 1000,
            end: 3000
        }
    }
};

const sliderReducer = (name) => (state=INITIAL_STATE(name), action ) => {
    switch (action.type) {
      case `${name}/${MIN_SELECTED}`:
        console.log(`${name} Min Selected`);
        return {
          ...state,
          name: action.name,
          start: action.item
        };
      case `${name}/${MAX_SELECTED}`:
        console.log(`${name} Max Selected`);
        return {
          ...state,
          name: action.name,
          end: action.item
        };
      default:
          return state; 
    }
}

export default sliderReducer;