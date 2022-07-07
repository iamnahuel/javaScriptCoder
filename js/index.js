
//declaro dos objetos de socio
let socio1 = { nombre: "Facundo Alvarez", edad: 25, localidad: "Rolon", dni: 34475458 };
let socio2 = { nombre: "Laura Perez", edad: 60, localidad: "Santa Rosa", dni: 14285470 };
let socio3 = { nombre: "Juan Garcia", edad: 50, localidad: "Rolon", dni: 14245470 };
//declaramos array de socios, con dos socios harcodeados para que no este vacio
const socios = [socio1, socio2, socio3];

//funcion constructora para crear el objeto socio
function Socio(dni, nombre, edad, localidad) {
    this.dni = dni;
    this.nombre = nombre;
    this.edad = edad;
    this.localidad = localidad;

}


function agregarSocio() {
    let dniSocio = parseInt(document.getElementById("dniSocioAgregar").value);
    let nombreSocio = document.getElementById("nombreSocioAgregar").value;
    let edadSocio = parseInt(document.getElementById("edadSocioAgregar").value);
    let localidadSocio = document.getElementById("localidadSocioAgregar").value;

    //declaramos un variable donde cargar el objeto socio creado arriba
    let socioTemporal = new Socio(dniSocio, nombreSocio, edadSocio, localidadSocio);
    
    //verificar que el dni no este cargado en el array previamente
   
    const resultado = socios.find((el) => el.dni === dniSocio);
    if (resultado != null) {
        alert("Ya existe un socio con este numero de documento");
    } else {
        //comprovamos que los campos no esten vacios
        if (dniSocio == "" || nombreSocio == "" || edadSocio == "" || localidadSocio == "") {
            alert("Debes completar todos los campos")
        } else {
            //cargamos el objetos socioTemporal al array de socios
            socios.push(socioTemporal);
            alert("Se agrego a " + nombreSocio + " exitosamente");
        }
    }
    return socios;
}

//mostrar array por LI
function agregarElementos() {
    var lista = document.getElementById("ulListado");
    socios.forEach(function (data, index) {
        var linew = document.createElement("li");
        var contenido = document.createTextNode("DNI: " + data.dni + ' | Nombre: ' + data.nombre + " | Edad: " + data.edad + " | Localidad: " + data.localidad);
        lista.appendChild(linew);
        linew.appendChild(contenido);

    })
}

//mostrar array por consola
function listarSocios() {
    //metodo forof para poder listar el contenido de un array
    for (const socio of socios) {
        console.log(socio.dni, "|", socio.nombre, "|", socio.edad, "|", socio.localidad);
    }
}

//buscar socio por dni o nombre
function buscarSocio() {
    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    if (resultado == null) {
        alert("Socio/s inexistente/s");
    } else {
        document.getElementById("nombreSocio").value = resultado.nombre;
        document.getElementById("localidadSocio").value = resultado.localidad;
        document.getElementById("edadSocio").value = resultado.edad;
    }
    return resultado;
}

function eliminarSocio() {
    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    let position = socios.indexOf(resultado);

    let bandera = document.getElementById("nombreSocio").value;
    if (bandera == "") {
        alert("No se ha cargado ningun socio");
    } else {
        socios.splice(position, 1);
        alert("Se elimino a "+ bandera + " exitosamente");
    }
    return socios;
}
//limpia el frmulario de busqueda de socios
function limpiarFormulario() {

    document.getElementById("documento").value = "";
    document.getElementById("nombreSocio").value = "";
    document.getElementById("localidadSocio").value = "";
    document.getElementById("edadSocio").value = "";
}



/*
let notaMatematica = 0;
let notaLiteratura = 0;
let notaGeografia = 0;
let nombreAlumno = "";
let cantNotasMatematica = 0;
let cantNotasGeografica = 0;
let cantNotasLiteratura = 0;
let opcion = 0;
*/


/*
function ingresarAlumno() {
    nombreAlumno = prompt("Nombre del Alumno: ");
    opcion = prompt("Materia a calificar: \n 1- Matematica \n 2- Literatura \n 3- Geografia \n 4-Salir")
    while (opcion < 4) {

        switch (opcion) {
            case "1":
                cantNotasMatematica = parseInt(prompt("Cuantas notas quiere ingresar?"));
                for (i = 1; i <= cantNotasMatematica; i++) {
                    let nota = parseInt(prompt("Ingrese la nota de Matematicas N° " + i + " de " + nombreAlumno));
                    notaMatematica = notaMatematica + nota;
                }
                opcion = prompt("Desea Calificar otra materia: \n 1- Matematica \n 2- Literatura \n 3- Geografia \n 4-Salir")
                break;
            case "2":
                cantNotasLiteratura = parseInt(prompt("Cuantas notas quiere ingresar?"));
                for (i = 1; i <= cantNotasLiteratura; i++) {
                    let nota = parseInt(prompt("Ingrese la nota de Literatura N° " + i + " de " + nombreAlumno));
                    notaLiteratura = notaLiteratura + nota;
                }
                opcion = prompt("Desea Calificar otra materia: \n 1- Matematica \n 2- Literatura \n 3- Geografia \n 4-Salir")
                break;
            case "3":
                cantNotasGeografica = parseInt(prompt("Cuantas notas quiere ingresar?"));
                for (i = 1; i <= cantNotasGeografica; i++) {
                    let nota = parseInt(prompt("Ingrese la nota de Geografia N° " + i + " de " + nombreAlumno));
                    notaGeografia = notaGeografia + nota;
                }
                opcion = prompt("Desea Calificar otra materia: \n 1- Matematica \n 2- Literatura \n 3- Geografia \n 4-Salir")
                break;
            case "4":
                break;
            default:
                alert("Opcion incorrect");
                opcion = 4;
                break;
        }
    }

}

function calcularPromedio(sumaNotas, cantidadNotas) {
    if (cantidadNotas == 0) {
        alert("No hay notas de Matematica cargadas");
    } else {
        let promedio = sumaNotas / cantidadNotas;
        alert(nombreAlumno + " tiene un promedio en Matematicas de: " + promedio.toFixed(2));
    }
}
function matepromedioMatica() {
    sumaNotas = notaMatematica;
    cantidadNotas = cantNotasMatematica;
    calcularPromedio(sumaNotas, cantidadNotas);
}

function promedioGeografia() {
    sumaNotas = notaGeografia;
    cantidadNotas = cantNotasGeografica;
    calcularPromedio(sumaNotas, cantidadNotas);
}
function promedioLiteratura() {
    sumaNotas = notaLiteratura;
    cantidadNotas = cantNotasLiteratura;
    calcularPromedio(sumaNotas, cantidadNotas);
}
*/
