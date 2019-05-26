function saveSession(dataItem){
    localStorage.setItem("sesion",JSON.stringify(dataItem));
    document.getElementById("btnHomeProfile").className = "visibiliBTN";
    document.getElementById("btnHomeOpNet").className = "visibiliBTN";

}
function closeSession(){
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