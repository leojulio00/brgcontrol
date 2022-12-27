import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var nome = window.localStorage.getItem("email");

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
        //window.location.href = "./dashboard.html"
    }
  } else {
    // User is signed out
    // ...
    window.location.href = "../index.html"
  }
}); 