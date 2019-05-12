var config;
var btnReg='';
var txtName, txtEmailAd, txtPass, txtVerPass;

window.onload = start;

function start(){
config = databaseConfig();
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
  var db = firebase.firestore()
    db.collection("Registrados").doc().set({
      Correo:dataRegister["email"],
      Nombre:dataRegister["name"],
      Password:dataRegister["password"]
    })
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo el documento: ",error)
    });
}


function findAccount(email, password){  
  var db = firebase.firestore();
  let data, flag;

   db.collection("Registrados").where("Correo","==", email).where("Password","==", password)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {            
            
            if(doc.exists){              
              data={
                id:doc.id,
                nombre:doc.data().Nombre,
                correo:doc.data().Correo,                                
            };
              flag = true;
            }                        
        });
    }).then(()=>{
      if(flag) {
        console.log("El id es: "+data.id, " y el nombre es:"+data.nombre);
        saveSession(data);
        console.log("Se encontró, sesión guardada en almacenamiento");

      }
      else{
        console.log("No se encontró registro");  
      }
    }

    )
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
   
}