
//Método para dar formato a la fecha en el listado de mensajes
function completeDateFormat(dateObject){
    let fechaCompleta;
    //Fri May 10 2019 00:00:00 GMT-0500 (hora estándar de Colombia)
    let options = { weekday: 'short'};
    let dia = dateObject.toLocaleDateString("es-CO", options);
    dia = dia.charAt(0).toUpperCase() + dia.slice(1);
    let fecha = dateObject.format('dd/mm/yyyy');    
    fechaCompleta = dia.concat(fecha);
     
return fechaCompleta = fechaCompleta.replace(".",", ");
}
//Método para cear un código QR
function makeQrCode(texto){

    new QRCode("qr", {
        text: texto,
        width: 94,
        height: 94,
        colorDark : "#ffffff",
        colorLight : "#117abf",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    
}