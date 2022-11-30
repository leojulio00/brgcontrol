import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, child, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

var cod = 0
var bodyColab = document.querySelector(".bodyColab")
var btnRefresh = document.querySelector(".btnRefresh")

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

function addItemToTable(codColab, nomeColab, catgColab, enderColab, telColab, emailColab){
    let trow = document.createElement("tr")
    let td1 = document.createElement("td")
    let td2 = document.createElement("td")
    let td3 = document.createElement("td")
    let td4 = document.createElement("td")
    let td5 = document.createElement("td")
    let td6 = document.createElement("td")

    td1.innerHTML = ++cod
    td2.innerHTML = nomeColab
    td3.innerHTML = catgColab
    td4.innerHTML = enderColab
    td5.innerHTML = telColab
    td6.innerHTML = emailColab

    trow.appendChild(td1)  
    trow.appendChild(td2) 
    trow.appendChild(td3)  
    trow.appendChild(td4)
    trow.appendChild(td5)  
    trow.appendChild(td6)

    bodyColab.appendChild(trow)
}

function addAllItemsToTable(produtosEstoque){
    bodyColab.innerHTML = ""
    produtosEstoque.forEach(element => {
        addItemToTable(element.codColab, element.nomeColab, element.catgColab, element.enderColab, element.telColab, element.emailColab)
    });
}

/*function GetAllDataOnce(){
    const dbRef = ref(db)

    get(child(dbRef, "produtosEstoque")).then((snapshot)=>{
        var produtos = []


        snapshot.forEach(childSnapshot => {
            produtos.push(childSnapshot.val())
        })
        addAllItemsToTable(produtos)
    })
}*/

function GetAllDataRealtime(){
    const dbRef = ref(db, "users")

    onValue(dbRef, (snapshot) =>{
        var colaboradores = []

        snapshot.forEach(childSnapshot => {
            colaboradores.push(childSnapshot.val())
        })

        addAllItemsToTable(colaboradores)
    })
}

/*btnRefresh.addEventListener("click", ()=>{
    //GetAllDataRealtime()
    window.onload
})*/

window.onload = GetAllDataRealtime()