var ojo= document.getElementById('Ojo');
var input = document.getElementById('passwordreg');
ojo.addEventListener("click", function(){
    if(input.type=="password"){
        input.type="text"
        ojo.style.opacity=0.8
    }else{
        input.type = "password"
        ojo.style.opacity = 0.2
    }
})

var ojoconf= document.getElementById('Ojoconf');
var input1 = document.getElementById('confirm-password');
ojoconf.addEventListener("click", function(){
    if(input1.type=="password"){
        input1.type="text"
        ojoconf.style.opacity=0.8
    }else{
        input1.type = "password"
        ojoconf.style.opacity = 0.2
    }
})
