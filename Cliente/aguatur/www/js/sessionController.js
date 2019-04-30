function saveSession(){
    let data={
        id:null,
        nombre:0,
        correo:0,
        contraseña:0
    };

    localStorage.setItem("sesion",JSON.stringify(data));
}