import React from "react";
import { connect } from "react-redux";

import SearchBar from './SearchBar';
import "../../scss/main.css";
import "../../scss/lancy.css";
import { selectDropdownItem } from "../../actions/dropdownActions";

const DropDown = (props) => {
  const {items} = props;

  //Dropdown item click event handler
  const onClick = (item) => {
    //call dropdown action creator
    props.selectDropdownItem(item);
    console.log(`${item} selected from dropdown menu`);
  }

  const handleSearchSubmit = (searchTerm) => {
      if (props.title === "Skills" && searchTerm !== undefined) {
        const searchSkillsArray = props.items[4].option.filter((option) => {
          if (searchTerm.length !== 0 && (option.toLowerCase().includes(searchTerm.toLowerCase()))) {
            //console.log(`the search term ${searchTerm} was found at ${option} from skills dropdown list`)
            return option;
          }
        })
        return searchSkillsArray;  
      } 
      if (props.title === "Category" && searchTerm !== undefined) {
        const searchCategoryArray = props.items[3].option.filter((option) => {
          if (searchTerm.length !== 0 && (option.toLowerCase().includes(searchTerm.toLowerCase()))) {
            //console.log(`the search term ${searchTerm} was found at ${option} from category dropdown list`)
            return option;
          }
        })
        return searchCategoryArray;  
      }   
  }

  //***dynamically render dropdown menu items***//
  const renderItems = items.map((item) => {

    //conditional styling for slider and checkbox items
    let subtype = (props.subtype === "slider" || props.subtype === "checkbox") ? "slider" : "";
    let sliderItem = (props.subtype === "slider" || props.subtype === "checkbox") ? "slider-item" : "";
   
    const categorySearchArray = handleSearchSubmit(props.categorySearchTerm);
    const skillsSearchArray = handleSearchSubmit(props.skillsSearchTerm);
    let optionsArray = [];
    if ( categorySearchArray !== undefined) {
      if (categorySearchArray.length !== 0) {
      optionsArray = categorySearchArray;
    }
  }
    if ( skillsSearchArray !== undefined) {
          if (skillsSearchArray.length !== 0) {
          optionsArray = skillsSearchArray;
        }
      }
    if (optionsArray.length !== 0) {console.log(optionsArray)};
  
    //dynamic rendering of dropdown item options
    const renderOptions = item.option.map((option,i) => {
        if (props.subtype === "checkbox") {
          return (
            <li
              key={`${option}-${i}`}
              onClick={() => onClick(option)}
              className={`dropdown-item ${sliderItem}`}
            >
              <div
                className="form-check"
              >
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={option}
                  id="defaultCheck1"
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  {option}
                </label>
              </div>
            </li>
          );
        } else if (props.subtype === "slider") {
            return (
              <React.Fragment>
                <li
                  key="slider-1"
                  onClick={() => onClick(option)}
                  className={`dropdown-item ${sliderItem}`}
                >
                  {props.sliderOne}
                </li>

                <li
                  key="slider-2"
                  onClick={() => onClick(option)}
                  className={`dropdown-item ${sliderItem}`}
                >
                  {props.sliderTwo}
                </li>
              </React.Fragment>
          );
        } else {
            return (
              <li
                key={`${option}-${i}`}
                onClick={() => onClick(option)}
                className={`dropdown-item ${sliderItem}`}
              >
                {option}
              </li>
            )
        }
    });

    if (item.title === props.title) {

          return (
            <div className="dropdown btn-group border rounded-sm position-relative">
              <button
                type="button"
                className="btn btn-white text-left dropdown-icon"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {item.title}
              </button>
              <ol
                className={`dropdown-menu ${subtype}`}
                aria-labelledby="dropdownMenuButton"
              >
              {item.title === 'Skills' ? 
                  <SearchBar
                    name = "filterBySkillsSearch" 
                    onSubmit={ handleSearchSubmit(props.skillsSearchTerm)}
                   />
                : null}
              {item.title === 'Category' ? 
                  <SearchBar
                    name = "filterByCategorySearch" 
                    onSubmit={handleSearchSubmit(props.categorySearchTerm)}
                   />
                : null}
                {renderOptions}
              </ol>
            </div>
          );
    } else {
      return null;
    }
  });

  //conditionally rendered label
  const label = () => {
    if (props.id === "sortBy") {
      return (
        <label className="d-block col-form-label-sm text-label mb-0 pb-0">
          Sort By
        </label>
      );
    }
  };

  return (
    <div className="container" id={props.id}>
      {label()}
      {renderItems}
    </div>
  );
}


const mapStateToProps = (state, ownProps) => {
  //creating local instances of the slider component state in redux store
  let name = ownProps.name;
  let localState = state[name];
  return {
    name: localState.name,
    item: localState.item,
    customUpworkFeed: state.customUpworkFeed.data,
    skillsSearchTerm: state.filterBySkillsSearch.term,
    categorySearchTerm: state.filterByCategorySearch.term
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectDropdownItem: (item) => dispatch(selectDropdownItem(ownProps.name, item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DropDown);
