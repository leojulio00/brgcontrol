import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var codProdE = document.querySelector(".codProdE")
var nomeProdE = document.querySelector(".nomeProdE")
var quantProdE = document.querySelector(".quantProdE")
var horaRegEst = document.querySelector(".horaRegEst")
var horaRegA = document.querySelector(".horaRegA")
var btnAdiProdE = document.querySelector(".btnAdiProdE")

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
const db = getDatabase();

codProdE.addEventListener("keyup", ()=>{
    const starCountRef = ref(db, 'produtos/' + codProdE.value);

    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        //updateStarCount(postElement, data);
        console.log(data)
          nomeProdE.value = data.nomeProd
        horaRegA.value = data.horaReg
    });
})

btnAdiProdE.addEventListener("click", ()=>{
    function adicionarProd(codProdE, nomeProdE, quantProdE, horaRegEst) {
        const db = getDatabase();
        set(ref(db, 'produtosEstoque/' + codProdE), {
          nomeProdE: nomeProdE,
          quantProdE: quantProdE,
          horaRegEst: horaRegEst
        });
        alert("Produto adicionado ao estoque com sucesso")
      }
      
      adicionarProd(codProdE.value, nomeProdE.value, quantProdE.value, horaRegEst.value)
})


