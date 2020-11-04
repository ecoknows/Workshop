import * as firebase from 'firebase';
import 'firebase/firestore';
import { YellowBox } from 'react-native';
import { check_login_user, set_user_info, update_login_user } from './current_user';
import { DATABASE_TAGS, ERROR_TAGS, SUCCESS_TAGS } from '../constants/TAGS';

var firebaseConfig = {
  apiKey: "AIzaSyCG42jP5wJvX2kTe_c1z9KYGZj2qyDWBoE",
  authDomain: "camry-2f557.firebaseapp.com",
  databaseURL: "https://camry-2f557.firebaseio.com",
  projectId: "camry-2f557",
  storageBucket: "camry-2f557.appspot.com",
  messagingSenderId: "804151395338",
  appId: "1:804151395338:web:4a30ffc7201e321ba3cbf3"
};

const USERS = 'Users';

/* Starting Firebase */
function InitializeFirebase(){
    // Initialize Firebase
    YellowBox.ignoreWarnings(['Setting a timer']);
    console.ignoredYellowBox = ['Setting a timer'];
    check_login_user();
    if(firebase.apps.length === 0)
      firebase.initializeApp(firebaseConfig);
}

/* CURRENT USER LOGIN */
function current_user_id(){
    return firebase.auth().currentUser.uid;
}


/* Authentication Methods */
function sign_in(email, pass, func){
    firebase
        .auth()
        .signInWithEmailAndPassword(email, pass)
        .then(()=>{
            console.log(SUCCESS_TAGS,DATABASE_TAGS,"Login Success");
            if(func != undefined){
                func();
            }
        })
        .catch(error => {
            let errorMessage = error.message;
            console.log(ERROR_TAGS ,DATABASE_TAGS ,errorMessage);
        })
}

function sign_up(email, pass, func){
    firebase.auth()
        .createUserWithEmailAndPassword(email,pass)
        .then(()=>{
            console.log(SUCCESS_TAGS,DATABASE_TAGS,"Create User Success");
            if(func != undefined){
                func();
            }
        })
        .catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                console.log(ERROR_TAGS,DATABASE_TAGS,"Weak Password");
            } else {
             console.log(ERROR_TAGS,DATABASE_TAGS,errorMessage);
            }
        })
}

/* Firestore Methods */
function add_users(user_info, func){
    const { uid } = user_info;
    firebase.firestore()
        .collection(USERS)
        .doc(uid)
        .set(user_info)
        .then(()=>{
            console.log(SUCCESS_TAGS, DATABASE_TAGS,'User Add Success');
            if(func != undefined){
                func();
            }
        });
        
    set_user_info(user_info);
    update_login_user(user_info);
}

const get_user = async(uid)=>{
    const userDoc = await firebase.firestore()
                        .collection(USERS)
                        .doc(uid)
                        .get();

    const data = userDoc.data();
    update_login_user(data);

}

export{
    InitializeFirebase,
    sign_in,
    sign_up,
    add_users,
    current_user_id,
    get_user

}