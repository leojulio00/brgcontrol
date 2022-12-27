import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


var userCod = document.querySelector(".userCod")
var userNome = document.querySelector(".userNome")
var userCategoria = document.querySelector(".userCategoria")
var userEnder = document.querySelector(".userEnder")
var userTelefone = document.querySelector(".userTelefone")
var userMail = document.querySelector(".userMail")
var mailLocalStorage = window.localStorage.getItem("email");
var codProdVendas = 0
var precVendaV = 0
var valorTotal

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

window.addEventListener("load", ()=>{
  const starCountRef = ref(database, 'produtos/' + codProdV.value);

  onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //updateStarCount(postElement, data);
      console.log(data)
      /*if(nomeProd.placeholder == "undefined"){
        nomeProd.placeholder = "Não existe, digite um novo dado"
      }else{
        nomeProd.placeholder = data.nomeProd
      }
      if(precVenda.placeholder == "undefined"){
        precVenda.placeholder = "Não existe, digite um novo dado"
      }else{
        precVenda.placeholder = data.precVenda
      }*/
      //horaRegA.value = data.horaReg
      nomeProdV.value = data.nomeProd
      precVenda.value = data.precVenda
      precVendaV = data.precVenda
  });
})