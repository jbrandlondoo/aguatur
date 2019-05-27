//Función para agregar el html necesario en el index para que se pongan las ímagenes
//de la página home
function setHomeSlides(URL){

    let p = setEAndCName("div", "card");
    let i = setEAndCName("img","imgHome");

    i.src=URL;
    p.appendChild(i);

    document.getElementById("slides").appendChild(p);
}
//Función para agregar el html necesario en el index para que se pongan los mensajes en la
//página de mensajes
function setMessages(idAttribute,message){


    if(document.getElementById(idAttribute)==null){

    let messageFather = setEAndCName("div","divMessage");
    messageFather.id = idAttribute;

    let divHead = setEAndId("div","headMessageList");

    let divDate = setEAndId("div","headMessageInfoDate");
    let date = setLabelAndContent(completeDateFormat(message.fecha));
    divDate.appendChild(date);

    let divStatus = setEAndId("div","headMessageInfoStatus");
    let state = (getSessionEmail()==message.remitente)?setLabelAndContent("Enviado"):setLabelAndContent("Recibido");
    divStatus.appendChild(state);
    
    divHead.appendChild(divDate);
    divHead.appendChild(divStatus);

    let divMessageTitle = setEAndId("div","subjectMessageList");
    let messageTitle= setLabelAndContent(message.titulo);
    
    divMessageTitle.appendChild(messageTitle);

    let divMessageText = setEAndId("div","messageList")
    let messageText = setParagraph(message.texto)

    divMessageText.appendChild(messageText);

    messageFather.appendChild(divHead);
    messageFather.appendChild(divMessageTitle);
    messageFather.appendChild(divMessageText);

    document.getElementById("messages").appendChild(messageFather);
    }

}
//Crea los elementos de reservas dada una lista de objetos reserva
function setReservationList(resList){


    resList.forEach(reserva => {
        if(document.getElementById(reserva.idDato+"-res")==null){
            let messageFather = setEAndCName("div","divReserves");
            messageFather.id = reserva.idDato+"-res";

            let headReserve = setEAndId("div","headReserves");
            let hearRInfo = setEAndId("div","headReserveInfo");
            let lab1 = setLabelAndContent(completeDateFormat(reserva.datos.fechaReserva));
            let lab2 = setLabelAndContent("   Guardada");

            hearRInfo.appendChild(lab1);
            hearRInfo.appendChild(lab2);

            let headREdit = setEAndId("div","headReserveEdit");
            let a = document.createElement("a");
            a.href="#";
            let labA = setLabelAndContent("Editar")
            a.appendChild(labA);
            headREdit.appendChild(a);

            headReserve.appendChild(hearRInfo);
            headReserve.appendChild(headREdit);

            let titleRes = setEAndId("div","titleReserve");
            let labTitle = setLabelAndContent("Reserva - "+completeDateFormat(reserva.datos.fechaEntrada));
            titleRes.appendChild(labTitle);

            let resDiv = setEAndId("div","reserve");
            let labContent = setLabelAndContent("neaaa jajaja")
            resDiv.appendChild(labContent);

            messageFather.appendChild(headReserve);
            messageFather.appendChild(titleRes);
            messageFather.appendChild(resDiv);

            document.getElementById("reserves").appendChild(messageFather);
        }
        
    });
        
    }
//Imprime las reservas en el contenedor de reservas
 function printReservation(){
  a = getReservation(getSessionId());
  a.then(resp=>{
    if(resp.length > 0){
      setReservationList(resp);
    }else{
      console.log("No se recibió nada")
    }
  })
}   
//Crea un elemento y le agrega el nombre de una clase
function setEAndCName(element, className){

    let e= document.createElement(element);
    e.className=className;
    return e;
}
//Crea un elemento y le agrega el nombre de id
function setEAndId(element, id){

    let e= document.createElement(element);
    e.id=id;
    return e;
}

//Crea un label con contenido dentro
function setLabelAndContent(content){
    let l=document.createElement("label");
    l.textContent=content;
    return l;
}
//Crea un parrafo con contenido dentro
function setParagraph(content){
    let p=document.createElement("p");
    p.textContent=content;
    return p;
}
//
function graphQrCode(){
    if(document.getElementById("qr")!=null)document.getElementById("qr").remove();
    let q = document.createElement("div");
    q.id = "qr";
    document.getElementById("codeQr").appendChild(q);
    makeQrCode(getSessionId());
}
//Funcion para eliminar todos los hijos dado el id de un elemento
function deleteChild(fatherElement){
    var e = document.getElementById(fatherElement);                 
        var child = e.lastElementChild;  

        while (child) { 
            e.removeChild(child); 
            child = e.lastElementChild; 
        }
}