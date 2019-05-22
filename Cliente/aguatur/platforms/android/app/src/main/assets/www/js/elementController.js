function setHomeSlides(URL){

    let p = setEAndCName("div", "card");
    let i = setEAndCName("img","imgHome");

    i.src=URL;
    p.appendChild(i);

    document.getElementById("slides").appendChild(p);
}

function setEAndCName(element, className){

    let e= document.createElement(element);
    e.className=className;
    return e;
}

