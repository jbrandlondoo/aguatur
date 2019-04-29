var config;
var btnReg='';
var txtName, txtEmailAd, txtPass, txtVerPass;
var db;
window.onload = start;

function start(){
config = databaseConfig();
db = firebase.firestore()
initializeVariables();
events();

}


function databaseConfig(){
  var config = {
    apiKey: "AIzaSyCtpcRBqOevLcUyurpiLY4hAXS4tgkZc98",
    authDomain: "aguatur-b2f14.firebaseapp.com",
    databaseURL: "https://aguatur-b2f14.firebaseio.com",
    projectId: "aguatur-b2f14",
    storageBucket: "aguatur-b2f14.appspot.com",
    messagingSenderId: "786656154312"
  };
  firebase.initializeApp(config);
}

function initializeVariables(){

  btnReg = document.getElementById('makeRegister');
  
}

function events(){
  btnReg.addEventListener("click",putRegister);
}

function putRegister(){
  getTypedData();
  if(verifyData()){
    db.collection("Registrados").doc().set({
      Correo:txtEmailAd,
      Nombre:txtName,
      Password:txtPass
    })
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo a su mama: ",error)
    });
  }
  else{
    console.log("No envíado");
  }
}

function getRegisteredData(){
  
}

function getTypedData(){
  txtName = document.getElementById('regName').value;
  txtEmailAd = document.getElementById('regEmail').value;
  txtPass = document.getElementById('regPass').value;
  txtVerPass = document.getElementById('confSpace').value;
}

function verifyData(){
  if (verifyEmail(txtEmailAd)&&(txtPass.length>=6)&&(txtName.length>0)&&(txtPass.localeCompare(txtVerPass)==0)) return true;
  else return false;
}
function verifyEmail( email ) 
{
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}
