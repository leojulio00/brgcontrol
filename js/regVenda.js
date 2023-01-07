import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, remove, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


var produtosAdicio = document.querySelector(".produtosAdicio")
var metodosPagamentos = document.querySelector(".metodosPagamentos")
var divSelecProdutos = document.querySelector(".selecionarProdutos")
var divSelecMetodos = document.querySelector(".selecionarMPagamento")
var botaoProximo = document.querySelector(".btnProximoRegVenda")
var botaoProximoModalMesas = document.querySelector(".btnProximoRegVendaModalMesas")
var botaoCancelar = document.querySelector(".btnCancelar")

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function addItemToTable(nomeProd, precVenda, tipoMoeda){
    let divCol = document.createElement("div")
    let divCard = document.createElement("div")
    let divCardBody = document.createElement("div")
    let produNome = document.createElement("h3")
    let produQuantidade = document.createElement("h5")
    let produPreco = document.createElement("h1")
    let quantProduto = 0
    //produQuantidade.innerHTML = "Qtd " + quantProduto


    produNome.innerHTML = nomeProd
    produPreco.innerHTML = precVenda + " " + tipoMoeda

    divCard.addEventListener("click", ()=>{
      produQuantidade.innerHTML = "Qtd " + quantProduto++

      const db = getDatabase();
      set(ref(db, 'produtos/selecProdutos/' + nomeProd), {
        quantidadeProd: quantProduto - 1
      });

      if(divCard.classList.contains("cardRegVendasSelecionado")){
        //
      }else{
        divCard.classList.add("cardRegVendasSelecionado")
      }
    })

    divCol.classList.add("col")
    divCard.classList.add("card")
    divCard.classList.add("cardRegVendas")
    divCardBody.classList.add("card-body")
    produNome.classList.add("card-title")
    produNome.style.fontSize = "18px"
    produPreco.classList.add("card-title")
    produPreco.style.fontSize = "26px"
    produQuantidade.classList.add("card-text")
    produQuantidade.style.fontSize = "16px"

    divCol.appendChild(divCard)  
    divCard.appendChild(divCardBody) 
    divCardBody.appendChild(produNome)  
    divCardBody.appendChild(produPreco)
    divCardBody.appendChild(produQuantidade)  

    produtosAdicio.appendChild(divCol)
}

function addAllItemsToTable(produtos){
  produtosAdicio.innerHTML = ""
    produtos.forEach(element => {
        addItemToTable(element.nomeProd, element.precVenda, element.tipoMoeda)
    });
}

function GetAllDataRealtime(){
    const dbRef = ref(db, "produtos/todosProdutos")

    onValue(dbRef, (snapshot) =>{
        var todosProdutos = []

        snapshot.forEach(childSnapshot => {
          todosProdutos.push(childSnapshot.val())
        })

        addAllItemsToTable(todosProdutos)
    })
}

window.onload = GetAllDataRealtime()



function addItemToTableMetodosP(nomeMetodo){
  let divCol = document.createElement("div")
  let divCard = document.createElement("div")
  let divCardBody = document.createElement("div")
  let nomeMetodoTxt = document.createElement("h1")

  nomeMetodoTxt.innerHTML = nomeMetodo

  divCard.addEventListener("click", ()=>{
    const db = getDatabase();
    set(ref(db, 'metodosPagamento/metodoSelecionado/' + nomeMetodo), {
      nomeMetodo: nomeMetodo
    });

    if(divCard.classList.contains("cardRegVendasSelecionado")){
      //
    }else{
      divCard.classList.add("cardRegVendasSelecionado")
    }
  })

  divCol.classList.add("col")
  divCard.classList.add("card")
  divCard.classList.add("cardMetodospagamento")
  divCardBody.classList.add("card-body")
  nomeMetodoTxt.classList.add("card-title")
  nomeMetodoTxt.style.fontSize = "22px"

  divCol.appendChild(divCard)  
  divCard.appendChild(divCardBody) 
  divCardBody.appendChild(nomeMetodoTxt)  
 

  metodosPagamentos.appendChild(divCol)
}

function addAllItemsToTableMetodosP(metodos){
  metodosPagamentos.innerHTML = ""
metodos.forEach(element => {
  addItemToTableMetodosP(element.nomeMetodo)
  });
}

function GetAllDataRealtimeMetodosP(){
  const dbRef = ref(db, "metodosPagamento/todosMetodos")

  onValue(dbRef, (snapshot) =>{
      var todosMetodos = []

      snapshot.forEach(childSnapshot => {
        todosMetodos.push(childSnapshot.val())
      })

      addAllItemsToTableMetodosP(todosMetodos)
  })
}

window.onload = GetAllDataRealtimeMetodosP()

botaoProximo.addEventListener("click", async ()=>{
  const dbRef = ref(db, "produtos/selecProdutos")
  var dados

  await onValue(dbRef, (snapshot)=>{
    const data = snapshot.val()    
    dados = data
  })

  async function passarPTelaMetodos(){
    console.log(dados)

  if(dados == null){
    alert("Selecione um produto")
  }else{
    divSelecProdutos.style.display = "none"
    divSelecMetodos.style.display = "block"

    botaoProximo.classList.remove("btnProximoRegVenda")
    botaoProximo.classList.add("btnProximoRegVendaModalMesas")
  }
  }

  passarPTelaMetodos()
  
})

botaoCancelar.addEventListener("click", ()=>{
  const dbRefProdSelect = ref(db, "produtos/selecProdutos")
  const dbRefMethSelect = ref(db, "metodosPagamento/metodoSelecionado")

  remove(dbRefProdSelect)
  remove(dbRefMethSelect)

  window.onload = GetAllDataRealtime()
  window.onload = GetAllDataRealtimeMetodosP()

  divSelecProdutos.style.display = "block"
  divSelecMetodos.style.display = "none"
})


/*import { firebaseConfig} from "./firebaseConfig.js";
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
      }*
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
    valorTr.value = valorTroco*

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







*btnAlterProd.addEventListener("click", ()=>{
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