import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJol3W4SFmIApBs313nhotjjC5Tf4rYFI",
    authDomain: "bar-rest-14387.firebaseapp.com",
    databaseURL: "https://bar-rest-14387-default-rtdb.firebaseio.com",
    projectId: "bar-rest-14387",
    storageBucket: "bar-rest-14387.appspot.com",
    messagingSenderId: "278297185259",
    appId: "1:278297185259:web:f3b96b35c4220f2b18e7ae",
    measurementId: "G-7P30PF86QN"
  };

  var nome = window.localStorage.getItem("email");
  console.log(nome);

const app = initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.email;
    
    if(uid !== nome){
        window.location.href = "../index.html"
    }else{
        window.location.href = "./dashboard.html"
    }
  } else {
    // User is signed out
    // ...
    //window.location.href = "../index.html"
  }
}); 