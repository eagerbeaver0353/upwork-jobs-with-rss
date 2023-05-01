import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useSelector } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider, getFirebase, isLoaded } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from "redux-firestore";

import App from "./components/App";
import reducers from './reducers';
import fbConfig from './config/fbConfig';

//hook up Redux Dev Tools Chrome Extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//CREATE REDUX STORE
//hook up Redux Store with Thunk (for async dispatch calls) + our project's Firestore DB + Firebase BaaS
const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(reduxThunk.withExtraArgument({ getFirestore, getFirebase })),
    reduxFirestore(firebase, fbConfig)
    )
);

//React-Redux-Firebase Config
//tell firebase to connect firestore's user collection to the profile prop in firebase
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true 
}

//React-Redux-Firebase Props
const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

//Component (waits to render until firebase auth has loaded)
const AuthIsLoaded =({ children }) => {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) { return null};
    return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
        <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.querySelector("#root")
);
