
//Script Recibe elementos del usuario y contiene los algoritmos para convertir gramaticas impropias a propias

var produccionAceptada = {valor : "" , producciones : []}; //Producciones con sus respectivas palabras
var listaDeNoTerminales = []; //Lista de objetos ingresados por el usuario
var inputNt = [];
var noTerminalesli = []; //Lista final de NT
var produccionesH3 = []; //
var alfabeto = []; //lista con la palabras del alfabeto
var c = 0 , q = 0;  //contador, util para asignar palabras a sus producciones correspondientes

//creando el constructor de la clase produccionAceptada

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
        
        botonConvertir.addEventListener('click',()=>{
            if(q == 0){
                q++; 
                eliminacionSimbolosMuertos(listaDeNoTerminales.length);
            }else if(q ==1){
                q++;
                if(listaDeNoTerminales.length>1){
                    eliminacionSimbolosInaccesibles(listaDeNoTerminales[1],1);
                }else{
                    obtenerGramatica();
                }
            }else if(q ==2){
                q++;
                if(listaDeNoTerminales.length>1){
                    eliminacionProduccionesVacias();
                }else{
                    obtenerGramatica();
                }
            }
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
                    for(k= 0; k < listaDeNoTerminales[n].producciones.length; k++){
                        let palabras = listaDeNoTerminales[n].producciones;
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
        //Agregamos los resultados a una nueva visualización de la pantalla. 
        divGramatica.appendChild(h3);
        }
        divGramatica.appendChild(botonConvertir);
        divGramatica.id = "contenido";
        body_programa.appendChild(divGramatica);
        noTerminalesli = [];
        alfabeto = [];
    }
}


//Al presionar el botón de + a lado de la casilla de palabras se realiza esta función para abrir una nuva casilla de input y crear una nueva palabra
function agregarPalabra(lugarNP, produccion){   
    var botonSigProduccion = document.getElementById('sigProduccion');
    var botonTerminarProduccion = document.getElementById('terminarProducciones');
    var produccionIngresada = document.createElement("h3");
    //console.log(lugarNP.firstChild.firstchild.value);
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

//Cuando se presiona el boton con signo (+), por medio de esta función se crean nuevos noTerminales o producciones
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
    var ban = true;
    //Eliminando Símbolos muertos tipo 1 
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            ban = true;
            console.log(produccionesVar);
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];
                if(!recorrerListaNT(valor[k]) && valor[k] == valor[k].toUpperCase()){
                    produccionesVar.splice(n, 1);
                    if(n > 0 && ban == true ){
                        n = n-1;
                        ban = false;
                    }else if(produccionesVar.length==0){
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
    }
    
    console.log(listaDeNoTerminales);
    if(listaDeNoTerminales.length<tamanioProducciones){
        eliminacionSimbolosMuertos(listaDeNoTerminales.length);
    }
    var h3 = document.createElement("h3");
    h3.innerHTML = "Eliminaste símbolos muertos";
    var body_programa = document.getElementById("body_programa");
    body_programa.appendChild(h3);
    obtenerGramatica();
}

//Función que elimina los símbolos inaccesibes

function eliminacionSimbolosInaccesibles(noTerminal, c){
    for(var i = 1 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];
                if(noTerminal == valor[k]){
                    if(c == listaDeNoTerminales.length){
                        var h3 = document.createElement("h3");
                        h3.innerHTML = "Eliminaste símbolos inaccesibles";
                        var body_programa = document.getElementById("body_programa");
                        body_programa.appendChild(h3);
                        obtenerGramatica();
                    }
                    eliminacionSimbolosInaccesibles(listaDeNoTerminales[c+1],c+1);
                }                
            }
        }
    }
    listaDeNoTerminales.splice(c,1);                                           //En caso de no haber encontradro coincidencias significa que el símbolo NT actual es inaccesible , por tanto se elimina 
    if(listaDeNoTerminales.length == 1 ){
        var h3 = document.createElement("h3");
        h3.innerHTML = "Eliminaste símbolos inaccesibles";
        var body_programa = document.getElementById("body_programa");
        body_programa.appendChild(h3);
        obtenerGramatica();
    }else{
        eliminacionProduccionesVacias(listaDeNoTerminales[c],c);
    }
}

//Elimina producciones vacias de la gramática

function eliminacionProduccionesVacias(){
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k <  produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];  
                if(valor[k]=="ε" && produccionesVar.length == 1){
                    produccionesVar.splice(n,1);
                    encontrarSimboloVacio(listaDeNoTerminales[i]);
                }     
            }
        }
    }
}

function encontrarSimboloVacio(noTerminal){
    for(var i = 0 ; i<listaDeNoTerminales.length; i++){
        for(var n = 0 ; n < listaDeNoTerminales[i].producciones.length;n++){
            let produccionesVar = listaDeNoTerminales[i].producciones
            for(var k = 0 ; k < produccionesVar[n].length ; k++){
                let valor = produccionesVar[n];  
                if(noTerminal == valor[k] && listaDeNoTerminales.indexOf(noTerminal)== 0){
                    listaDeNoTerminales.unshift(new ProduccionAceptada(listaDeNoTerminales[0]+'´'));
                    listaDeNoTerminales[0].producciones.push(listaDeNoTerminales[0], "ε");
                    remplazarSimboloVacio(produccionesVar, noTerminal);
                }else if(noTerminal == valor[k]){
                    remplazarSimboloVacio(produccionesVar, noTerminal);
                }
            }
        }
    }
}

function remplazarSimboloVacio(listaDePalabras, noTerminal){
    var indicador = false;
    var indices = [];    
    for(var n = 0 ; n < listaDePalabras; n++){
        let palabra = listaDePalabras[n];
        for(var i = 0 ; i<palabra.length; i++){
            if(noTerminal = palabra[i]){
                indicador = true; 
                indices.push(i);
            }
        }
        if(indicador){
            if(true){
                for(var c = 0 ; c < indices.length ; c++){
                    let nuevaPalabra = palabra.splice(indices[c],1);
                    listaDePalabras.push()
                 }
            }
        }
    }
}

//eliminación de símbolos unitarios

function eliminacionSimbolosUnitarios(){
     
}

