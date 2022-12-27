import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

var codColab = document.querySelector(".codColab")
var nomeColab = document.querySelector(".nomeColab")
var enderColab = document.querySelector(".enderColab")
var telColab = document.querySelector(".telColab")
var emailColab = document.querySelector(".emailColab")
var catgColab = document.querySelector(".catgColab")
var passColab = document.querySelector(".passColab")
var btnCadasColab = document.querySelector(".btnCadasColab")

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
//var db = firebase.database()





btnCadasColab.addEventListener("click", ()=>{
function writeUserData(codColab, nomeColab, enderColab, telColab, emailColab, catgColab) {
  const db = getDatabase();
  set(ref(db, 'users/' + codColab), {
    nomeColab: nomeColab,
    enderColab: enderColab,
    telColab: telColab,
    emailColab: emailColab,
    catgColab: catgColab
  });
}


    createUserWithEmailAndPassword(auth, emailColab.value, passColab.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;

    writeUserData(codColab.value, nomeColab.value, enderColab.value, telColab.value, emailColab.value, catgColab.value)

    alert("usuario criado com sucesso")
      codColab.value = ""
      nomeColab.value = ""
      enderColab.value = ""
      telColab.value = ""
      emailColab.value = ""
      catgColab.value = ""
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("erro: " + errorMessage)
  });

  /*createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });*/
})