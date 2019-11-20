import firebase from 'firebase';

const config =  {
    apiKey: "AIzaSyCIyQgLkl_dr44E5U89TCSr_vWkPYmaj3A",
  authDomain: "smartcamera-601a9.firebaseapp.com",
  databaseURL: "https://smartcamera-601a9.firebaseio.com",
  projectId: "smartcamera-601a9",
  storageBucket: "smartcamera-601a9.appspot.com",
  messagingSenderId: "539359631503",
  appId: "1:539359631503:web:1fdca5241ab7f8257578fa",
  measurementId: "G-PE652TL69P"
}

firebase.initializeApp(config);
export default firebase;