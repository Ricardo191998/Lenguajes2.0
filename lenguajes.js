
var produccionAceptada = {valor : "" , producciones : []};
var listaDeNoTerminales = [];

//creando el constructor de la clase produccionAceptada

function ProduccionAceptada(valor){
       this.valor  = valor;
       this.producciones = []
}


function agregarPalabra(lugarNP, produccion){   //Al presionar el botón de + a lado de la casilla de palabras se realiza esta función para abrir una nuva casilla de input y crear una nueva palabra
    var botonSigProduccion = document.getElementById('sigProduccion');
    var botonTerminarProduccion = document.getElementById('terminarProducciones');
    var produccionIngresada = document.createElement("h3");
    if(produccion.value == ''){
        produccionIngresada.innerHTML = "ε |";
        lugarNP.appendChild(produccionIngresada);
        if(typeof lugarNP.firstChild.nextSibling.firstChild.value == "string"){
            agregarProduccionesObjetos(lugarNP.firstChild.nextSibling.firstChild.value, "ε" );
        }else{
            agregarProduccionesObjetos(lugarNP.firstChild.firstChild.value,"ε") ;
        }
    }else{
        var valorP = produccion.value;
        produccion.value = "";
        produccionIngresada.innerHTML = "   " + valorP +" | ";
        lugarNP.appendChild(produccionIngresada);  
        if(typeof lugarNP.firstChild.nextSibling.firstChild.value == "string"){
            agregarProduccionesObjetos(lugarNP.firstChild.nextSibling.firstChild.value, valorP );
        }else{
            agregarProduccionesObjetos(lugarNP.firstChild.firstChild.value,valorP) ;
        }
         
    }
}

function agregarNT(noTerminal){   //Cuando se presiona el boton con signo (+), por medio des esta función se crean nuevos noTerminales o producciones
    console.log(noTerminal.value);
    if(noTerminal.value == noTerminal.value.toLowerCase() || "number" == typeof noTerminal || noTerminal.value == '' || noTerminal.value.length > 1){
        alert("Ingresa una letra mayuscula");
    }else if(recorrerListaNT(noTerminal.value)){
        alert("Ingresa un elemento que no se repita");
    }else{
        noTerminal.disabled = true;
        var lugar = document.getElementById("nuevos-terminales");
        listaDeNoTerminales.push(new ProduccionAceptada(noTerminal.value));
        agregarProducciones(lugar)  
        console.log(listaDeNoTerminales);  
    }
}

function agregarProducciones(span){
    var siguienteNT = document.getElementById("SiguienteNT");
    var divBoton = document.getElementById("botones"); 
    var nuevosNT = document.createElement("button");
    var contenidoSigProduccion = document.createElement("div");
    var barra = document.createElement("ul");
    var li_noTerminalSig = document.createElement("li");
    var li_flecha = document.createElement("li");
    var noTerminalSig = document.createElement("input");
    var flecha = document.createElement("h3");
    var produccionSig = document.createElement("input");
    var botonesPalabraSig = document.createElement("button");
    var botonesPalabraTer = document.createElement("button");
    
    //Funcion para los nuevos botones y reasignación para los ya creados
    
    botonesPalabraSig.addEventListener("click", ()=>{
        agregarPalabra(barra,produccionSig); 
    });
    
    nuevosNT.addEventListener("click", ()=>{    //
        agregarNT(noTerminalSig);
    });
    
    if (siguienteNT !=null){
        siguienteNT.remove();
        divBoton.appendChild(nuevosNT);
     }
    

    //Asignando valores a las nuevas etiquetas
    flecha.innerHTML = "--->";
    botonesPalabraSig.innerHTML = "+";
    botonesPalabraTer.innerHTML = "terminal";
    nuevosNT.innerHTML = "+";
    
    //Agregando las etiquetas al la barra 
    li_noTerminalSig.appendChild(noTerminalSig);
    li_flecha.appendChild(flecha);
    
    barra.appendChild(li_noTerminalSig);
    barra.appendChild(li_flecha);
    
    
    //Agregando las etiquetas al div de las producciones
    contenidoSigProduccion.appendChild(barra);
    contenidoSigProduccion.appendChild(produccionSig);
    contenidoSigProduccion.appendChild(botonesPalabraSig);
    contenidoSigProduccion.appendChild(botonesPalabraTer);
    
    //Estilos de las etiquetas 
    barra.style.display = "flex";
    barra.style.listStyle= "none";
    contenidoSigProduccion.style.display = "flex";
    li_flecha.style.padding = "0px 10px";
    li_noTerminalSig.style.padding = "0px 10px";
    
    //agregando el contenido al div del nuevo no Terminal 
    span.appendChild(contenidoSigProduccion);
    
}


function recorrerListaNT(noTerminal){  
    if(listaDeNoTerminales.length == 0){
        return false;
    }
    for(var i = 0 ; i < listaDeNoTerminales.length; i++ ){
        if(listaDeNoTerminales[i].valor == noTerminal){
           return true;
        }
    }
    return false;
}

function agregarProduccionesObjetos(noTerminal, nuevaProduccion){ //Agrega a la lista de producciones la nueva producción
    for(var i = 0 ; i < listaDeNoTerminales.length; i++ ){
        if(listaDeNoTerminales[i].valor == noTerminal){
           listaDeNoTerminales[i].producciones.push(nuevaProduccion);
        }
    }
}