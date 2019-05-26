var config;

window.onload = start;

function start(){
  //configuración base de datos
  config = databaseConfig();
  //agregación de elementos al home
  getHomeContent();
  //document.getElementById("loadingDiv").className = "hidden";
}

//Funcion para hacer el registro de la persona en la aplicación
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
//Función para obtener las imagenes del slide del home desde la BD
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
//Método para obtener la visualización de los mensajes en la pagina de mensajes
function getMessagePageContent(userEmail){
  let destinatario=[], remitente, completo;
  
  new Promise(function(resolve, reject) {
    remitente=getMessageData("Remitente",userEmail);
    destinatario=getMessageData("Destinatario",userEmail);  
    resolve(remitente.concat(destinatario))
  
  }).then(function(result) { // (**)

    alert(result); // 1    
  
  }); 
 
}
//Método para obtener un listado demensajes dado si se requiere de el remitente
//o de el destinatario, también se requiere del email
function getMessageData(tipo,userEmail){

  let list=[]  
  let db = firebase.firestore();  
 
  db.collection("Mensajes").where(tipo, "==", userEmail)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          list.push(doc.data())             
       });
    }) 
   .catch(function(error) {
       console.log("Error getting documents: ", error);
   });    
return list;
}

//Función para iniciar sesión, se requiere de el email y la contraseña del usuario
//Este método también lleva a la pantalla de inicio y guarda los datos de usuario
//En el localstorage
function findAccount(email, password){  
  let db = firebase.firestore();
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

//Función para hacer una reserva dada las fechas
function putReservation(reservationObj){
//Ejemplo de objeto
  /* a = {id:"12b12bnb3",
        entrada:new Date(2019,05,23),
        salida:new Date(2019,05,26),
        adultos:2,
        ninos:1,
        total:100000}
*/
  let db = firebase.firestore()

    db.collection("Reservas").doc().set({
      IdCliente:getSessionId(),
      FechaEntrada:reservationObj.entrada,
      FechaSalida:reservationObj.salida,
      Adultos:reservationObj.adultos,
      Ninos:reservationObj.ninos,
      Total:reservationObj.total
    })
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo el documento: ",error)
    });

}