var inputEmail = document.querySelector(".inputEmail")
var inputPass = document.querySelector(".inputPass")
var btnEntrar = document.querySelector(".btnEntrar")

btnEntrar.addEventListener("click", ()=>{
    if(inputEmail.value == "leonildojuliojulio@gmail.com" && inputPass.value == "123456"){
        window.location.href = "dashboard/index.html"
      }
})