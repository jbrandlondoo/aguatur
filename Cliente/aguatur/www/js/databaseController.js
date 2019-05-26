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
  
    getMessageData("remitente",userEmail);
    getMessageData("destinatario",userEmail);
 
}
//Método para obtener un listado demensajes dado si se requiere de el remitente
//o de el destinatario, también se requiere del email
function getMessageData(tipo,userEmail){

  let db = firebase.firestore();  
 
  db.collection("Mensajes").where(tipo, "==", userEmail)
    .onSnapshot(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {     
        setMessages(doc.id,doc.data())           
     });
  }),(function(error) {
       console.log("Error getting documents: ", error);
   });    

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

//Función para hacer una reserva dado un objeto de reserva
function putReservation(reservationObj){

  reservationObj.total = 10000;
  let db = firebase.firestore()

    db.collection("Reservas").doc().set({
      idCliente:getSessionId(),
      fechaReserva:new Date(),
      fechaEntrada:reservationObj.entrada,
      fechaSalida:reservationObj.salida,
      adultos:reservationObj.adultos,
      ninos:reservationObj.ninos,
      almuerzos:reservationObj.almuerzoPersona,
      decoracionNoche:reservationObj.decoracionNoche,
      nocheRomantica:reservationObj.spa
    })
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo el documento: ",error)
    });

}
//Esta función permite enviar un mensaje dado un objeto mensaje
function sendMessage(messageData){
  let db = firebase.firestore()

    db.collection("Mensajes").doc().set(messageData)
    .then(function(){
      console.log("Documento esctrito")
    })
    .catch(function(error){
      console.error("Error escribiendo el documento: ",error)
    });
}