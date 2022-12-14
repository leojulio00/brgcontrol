import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var inputEmail = document.querySelector(".inputEmail")
var inputPass = document.querySelector(".inputPass")
var btnEntrar = document.querySelector(".btnEntrar")

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