var config;

window.onload = start;

function start(){
  //configuración base de datos
  config = databaseConfig();
  //agregación de elementos al home
  getHomeContent();
  
  setTimeout(()=>{
    if(localStorage.getItem("sesion")){
            app.changeView(loadingDiv,home);
            document.getElementById("btnHomeProfile").className = "visibiliBTN";
            document.getElementById("btnHomeOpNet").className = "visibiliBTN";
      }else{
          app.changeView(loadingDiv,panelRegisterLogin);
      }
  }, 1500);
  if(localStorage.getItem("sesion"))getMessagePageContent(getSessionEmail());
  if(localStorage.getItem("sesion"))getReservationPageContent();
  if(localStorage.getItem("sesion"))printSessionData();
  if(localStorage.getItem("sesion"))graphQrCode(getSessionId());
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
        setMessages(doc.id,doc.data(),1)           
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
                password:doc.data().Password,
                phone:doc.data().Phone                                
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
  
  let db = firebase.firestore()

    db.collection("Reservas").doc().set(reservationObj)
    .then(function(){
      
      console.log("Documento esctrito")
      setReservationList([{idDato:(new Date).getTime().toString(),datos:reservationObj}],0);
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
function getReservation(id){
  
  return new Promise((resolve, reject)=>{
    let list=[];
    let db = firebase.firestore();  
   
    db.collection("Reservas").where("idCliente", "==", id)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {     
    
          list.push({datos:doc.data(),idDato:doc.id});       

       });     
        resolve(list);
    }),(function(error) {
         console.log("Error getting documents: ", error);
         resolve(list);
     }) 

  });  
}
function getReservationPageContent(){
  a = getReservation(getSessionId(),1);
  a.then(resp=>{
    if(resp.length > 0){
		setReservationList(resp);
    }else{
			console.log("no recibi ni chimba")
    }
  })
}
function profileModify(profObject,id){
  let db = firebase.firestore(); 
  db.collection("Registrados").doc(id).update(profObject)
  .then(function() {
    console.log("Document successfully written!");
})
.catch(function(error) {
    console.error("Error writing document: ", error);
});
}
/*function getMessageDataV2(tipo,userEmail){
  
  return new Promise((resolve, reject)=>{
    let list=[];
    let db = firebase.firestore();  
   
    db.collection("Mensajes").where(tipo, "==", userEmail)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {     
    
          list.push({datos:doc.data(),idDato:doc.id});       

       });
        resolve(list);
    }),(function(error) {
         console.log("Error getting documents: ", error);
         resolve(list);
     }) 

  });  

}*/