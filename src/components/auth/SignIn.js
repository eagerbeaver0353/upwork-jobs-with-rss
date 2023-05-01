import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { Field, reduxForm } from 'redux-form';
import { connect} from 'react-redux';
import { signIn }  from '../../actions/authActions';
import "../../scss/main.css";

class SignIn extends Component {
  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <div className="text-muted mb-2">{error}</div>;
    }
  };

  renderInput = ({ input, label, meta }) => {
    return (
      <React.Fragment>
        <label htmlFor={`input${label}`} className="sr-only">
          {label}
        </label>
        <input
          {...input}
          className="form-control mb-2"
          placeholder={label}
          type={input.name}
          autoComplete="off"
          required
        />
        <span className="helper-text">{this.renderError(meta)}</span>
      </React.Fragment>
    );
  };

  onSubmit = (formValues) => {
    //call signIn action here and pass it the formValues (same as this.state, if not using Redux Form)
    this.props.signIn(formValues);
  };

  render() {
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
              <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
              <p className="text-muted">
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
              </p>
              <Field name="email" component={this.renderInput} label="Email" />
              <Field
                name="password"
                component={this.renderInput}
                label="Password"
              />
              <button className="btn text-white btn-lg btn-primary btn-block mb-4">
                Log In
              </button>

              <Link to="/signup">Forgot Password?</Link>

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

const validate = formValues => {
    const errors = {};

    if (!formValues.email) {
        errors.email = "You must enter an email.";
    }

    if (!formValues.password) {
        errors.password = "You must enter a password.";
    }

    return errors;
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (credentials) => dispatch(signIn(credentials))
    }
}

const formWrapped = reduxForm({
    form: "SignIn",
    validate,
    })(SignIn);

export default connect (mapStateToProps, mapDispatchToProps)(formWrapped);