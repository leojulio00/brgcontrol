import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
var codProd = document.querySelector(".codProd")
var nomeProd = document.querySelector(".nomeProd")
var precVenda = document.querySelector(".precVenda")
var horaReg = document.querySelector(".horaRegCadProd")
var btnRegProd = document.querySelector(".btnRegProd")
var btnAlterProd = document.querySelector(".btnAlterProd")
var btnApagProd = document.querySelector(".btnApagProd")

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

codProd.addEventListener("keyup", ()=>{
  const starCountRef = ref(database, 'produtos/' + codProd.value);

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
      nomeProd.placeholder = data.nomeProd
      precVenda.placeholder = data.precVenda
  });
})

btnRegProd.addEventListener("click", ()=>{
function adicionarProd(codProd, nomeProd, precVenda, horaReg,) {
  const db = getDatabase();
  set(ref(db, 'produtos/' + codProd), {
    nomeProd: nomeProd,
    precVenda: precVenda,
    horaReg: horaReg
  });
}

adicionarProd(codProd.value, nomeProd.value, precVenda.value, horaReg.value)

    alert("Produto cadastrado com sucesso")
    codProd.value = ""
    nomeProd.value = ""
    precVenda.value = ""
})

btnAlterProd.addEventListener("click", ()=>{
  function adicionarProd(codProd, nomeProd, precVenda, horaReg,) {
    const db = getDatabase();
    set(ref(db, 'produtos/' + codProd), {
      nomeProd: nomeProd,
      precVenda: precVenda,
      horaReg: horaReg
    });
  }
  
  adicionarProd(codProd.value, nomeProd.value, precVenda.value, horaReg.value)
  
      alert("Produto cadastrado com sucesso")
      codProd.value = ""
      nomeProd.value = ""
      precVenda.value = ""
  })