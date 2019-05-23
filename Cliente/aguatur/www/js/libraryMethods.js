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