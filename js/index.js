
let notaMatematica = 0;
let notaLiteratura = 0;
let notaGeografia = 0;
let nombreAlumno = "";
let cantNotasMatematica = 0;
let cantNotasGeografica = 0;
let cantNotasLiteratura = 0;
let opcion = 0;
numero.toFixed(2) = 0;

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

function calcularPromedio(sumaNotas, cantidadNotas){
    if (cantidadNotas == 0) {
        alert("No hay notas de Matematica cargadas");
    } else {
        let promedio = sumaNotas / cantidadNotas;
        alert(nombreAlumno + " tiene un promedio en Matematicas de: " + promedio.toFixed(2));
    }
}
function matepromedioMatica (){
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
