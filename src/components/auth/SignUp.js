import React, {Component} from 'react';
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import { Link, Redirect } from "react-router-dom";

import { signUp } from "../../actions/authActions";
import "../../scss/main.css";

class SignUp extends Component {

  renderError = ({ touched, error }) => {
      if (touched && error) {
        return <div className="text-muted mb-2">{error}</div>
      }
  }  
  
  renderInput = ({ input, meta, label }) => {
      return (
        <React.Fragment>
          <label htmlFor={`input${input.name}`} className="sr-only">
            {input.name}
          </label>
          <input
            {...input}
            className="form-control mb-2"
            placeholder={label}
            type={input.name}
            autoComplete="off"
            required
          />
        <span>{this.renderError(meta)}</span>
        </React.Fragment>
      );
  }

  onSubmit = (formValues) => {
    this.props.signUp(formValues);
  };

  render() {
    console.log(this.props)
    const { authError, auth } = this.props;
    if (auth.uid) { 
        return <Redirect to="/" />   
    }
    return (
      <div className="container-fluid bg-light min-vh-100">
        <div className="row d-flex justify-content-center min-vh-100 align-items-center">
          <div className="col-sm"></div>
          <div className="text-center col-sm px-5 py-2 bg-white card py-5">
            <form
              className="form-signin"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
              noValidate
            >
              <img
                className="mb-4"
                src={require("../../assets/images/logo_text.svg")}
                alt="Lancy"
                width="140"
                height="80"
              />
              <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
              <Field
                name="firstName"
                component={this.renderInput}
                label="First Name"
              />
              <Field
                name="lastName"
                component={this.renderInput}
                label="Last Name"
              />
              <Field name="email" component={this.renderInput} label="Email" />
              <Field
                name="password"
                component={this.renderInput}
                label="Password"
              />
              <button className="btn btn-lg btn-primary btn-block mb-4 text-white">
                Sign Up
              </button>

              <Link to="/signin">I already have an account</Link>

              <div className="text-muted mt-2">
                {authError ? <p>{authError}</p> : null}
              </div>
            </form>
          </div>
          <div className="col-sm"></div>
        </div>
      </div>
    );
  }
}

const validate = (formValues) => {
  const errors = {};

  if (!formValues.firstName) {
      errors.firstName = "You must enter a first name.";
  }

  if (!formValues.lastName) {
    errors.lastName = "You must enter a last name.";
  }
  if (!formValues.email) {
    errors.email = "You must enter an email.";
  }

  if (!formValues.password) {
    errors.password = "You must enter a password.";
  }

  return errors;
};

const mapStateToProps = state => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

const formWrapped = reduxForm({
    form: "SignUp",
    validate
}) (SignUp);

export default connect(mapStateToProps, mapDispatchToProps)(formWrapped);