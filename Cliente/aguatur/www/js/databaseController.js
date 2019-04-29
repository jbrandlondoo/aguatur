var config;
var btnReg='';
var txtName, txtEmailAd, txtPass, txtVerPass;
var db;
//window.onload = start;

function start(){
config = databaseConfig();
db = firebase.firestore()
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

function putRegister(dataRegister){
    db.collection("Registrados").doc().set({
      Correo:dataRegister["email"],
      Nombre:dataRegister["name"],
      Password:dataRegister["password"]
    })
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo a su mama: ",error)
    });
}
