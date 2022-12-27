let sectionDashboard = document.querySelector(".dashboard")
let sectionVendas = document.querySelector(".vendas")
let sectionCaixa = document.querySelector(".caixa")
let sectionProdutos = document.querySelector(".produtos")
let sectionColaboradores = document.querySelector(".colaboradores")
let sectionUsuario = document.querySelector(".usuario")
let btnDashboard = document.querySelector(".btnDashboard")
let btnVendas = document.querySelector(".btnVendas")
let btnCaixa = document.querySelector(".btnCaixa")
let btnProdutos = document.querySelector(".btnProdutos")
let btnColaboradores = document.querySelector(".btnColaboradores")
let btnUsuario = document.querySelector(".btnUsuario")
var btnSidebar = document.querySelector(".navbar-toggler")
var menuLateral = document.querySelector(".menuLateral")

btnDashboard.addEventListener("click", () =>{
    if(sectionDashboard.style.display == "none"){
        sectionDashboard.style.display = "block"
        sectionVendas.style.display = "none"
        sectionProdutos.style.display = "none"
        sectionCaixa.style.display = "none"
        sectionColaboradores.style.display = "none"
        sectionUsuario.style.display = "none"
    }else{
        //sectionDashboard.style.display = "none"
    }
    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})

btnVendas.addEventListener("click", () =>{
    if(sectionVendas.style.display == "none"){
        sectionVendas.style.display = "block"
        sectionDashboard.style.display = "none"
        sectionProdutos.style.display = "none"
        sectionCaixa.style.display = "none"
        sectionColaboradores.style.display = "none"
        sectionUsuario.style.display = "none"
    }else{
        //sectionVendas.style.display = "none"
    }

    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})

/*btnCaixa.addEventListener("click", () =>{
    if(sectionCaixa.style.display == "none"){
        sectionCaixa.style.display = "block"
        sectionDashboard.style.display = "none"
        sectionVendas.style.display = "none"
        sectionProdutos.style.display = "none"
        sectionColaboradores.style.display = "none"
        sectionUsuario.style.display = "none"
    }else{
        //sectionCaixa.style.display = "none"
    }

    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})*/

btnProdutos.addEventListener("click", () =>{
    if(sectionProdutos.style.display == "none"){
        sectionProdutos.style.display = "block"
        sectionDashboard.style.display = "none"
        sectionVendas.style.display = "none"
        sectionCaixa.style.display = "none"
        sectionColaboradores.style.display = "none"
        sectionUsuario.style.display = "none"
    }else{
        //sectionProdutos.style.display = "none"
    }

    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})

btnColaboradores.addEventListener("click", () =>{
    if(sectionColaboradores.style.display == "none"){
        sectionColaboradores.style.display = "block"
        sectionDashboard.style.display = "none"
        sectionVendas.style.display = "none"
        sectionProdutos.style.display = "none"
        sectionCaixa.style.display = "none"
        sectionUsuario.style.display = "none"
    }else{
        //sectionColaboradores.style.display = "none"
    }

    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})

btnUsuario.addEventListener("click", () =>{
    if(sectionUsuario.style.display == "none"){
        sectionUsuario.style.display = "block"
        sectionDashboard.style.display = "none"
        sectionVendas.style.display = "none"
        sectionProdutos.style.display = "none"
        sectionCaixa.style.display = "none"
        sectionColaboradores.style.display = "none"
    }else{
        //sectionUsuario.style.display = "none"
    }

    if(btnSidebar.ariaExpanded == "true"){
        btnSidebar.ariaExpanded = "false"
        btnSidebar.classList.add("collapsed")
        menuLateral.classList.remove("show")
    }else{
        btnSidebar.ariaExpanded = "true"
        btnSidebar.classList.remove("collapsed")
        menuLateral.classList.add("show")
    }
})

