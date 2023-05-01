import React from 'react';
import { connect } from "react-redux";

import NavBar from '../nav/NavBar';
import SearchBar from './SearchBar';
import DropDown from './DropDown';
import { items } from "./DropDownItems";
import Slider from './Slider';
import JobItems from './JobItems';

import "../../scss/main.css";

const JobList = (props) => {

  const hourlySlider = (
    <div className="">
      <Slider
        name="hourlySlider"
        label="Hourly"
         />
    </div>
  );

    const priceSlider = (
      <div className="">
        <Slider 
          name="priceSlider"
          label="Fixed Price" />
      </div>
    );

  return (
    <div className="container-fluid">
      <div className="row" style={{position: 'relative'}}>
        <nav className="col-auto p-0" style={{position: 'fixed'}}>
          <NavBar 
          />
        </nav>
        <main role="main" className="col mt-4 ml-5 pl-4">
          <div className="row no-gutters d-flex justify-content-around">
            <div className="col-md-9 col-6">
              <SearchBar
                id="search"
                name="mainSearch"
              />
            </div>
            <div className="col-md-3 col-6">
              <DropDown
                id="sortBy"
                name="sort"
                search="none"
                title="Most Recent"
                items={items}
              />
            </div>
          </div>

          <div className="row no-gutters d-flex justify-content-around">
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterByDate"
                search="none"
                title="Date Posted"
                items={items}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterByJobType"
                search="none"
                title="Job Type"
                items={items}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterByCategory"
                subtype="checkbox"
                search="block"
                title="Category"
                items={items}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterBySkills"
                subtype="checkbox"
                search="block"
                title="Skills"
                items={items}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterBySalary"
                subtype="slider"
                search="none"
                title="Salary"
                items={items}
                sliderOne={hourlySlider}
                sliderTwo={priceSlider}
              />
            </div>
            <div className="col-lg-2 col-md-4 col-6 pr-0 mt-3">
              <DropDown
                id="filter"
                name="filterByLocation"
                search="none"
                title="Location"
                items={items}
              />
            </div>
          </div>

          <div className="row no-gutters d-flex justify-content-around">
            <div className="col-auto pr-0 mt-3">
                <JobItems
                />
            </div>
          </div>
        </main>
      </div>
    </div>
  ); 
} 

const mapStateToProps = (state) => {
  return {
    searchTerm: state.mainSearch.term
  }
}

export default connect (mapStateToProps)(JobList);