import * as firebase from 'firebase';
import 'firebase/firestore'

var firebaseConfig = {
  apiKey: "AIzaSyCG42jP5wJvX2kTe_c1z9KYGZj2qyDWBoE",
  authDomain: "camry-2f557.firebaseapp.com",
  databaseURL: "https://camry-2f557.firebaseio.com",
  projectId: "camry-2f557",
  storageBucket: "camry-2f557.appspot.com",
  messagingSenderId: "804151395338",
  appId: "1:804151395338:web:4a30ffc7201e321ba3cbf3"
};
/* Starting Firebase */
function InitializeFirebase(){
    // Initialize Firebase
    if(firebase.apps.length === 0)
      firebase.initializeApp(firebaseConfig);
}

/* Authentication Methods */
function sign_in(email, pass, func){
    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(()=>{
            console.log("Successfull Login");
            if(func != undefined){
                func();
            }
        })
        .catch(error => {
            let errorMessage = error.message;
            console.log(errorMessage);
        })
}

function sign_up(email, pass, func){
    firebase.auth()
        .createUserWithEmailAndPassword(email,pass)
        .then(()=>{
            console.log("Successfull Create");
            if(func != undefined){
                func();
            }
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                console.log("Weak Password");
            } else {
             console.log(errorMessage);
            }
        })
}

export{
    InitializeFirebase,
    sign_in,
    sign_up,
}