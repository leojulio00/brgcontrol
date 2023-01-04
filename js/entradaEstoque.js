import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var codProdE = document.querySelector(".codProdE")
var nomeProdE = document.querySelector(".nomeProdE")
var quantProdE = document.querySelector(".quantProdE")
var horaRegEst = document.querySelector(".horaRegEst")
var horaRegA = document.querySelector(".horaRegA")
var btnAdiProdE = document.querySelector(".btnAdiProdE")


const app = initializeApp(firebaseConfig);
const db = getDatabase();

nomeProdE.addEventListener("keyup", ()=>{
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


