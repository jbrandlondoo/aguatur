
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
        document.getElementById("initNotRegisteredRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,home)});
        document.getElementById("returnL").addEventListener("click",()=>{app.changeView(login,panelRegisterLogin)});
        document.getElementById("initNotRegisteredR").addEventListener("click",()=>{app.changeView(register,home)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});

        $('#makeRegister').attr('disabled','disabled');
        // $('#modalProfile').modal('show');
    },

    changeView:(idViewOld,idViewNew)=>{
        idViewOld.className = "hidden";
        idViewNew.className = "show";
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


// arreglar


function diaSemana(dia,mes,anio){
    var dias=["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
    var dt = new Date(mes+' '+dia+', '+anio+' 12:00:00');
    console.log( "Dia de la semana : " + dias[dt.getUTCDay()]);    
};