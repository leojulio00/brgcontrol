import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


var codProdV = document.querySelector(".codProdV")
var nomeProdV = document.querySelector(".nomeProdV")
var precVenda = document.querySelector(".precVenda")
var quantProdV = document.querySelector(".quantProdV")
var valorTot = document.querySelector(".valorTot")
var valorEntr = document.querySelector(".valorEntr")
var valorTr = document.querySelector(".valorTr")
var horaRegVen = document.querySelector(".horaRegVen")
var btnRegVenda = document.querySelector(".btnRegVenda")
var codProdVendas = 0
var precVendaV = 0
var valorTotal


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
const database = getDatabase(app);

codProdV.addEventListener("keyup", ()=>{
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

quantProdV.addEventListener("keyup", ()=>{
  valorTotal = precVendaV * quantProdV.value

  valorTot.value = valorTotal
})

valorEntr.addEventListener("keyup", ()=>{
  if(valorEntr.value < valorTotal){
    //alert("O valor dado e menor que valor total")
    valorTr.value = 0
  }else{
    var valorTroco = Math.abs(valorTot.value - valorEntr.value)
    valorTr.value = valorTroco
  }
})



btnRegVenda.addEventListener("click", ()=>{
  if(valorEntr.value < valorTotal){
    alert("O valor dado e menor que valor total")
    window.location.href = "./dashboard.html?#sectionReg"
  }else{
    /*var valorTroco = Math.abs(valorTot.value - valorEntr.value)
    valorTr.value = valorTroco*/

    function adicionarProd(codProdV, nomeProdV, precVenda, quantProdV, valorTot, valorEntr, valorTr, horaRegVen) {
      const db = getDatabase();
      set(ref(db, 'vendas/' + codProdVendas + 1), {
        codProdV: codProdV,
        nomeProdV: nomeProdV,
        precVenda: precVenda,
        quantProdV: quantProdV,
        valorTot: valorTot,
        valorEntr: valorEntr,
        valorTr: valorTr,
        horaRegVen: horaRegVen
      });
    }

    adicionarProd(codProdV.value, nomeProdV.value, precVenda.value, quantProdV.value, valorTot.value, valorEntr.value, valorTr.value, horaRegVen.value)

    alert("Venda cadastrada com sucesso")
    codProdV.value = ""
    nomeProdV.value = ""
    precVenda.value = ""
    quantProdV.value = ""
    valorTot.value = ""
    valorEntr.value = ""
    valorTr.value = ""
    horaRegVen.value
  }
})







/*btnAlterProd.addEventListener("click", ()=>{
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
  })*/