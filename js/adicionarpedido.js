import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";
var codPedido = document.querySelector(".codPedido")
var estadoPedi = document.querySelector(".estadoPedi")
var prodPed = document.querySelector(".prodPed")
var btnRegPedido = document.querySelector(".btnRegPedido")
var btnAltPedido = document.querySelector(".btnAltPedido")
//var btnCanPedido = document.querySelector(".btnCanPedido")


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

/*btnRegPedido.addEventListener("click", ()=>{
function adicionarPedido(codPedido, prodPed, estadoPedi) {
  const db = getDatabase();
  set(ref(db, 'pedidosV/' + codPedido), {
    prodPed: prodPed,
    estadoPedi: estadoPedi
  });
}*/

btnRegPedido.addEventListener("click", ()=>{
    function adicionarPedido(codPedido, prodPed, estadoPedi) {
      const db = getDatabase();
      set(ref(db, 'pedidos/' + codPedido), {
        prodPed: prodPed,
        estadoPedi: estadoPedi
      });
    }

adicionarPedido(codPedido.value, prodPed.value, estadoPedi.value)

    alert("Pedido Registado com sucesso")
    codPedido.value = ""
    estadoPedi.value = ""
    prodPed.value = ""
})

btnAltPedido.addEventListener("click", ()=>{
function adicionarProd(codPedido, prodPed, estadoPedi) {
    const db = getDatabase();
    set(ref(db, 'pedidos/' + codPedido), {
    estadoPedi: estadoPedi,
    prodPed: prodPed
    });
}

adicionarProd(codPedido.value, prodPed.value, estadoPedi.value)
    alert("Pedido Registado com sucesso")
    codPedido.value = ""
    estadoPedi.value = ""
    prodPed.value = ""
})