import { firebaseConfig} from "./firebaseConfig.js";
import { TipoMoeda } from "./tipoMoeda.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, remove, onValue, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var produtosEscolhidoFinal = document.querySelector(".produtosEscolhidoFinal")
var metodoPagamentoEscolhido = document.querySelector(".metodoPagamentoEscolhido")
var produtosAdicio = document.querySelector(".produtosAdicio")
var metodosPagamentos = document.querySelector(".metodosPagamentos")
var finalizarPreVenda = document.querySelector(".finalizarPreVenda")
var mesasDisponiveis = document.querySelector(".mesasDisponiveis")
var divSelecProdutos = document.querySelector(".selecionarProdutos")
var divSelecMetodos = document.querySelector(".selecionarMPagamento")
var divBtnProximo = document.querySelector(".divBtnProximo")
var divMesasDisponiveis = document.querySelector(".divMesasDisponiveis")
var spanTotalVenda = document.querySelector(".spanTotalVenda")
var btnAdicionarAMesa = document.querySelector(".btnAdicionarAMesa")
var btnFinalizarVenda = document.querySelector(".btnFinalizarVenda")
var botaoProximo = document.querySelector(".btnProximoRegVenda")
var botaoCancelar = document.querySelector(".btnCancelar")
var botaoCancelar2 = document.querySelector(".btnCancelar2")
var btnRegVenda = document.querySelector(".btnRegVenda")


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

set(ref(db, 'produtos/selecProdutosValor/'), {
  valorTotal: 0
});

function regVendasNormal(){
  set(ref(db, 'produtos/selecProdutosValor/'), {
    valorTotal: 0
  });

  const dbRefProdSelect = ref(db, "produtos/selecProdutos")
  const dbRefMethSelect = ref(db, "metodosPagamento/metodoSelecionado")

  remove(dbRefProdSelect)
  remove(dbRefMethSelect)
  
  divSelecProdutos.style.display = "block"
  divSelecMetodos.style.display = "none"
  finalizarPreVenda.style.display = "none"

  //window.location.href = "./dashboard.html"

  let divCol = document.createElement("div")
  let divCard = document.createElement("div")
  let divCardBody = document.createElement("div")
  let nomeMetodoTxt = document.createElement("p")
  let divCol2 = document.createElement("div")
  let divCard2 = document.createElement("div")
  let divCardBody2 = document.createElement("div")
  let nomeProdTxt = document.createElement("p")

  nomeMetodoTxt.innerHTML = "Nenhum método Escolhido"
  nomeProdTxt.innerHTML = "Nenhum produto Escolhido"
  
  divCol.classList.add("col")
  divCard.classList.add("card")
  divCard.classList.add("cardRegVendasSelecionado")
  divCardBody.classList.add("card-body")
  nomeMetodoTxt.style.margin = "0px"
  divCol2.classList.add("col")
  divCard2.classList.add("card")
  divCard2.classList.add("cardRegVendasSelecionado")
  divCardBody2.classList.add("card-body")
  nomeProdTxt.style.margin = "0px"

  divCol.appendChild(divCard)  
  divCard.appendChild(divCardBody) 
  divCardBody.appendChild(nomeMetodoTxt) 
  
  divCol2.appendChild(divCard2)  
  divCard2.appendChild(divCardBody2) 
  divCardBody2.appendChild(nomeProdTxt) 
  
  if(metodoPagamentoEscolhido.childNodes.length == 0){
    metodoPagamentoEscolhido.appendChild(divCol)
  }

  if(produtosEscolhidoFinal.childNodes.length == 0){
    produtosEscolhidoFinal.appendChild(divCol2)
  }

  spanTotalVenda.innerHTML = "0 " + TipoMoeda
  window.onload = GetAllDataRealtime()
  window.onload = GetAllDataRealtimeMetodosP()
  window.location.reload()
}

function addItemToTable(nomeProd, precVenda, tipoMoeda){
    let divCol = document.createElement("div")
    let divCard = document.createElement("div")
    let divCardBody = document.createElement("div")
    let produNome = document.createElement("h3")
    let produQuantidade = document.createElement("h5")
    let produPreco = document.createElement("h1")
    let quantProduto = 1
    //produQuantidade.innerHTML = "Qtd " + quantProduto


    produNome.innerHTML = nomeProd
    produPreco.innerHTML = precVenda + " " + tipoMoeda

    

    divCard.addEventListener("click", ()=>{
      produQuantidade.innerHTML = "Qtd " + quantProduto++

      const db = getDatabase();
      set(ref(db, 'produtos/selecProdutos/' + nomeProd), {
        nomeProduto: nomeProd,
        quantidadeProd: quantProduto - 1,
        precoProduto: precVenda,
        tipoMoeda: tipoMoeda
      });

      if(divCard.classList.contains("cardRegVendasSelecionado")){
        //
      }else{
        divCard.classList.add("cardRegVendasSelecionado")
      }

      let valorActual = 0 
      let valorSomado = 0
      let valorProduto = precVenda
      const dbRef = ref(db, "produtos/selecProdutosValor")

      onValue(dbRef, (snapshot) => {
        var data = snapshot.val()
        valorActual = data.valorTotal
        
      })

      valorSomado = parseInt(valorProduto) + parseInt(valorActual)
        
      set(ref(db, 'produtos/selecProdutosValor/'), {
        valorTotal: valorSomado
      });
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



    const dbRef = ref(db, "metodosPagamento/metodoSelecionado")
    var dados

    onValue(dbRef, (snapshot)=>{
      const data = snapshot.val()    
      dados = data
    })

    function passarPTelaFinalizarPreVenda(){
      console.log(dados)

      if(dados == null){
        alert("Selecione um método")
      }else{
        divSelecMetodos.style.display = "none"
        finalizarPreVenda.style.display = "block"
      }
    }

    passarPTelaFinalizarPreVenda()
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


function addMetodNoCard(nomeMetodo){
  let divCol = document.createElement("div")
  let divCard = document.createElement("div")
  let divCardBody = document.createElement("div")
  let metodoPagamento = document.createElement("h5")

  metodoPagamento.innerHTML = nomeMetodo

  divCol.classList.add("col")
  divCard.classList.add("card")
  divCard.classList.add("cardRegVendasSelecionado")
  divCardBody.classList.add("card-body")
  metodoPagamento.classList.add("card-title")
  metodoPagamento.style.fontSize = "16px"

  divCol.appendChild(divCard)  
  divCard.appendChild(divCardBody) 
  divCardBody.appendChild(metodoPagamento)  

  metodoPagamentoEscolhido.appendChild(divCol)
}

function addTdsMetodNoCard(metodo){
  metodoPagamentoEscolhido.innerHTML = ""
    metodo.forEach(element => {
        addMetodNoCard(element.nomeMetodo)
    });
}

function PegarMetodosSelecionado(){
    const dbRef = ref(db, "metodosPagamento/metodoSelecionado")

    onValue(dbRef, (snapshot) =>{
        var metodoSelec = []

        snapshot.forEach(childSnapshot => {
          metodoSelec.push(childSnapshot.val())
        })

        addTdsMetodNoCard(metodoSelec)
    })
}


function addProdutosNoCard(nomeProduto, precoProduto, tipoMoeda, quantidadeProd){
  let divCol = document.createElement("div")
  let divCard = document.createElement("div")
  let divCardBody = document.createElement("div")
  let produNomeTxt = document.createElement("h5")
  let precoProdutoTxt = document.createElement("h5")
  let produQuantidadeTxt = document.createElement("h5")

  produNomeTxt.innerHTML = nomeProduto
  precoProdutoTxt.innerHTML = precoProduto + ".00 " + tipoMoeda
  produQuantidadeTxt.innerHTML = quantidadeProd

  /*divCard.addEventListener("click", ()=>{
    produQuantidade.innerHTML = "Qtd " + quantProduto++

    const db = getDatabase();
    set(ref(db, 'produtos/selecProdutos/' + nomeProduto), {
      quantidadeProd: quantProduto - 1
    });

    if(divCard.classList.contains("cardRegVendasSelecionado")){
      //
    }else{
      divCard.classList.add("cardRegVendasSelecionado")
    }
  })*/

  divCol.classList.add("col")
  divCard.classList.add("card")
  divCard.classList.add("cardRegVendasSelecionado")
  divCardBody.classList.add("card-body")
  divCardBody.style.display = "flex"
  divCardBody.style.flexDirection = "row"
  divCardBody.style.flexWrap = "nowrap"
  divCardBody.style.justifyContent = "space-between"
  produNomeTxt.classList.add("card-title")
  produNomeTxt.style.fontSize = "16px"
  precoProdutoTxt.classList.add("card-title")
  precoProdutoTxt.style.fontSize = "16px"
  produQuantidadeTxt.classList.add("card-text")
  produQuantidadeTxt.style.fontSize = "16px"

  divCol.appendChild(divCard)  
  divCard.appendChild(divCardBody) 
  divCardBody.appendChild(produNomeTxt)  
  divCardBody.appendChild(precoProdutoTxt)
  divCardBody.appendChild(produQuantidadeTxt)  

  produtosEscolhidoFinal.appendChild(divCol)
}

function addTdsProdutosNaDiv(produtos){
  produtosEscolhidoFinal.innerHTML = ""
  produtos.forEach(element => {
      addProdutosNoCard(element.nomeProduto, element.precoProduto, element.tipoMoeda, element.quantidadeProd)
  });
}

function PegarTdsProdutosSelecionados(){
  const dbRef = ref(db, "produtos/selecProdutos")

  onValue(dbRef, (snapshot) =>{
      var todosProdutos = []

      snapshot.forEach(childSnapshot => {
        todosProdutos.push(childSnapshot.val())
      })

      addTdsProdutosNaDiv(todosProdutos)
  })
}

let produtosSelecionadosMesa = ""
let metodoSelecionandoMesa = ""

const dbRefProdutosMesa = ref(db, "produtos/selecProdutos")
const dbRefMetodoMesa = ref(db, "/metodosPagamento/metodoSelecionado")
onValue(dbRefProdutosMesa, (snapshot)=>{
  const data = snapshot.val()
  produtosSelecionadosMesa = data
})

onValue(dbRefMetodoMesa, (snapshot)=>{
  const data = snapshot.val()
  metodoSelecionandoMesa = data
})

var chaveMesaString
var chaveMesa = 0


function addMesasNaDiv(codigoMesa, rotulo, tamanho){
  let divCol = document.createElement("div")
  let divCard = document.createElement("div")
  let divCardBody = document.createElement("div")
  let codigoMesaTxt = document.createElement("h5")
  let rotuloMesaTxt = document.createElement("h5")
  let tamanhoMesaTxt = document.createElement("h5")

  codigoMesaTxt.innerHTML = "Cod. " + codigoMesa
  rotuloMesaTxt.innerHTML = "Rot." + rotulo
  tamanhoMesaTxt.innerHTML = "Tamanho " + tamanho

  

  divCard.addEventListener("click", ()=>{
    const commentsRefMesa = ref(db, 'mesas/produtos/' + codigoMesa + "/");
    onChildAdded(commentsRefMesa, (data) => {
      chaveMesaString = data.key
      console.log(chaveMesaString)

      chaveMesa = parseInt(chaveMesaString)
    });

    
      console.log(chaveMesa)
      console.log(codigoMesa)

      console.log(chaveMesa++)
      set(ref(db, 'mesas/produtos/' + codigoMesa + "/" + chaveMesa), {
        codigoMesa: codigoMesa,
        produtos: produtosSelecionadosMesa,
        metodoPagamento: metodoSelecionandoMesa
      });

    alert("Adicionado a mesa com sucesso")
    
    //regVendasNormal()
  })

  divCol.classList.add("col")
  divCard.classList.add("card")
  divCard.classList.add("cardRegVendasSelecionado")
  divCardBody.classList.add("card-body")
  divCardBody.style.display = "flex"
  divCardBody.style.flexDirection = "row"
  divCardBody.style.flexWrap = "nowrap"
  divCardBody.style.justifyContent = "space-between"
  divCardBody.style.margin = "5px 0px"
  codigoMesaTxt.classList.add("card-title")
  codigoMesaTxt.style.margin = "0px"
  rotuloMesaTxt.classList.add("card-title")
  rotuloMesaTxt.style.margin = "0px"
  tamanhoMesaTxt.classList.add("card-text")
  tamanhoMesaTxt.style.margin = "0px"

  divCol.appendChild(divCard)  
  divCard.appendChild(divCardBody) 
  divCardBody.appendChild(codigoMesaTxt)  
  divCardBody.appendChild(rotuloMesaTxt)
  divCardBody.appendChild(tamanhoMesaTxt)  

  divMesasDisponiveis.appendChild(divCol)
}

function addTdasMesasNaDiv(produtos){
  divMesasDisponiveis.innerHTML = ""
  produtos.forEach(element => {
      addMesasNaDiv(element.codigoMesa, element.rotulo, element.tamanho)
  });
}

function PegarTdsMesas(){
  const dbRef = ref(db, "mesas/todasMesas")

  onValue(dbRef, (snapshot) =>{
      var todasMesas = []

      snapshot.forEach(childSnapshot => {
        todasMesas.push(childSnapshot.val())
      })

      addTdasMesasNaDiv(todasMesas)
  })
}

window.onload = PegarTdsMesas()


btnAdicionarAMesa.addEventListener("click", ()=>{
  mesasDisponiveis.style.display = "block"
})

btnFinalizarVenda.addEventListener("click", ()=>{
  //let btnProximo = document.createElement("button")
  let valorTotal = 0
  //modalRegistarVendas.classList.remove("show")
  //modalRegistarVendas.ariaHidden = "true"
  //modalRegistarVendas.style.display = "none"

  /*btnProximo.innerHTML = "Próximo"
  btnProximo.classList.add("btn")
  btnProximo.classList.add("btn-primary")
  btnProximo.classList.add("btnProximoRegVenda")

  divBtnProximo.appendChild(btnProximo)*/

  divSelecProdutos.style.display = "block"
  divSelecMetodos.style.display = "none"
  finalizarPreVenda.style.display = "none"
  window.onload = GetAllDataRealtime()
  window.onload = GetAllDataRealtimeMetodosP()
  window.onload = PegarMetodosSelecionado()
  window.onload = PegarTdsProdutosSelecionados()
  divBtnProximo.classList.remove("d-none") 
  divBtnProximo.classList.add("d-block")   

  const dbRef = ref(db, "produtos/selecProdutosValor")

  onValue(dbRef, (snapshot)=>{
    const data = snapshot.val()

    valorTotal = data.valorTotal
  })

  spanTotalVenda.innerHTML = valorTotal + " " + TipoMoeda
})


const dbRef = ref(db, "produtos/selecProdutos")
var dadosSelecProdBtnPrx

onValue(dbRef, (snapshot)=>{
  const data = snapshot.val()    
  dadosSelecProdBtnPrx = data
})


botaoProximo.addEventListener("click", ()=>{
  

  function passarPTelaMetodos(){
    console.log(dadosSelecProdBtnPrx)

    if(dadosSelecProdBtnPrx == null){
      alert("Selecione um produto")
    }else{
      divSelecProdutos.style.display = "none"
      divSelecMetodos.style.display = "block"

      botaoProximo.classList.remove("btnProximoRegVenda")
      botaoProximo.classList.add("btnProximoRegVendaModalMesas")
      divBtnProximo.classList.add("d-none") 
    }
  }

  passarPTelaMetodos()
  
})

const dbRefMetPagamentoE = ref(db, "metodosPagamento/metodoSelecionado")
let confirE = true

onValue(dbRefMetPagamentoE, (snapshot)=>{
  const data = snapshot.val()
  console.log(data)
  if(data == null){
    confirE = false
  }else{
    confirE = true
  }
})

botaoCancelar.addEventListener("click", ()=>{
  if(confirE == true){
    regVendasNormal()
    alert("Cancelado com sucesso") 
  }else{
    alert("Nada seleciondo")
  }
})

botaoCancelar2.addEventListener("click", ()=>{
  if(confirE == true){
    regVendasNormal()
    alert("Cancelado com sucesso") 
  }else{
    alert("Nada seleciondo")
  }
})

var chaveVendasString
var chaveVendas

const commentsRef = ref(db, 'vendas');
onChildAdded(commentsRef, (data) => {
  chaveVendasString = data.key
});

btnRegVenda.addEventListener("click", ()=>{
  let produtosSelecionados = ""
  let metodoSelecionando = ""

  const dbRefProdutos = ref(db, "produtos/selecProdutos")
  const dbRefMetodo = ref(db, "/metodosPagamento/metodoSelecionado")
  onValue(dbRefProdutos, (snapshot)=>{
    const data = snapshot.val()
    produtosSelecionados = data
  })

  onValue(dbRefMetodo, (snapshot)=>{
    const data = snapshot.val()
    metodoSelecionando = data
  })

    chaveVendas = parseInt(chaveVendasString)

  if(confirE == true){
    console.log(chaveVendas++)
    set(ref(db, 'vendas/' + chaveVendas), {
      produtos: produtosSelecionados,
      metodoPagamento: metodoSelecionando
    });
    regVendasNormal()
    alert("Venda cadatrada com sucesso")
  }else{
    alert("Adicione produtos para venda antes")
  }
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