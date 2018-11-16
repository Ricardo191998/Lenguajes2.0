
var produccionAceptada = {valor : "" , producciones : []};
var listaDeNoTerminales = [];

//creando el constructor de la clase produccionAceptada

function ProduccionAceptada(valor){
       this.valor  = valor;
       this.producciones = []
}


function agregarProduccion(lugarNP, produccion){   //Al presionar el botón de + a lado de la casilla de producciones se realiza esta función para crear una nuva casilla de input 
    console.log("hello");
    var botonSigProduccion = document.getElementById('sigProduccion');
    var botonTerminarProduccion = document.getElementById('terminarProducciones');
    var produccionIngresada = document.createElement("h3");
    console.log(produccion.value); 
    if(produccion.value == ''){
        produccionIngresada.innerHTML = "ε |";
        lugarNP.appendChild(produccionIngresada);
         
        /* if(typeof lugarNP.firstChild.nextSibling.firstChild.value == "string"){
            agregarProduccion(lugarNP.firstChild.nextSibling.firstChild.value, "ε" );
        }else{
            agregarProduccion(lugarNP.firstChild.firstChild.value,"ε") ;
        }*/
    }else{
        var valorP = produccion.value;
        produccion.value = "";
        produccionIngresada.innerHTML = "   " + valorP +" | ";
        lugarNP.appendChild(produccionIngresada);  
        /*if(typeof lugarNP.firstChild.nextSibling.firstChild.value == "string"){
            agregarProduccion(lugarNP.firstChild.nextSibling.firstChild.value, valorP );
        }else{
            agregarProduccion(lugarNP.firstChild.firstChild.value,valorP) ;
        }*/
         
    }
}

function agregarNT(noTerminal){
    if(noTerminal.value == noTerminal.value.toLowerCase() || "number" == typeof noTerminal || noTerminal.value == '' || noTerminal.value.length > 1){
        alert("Ingresa una letra mayuscula");
    }else if(recorrerListaNT(noTerminal.value)){
        alert("Ingresa un elemento que no se repita");
    }else{
        noTerminal.disabled = true;
        var lugar = document.getElementById("nuevos-terminales");
        var produccion1 = new ProduccionAceptada(noTerminal.value);
        listaDeNoTerminales.push(produccion1);
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
    var botonesProduccionSig = document.createElement("button");
    var botonesProduccionTer = document.createElement("button");
    
    //Funcion para los nuevos botones y reasignación para los ya creados
    
    botonesProduccionSig.addEventListener("click", ()=>{
        agregarProduccion(barra,produccionSig); 
    });
    
    nuevosNT.addEventListener("click", ()=>{
        agregarNT(noTerminalSig);
    });
    
    if (siguienteNT !=null){
        siguienteNT.remove();
        divBoton.appendChild(nuevosNT);
     }
    

    //Asignando valores a las nuevas etiquetas
    flecha.innerHTML = "--->";
    botonesProduccionSig.innerHTML = "+";
    nuevosNT.innerHTML = "+";
    botonesProduccionTer.innerHTML = "terminal";
    
    //Agregando las etiquetas al la barra 
    li_noTerminalSig.appendChild(noTerminalSig);
    li_flecha.appendChild(flecha);
    
    barra.appendChild(li_noTerminalSig);
    barra.appendChild(li_flecha);
    
    contenidoSigProduccion.appendChild(barra);
    contenidoSigProduccion.appendChild(produccionSig);
    contenidoSigProduccion.appendChild(botonesProduccionSig);
    contenidoSigProduccion.appendChild(botonesProduccionTer);
    
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

function agregarProducciones(noTerminal, nuevaProduccion){
    for(var i = 0 ; i < listaDeNoTerminales.length; i++ ){
        if(listaDeNoTerminales[i].valor == noTerminal){
           listaDeNoTerminales[i].produccion.push(nuevaProduccion);
        }
    }
}

function validarNT(noTerminal){
    
}