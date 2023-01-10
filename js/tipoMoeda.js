import { firebaseConfig} from "./firebaseConfig.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, remove, onValue, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export var TipoMoeda = ""

const dbRef = ref(db, "tipoMoeda")

onValue(dbRef, (snapshot)=>{
    const data = snapshot.val()

    TipoMoeda = data.tipoMoeda
})
