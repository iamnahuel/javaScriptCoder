
//declaro cuatro objetos de socio
let socio1 = { nombre: "Facundo Alvarez", edad: 25, localidad: "Rolon", dni: 34475458, tipoSocio: "Pleno" };
let socio2 = { nombre: "Laura Perez", edad: 60, localidad: "Santa Rosa", dni: 14285470, tipoSocio: "Pleno" };
let socio3 = { nombre: "Juan Garcia", edad: 50, localidad: "Rolon", dni: 14245470, tipoSocio: "Simple" };
let socio4 = { nombre: "Martin Gonzalez", edad: 20, localidad: "Macachin", dni: 14145796, tipoSocio: "Simple" };
//declaro dos objetos de cuotas
let cuota1 = { dni: 34475458, año: 2022, mes: 1, fechaCobro: Date, monto: 500, recargo: 100, montoFinal: 600 };
let cuota2 = { dni: 34475458, año: 2022, mes: 2, fechaCobro: Date, monto: 500, recargo: 0, montoFinal: 500 };
let cuota3 = { dni: 14285470, año: 2022, mes: 1, fechaCobro: Date, monto: 500, recargo: 0, montoFinal: 500 };
//declaramos array de socios y cuotas, con dos socios harcodeados para que no este vacio
const socios = [socio1, socio2, socio3, socio4];
const cuotas = [cuota1, cuota2, cuota3];

//creamos los botones para crear / listar / buscar y eliminar socios
btnListarSocios = document.querySelector(".listarSocios");
btnBuscarSocio = document.querySelector(".btnBuscarSocio");
btnEliminarSocio = document.querySelector(".btnEliminarSocio");
btnCuotasSocio = document.querySelector(".btnCuotasSocio");

//funcion constructora para crear el objeto socio
function Socio(dni, nombre, edad, localidad, tipoSocio) {
    this.dni = dni;
    this.nombre = nombre;
    this.edad = edad;
    this.localidad = localidad;
    this.tipoSocio = tipoSocio;
}

//funcion constructora para crear el objeto cuota
function Cuota(dni, año, mes, fehcaCobro, monto, recargo, montoFinal) {
    this.dni = dni;
    this.año = año;
    this.mes = mes;
    this.fehcaCobro = fehcaCobro;
    this.monto = monto;
    this.recargo = recargo;
    this.montoFinal = montoFinal
}

//funcion agregar socio con evento EventListener y e.target
const formSocio = document.querySelector("#formulario");
formSocio.addEventListener("submit", (e) => {
    e.preventDefault();
    let from = e.target;
    let nombreSocio = from.children[1].value;
    let dniSocio = parseInt(from.children[3].value);
    let localidadSocio = from.children[5].value;
    let edadSocio = from.children[7].value;
    let tipoSocio = from.children[9].value;

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
//listar socios en tabla asociados al btnListarSocios
btnListarSocios.addEventListener("click", () => {
    limpiarListado();
    ocultarSocios();
    let html = ` <img class="buttonAbrirSocio" onclick="aaa()" src="imagenes/usuario.png"/>`;
    for (socio of socios) {
        const dniList = document.querySelector("#dniList");
        const nombreList = document.querySelector("#nombreList");
        const edadList = document.querySelector("#edadList");
        const localidadList = document.querySelector("#localidadList");
        const tSocioList = document.querySelector("#tSocioList");
        const btnAbrisSocio = document.getElementById("btnOpenSocio");

        let dniContent = document.createElement("li");
        let nombreContent = document.createElement("li");
        let edadContent = document.createElement("li");
        let localidadContent = document.createElement("li");
        let tSocioContent = document.createElement("li");
        let btnAbrisSocioContent = document.createElement("li");

        dniList.appendChild(dniContent);
        nombreList.appendChild(nombreContent);
        edadList.appendChild(edadContent);
        localidadList.appendChild(localidadContent);
        tSocioList.appendChild(tSocioContent);
        btnAbrisSocio.appendChild(btnAbrisSocioContent);

        dniContent.innerText = `${socio.dni}`
        nombreContent.innerText = `${socio.nombre}`
        edadContent.innerText = `${socio.edad}`
        localidadContent.innerText = `${socio.localidad}`
        tSocioContent.innerText = `${socio.tipoSocio}`
        btnAbrisSocioContent.innerHTML += html;
    }
})
//evento listar cuotas socio asociada al btnCuotasSocio, filtrando por dni del socio
btnCuotasSocio.addEventListener("click", () => {
    ocultarCuotas()
    limpiarListadoCuotas()
    let bandera = document.getElementById("nombreSocio").value;
    if (bandera == "") {
        alert("No se ha cargado ningun socio");
    } else {
        let dni = parseInt(document.getElementById("documento").value);
        let HTMLbtnCobrarCuota = `<button type="button" onclick="aaa()" class="btn btn-success btnCuotasSocio">Cobrar Cuota</button>`;
        //variable fecha de forma temporal
        const fecha = new Date().toLocaleDateString();
        let resultado = cuotas.filter(dato => dato.dni === dni);
        for (dato of resultado) {
            const añoList = document.querySelector("#añoList");
            const mesList = document.querySelector("#mesList");
            const fechaList = document.querySelector("#fechaList");
            const montoList = document.querySelector("#montoList");
            const recargoList = document.querySelector("#recargoList");
            const montoFinalList = document.querySelector("#montoFinalList");

            let añoContent = document.createElement("li");
            let mesContent = document.createElement("li");
            let fechaContent = document.createElement("li");
            let montoContent = document.createElement("li");
            let racargoContent = document.createElement("li");
            let montoFinalContent = document.createElement("li");

            añoList.appendChild(añoContent);
            mesList.appendChild(mesContent);
            fechaList.appendChild(fechaContent);
            montoList.appendChild(montoContent);
            recargoList.appendChild(racargoContent);
            montoFinalList.appendChild(montoFinalContent);

            añoContent.innerText = `${dato.año}`
            mesContent.innerText = `${dato.mes}`
            fechaContent.innerText = fecha;
            montoContent.innerText = ("$" + `${dato.monto}`)
            racargoContent.innerText = `${dato.recargo}`
            montoFinalContent.innerText = `${dato.montoFinal}`
        }
        //agregamos el boton "cobrar cuota"
        const cobrarCuota = document.querySelector("#btnCobrarCuota");
        cobrarCuota.innerHTML = HTMLbtnCobrarCuota;
    }
    return socios;
})
//ocultar tabla cuotas
function ocultarCuotas() {
    var x = document.getElementById("listadoCuotasId");
    x.style.display === "flex" ? x.style.display = "none" : x.style.display = "flex";
    /* if (x.style.display === "flex") {
         x.style.display = "none";
     } else {
         x.style.display = "flex";
     }*/
}
//ocultar tabla socios
function ocultarSocios() {
    var x = document.getElementById("idTablaSocios");
    x.style.display === "flex" ? x.style.display = "none" : x.style.display = "flex";
    /* if (x.style.display === "flex") {
         x.style.display = "none";
     } else {
         x.style.display = "flex";
     }*/
}
//evento buscar socio asociados al btnBuscarSocio
btnBuscarSocio.addEventListener("click", () => {

    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    /* if (resultado == null) {
       alert("Socio/s inexistente/s");
   } else {
       document.getElementById("nombreSocio").value = resultado.nombre;
       document.getElementById("localidadSocio").value = resultado.localidad;
       document.getElementById("edadSocio").value = resultado.edad;
   }*/
    resultado == null ? alert("Socio/s inexistente/s") : (document.getElementById("nombreSocio").value = resultado.nombre,
        document.getElementById("localidadSocio").value = resultado.localidad,
        document.getElementById("edadSocio").value = resultado.edad),
        //cargamos datos en el local storage
        //tmb podria guardar resultado como formato JSON
        localStorage.setItem("dni", resultado.dni),
        localStorage.setItem("localidad", resultado.localidad),
        localStorage.setItem("edad", resultado.edad),
        localStorage.setItem("nombre", resultado.nombre);

    return resultado;
})
//comprueba si el local storage esa con datos, para volver a cargarlos
function comprobarLocalStorage() {
    const bandera = localStorage.getItem("dni");
    if (bandera != "") {
        document.getElementById("documento").value = parseInt(localStorage.getItem("dni"));
        document.getElementById("nombreSocio").value = localStorage.getItem("nombre")
        document.getElementById("localidadSocio").value = localStorage.getItem("localidad")
        document.getElementById("edadSocio").value = parseInt(localStorage.getItem("edad"));
    }
}
//limpiar el local storage
function limpiarStorage() {
    localStorage.removeItem("dni");
    localStorage.removeItem("nombre")
    localStorage.removeItem("localidad")
    localStorage.removeItem("edad");
    limpiarFormulario()
}
//evento eliminar socio asociado al btnEliminarSocio
btnEliminarSocio.addEventListener("click", () => {
    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    let position = socios.indexOf(resultado);
    let bandera = document.getElementById("nombreSocio").value;

    bandera == "" ? alert("No se ha cargado ningun dato") : (socios.splice(position, 1), alert("Se elimino a " + bandera + " exitosamente"),
        limpiarFormulario());
    /* if (bandera == "") {
         alert("No se ha cargado ningun socio");
     } else {
         socios.splice(position, 1);
         alert("Se elimino a " + bandera + " exitosamente");
         limpiarFormulario();
     }*/
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
//limpia el lsitado de socios y listado de cuotas
function limpiarListado() {
    document.getElementById('dniList').innerHTML = '';
    document.getElementById('nombreList').innerHTML = '';
    document.getElementById('edadList').innerHTML = '';
    document.getElementById('localidadList').innerHTML = '';
    document.getElementById('tSocioList').innerHTML = '';
    document.getElementById('btnOpenSocio').innerHTML = '';
}
function limpiarListadoCuotas() {
    document.getElementById('añoList').innerHTML = '';
    document.getElementById('mesList').innerHTML = '';
    document.getElementById('fechaList').innerHTML = '';
    document.getElementById('montoList').innerHTML = '';
    document.getElementById('recargoList').innerHTML = '';
    document.getElementById('montoFinalList').innerHTML = '';
    //no me elimina el boton cobrar cuootas.
    document.getElementById('btnCobrarCuota').innerHTML = '';

}
//funcion proximamente
function aaa() {
    alert("proximamente");
}
