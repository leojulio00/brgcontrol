import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, remove, onValue, set, onChildAdded } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var codMesa = document.querySelector(".codMesa")
var tamanhoMesa = document.querySelector(".tamanhoMesa")
var formaMesaSelect = document.querySelector(".formaMesaSelect")
var rotuloMesa = document.querySelector(".rotuloMesa")
var btnCadastrarMesa = document.querySelector(".btnCadastrarMesa")


btnCadastrarMesa.addEventListener("click", ()=>{
    set(ref(db, 'mesas/todasMesas/' + codMesa.value), {
        codigoMesa: codMesa.value,
        tamanho: tamanhoMesa.value,
        foma: formaMesaSelect.options[formaMesaSelect.selectedIndex].text,
        rotulo: rotuloMesa.value
    });

    alert("Mesa cadastrada")
})
