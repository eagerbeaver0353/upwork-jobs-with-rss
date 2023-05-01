import { LOGIN_SUCCESS, LOGIN_ERROR, SIGNOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR} from "./types";
import history from '../history';

//Email/Password Sign In Action Creator Using Firebase Auth
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    //initialize firebase instance
    const firebase = getFirebase();
    //make async call to firebase auth SDK
    firebase
      .auth()
      .signInWithEmailAndPassword(
        credentials.email,
        credentials.password
        //call returns a promise, which if successful, dispatches success action
      )
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
        //navigate programmatically to home screen
        //history.push("/");
      })
      //if error thrown, dispatches error action
      .catch((err) => {
        dispatch({ type: LOGIN_ERROR, err });
      });
  }  
};

//Sign Out Action Creator Using Firebase Auth
export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    //initialize firebase instance
    const firebase = getFirebase();
    //make async call to firebase auth SDK
    firebase
      .auth()
      .signOut()
    //call returns a promise, which if successful, dispatches success action
      .then(() => {
        dispatch({ type: SIGNOUT_SUCCESS });
      });
  }
};

//Sign Up Action Creator Using Firebase Auth
export const signUp = (newUser) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        //initialize firebase instance
        const firebase = getFirebase();
        const firestore = getFirestore();
        //make async call to firebase auth SDK
        firebase.auth().createUserWithEmailAndPassword(
            newUser.email,
            newUser.password
        ).then((response) => {
            //create firestore collection 'users' with the signup data
            //sync the uid from firebase auth with firestore users collection (with props firstName etc)
            return firestore.collection('users').doc(response.user.uid).set({
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                initials: newUser.firstName[0] + newUser.lastName[0]
            })
        }).then(() => {
            dispatch({ type: SIGNUP_SUCCESS })
        }).catch( err => {
            dispatch( { type: SIGNUP_ERROR, err})
        })
    }
}




