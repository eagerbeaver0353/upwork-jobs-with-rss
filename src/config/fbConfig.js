import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

//Initialize Firebase
const fbConfig = {
  apiKey: "AIzaSyDb1F7tjUCNlzKXoLJT1Vyv8RYvMvYKnZU",
  authDomain: "lancy-eb51d.firebaseapp.com",
  databaseURL: "https://lancy-eb51d.firebaseio.com",
  projectId: "lancy-eb51d",
  storageBucket: "lancy-eb51d.appspot.com",
  messagingSenderId: "6994664005",
  appId: "1:6994664005:web:993eb95754f9077bc3212c"
};

//Initialize firebase instance
firebase.initializeApp(fbConfig);

export default fbConfig;
