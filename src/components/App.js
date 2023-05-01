import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import AuthStatus from './auth/AuthStatus';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import history from '../history';

class App extends Component {
    render() {
        return (
          <React.Fragment>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={AuthStatus} />
                <Route path="/signin" component={SignIn} />
                <Route path="/signup" component={SignUp} />
              </Switch>
            </Router>
          </React.Fragment>
        );
    }
}

export default App;

