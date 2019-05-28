
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
        width: 95,
        height: 95,
        colorDark : "#ffffff",
        colorLight : "#117abf",
        correctLevel : QRCode.CorrectLevel.H
    });
    
    
}
//Formato de fecha para reservas
function reserveDate(dateObject){    
    let options = {weekday:'long',day:'numeric',month:'short', year:'numeric'};
    return dateObject.toLocaleDateString("es-CO",options);   
}
function daysBetween( date1, date2 ) {    
    var one_day=1000*60*60*24;
    var difference_ms = date2.getTime() -date1.getTime();          
    return Math.round(difference_ms/one_day); 
  }