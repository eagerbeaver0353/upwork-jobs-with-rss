import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import searchReducer from "./searchReducer";
import sliderReducer from './sliderReducer';
import dropdownReducer from "./dropdownReducer";
import feedReducer from './feedReducer';
import errorReducer from './errorReducer';
import filterDataReducer from './filterDataReducer';

export default combineReducers({
  //component reducers
  auth: authReducer,
  mainSearch: searchReducer("mainSearch"),
  filterBySkillsSearch: searchReducer("filterBySkillsSearch"),
  filterByCategorySearch: searchReducer("filterByCategorySearch"),
  hourlySlider: sliderReducer("hourlySlider"),
  priceSlider: sliderReducer("priceSlider"),
  sort: dropdownReducer("sort"),
  filterByDate: dropdownReducer("filterByDate"),
  filterByJobType: dropdownReducer("filterByJobType"),
  filterByCategory: dropdownReducer("filterByCategory"),
  filterBySkills: dropdownReducer("filterBySkills"),
  filterBySalary: dropdownReducer("filterBySalary"),
  filterByLocation: dropdownReducer("filterByLocation"),
  //RSS feed reducer
  upworkFeed: feedReducer,
  //filter data reducer
  customUpworkFeed: filterDataReducer,
  //error catching reducer
  errorInJobItems: errorReducer("jobItems"),
  //redux form reducer
  form: formReducer,
  //add firebase to reducers
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});