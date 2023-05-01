import React from 'react';
import { connect } from 'react-redux';

import JobList from '../main/JobList';
import SignIn from './SignIn';

const AuthStatus = ({auth}) => {
    const authStatus = auth.uid ? <JobList /> : <SignIn />;
    console.log(auth);
        return (
          <React.Fragment>
            {authStatus}
          </React.Fragment>
        );
    }

const mapStateToProps = (state) => {
    return {
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(AuthStatus);