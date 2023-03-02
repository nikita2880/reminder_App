import * as firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCJreb8HcjEdivWmjbXfo-6S7rx4v7t1pU",
    authDomain: "reminderapp-c1345.firebaseapp.com",
    databaseURL: "https://reminderapp-c1345-default-rtdb.firebaseio.com",
    projectId: "reminderapp-c1345",
    storageBucket: "reminderapp-c1345.appspot.com",
    messagingSenderId: "339445526968",
    appId: "1:339445526968:web:fc0afb63e51f83ca821f4d",
    measurementId: "G-LRB9LEV9HV"
  };


// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);
fireDb = fireDb.database().ref();
export default fireDb;