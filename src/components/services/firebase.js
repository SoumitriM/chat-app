import firebase from "firebase";
const firebaseConfig = {
  apiKey: "AIzaSyAZvz3GLwM7YcbJSlfxK_NdkEj2Q638-n8",
  authDomain: "chitchat-f9412.firebaseapp.com",
  databaseURL: "https://chitchat-f9412.firebaseio.com",
  projectId: "chitchat-f9412",
  storageBucket: "chitchat-f9412.appspot.com",
  messagingSenderId: "551621104359",
  appId: "1:551621104359:web:00688273c70a3795d80842",
  measurementId: "G-B1DSE7TLE8",
};
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth;
export const db = firebase.database();
