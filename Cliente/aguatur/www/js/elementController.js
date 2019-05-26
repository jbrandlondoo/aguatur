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
function setMessages(message){

    let messageFather = setEAndCName("div","divMessage");

    let divDate = setEAndId("div","headMessageList");
    let date = setLabelAndContent(completeDateFormat(message.Fecha));
    let state = (getSessionEmail()==message.Remitente)?setLabelAndContent("Enviado"):setLabelAndContent("Recibido");
    
    divDate.appendChild(date);
    divDate.appendChild(state);

    let divMessageTitle = setEAndId("div","subjectMessageList");
    let messageTitle= setLabelAndContent(message.Titulo);
    
    divMessageTitle.appendChild(messageTitle);

    let divMessageText = setEAndId("div","messageList")
    let messageText = setParagraph(message.Texto)

    divMessageText.appendChild(messageText);

    messageFather.appendChild(divDate);
    messageFather.appendChild(divMessageTitle);
    messageFather.appendChild(divMessageText);

    document.getElementById("messages").appendChild(messageFather);

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
