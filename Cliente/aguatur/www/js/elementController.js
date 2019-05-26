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
console.log(message,"id:", idAttribute);
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