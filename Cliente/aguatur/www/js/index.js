
// son variables que se llenan luego de click ene le boton de enviar  dataRegister -- dataLogin -- dataUpdate


 // variables con los div padres
var panelRegisterLogin,login,register,home;
var reserve,editInformation,viewReserves;


var dataRegister,dataLogin,dataUpdate;

var app = {
    initilize:()=>{
        // asignacion de variables
        //div padres
        panelRegisterLogin = document.getElementById("panelRegisterLogin");
        login = document.getElementById("login");
        register = document.getElementById("register");
        home = document.getElementById("home");
        reserve = document.getElementById("reserve");
        editInformation = document.getElementById("editInformation");
        viewReserves = document.getElementById("viewReserves");
        //asignacion de eventos
        document.getElementById("initSesion").addEventListener("click",()=>{app.changeView(panelRegisterLogin,login)});
        document.getElementById("registerRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,register)});
        document.getElementById("registerL").addEventListener("click",()=>{app.changeView(login,register)});
        document.getElementById("initNotRegisteredRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,home)});
        document.getElementById("initNotRegisteredL").addEventListener("click",()=>{app.changeView(login,home)});
        document.getElementById("initNotRegisteredR").addEventListener("click",()=>{app.changeView(register,home)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});

        //iniciacion vistas
        panelRegisterLogin.className = "hidden";
        login.className = "hidden";
        register.className = "toShow";
        home.className = "hidden";
        reserve.className = "hidden";
        editInformation.className = "hidden";
        viewReserves.className = "hidden";

    },

    changeView:(idViewOld,idViewNew)=>{
        idViewOld.className = "hidden";
        idViewNew.className = "toShow";
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
    dataRegister = arrayData;
});

$('#formLoginData').submit(function (e) {
    e.preventDefault();
    var arrayData = new Array();
    var data = $(this).serializeArray();
    data.forEach((item)=>{
        arrayData[item.name] = item.value;
    });
    dataLogin = arrayData;
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

