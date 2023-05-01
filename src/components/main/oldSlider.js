//slider using only React setState, not integrated with Redux Store

import React, { Component } from "react";
import { connect } from "react-redux";
import { selectMinValue, selectMaxValue } from "../../actions/sliderActions";

import "../../scss/slider.css";

class Slider extends Component {
  //TODO: convert state to redux store
  state = {
    slots: 100,
    step: 5,
    start: 35,
    end: 55,
    labelMode: "mid",
  };

  //Drag and drop event handlers
  //Prevent continuous firings of event handler while object is being dragged
  onDragOver = (e) => {
    e.preventDefault();
  };

  //define which slider (min or max) is being dragged
  //this pushes "data-slider=min and/or max" to the target element
  onDragStart = (e) => {
    let slider = e.target.dataset.slider; //value is min or max
    this.sliderType = slider; //instance variable to store min or max value
  };

  //capture where on the scale the slider is being dropped
  //grab thumb source (min or max) -> get the slot (where drop happens) -> validate -> update the slot state -> reset sliderType
  onDrop = (e) => {
    let source = this.sliderType; //min or max
    let slot = Number(e.target.dataset.slot); //sets data-slot=number
    console.log("slot: ", slot);

    if (isNaN(slot)) return;

    if (source === "min") {
      if (slot >= this.state.end) return;
      this.setState(
        {
          start: slot,
        },
        () => {
          console.log(this.state);
        }
      );
    } else if (source === "max") {
      if (slot <= this.state.start) return;
      this.setState(
        {
          end: slot,
        },
        () => {
          console.log(this.state);
        }
      );
    }
    this.sliderType = null; //reset min/max sliderType
  };

  //JSX for rendering the thumbs for the slider start
  MinSlider = () => {
    return (
      <div
        data-slider="min"
        onDragStart={this.onDragStart}
        onTouchStart={this.onDragStart}
        onDrag={this.onDrag}
        draggable
        className="slider-thumb slider-thumb-min"
      ></div>
    );
  };

  //JSX for rendering the thumbs for the slider end
  MaxSlider = () => {
    return (
      <div
        data-slider="max"
        onDragStart={this.onDragStart}
        onTouchStart={this.onDragStart}
        onDrag={this.onDrag}
        draggable
        className="slider-thumb slider-thumb-max"
      ></div>
    );
  };

  render() {
    let slider = [];
    let currentScale = [];
    let minThumb = null;
    let maxThumb = null;

    //currency format converter
    const currencyFormat = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    });

    //for loop through the slider scale
    for (let i = 0; i <= this.state.slots; i += this.state.step) {
      //find the user-selected start-end tooltip label value
      let currentLabel = "";

      if (i === this.state.start || i === this.state.end) {
        currentLabel = currencyFormat.format(i);
      }

      currentScale.push(
        <div key={i} className="slot-scale">
          {currentLabel}
        </div>
      );

      //sync the Slider thumb with the start/end label value
      if (i === this.state.start) {
        minThumb = <this.MinSlider />;
      } else if (i === this.state.end) {
        maxThumb = <this.MaxSlider />;
      } else {
        minThumb = null;
        maxThumb = null;
      }

      //JSX for the slider itself
      let lineClass = "line";

      if (i > this.state.start && i < this.state.end) {
        lineClass += " line-selected";
      }

      slider.push(
        <div
          data-slot={i}
          onDragOver={this.onDragOver}
          onTouchMove={this.onDragOver}
          onTouchEnd={this.onDrop}
          onDrop={this.onDrop}
          key={i}
          className="slot"
        >
          <div data-slot={i} className={lineClass} />
          {minThumb}
          {maxThumb}
        </div>
      );
    }

    return (
      <div className="container p-0">
        <div className="row">
          <div className="col-auto">
            <label>{this.props.label}</label>
            <div className="slider-container">
              <div className="slider">{slider}</div>
              <div className="slider-selected-scale">{currentScale}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    slots: state.slots,
    step: state.step,
    start: state.start,
    end: state.end,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    selectMinValue: (value) => dispatch(selectMinValue(value)),
    selectMaxValue: (value) => dispatch(selectMaxValue(value)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Slider);
