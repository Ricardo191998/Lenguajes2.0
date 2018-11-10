
alert("Bienvenido a la página!");

var produccionAceptada = "";
produccionAceptada.valor = ""; 
produccionAceptada.producciones = [];

var listaDeProducciones = [];

function agregarProduccion(){
    var produccion = document.getElementById('produccion');
    var botonSigProduccion = document.getElementById('sigProduccion');
    var botonTerminarProduccion = document.getElementById('terminarProducciones');
    var lugarNP = document.getElementById("contProduccion");
    var produccionSig =  document.createElement("input");
    var li_produccionSig =  document.createElement("li");
    li_produccionSig.appendChild(produccionSig);
    lugarNP.appendChild(li_produccionSig);
}

function agregarNT(){
    var noTerminal = document.getElementById('noTerminales');
    var botonSigNT = document.getElementById('SiguienteNT');
    console.log(noTerminal.value);
    if(noTerminal.value == noTerminal.value.toLowerCase() || "number" == typeof noTerminal){
        alert("Ingresa una letra mayuscula");
    }else{
        var lugar = document.getElementById("nuevos-terminales");
        agregarProducciones(lugar)    
    }
}

function agregarProducciones(span){
    var barra = document.createElement("ul");
    var li_noTerminalSig = document.createElement("li");
    var li_flecha = document.createElement("li");
    var li_produccionSig = document.createElement("li");
    var li_botonesProduccion = document.createElement("li");
    var noTerminalSig = document.createElement("input");
    var flecha = document.createElement("h3");
    var produccionSig = document.createElement("input");
    var botonesProduccionSig = document.createElement("button");
    var botonesProduccionTer = document.createElement("button");
    flecha.innerHTML = "--->";
    botonesProduccionSig.innerHTML = "+";
    botonesProduccionTer.innerHTML = "terminal";
    li_noTerminalSig.appendChild(noTerminalSig);
    li_flecha.appendChild(flecha);
    li_produccionSig.appendChild(produccionSig);
    li_botonesProduccion.appendChild(botonesProduccionSig);
    li_botonesProduccion.appendChild(botonesProduccionTer);
    li_botonesProduccion.style.padding = "0px 10px" ;
    li_flecha.style.padding = "0px 10px";
    li_noTerminalSig.style.padding = "0px 10px";
    li_produccionSig.style.padding = "0px 10px";
    barra.appendChild(li_noTerminalSig);
    barra.appendChild(li_flecha);
    barra.appendChild(li_produccionSig);
    barra.appendChild(li_botonesProduccion);
    barra.style.display = "flex";
    barra.style.listStyle= "none";
    span.appendChild(barra);
}
