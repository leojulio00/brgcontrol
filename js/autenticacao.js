import { getAuth, signInWithEmailAndPassword } from "../node_modules/firebase/auth"

let inputEmail = document.querySelector(".inputEmail")
let inputPass = document.querySelector(".inputPass")
let btnEntrar = document.querySelector(".btnEntrar")
const auth = getAuth();


btnEntrar.addEventListener("click", ()=>{
  alert("kkk")
  signInWithEmailAndPassword(auth, inputEmail, inputPass)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      inputPass
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Erro " + errorMessage)
    });
})







