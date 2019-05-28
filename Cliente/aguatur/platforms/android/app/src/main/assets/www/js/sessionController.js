function saveSession(dataItem){
    localStorage.setItem("sesion",JSON.stringify(dataItem));
    getMessagePageContent(getSessionEmail());
    graphQrCode(getSessionId());
    printReservation();
    printSessionData();
    document.getElementById("btnHomeProfile").className = "visibiliBTN";
    document.getElementById("btnHomeOpNet").className = "visibiliBTN";

}
function closeSession(){ 
    deleteChild("codeQr")
    deleteChild("messages");
    deleteChild("reserves");   
    localStorage.clear();
}
function getSessionEmail(){
    a = JSON.parse(localStorage.getItem("sesion"));
    return a.correo;
}
function getSessionId(){
    a = JSON.parse(localStorage.getItem("sesion"));
    return a.id;
}
function getSessionPassword(){
    a = JSON.parse(localStorage.getItem("sesion"));
    return a.password;
}
function getSessionPhone(){
    a = JSON.parse(localStorage.getItem("sesion"));
    if(a.phone=="") return a.phone;
    if(a.phone==undefined) return "";
    return a.phone;
}
function getSessionName(){
    a = JSON.parse(localStorage.getItem("sesion"));
    return a.nombre;
}
function printSessionData(){
    document.getElementsByClassName("inputEditProfile")[0].value=getSessionName();
    document.getElementsByClassName("inputEditProfile")[1].value=getSessionPhone();
    document.getElementsByClassName("inputEditProfile")[2].value=getSessionEmail();
    document.getElementsByClassName("inputEditProfile")[3].value=getSessionPassword();
}