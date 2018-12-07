
//Script Recibe elementos del usuario y contiene los algoritmos para convertir gramaticas impropias a propias

var produccionAceptada = {valor : "" , producciones : []}; //Producciones con sus respectivas palabras
var listaDeNoTerminales = []; //Lista de objetos ingresados por el usuario
var inputNt = [];
var noTerminalesli = []; //Lista final de NT
var produccionesH3 = []; //
var alfabeto = []; //lista con la palabras del alfabeto
var c = 0 , q = 0;  

function ProduccionAceptada(valor){
       this.valor  = valor;
       this.producciones = []
}


//Al presionar el boton de terminar obtienen la Gramática

function obtenerGramatica(){
    if(listaDeNoTerminales.length == 0){ 
       alert('No has ingresado ninguna producción');
       location.reload();
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

        console.log(q);
        botonConvertir.addEventListener('click',()=>{
            if(q == 0 || q == 4){
                q++;
                eliminacionSimbolosMuertos(listaDeNoTerminales.length);
            }else if(q ==1 || q == 5){
                q++;
                if(listaDeNoTerminales.length>1){
                    eliminacionSimbolosInaccesibles(listaDeNoTerminales[1].valor,1);
                }else{
                    var h3 = document.createElement("h3");
                    h3.innerHTML = "Eliminaste símbolos inaccesibles";
                    var body_programa = document.getElementById("body_programa");
                    body_programa.appendChild(h3);
                    obtenerGramatica();
                }
            }else if(q ==2 ){
                q++;
                if(listaDeNoTerminales.length>=1){
                    eliminacionProduccionesVacias();
                }else{
                    obtenerGramatica();
                }
                
            }else if(q == 3){
                q++;
                if(listaDeNoTerminales.length>=1){
                    eliminacionSimbolosUnitarios();
                }else{
                    obtenerGramatica();
                }
            }else if(q == 6){
                /* //Terminar algoritmos eh imprimir gramática impropia
                window.open("gramaticaPropia.html", "Diseño Web", "width=300, height=200")
                var body_programa = document.getElementById("body_programa_g");
                var divGramatica = document.createElement("div");
                frontElementosGramatica(divGramatica);
                divGramatica.id = "contenido";
                body_programa.appendChild(divGramatica);
                body_programa.appendChild(h3);
                return ;*/
            }
        });
        
        //Eliminamos las entradas
        contenido.remove();
        

        //Creando elementos para el front 
        divGramatica = frontElementosGramatica(divGramatica);

        //Agregamos los resultados a una nueva visualización de la pantalla. 
       
        divGramatica.appendChild(botonConvertir);
        divGramatica.id = "contenido";
        body_programa.appendChild(divGramatica);
        noTerminalesli = [];
        alfabeto = [];
    }
}



function frontElementosGramatica(divGramatica){
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
                        for(var k= 0; k < listaDeNoTerminales[n].producciones.length; k++){
                            let palabras = listaDeNoTerminales[n].producciones;
                            palabras.sort();
                            if(k>0){
                                if(palabras[k]==palabras[k-1]){
                                    listaDeNoTerminales[n].producciones.splice(k,1);
                                    k = k-1;
                                }
                            }
                        }
                        var producciones2 = document.createElement('h3');
                        producciones2.innerHTML = listaDeNoTerminales[n].valor + '--->' + listaDeNoTerminales[n].producciones;
                        divProducciones.appendChild(producciones2); 
                    } 
                    divProducciones.appendChild(producciones3);
                    divProducciones.style.padding = '30px 100px';
                    divGramatica.appendChild(divProducciones);
                    break;     
            }
            divGramatica.appendChild(h3);
        }
        return divGramatica;
}


//Al presionar el botón de + a lado de la casilla de palabras se realiza esta función para abrir una nuva casilla de input y crear una nueva palabra
function agregarPalabra(lugarNP, produccion){   
    var botonSigProduccion = document.getElementById('sigProduccion');
    var botonTerminarProduccion = document.getElementById('terminarProducciones');
    var produccionIngresada = document.createElement("h3");
    if(lugarNP.firstChild.nextSibling.firstChild.value == '' || listaDeNoTerminales.length == 0 ){
        alert('Requiere un no terminal');
    }else if ( lugarNP.firstChild.nextSibling.firstChild.value == undefined && listaDeNoTerminales.indexOf(lugarNP.firstChild.firstChild.value) == -1 && lugarNP.firstChild.firstChild.value == ''){
        alert('Requiere un no terminal');
    }else{
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
}


//Cuando se presiona el boton con signo (+), por medio de esta función se crean nuevos noTerminales o producciones
function agregarNT(noTerminal){   
    if(noTerminal.value == noTerminal.value.toLowerCase() || "number" == typeof noTerminal || noTerminal.value == '' || noTerminal.value.length > 1){
        alert("Ingresa una letra mayuscula");
        if(c!=0){c--};
    }else if(recorrerListaNT(noTerminal.value)){
        alert("Ingresa un elemento que no se repita");
        if(c!=0){c--};
    }else{
        noTerminal.disabled = true;
        var lugar = document.getElementById("nuevos-terminales");
        listaDeNoTerminales.push(new ProduccionAceptada(noTerminal.value));
        agregarProducciones(lugar)  
        
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
        if(inputNt[c].value.toUpperCase() == inputNt[c].value){c++;}
        
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


//Funcion que elimina los símbolos inútiles 
function eliminacionSimbolosMuertos(tamanioProducciones){
    
    //recorrerPalabras(eliminacionSimbolosMuertos1);
    c = 0;
    var ban = true;
    //Eliminando Símbolos muertos tipo 1 
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            ban = true;
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];
                if(!recorrerListaNT(valor[k]) && valor[k] == valor[k].toUpperCase()){
                    produccionesVar.splice(n, 1);
                    if(n > 0 && ban == true ){
                        n = n-1;
                        ban = false;
                    }else if(n == 0){
                        listaDeNoTerminales.splice(i,1);
                        eliminacionSimbolosMuertos(listaDeNoTerminales.length);
                        return;
                    }else if(produccionesVar.length==0 && listaDeNoTerminales.length == 1){
                        alert("La gramatica se vacio");
                        location.reload();
                    }
                }
            }
        }
    }

    //Eliminando Símbolos muertos tipo 2  
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = listaDeNoTerminales[i].producciones[n];
                if(valor[k] == valor[k].toUpperCase()){
                    if(valor[k]==listaDeNoTerminales[i].valor){
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
        c = 0 ; 
    }
    if(listaDeNoTerminales.length<tamanioProducciones){
        eliminacionSimbolosMuertos(listaDeNoTerminales.length);
    }else{var h3 = document.createElement("h3");
    h3.innerHTML = "Eliminaste símbolos muertos";
    var body_programa = document.getElementById("body_programa");
    body_programa.appendChild(h3);
    obtenerGramatica();
    }
}

//Función que elimina los símbolos inaccesibes
 

function eliminacionSimbolosInaccesibles(noTerminal, c){
    var ban = false;
    for(var i = 0  ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];
                if(noTerminal == valor[k]){
                    ban = true;    
                    if(c == listaDeNoTerminales.length){
                        var h3 = document.createElement("h3");
                        h3.innerHTML = "Eliminaste símbolos inaccesibles";
                        var body_programa = document.getElementById("body_programa");
                        body_programa.appendChild(h3);
                        obtenerGramatica();
                        return;
                    }else if(listaDeNoTerminales.length > c+1){
                        eliminacionSimbolosInaccesibles(listaDeNoTerminales[c+1].valor,c+1);
                    }
                }                
            }
        }
    }
    if(!ban){
         listaDeNoTerminales.splice(c,1);                                          //En caso de no haber encontradro coincidencias significa que el símbolo NT actual es inaccesible , por tanto se elimina 
    }
    if(listaDeNoTerminales.length >= c ){
        var h3 = document.createElement("h3");
        h3.innerHTML = "Eliminaste símbolos inaccesibles";
        var body_programa = document.getElementById("body_programa");
        body_programa.appendChild(h3);
        obtenerGramatica();
    }else if(listaDeNoTerminales.length > c+1){
        eliminacionSimbolosInaccesibles(listaDeNoTerminales[c+1].valor,c+1);
    }
}
//Elimina producciones vacias de la gramática

function eliminacionProduccionesVacias(){
    var listaNT = [];
    var t = true;
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = listaDeNoTerminales[i].producciones[n];
                if(valor[k] == 'ε' ){
                    listaNT.push(listaDeNoTerminales[i].valor);
                    produccionesVar.splice(n,1);
                    if(n >0){
                        n--;
                    }   
                }
            }
        }
    }
    if(listaNT.length != 0 ){
        console.log(listaNT);
        for(var m = 0 ; m < listaNT.length; m++){
            for(var i = 0 ; i<listaDeNoTerminales.length; i++){
                for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
                    let produccionesVar = listaDeNoTerminales[i].producciones
                    for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                        let valor = produccionesVar[n];
                        if(valor[k] == listaDeNoTerminales[0].valor && listaNT[0] == listaDeNoTerminales[0].valor){
                            listaDeNoTerminales.unshift(new ProduccionAceptada(listaDeNoTerminales[0].valor+'´'));
                            listaDeNoTerminales[0].producciones.push(listaDeNoTerminales[1].valor);
                            listaDeNoTerminales[0].producciones.push('ε');
                        }else if(valor[k]== listaNT[m] && t){
                            t = false;
                            produccionesVar = remplazarSimboloVacio(produccionesVar, valor[k], []);
                        }
                    }
                }
                t = true;
            }
        }
    }
    var h3 = document.createElement("h3");
    h3.innerHTML = "Eliminaste producciones vacias";
    var body_programa = document.getElementById("body_programa");
    body_programa.appendChild(h3);
    obtenerGramatica();
}

function remplazarSimboloVacio(listaDePalabras, noTerminal, palabrasAgregadas){
    var indicador = false;
    var nTerminal = '';    
    var nuevaPalabra = [];
    var palabrasAgregadas = [];
    var c = listaDePalabras.length;
    for(var n = 0 ; n < listaDePalabras.length; n++){
        let palabra = listaDePalabras[n];
        for(var i = 0 ; i<palabra.length; i++){
            if(noTerminal == palabra[i] && palabrasAgregadas.indexOf(palabra) == -1){
                palabrasAgregadas.push(palabra);
                nuevaPalabra = palabra.split("");
                nuevaPalabra.splice(i,1);
                for(var u = 0 ; u < nuevaPalabra.length ; u++){
                    nTerminal = nTerminal + nuevaPalabra[u];
                }
                listaDePalabras.push(nTerminal);
            }
        }
    }
    if(listaDePalabras.length < c){
        remplazarSimboloVacio(listaDePalabras,noTerminal, palabrasAgregadas);
    }else{
        return listaDePalabras;
    }
}


//eliminación de símbolos unitarios

function eliminacionSimbolosUnitarios(){
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let palabra = listaDeNoTerminales[i].producciones[n];
                var tamanioProduccion = produccionesVar.length;
                if(recorrerListaNT(palabra[k]) && palabra.length == 1){
                    produccionesVar.splice(n,1);
                    if(n != 0){
                        n--;
                    }
                    for(var z = 0 ; z < listaDeNoTerminales.length ; z++){
                        if(listaDeNoTerminales[z].valor == palabra[k]){
                            var c = z;
                        }
                    }
                    if(c != undefined){
                        produccionesVar = mezclar(produccionesVar, listaDeNoTerminales[c].producciones); 
                    }
                    
                }
                if(tamanioProduccion > produccionesVar.length){
                     eliminacionSimbolosUnitarios();
                }
            }
        }
    } 
    var h3 = document.createElement("h3");
    h3.innerHTML = "Eliminaste símbolos unitarios";
    var body_programa = document.getElementById("body_programa");
    body_programa.appendChild(h3);
    obtenerGramatica();
}

function mezclar(listaProducciones, listaConcatenar){
    for(var i = 0 ; i< listaConcatenar.length;i++){
        listaProducciones.push(listaConcatenar[i]);
    }
    return listaProducciones;
}