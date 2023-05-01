import React, { Component } from "react";
import { connect } from "react-redux";
import parse from "html-react-parser";

import { fetchUpworkRSSFeed } from "../../actions/feedActions";
import { catchErrors } from "../../actions/errorActions";
import { getFilterData } from "../../actions/filterDataActions";
import useFilterDataFromRSS from "../../rss/ExtractFilterDataFromRSS";
import FilterConditionalRender from "../filter/FilterConditionalRender";

class JobItems extends Component {

    componentDidMount() {
      //fetch, parse and catch jobs data
      const dataFromRSS = this.props.fetchUpworkRSSFeed(); //call action creator to load RSS
      dataFromRSS.then(() => {
        return useFilterDataFromRSS(); // call business logic function that parses RSS text data
      }).then ((response) => {
        this.props.getFilterData(response) //action creator passes parsed RSS data to redux store
      }).catch(() => this.props.catchErrors(true));
      }

    renderSelectedFilter (item, sliderStart, sliderEnd, searchTerm) {
      console.log(`filter item value is ${item}`);
      console.log(`search term value is ${searchTerm}`);
      console.log(`slider range is: ${sliderStart}, ${sliderEnd}`);
      
      //default page load display, if no filter item is selected
      if (!item && !sliderStart && !sliderEnd && !searchTerm) {
        return (
          <div>
            {this.props.upworkFeed.items &&
              this.props.upworkFeed.items.map((item, i) => (
                <div className="job-item border rounded-sm mb-3 p-3" key={i}>
                  <h1>{item.title}</h1>
                  <p>{parse(item.content)}</p>
                </div>
              ))}
              </div>
        )
      } 

//***DROPDOWN FILTER AND SEARCH TERM MATCH LOGIC - RETURN CONDITIONAL JOB LISTS BASED ON USER INPUT***//
      let filterArray;
      //search term array
      const searchArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
        if (searchTerm.length !== 0 && (jobItem.title.toLowerCase().includes(searchTerm.toLowerCase()) || jobItem.postContent.toLowerCase().includes(searchTerm.toLowerCase()))) {
          console.log(`the search term ${searchTerm} was found in title: "${jobItem.title}" at job item index ${i}`)
        return jobItem;
        }
      })
       if (searchArray.length) {
      filterArray = searchArray;
     }

     //sort by highest hourly pay array
     const hourlyPayArray = this.props.customUpworkFeed.filter((jobItem) => {
       if (jobItem.hourlyRange.jobType === "Hourly") {
         return jobItem;
       }
     })
     let sortByHighestHourlyPayArray = [];
      if ( item === "Highest Hourly Pay" ) {
        sortByHighestHourlyPayArray = hourlyPayArray.sort((a, b) => 
        (a.hourlyRange.highPrice < b.hourlyRange.highPrice ? 1 : -1)); 
      }
    if (sortByHighestHourlyPayArray.length) {
       filterArray = sortByHighestHourlyPayArray}

    //sort by highest budget array
     const budgetPayArray = this.props.customUpworkFeed.filter((jobItem) => {
       if (jobItem.fixedPrice.jobType === "Fixed Price") {
         return jobItem;
       }
     })
     let sortByHighestBudgetArray = [];
      if ( item === "Highest Budget" ) {
        sortByHighestBudgetArray = budgetPayArray.sort((a, b) => 
       (a.fixedPrice.price < b.fixedPrice.price ? 1 : -1)); 
      }
     if (sortByHighestBudgetArray.length) {
       filterArray = sortByHighestBudgetArray}
    
    //datePosted filter arrays (3)
      //variables for date filter calculations
      const oneDay = 24 * 60 * 60 * 1000; //hours*minutes*seconds*milliseconds
      let today = new Date();
    //filter: job posted today
    const datePostedFilterTodayJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item && item === "Today" && daysSinceJobPosted <= 1 ) {
        console.log(`job at ${i} was posted today`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
     if (datePostedFilterTodayJobsArray.length) {
      filterArray = datePostedFilterTodayJobsArray;
     }
    //filter: job posted in the last 3 days
    const datePostedFilter3DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item && item === "1-3 Days" && daysSinceJobPosted <= 3 ) {
        console.log(`job at ${i} was posted in the last 3 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter3DaysJobsArray.length) {
      filterArray = datePostedFilter3DaysJobsArray;
    }
    //filter: job posted in the last 7 days
    const datePostedFilter7DaysJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      const dateJobPosted = new Date(jobItem.datePosted);
      const daysSinceJobPosted = Math.round(Math.abs((today - dateJobPosted) / oneDay));
      if ( item && item === "1-7 Days" && daysSinceJobPosted <= 7 ) {
        console.log(`job at ${i} was posted in the last 7 days`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (datePostedFilter7DaysJobsArray.length) {
      filterArray = datePostedFilter7DaysJobsArray;
    }

    //job type filter arrays (2)
    //filter: hourly job type
    const jobTypeFilterHourlyJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if ( item && jobItem.hourlyRange.jobType === item) {
        console.log(`user selected a job type match of hourly at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterHourlyJobsArray.length) {
      filterArray = jobTypeFilterHourlyJobsArray;
    }
    //filter: fixed price job type
    const jobTypeFilterFixedPriceJobsArray = this.props.customUpworkFeed.filter ( (jobItem, i) => {
      if ( item && jobItem.fixedPrice.jobType === item) {
        console.log(`user selected a fixed price job type match of fixed price at index ${i}`)
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (jobTypeFilterFixedPriceJobsArray.length) {
      filterArray = jobTypeFilterFixedPriceJobsArray;
    }

    //category filter
    const categoryFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
        if ( item && jobItem.category === item) {
          console.log(`user selected a category match at index ${i}`)
          return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (categoryFilterJobsArray.length) {
      filterArray = categoryFilterJobsArray;
    }

    //skills filter
    let skillsFilterJobsArray = [];
    this.props.customUpworkFeed.map( (jobItem, i) => {
      jobItem.skills.map((skill) => {
        if ( item && skill === item ) {
          console.log(`user selected a skill ${skill} which matches at index ${i}`)
          skillsFilterJobsArray.push(jobItem); //[{jobItem}, {}, {}]
        }
      })
    })
    if (skillsFilterJobsArray.length) {
      filterArray = skillsFilterJobsArray;
    }
    
    //Salary Slider filter match logic is in Slider component event handler
    //salary filter arrays (2)
    //hourly price filter
    const salaryHourlyFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( !item && jobItem.hourlyRange.jobType === "Hourly" && sliderStart <= jobItem.hourlyRange.highPrice) {
        console.log(`user selected hourly price of $${sliderStart}-$${sliderEnd}. $${jobItem.hourlyRange.lowPrice}-${jobItem.hourlyRange.highPrice} at index ${i} falls within the price range`)
        return jobItem;
      }
    })
    if (salaryHourlyFilterJobsArray.length) {
      filterArray = salaryHourlyFilterJobsArray;
    }
    //fixed price filter
    const salaryFixedPriceFilterJobsArray = this.props.customUpworkFeed.filter ((jobItem, i) => {
      if ( !item && jobItem.fixedPrice.jobType === "Fixed Price" && sliderStart <= jobItem.fixedPrice.price && sliderEnd >= jobItem.fixedPrice.price ) {
        console.log(`user selected a desired fixed price of $${sliderStart}-$${sliderEnd}. $${jobItem.fixedPrice.price} at index ${i} falls within this range`)
        return jobItem;
      }
    })
    if (salaryFixedPriceFilterJobsArray.length) {
      filterArray = salaryFixedPriceFilterJobsArray;
    }

    //location filter
    const locationFilterJobsArray = this.props.customUpworkFeed.filter( (jobItem, i) => {
      if ( item && jobItem.location === item) {
        console.log(`user selected a location match at index ${i}`);
        return jobItem; //[{jobItem}, {}, {}]
      }
    })
    if (locationFilterJobsArray.length) {
      filterArray = locationFilterJobsArray;
    }

      //conditional filter render
      return <FilterConditionalRender
                filterArray = {filterArray}
            />

    }

    render() {

        //show loading and catch errors
        if (this.props.upworkFeed.length === 0 && this.props.error === false) {
          return <div className="container-fluid job-item">Loading...</div>
        }
        if (this.props.error === true) {
          return <div className="container-fluid job-item">There was an error fetching your jobs data.</div>
        }

        return (
          <div className="container-fluid">
            {this.renderSelectedFilter(this.props.filterItem, this.props.sliderStart, this.props.sliderEnd, this.props.searchTerm)}
          </div>
        );

    }
}

const mapStateToProps = (state) => {

   //dynamically generate the name of each filter name selected
   let dynamicFilterName = "filterBySalary"; //default filter name, to prevent undefined error
    if (state.sort.name.length ) {
      dynamicFilterName = state.sort.name;
    }

    if (state.filterByDate.name.length ) {
      dynamicFilterName = state.filterByDate.name;
    }
    if (state.filterByJobType.name.length ) {
      dynamicFilterName = state.filterByJobType.name;
    }
    if (state.filterByCategory.name.length ) {
      dynamicFilterName = state.filterByCategory.name;
    }
    if (state.filterBySkills.name.length ) {
      dynamicFilterName = state.filterBySkills.name;
    }
    if (state.hourlySlider.name.length ) {
      dynamicFilterName = state.hourlySlider.name; //this works : "hourlySlider"
    }
    if (state.priceSlider.name.length ) {
      dynamicFilterName = state.priceSlider.name; // this works : "priceSlider"
    }
    if (state.filterByLocation.name.length ) {
      dynamicFilterName = state.filterByLocation.name;
    }

    return {
        filterName: state[dynamicFilterName].name,
        upworkFeed: state.upworkFeed.feed, // raw upwork feed, needed for first default load
        error: state.errorInJobItems.error,
        customUpworkFeed: state.customUpworkFeed.data, //parsed data upwork feed
        filterItem: state[dynamicFilterName].item, //filter term selected from dropdown by user
        sliderStart: state[dynamicFilterName].start, //slider start value
        sliderEnd: state[dynamicFilterName].end, //slider end value,
        searchTerm: state.mainSearch.term //search term submitted by user
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        fetchUpworkRSSFeed : () => dispatch(fetchUpworkRSSFeed()),
        catchErrors : (error) => dispatch(catchErrors(ownProps.name, error)),
        getFilterData: ( data ) => dispatch (getFilterData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (JobItems);

