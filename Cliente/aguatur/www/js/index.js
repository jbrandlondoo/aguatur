
// son variables que se llenan luego de click ene le boton de enviar  dataRegister -- dataLogin -- dataUpdate

 // variables con los div padres
var panelRegisterLogin,login,register,home;
var reserveBody,homeBody,newsBody;
var dataRegister,dataLogin,dataUpdate;
var resumeBody,messageBody,viewReservesBody;
var benefits;
var dataReserve, dataMessage;
var qrCode;

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
        benefits = document.getElementById("benefits");
        newsBody = document.getElementById("newsBody");
        currentView = new Object();
        currentView.view = homeBody;
        currentView.btnsNavFooter = document.getElementById("btnFooter").children[0];
        currentView.indexBtnsNav = 0;
        //asignacion de eventos
        if(localStorage.getItem("sesion")){
            app.changeView(panelRegisterLogin,home);
             document.getElementById("btnHomeProfile").className = "visibiliBTN";
            document.getElementById("btnHomeOpNet").className = "visibiliBTN";
        }

        document.getElementById("initSesion").addEventListener("click",()=>{app.changeView(panelRegisterLogin,login)});
        document.getElementById("registerRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,register)});
        document.getElementById("initNotRegisteredRL").addEventListener("click",()=>{app.changeView(panelRegisterLogin,home)});
        document.getElementById("returnL").addEventListener("click",()=>{app.changeView(login,panelRegisterLogin)});
        document.getElementById("initNotRegisteredR").addEventListener("click",()=>{app.changeView(register,home)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});
        document.getElementById("cancelRegister").addEventListener("click",()=>{app.changeView(register,panelRegisterLogin)});
        document.getElementById("returnPRL").addEventListener("click",()=>{app.changeView(benefits,panelRegisterLogin)});
        document.getElementById('dateUp').min = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
        document.getElementById('dateUp').value = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];
        $('#makeRegister').attr('disabled','disabled');

        // $('#modalProfile').modal('show');
    },

    changeView:(idViewOld,idViewNew)=>{
        idViewOld.className = "hidden";
        idViewNew.className = "show";
    },

    changeViewHome:(idViewNew,idbutton)=>{
        if(!localStorage.getItem("sesion")) {
            if (!(homeBody == idViewNew)){
                app.changeView(home,login);
                return;
            }  
        }
        if (idbutton==2) {
            idbutton = document.getElementById("btnFooter").children[2];
        }
        if (idbutton==3) {
            idbutton = document.getElementById("btnFooter").children[3];
        }
        if (idbutton==0) {
            idbutton = document.getElementById("btnFooter").children[0];;
        }
        if (!(idViewNew == currentView.view)) {
            currentView.view.className = "hidden";
            idViewNew.className = "show";
            app.changeViewHomeButton(idbutton);
            currentView.view = idViewNew;
        }
    },
    changeViewHomeButton:(id)=>{
        currentView.btnsNavFooter.children[1].className = "hidden";
        currentView.btnsNavFooter.children[0].className = "show";
        id.children[0].className = "hidden";
        id.children[1].className = "show";
        currentView.btnsNavFooter = id;

    },
    viewBenefits:()=>{
        app.changeView(panelRegisterLogin,benefits);
    },
    setReserve:()=>{
        dataReserve = Array();
        dataReserve["entrada"]= new Date(document.getElementById("dateUp").value.replace("-",","));
        dataReserve["salida"]= new Date(document.getElementById("dateOut").value.replace("-",","));
        dataReserve["adultos"]= parseInt(document.getElementById("selectAdult").value);
        dataReserve["ninos"]= parseInt(document.getElementById("selectChildren").value);
        dataReserve["nochesRomantias"]= parseInt(document.getElementById("romanticNight").value);
        dataReserve["almuerzoPersona"]= parseInt(document.getElementById("lunch").value);
        dataReserve["decoracionNoche"]= parseInt(document.getElementById("rooDe").value);
        dataReserve["spa"]= parseInt(document.getElementById("spa").value);
        
        putReservation(dataReserve);
   
        app.changeViewHome(viewReservesBody,3);
        
    },
    setMessage:()=>{
        dataMessage = new Object;
        dataMessage["titulo"]=document.getElementById("messageSubjet").value;
        dataMessage["texto"]=document.getElementById("message").value;
        dataMessage["remitente"]=getSessionEmail();
        dataMessage["destinatario"]="Aguatur";
        dataMessage["fecha"]=new Date();

        sendMessage(dataMessage);
        
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

function getResumenReserve(){
    if (document.getElementById("dateOut").value == "") {
        document.getElementById('dateOut').className = "error";
    }else{
        addResumen();
        app.changeViewHome(resumeBody,2);
        document.getElementById('dateOut').className = "";
    }
}


function addResumen(){
    document.getElementById("textResumen").innerHTML = "<p>Fecha de ingreso "+document.getElementById("dateUp").value+" fecha de salida "+document.getElementById("dateOut").value+" para ("+document.getElementById("selectAdult").value+") adulto(s) y "+document.getElementById("selectChildren").value+" niño(s).<br><i class='description'>Alojamiento+Alimentación+Disfrute de las instalaciones</i></p>";
}