
// son variables que se llenan luego de click ene le boton de enviar  dataRegister -- dataLogin -- dataUpdate

 // variables con los div padres
var panelRegisterLogin,login,register,home;
var reserveBody,homeBody;
var dataRegister,dataLogin,dataUpdate;
var resumeBody,messageBody,viewReservesBody;

var currentView;



var app = {
    initilize:()=>{                
        // asignacion de variables
        //div padres
        panelRegisterLogin = document.getElementById("panelRegisterLogin");
        login = document.getElementById("login");
        register = document.getElementById("register");
        home = document.getElementById("home");
        homeBody = document.getElementById("homeBody");
        reserveBody = document.getElementById("reserveBody");
        resumeBody = document.getElementById("resumeBody");
        messageBody = document.getElementById("messageBody");
        viewReservesBody = document.getElementById("viewReservesBody");
        currentView = homeBody;
        //asignacion de eventos
        if(localStorage.getItem("sesion")){
            app.changeView(panelRegisterLogin,home);
        }

        document.getElementById("initSesion").addEventListener("click",()=>{app.changeView(panelRegisterLogin,login)});
        document.getElementById("registerRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,register)});
        document.getElementById("initNotRegisteredRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,home)});
        document.getElementById("returnL").addEventListener("click",()=>{app.changeView(login,panelRegisterLogin)});
        document.getElementById("initNotRegisteredR").addEventListener("click",()=>{app.changeView(register,home)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});

        $('#makeRegister').attr('disabled','disabled');
        // $('#modalProfile').modal('show');
    },

    changeView:(idViewOld,idViewNew)=>{
        idViewOld.className = "hidden";
        idViewNew.className = "show";
    },

    changeViewHome:(idViewNew)=>{
        // quitar commentario
        // if(!localStorage.getItem("sesion")) {
        //     if (!(homeBody == idViewNew)){
        //         app.changeView(home,login);
        //         return;
        //     }  
        // }
        if (!(idViewNew == currentView)) {
            currentView.className = "hidden";
            idViewNew.className = "show";
            currentView = idViewNew;
        }
    }
};
app.initilize();
   
// eventos que se disparan con el boton de submit jquery

$('#formRegisterData').submit(function (e) {
    e.preventDefault();
    var arrayData = new Array();
    var data = $(this).serializeArray();
    data.forEach((item)=>{
        arrayData[item.name] = item.value;
    });
    
    putRegister(arrayData);
    app.changeView(register,panelRegisterLogin);
});

$('#formLoginData').submit(function (e) {
    e.preventDefault();
    var arrayData = new Array();
    var data = $(this).serializeArray();
    data.forEach((item)=>{
        arrayData[item.name] = item.value;
    });
    console.log(arrayData["email"]+arrayData["password"]);
    findAccount(arrayData["email"],arrayData["password"]);
});

$('#registerData').submit(function (e) {
    e.preventDefault();
    var arrayData = new Array();
    var data = $(this).serializeArray();
    data.forEach((item)=>{
        arrayData[item.name] = item.value;
    });
    dataUpdate = arrayData;
});


// arreglar


function diaSemana(dia,mes,anio){
    var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
    console.log( "Dia de la semana : " + dias[dt.getUTCDay()]);    
};
var tem;
function edit(id){
tem = id;
    id.parentElement.parentElement.children[0].children[0].children[1].readOnly=false;
    id.className = "hidden";
    id.parentElement.children[1].className = "show";
}

function save(id){
    id.parentElement.parentElement.children[0].children[0].children[1].readOnly=true;
    id.className = "hidden";
    id.parentElement.children[0].className = "show";
    var value = id.parentElement.parentElement.children[0].children[0].children[1].value;
    console.log(value);
}