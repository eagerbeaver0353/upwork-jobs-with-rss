import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import "../../scss/main.css";
import LogOutModal from "../main/Modal";

class NavBar extends Component {
    state = { modalOpen: false}

    toggleSignOut = () => {
      this.setState({modalOpen: !this.state.modalOpen})
    }
    
    render () {
        const { profile } = this.props;
        
        return (
          <div>
          <nav className="sidebar-sticky">
            <ul className="navbar flex-column bg-light min-vh-100 d-inline-flex mb-0">
              <li className="nav-item row align-items-start">
                <Link className="nav-link" to="/">
                  <img
                    src={require("../../assets/images/Logo.svg")}
                    alt="Lancy"
                    width="30"
                    height="30"
                  />
                </Link>
              </li>
              <div>
                <li className="nav-item row align-items-center">
                  <Link className="nav-link " to="/">
                    <img
                      src={require("../../assets/icons/home.svg")}
                      alt="Home"
                      width="20"
                      height="20"
                    />
                  </Link>
                </li>               
              </div>
              <li className="nav-item row align-items-end mb-2">
                <div type="button" onClick={this.toggleSignOut}>
                  <span className=" rounded-circle bg-primary text-white p-2" >
                    {profile.initials!== undefined ? profile.initials.toUpperCase() : "NA"}
                  </span>
                </div>
              </li>
            </ul>
        </nav>
          <LogOutModal
          show={this.state.modalOpen}
          title= "Sign Out"
          content= "Are you sure you want to sign out?"
          toggleModal={this.toggleSignOut}/>
      </div>

        );
    }
}

const mapStateToProps = state => {
    return {
         profile: state.firebase.profile
    }  
}

export default connect (mapStateToProps) (NavBar);

