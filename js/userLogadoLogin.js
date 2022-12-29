import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var usuarioRecebido = window.localStorage.getItem("user");
var usuarioMail = ""

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();


const starCountRef = ref(db, 'users/' + usuarioRecebido);

onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    //updateStarCount(postElement, data);
    usuarioMail = data.emailColab

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.email;

        if(uid != usuarioMail){
            window.location.href = "./index.html"
        }else{
            window.location.href = "dashboard/dashboard.html"
        }
      } else {
        // User is signed out
        // ...
        //window.location.href = "./index.html"
      }
    }); 
});

