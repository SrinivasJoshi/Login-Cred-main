import firebase from "firebase";
var firebaseConfig = {
    apiKey: "AIzaSyCw9EKuWKKmRr2zTyn7fAutvQ-PXnRf5nA",
    authDomain: "login-auth-a90b8.firebaseapp.com",
    projectId: "login-auth-a90b8",
    storageBucket: "login-auth-a90b8.appspot.com",
    messagingSenderId: "534952957734",
    appId: "1:534952957734:web:0f6d6dce6472d9d20853e7",
};

const fire = firebase.initializeApp(firebaseConfig);
export default fire;
