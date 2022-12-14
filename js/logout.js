import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const btnLogoff = document.querySelector(".logoutt")

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

btnLogoff.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.localStorage.clear();
        alert("LogOut feito com sucesso")
    }).catch((error) => {
        alert("LogOut feito sem sucesso")
    }); 
})