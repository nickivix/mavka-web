var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/firestore");
require("firebase/storage");
require("firebase/analytics");
var firebaseConfig = {
    apiKey: "AIzaSyCpJw3Fn2f1zwE74t0vmKAZG6MnR_3ZQfc",
    authDomain: "mavka-c5c01.firebaseapp.com",
    databaseURL: "https://mavka-c5c01.firebaseio.com",
    projectId: "mavka-c5c01",
    storageBucket: "mavka-c5c01.appspot.com",
    messagingSenderId: "477171666648",
    appId: "1:477171666648:web:3f3932e925ad180d2f11ad",
    measurementId: "G-GDHG2W55Q5"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase
