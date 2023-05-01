import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, reset } from "redux-form";
import { submitSearch } from '../../actions/searchActions';

import "../../scss/main.css";
import "../../scss/lancy.css";

//helper render function hoisted to prevent re-render of searchbar with every key stroke
const renderInput = ({ id, label, input }) => {
  //conditionally render searchBar display  
  let inputClassName;
  id === "search"
    ? (inputClassName = "py-4 px-5 border rounded-sm form-control")
    : (inputClassName = "form-control filter-search ");

  let rowClassName;
  id === "search"
    ? (rowClassName = "")
    : (rowClassName = "row search-filter-icon");


  return (
    <div className="container-fluid position-relative" id={id}>
      <div className={rowClassName}>
        {label}
        <input
          {...input}
          type="text"
          placeholder=" Search..."
          className={inputClassName}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

const SearchBar = ({ id, handleSubmit, submitSearch }) => {
  //Search submit event handler
  const onSubmit = (formValues, dispatch) => {
    submitSearch(formValues); //calls search action creator
    dispatch(reset("SearchBar")); //clears search form after submission
  };

  //conditionally rendered label
  const label = () => {
    if (id === "search") {
      return (
        <label className="d-block col-form-label-sm text-label mb-0 pb-0 search-icon">
          Search By Keyword
        </label>
      );
    } 
  };

  //Redux Form component
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field name="search" component={renderInput} id={id} label={label()} />
    </form>
  );
}

const mapStateToProps = (state, ownProps) => {
  //creating local instances of the search component state in redux store
  let name = ownProps.name;
  let localState = state[name];

  return {
    name: name,
    term: localState.term
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        submitSearch: (formValues) => dispatch(submitSearch(ownProps.name, formValues))
    }
}

const formWrapped= reduxForm({
    form: "SearchBar"
}) (SearchBar);

export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);