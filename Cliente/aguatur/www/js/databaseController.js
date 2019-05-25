var config;
var btnReg='';
var txtName, txtEmailAd, txtPass, txtVerPass;

window.onload = start;

function start(){
  //configuración base de datos
  config = databaseConfig();
  //agregación de elementos al home
  getHomeContent();
  //document.getElementById("loadingDiv").className = "hidden";
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
  let flag;
  db.collection("ImagenesHome")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          setHomeSlides(doc.data().URL);
        });
        flag = true;
    })
    .then(()=>{
      if (flag) {
      }else{
      }
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}

function getMessagePageContent(userEmail){
  let destinatario, remitente, completo;

  var array1 = ['a', 'b', 'c'];
  var array2 = ['d', 'e', 'f'];
  
  console.log(array1.concat(array2));

  remitente=getMessageData("Remitente",userEmail);
  destinatario=getMessageData("Destinatario",userEmail);
  
  console.log(remitente.concat(destinatario));
  completo = remitente.concat(destinatario);
  console.log(completo)

  
 
}
var ses, lel;
function getMessageData(tipo,userEmail){

  let list=[]  
  let db = firebase.firestore();  
 
  db.collection("Mensajes").where(tipo, "==", userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          console.log(doc.data())
          list.push(doc.data())
                         
       });
    }).then(()=>{
      console.log(list)
      return list;
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
        app.changeView(login,home);
        console.log("Se encontró, sesión guardada en almacenamiento");
      }
      else{
        console.log("No se encontró registro"); 
        document.getElementById("inputLoginMail").className = "inputFormFail inputForm"; 
        document.getElementById("inputLoginPass").className = "inputFormFail inputForm"; 
      }
    }

    )
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    }); 
   
}