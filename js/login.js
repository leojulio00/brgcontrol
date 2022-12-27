import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var inputEmail = document.querySelector(".inputEmail")
var inputPass = document.querySelector(".inputPass")
var btnEntrar = document.querySelector(".btnEntrar")

const app = initializeApp(firebaseConfig);
const auth = getAuth();

btnEntrar.addEventListener("click", ()=>{
  window.localStorage.setItem("email", inputEmail.value);

  signInWithEmailAndPassword(auth, inputEmail.value, inputPass.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert("login feito com sucesso")
    
    window.location.href = "dashboard/dashboard.html"
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("erro: " + errorMessage)
  });
})