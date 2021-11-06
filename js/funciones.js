var posicion; var datos=new Array(); var contador = 0;
var colegio = new Object();

var codigo = document.getElementById("codigo");
var nombre = document.getElementById("nombre");
var direccion = document.getElementById("direccion");
var año = document.getElementById("año");
var latitud = document.getElementById("latitud");
var longitud = document.getElementById("longitud");
var cuerpo = document.getElementById("cuerpo");

var aCodigo = new Array();
var aNombre = new Array();
var aDireccion = new Array();
var aAño = new Array();
var aLatitud = new Array();
var aLongitud = new Array();

cargarXML();

bSiguiente.addEventListener("click", registroSiguiente, false);
bAnterior.addEventListener("click", registroAnterior, false);
bModificar.addEventListener("click", modificarRegistro, false);
bBorrar.addEventListener("click", borrarRegistro, false);
bTabla.addEventListener("click", crearTabla, false);
bGrabar.addEventListener("click", grabar, false);

function datosColegio(codigo, nombre, direccion, año, latitud, longitud) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.direccion = direccion;
    this.año = año;
    this.latitud = latitud;
    this.longitud = longitud;

    this.guarda = guardadatos;
}

function guardadatos() {
    datos[contador] = this;
    contador++;
    posicion = contador;
}

function leerdatos(c) {
    var da = new datosColegio();
    da = datos[c];
    document.write("<tr><td>" + da.codigo + "</td><td>" + da.nombre + "</td><td>" + da.direccion + "</td><td>" + da.año + "</td><td>" + da.latitud + "</td><td>" + da.longitud + "</td></tr>");

}

//En esta función leemos los datos del fichero datos.js en formato XML y lo transformamos en una coleccion de arrays
function cargarXML() {
    var codigo = new DOMParser();
    var myXml = codigo.parseFromString(datosFichero, "text/xml");

    aCodigo = myXml.getElementsByTagName("id");
    aNombre = myXml.getElementsByTagName("nombre");
    aDireccion = myXml.getElementsByTagName("direccion");
    aAño = myXml.getElementsByTagName("añoFundacion");
    aLatitud = myXml.getElementsByTagName("latitud");
    aLongitud = myXml.getElementsByTagName("longitud");

    //Recorre todos los elementos y los guarda como objetos en un array de objetos llamado datos
    for(var i=0;i<aCodigo.length; i++){
        var p=new datosColegio(aCodigo.item(i).firstChild.nodeValue, aNombre.item(i).firstChild.nodeValue, aDireccion.item(i).firstChild.nodeValue, aAño.item(i).firstChild.nodeValue, aLatitud.item(i).firstChild.nodeValue, aLongitud.item(i).firstChild.nodeValue);
        datos[i]=p;
    }
    c=i; 
    contador=c;
    posicion = 0;
    mostrarRegistro(posicion);
}

function registroSiguiente() {
    posicion++;
    if (posicion >= datos.length) { //Para que no de error al sobrepasar la última posición de los array
        posicion = 0;
    }
    mostrarRegistro(posicion);
}

function registroAnterior() {
    posicion--;
    if (posicion < 0) { //Para que no de error al sobrepasar la última posición de los array
        posicion = 0; //Cuando no hay ningún registro anterior, muestra el de la posición 0
    }
    mostrarRegistro(posicion);
}

//Visualizar registro correspondiente a la posición en los arrays
function mostrarRegistro(posicion) {
    codigo.value = aCodigo[posicion].firstChild.nodeValue;
    nombre.value = aNombre[posicion].firstChild.nodeValue;
    direccion.value = aDireccion[posicion].firstChild.nodeValue;
    año.value = aAño[posicion].firstChild.nodeValue;
    latitud.value = aLatitud[posicion].firstChild.nodeValue;
    longitud.value = aLongitud[posicion].firstChild.nodeValue;

}
function modificarRegistro() {
    aCodigo[posicion].firstChild.nodeValue = codigo.value;
    aNombre[posicion].firstChild.nodeValue = nombre.value;
    aDireccion[posicion].firstChild.nodeValue = direccion.value;
    aAño[posicion].firstChild.nodeValue = año.value;
    aLatitud[posicion].firstChild.nodeValue = latitud.value;
    aLongitud[posicion].firstChild.nodeValue = longitud.value;

}
function grabar() {
    var cod = codigo.value;
    var nom = nombre.value;
    var dir = direccion.value;
    var year = año.value;
    var lat = latitud.value;
    var long = longitud.value;

    colegio = new datosColegio(cod, nom, dir, year, lat, long);
    colegio.guarda();
}
function borrarRegistro() {
    datos.splice(posicion, 1);
    /*contador--;
    posicion = contador;*/
    posicion--;
    mostrarRegistro(posicion);
}

function crearTabla(evt) {
    var tabla = document.getElementById("tabla");
    var cuerpo = document.getElementById("cuerpo");
    cuerpo.innerHTML="";
    var dato;
    
    for (c = 0; c < datos.length; c++) {
        var da = new datosColegio();
        da = datos[c];
        linea=document.createElement("tr");

        celda=document.createElement("td");
        dato=document.createTextNode(da.codigo);
        celda.appendChild(dato);
        linea.appendChild(celda);

        dato=document.createTextNode(da.nombre);
        celda=document.createElement("td");
        celda.appendChild(dato);
        linea.appendChild(celda);

        dato=document.createTextNode(da.direccion);
        celda=document.createElement("td");
        celda.appendChild(dato);
        linea.appendChild(celda);

        dato=document.createTextNode(da.año);
        celda=document.createElement("td");
        celda.appendChild(dato);
        linea.appendChild(celda);

        dato=document.createTextNode(da.latitud);
        celda=document.createElement("td");
        celda.appendChild(dato);
        linea.appendChild(celda);

        dato=document.createTextNode(da.longitud);
        celda=document.createElement("td");
        celda.appendChild(dato);
        linea.appendChild(celda);

        cuerpo.appendChild(linea);

    }
    tabla.appendChild(cuerpo);

}