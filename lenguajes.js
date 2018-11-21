//Script Recibe elementos del usuario y contiene los algoritmos para convertir gramaticas impropias a propias


var produccionAceptada = {valor : "" , producciones : []}; //Producciones con sus respectivas palabras
var listaDeNoTerminales = []; //Lista de objetos ingresados por el usuario
var inputNt = [];
var noTerminalesli = []; //Lista final de NT
var produccionesH3 = []; //
var alfabeto = []; //lista con la palabras del alfabeto
var c = 0;  //contador, util para asignar palabras a sus producciones correspondientes

//creando el constructor de la clase produccionAceptada

function ProduccionAceptada(valor){
       this.valor  = valor;
       this.producciones = []
}


//Al presionar el boton de terminar obtienen la Gramática

function obtenerGramatica(){
    console.log("A"=="a");
    if(listaDeNoTerminales.length == 0){ 
       alert('No has ingresado ninguna producción');
       return;
    }
    else{
        
        //Declarando variables para la nueva visualización
        var contenido = document.getElementById("contenido");
        var body_programa = document.getElementById("body_programa");
        var divGramatica = document.createElement("div");
        var botonConvertir = document.createElement("button");
        
        //Atributos del Boton

        botonConvertir.innerHTML = "Convertir";
        botonConvertir.style.padding = "150px 0px";
        botonConvertir.addEventListener('click',()=>{
             eliminacionSimbolosMuertos(listaDeNoTerminales.length);
        });

        //Eliminamos las entradas
        contenido.remove();
        

        //Creando elementos para el front 
        for(var i =0 ; i < 4;i++){
        var h3 = document.createElement("h3");
        h3.style.padding = '30px 100px';
        switch(i){
            case 0 :
                h3.innerHTML = 'S  =  {' + listaDeNoTerminales[0].valor + '}';
            break;
            case 1 :
                obtenerListaNT();
                h3.innerHTML = 'NT =  {' + noTerminalesli + '}';
                break;
            case 2 :
                obtenerAlfabeto();
                h3.innerHTML = '∑  =  {'+ alfabeto + '}';
                break;
            case 3 : 
                var divProducciones = document.createElement('div');
                var producciones1 = document.createElement('h3');
                var producciones3 = document.createElement('h3');
                producciones1.innerHTML = 'P : { ';
                producciones3.innerHTML = '}';
                divProducciones.appendChild(producciones1);
                for(var n = 0 ; n < listaDeNoTerminales.length ; n++){
                        var producciones2 = document.createElement('h3');
                        producciones2.innerHTML = listaDeNoTerminales[n].valor + '--->' + listaDeNoTerminales[n].producciones;
                        divProducciones.appendChild(producciones2); 
                } 
                divProducciones.appendChild(producciones3);
                divProducciones.style.padding = '30px 100px';
                divGramatica.appendChild(divProducciones);
                break;     
        }
        //Agregamos los resultados a una nueva visualización de la pantalla. 
        divGramatica.appendChild(h3);
        }
        divGramatica.appendChild(botonConvertir);
        body_programa.appendChild(divGramatica);
    }
}


//Al presionar el botón de + a lado de la casilla de palabras se realiza esta función para abrir una nuva casilla de input y crear una nueva palabra
function agregarPalabra(lugarNP, produccion){   
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

//Cuando se presiona el boton con signo (+), por medio des esta función se crean nuevos noTerminales o producciones
function agregarNT(noTerminal){   
    //console.log(noTerminal.value);
    if(noTerminal.value == noTerminal.value.toLowerCase() || "number" == typeof noTerminal || noTerminal.value == '' || noTerminal.value.length > 1){
        alert("Ingresa una letra mayuscula");
        if(c!=0){c--};
    }else if(recorrerListaNT(noTerminal.value)){
        alert("Ingresa un elemento que no se repita");
        c--;
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
    
    //Asignando una lista para los input de NT

    inputNt.push(noTerminalSig);

    //Funcion para los nuevos botones y reasignación para los ya creados
    
    botonesPalabraSig.addEventListener("click", ()=>{
        agregarPalabra(barra,produccionSig); 
    });
    
    nuevosNT.addEventListener("click", ()=>{    //
        agregarNT(inputNt[c]);
        c++;
    });
    

    if (siguienteNT !=null){
        siguienteNT.remove();
        divBoton.appendChild(nuevosNT);
     }
    

    //Asignando valores a las nuevas etiquetas
    flecha.innerHTML = "--->";
    botonesPalabraSig.innerHTML = "+";
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

function obtenerListaNT(noTerminal){  
    for(var i = 0 ; i < listaDeNoTerminales.length; i++ ){
        noTerminalesli.push(listaDeNoTerminales[i].valor);
    }
}

function obtenerAlfabeto(){

    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
         for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
             for(var k = 0 ; k <  listaDeNoTerminales[i].producciones[n].length ; k++){
                 if(listaDeNoTerminales[i].producciones[n][k]== listaDeNoTerminales[i].producciones[n][k].toLowerCase()){
                     alfabeto.push(listaDeNoTerminales[i].producciones[n][k]);
                 }  
             } 
        /* listaDeNoTerminales[i].producciones[n].forEach(element => {
             console.log(element);
             if(element == element.toLowerCase()){
                alfabeto.push(element);
             }
         });*/
       }
    }
    alfabeto.sort();
    for(n= 0; n < alfabeto.length; n++){
        if(n>0){
            if(alfabeto[n]==alfabeto[n-1]){
                alfabeto.splice(n,1);
                n = n-1;
            }
        }
    }
}

//Algoritmos que convierten la gramática impropia a propia 


//Funcion que elimina los ímbolos inútiles 
function eliminacionSimbolosMuertos(tamanioProducciones){
    //recorrerPalabras(eliminacionSimbolosMuertos1);
    c = 0;

    //Eliminando Símbolos muertos tipo 1 
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            for(var k = 0 ; k <  listaDeNoTerminales[i].producciones[n].length ; k++){
                if(listaDeNoTerminales[i].producciones[n][k] == listaDeNoTerminales[i].producciones[n][k].toUpperCase()){
                    if(recorrerListaNT(listaDeNoTerminales[i].producciones[n][k]) || listaDeNoTerminales[i].producciones[n][k] == listaDeNoTerminales[i].producciones[n][k].toLowerCase){
                    }else{
                        listaDeNoTerminales[i].producciones.splice(n, 1)
                        if(n!=0){
                             n = n-1;    
                        }
                    }
                 }
            }
        }
    }

    //Eliminando Símbolos muertos tipo 2 
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            for(var k = 0 ; k <  listaDeNoTerminales[i].producciones[n].length ; k++){
                if(listaDeNoTerminales[i].producciones[n][k] == listaDeNoTerminales[i].producciones[n][k].toUpperCase()){
                    if(listaDeNoTerminales[i].producciones[n][k]==listaDeNoTerminales[i].valor){
                       c++;
                    }
                }
            }
        }
        if(c == listaDeNoTerminales[i].producciones.length){
            listaDeNoTerminales.splice(i,1);
            if(i!=0){
                i--;
                c=0;
            }
        }
    }
    console.log(listaDeNoTerminales);
    if(listaDeNoTerminales.length<tamanioProducciones){
        eliminacionSimbolosMuertos(listaDeNoTerminales.length);
    }
    //obtenerGramatica();
}




//-----------------------------------
/*
function recorrerPalabras(funcion){
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            for(var k = 0 ; k <  listaDeNoTerminales[i].producciones[n].length ; k++){
                 n = funcion(listaDeNoTerminales[i].producciones[n][k] ,i, n);
            }
        }
    }
}

var eliminacionSimbolosMuertos1 = function(simbolo,i,n ){
    if(simbolo== simbolo.toUpperCase()){
        if(recorrerListaNT(simbolo)){
        }else{
            listaDeNoTerminales[i].producciones.splice(n, 1)
            if(n!=0){
                n = n-1;
                return n ;
            }
        }
     }
}
*/
//-------------------------------------

/*
var n = 0;

function recorrerNT(simbolo, n){
    if(listaDeNoTerminales.length  == n){
        return;
    }else{
        recorrePalabras(simbolo,listaDeNoTerminales[n]);
        recorrerNT(noTerminal(simbolo,n+1));
    }
}

var k = 0;

function recorrerPalabras(simbolo,noTerminal){
    if(noTerminal.producciones.length == k){
        return; 
    }else{
        recorrerSimbolos(noTerminal.producciones[k]);
        recorrerPalabras(noTerminal, k + 1);
    }
} 
var i = 0;
function recorrerSímbolo(palabra, i){

}
*/

function eliminacionSimbolosInaccesibles(){
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            for(var k = 0 ; k <  listaDeNoTerminales[i].producciones[n].length ; k++){
                

                
            }
        }
    }
}

function eliminacionProduccionesVacias(){

}

function eliminacionSimbolosUnitarios(){

}

