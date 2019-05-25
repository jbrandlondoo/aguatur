
function setHomeSlides(URL){

    let p = setEAndCName("div", "card");
    let i = setEAndCName("img","imgHome");

    i.src=URL;
    p.appendChild(i);

    document.getElementById("slides").appendChild(p);
}

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

function setEAndCName(element, className){

    let e= document.createElement(element);
    e.className=className;
    return e;
}

function setEAndId(element, id){

    let e= document.createElement(element);
    e.id=id;
    return e;
}

function setLabelAndContent(content){
    let l=document.createElement("label");
    l.textContent=content;
    return l;
}

function setParagraph(content){
    let p=document.createElement("p");
    p.textContent=content;
    return p;
}
