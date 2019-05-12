var config;
var btnReg='';
var txtName, txtEmailAd, txtPass, txtVerPass;

window.onload = start;

function start(){
  //configuración base de datos
  config = databaseConfig();
  //agregación de elementos al home
  getHomeContent();
}

function putRegister(dataRegister){
  console.log("entré aquí nea >:V");
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
function getHomeContent(){
  var db = firebase.firestore();
 
  db.collection("ImagenesHome")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          
          setHomeSlides(doc.data().URL);
            
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
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