import { MIN_SELECTED, MAX_SELECTED } from "./types";

//Slider Minimum Value Selection Action Creator
export const selectMinValue = (name, item) => {
  return (dispatch) => {
    dispatch({
      type: `${name}/${MIN_SELECTED}`,
      name,
      item
    });
  };
};

//Slider Maximum Value Selection Action Creator
export const selectMaxValue = (name, item) => {
  return (dispatch) => {
    dispatch({
      type: `${name}/${MAX_SELECTED}`,
      name,
      item
    });
  };
};
