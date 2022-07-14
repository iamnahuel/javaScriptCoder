
//declaro cuatro objetos de socio
let socio1 = { nombre: "Facundo Alvarez", edad: 25, localidad: "Rolon", dni: 34475458, tipoSocio: "Pleno" };
let socio2 = { nombre: "Laura Perez", edad: 60, localidad: "Santa Rosa", dni: 14285470, tipoSocio: "Pleno" };
let socio3 = { nombre: "Juan Garcia", edad: 50, localidad: "Rolon", dni: 14245470, tipoSocio: "Simple" };
let socio4 = { nombre: "Martin Gonzalez", edad: 20, localidad: "Macachin", dni: 14145796, tipoSocio: "Simple" };
//declaramos array de socios, con dos socios harcodeados para que no este vacio
const socios = [socio1, socio2, socio3, socio4];

//creamos los botones para crear / listar / buscar y eliminar socios
//btnCrearSocio = document.querySelector(".agregarSocio");
btnListarSocios = document.querySelector(".listarSocios");
btnBuscarSocio = document.querySelector(".btnBuscarSocio");
btnEliminarSocio = document.querySelector(".btnEliminarSocio");


//funcion constructora para crear el objeto socio
function Socio(dni, nombre, edad, localidad, tipoSocio) {
    this.dni = dni;
    this.nombre = nombre;
    this.edad = edad;
    this.localidad = localidad;
    this.tipoSocio = this.tipoSocio;

}

//funcion agregar socio con evento EventListener y e.target
const formSocio = document.querySelector("#formulario");
formSocio.addEventListener("submit", (e) => {
    e.preventDefault();
    let from = e.target;
    let nombreSocio = from.children[1].value;
    let dniSocio = from.children[3].value;
    let edadSocio = from.children[5].value;
    let localidadSocio = from.children[7].value;

    //declaramos un variable donde cargar el objeto socio creado arriba
    let socioTemporal = new Socio(dniSocio, nombreSocio, edadSocio, localidadSocio, tipoSocio);

    //verificar que el dni no este cargado en el array previamente
    const resultado = socios.find((el) => el.dni == dniSocio);
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
            limpiarFormulario();
           
        }
    }
    return socios;
   
})

//evento listar socios asociados al btnListarSocios
btnListarSocios.addEventListener("click", () => {
    var lista = document.getElementById("ulListado");
    socios.forEach(function (data, index) {
        var linew = document.createElement("li");
        var contenido = document.createTextNode("DNI: " + data.dni + ' | Nombre: ' + data.nombre + " | Edad: " + data.edad + " | Localidad: " + data.localidad + " | Tipo Socio: " + data.tipoSocio);
        linew.appendChild(contenido);
        lista.appendChild(linew);
    })
})

//evento buscar socio asociados al btnBuscarSocio
btnBuscarSocio.addEventListener("click", () => {
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
})

//evento eliminar socio asociado al btnEliminarSocio
btnEliminarSocio.addEventListener("click", () => {
    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    let position = socios.indexOf(resultado);

    let bandera = document.getElementById("nombreSocio").value;
    if (bandera == "") {
        alert("No se ha cargado ningun socio");
    } else {
        socios.splice(position, 1);
        alert("Se elimino a " + bandera + " exitosamente");
        limpiarFormulario();
    }
    return socios;
})

//limpia el frmulario de busqueda de socios
function limpiarFormulario() {

    document.getElementById("documento").value = "";
    document.getElementById("nombreSocio").value = "";
    document.getElementById("localidadSocio").value = "";
    document.getElementById("edadSocio").value = "";
    document.getElementById("nombreSocioAgregar").value = "";
    document.getElementById("dniSocioAgregar").value = "";
    document.getElementById("localidadSocioAgregar").value = "";
    document.getElementById("edadSocioAgregar").value = "";

}

