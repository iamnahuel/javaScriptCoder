//declaramos array de socios y cuotas
let cuotas = [];
let socios = [];
let valorCuota = 500;
//cargamos los array con los datos que estan guardados en formato JSON, a traves del metodo fetch
async function fetchSocios() {
    const respuesta = await fetch("../data/socios.json")
    return await respuesta.json();
}
fetchSocios().then(socio => {
    socios = socio
}
)
async function fetchCuotas() {
    const respuesta = await fetch("../data/cuotas.json")
    return await respuesta.json();
}
fetchCuotas().then(cuota => {
    cuotas = cuota
}
)

//creamos los botones para crear / listar / buscar y eliminar socios
//btnListarSocios = document.querySelector(".listarSocios");
btnBuscarSocio = document.querySelector(".btnBuscarSocio");
btnEliminarSocio = document.querySelector(".btnEliminarSocio");
let btnCuotasSocio = document.querySelector(".btnCuotasSocio");
let btnCobrarCuota = document.querySelector(".btnCobrarCuota");
btnCalcularCuota = document.querySelector(".btnCalcularMonto");
btnDescargarPDF = document.querySelector(".descargarPdf");
//iniciamos el boton cuotas y cobrar cuotas desabilitado 
btnCuotasSocio.disabled = true;
btnCobrarCuota.disabled = true;

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
        Swal.fire({
            icon: 'error',
            // title: 'Tiene que completar todos los campos',
            text: 'Socio Existente',
            //footer: '<a href="">Why do I have this issue?</a>'
        })
    } else {
        //comprovamos que los campos no esten vacios
        if (!dniSocio || !nombreSocio || !edadSocio || !localidadSocio) {
            Swal.fire({
                icon: 'error',
                // title: 'Tiene que completar todos los campos',
                text: 'Completar todos los campos!',
                //footer: '<a href="">Why do I have this issue?</a>'
            })
        } else {
            //cargamos el objetos socioTemporal al array de socios
            socios.push(socioTemporal);
            ocultarSocios();
            listarSocios()

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Se agrego ' + nombreSocio + ' exitosamente',
                showConfirmButton: false,
                timer: 1500
            })
            limpiarFormulario();

        }
    }
    return socios;
})
//listar socios en tabla asociados al btnListarSocios
function listarSocios() {
    limpiarListado();
    ocultarSocios();

    for (socio of socios) {
        let html = ` <img class="buttonAbrirSocio" onclick="abrirSocioListado(${socio.dni})" data-bs-toggle="modal"
         data-bs-target="#exampleModal" src="imagenes/usuario.png"/>`;
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
}
//evento listar cuotas socio asociada al btnCuotasSocio, filtrando por dni del socio
btnCuotasSocio.addEventListener("click", () => {
    let dni = parseInt(document.getElementById("documento").value);
    limpiarStorage();
    limpiarListadoCuotas();
    listarCuotas(dni);
    return socios;
})
//listar Cuotass
function listarCuotas(documento) {
    limpiarListadoCuotas()
    const nombre = document.querySelector("#nombreSocioCobrar");
    const dni = document.querySelector("#dniSocioCobrar");
    const tSocio = document.querySelector("#tipoSocioCobrar");

    dni.innerText = documento;
    const resultado1 = socios.find((el) => el.dni === documento);
    nombre.innerText = resultado1.nombre;
    tSocio.innerText = resultado1.tipoSocio;

    const fecha = new Date().toLocaleDateString();
    let resultado = cuotas.filter(dato => dato.dni === documento);
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
        racargoContent.innerText = ("$" + `${dato.recargo}`)
        montoFinalContent.innerText = ("$" + `${dato.montoFinal}`)
    }
}
//ocultar tabla cuotas
function ocultarCuotas() {
    var x = document.getElementById("listadoCuotasId");
    x.style.display === "flex" ? x.style.display = "none" : x.style.display = "flex";
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
//funcion buscar socio a traves del listado de socios
function abrirSocioListado(dni) {
    document.getElementById("documento").value = dni;
}
//evento buscar socio asociados al btnBuscarSocio
btnBuscarSocio.addEventListener("click", () => {
    let dni = parseInt(document.getElementById("documento").value);
    const resultado = socios.find((el) => el.dni === dni);
    resultado == null ? Swal.fire({
        icon: 'error',
        text: 'Socio/a inexistente'
    }) : ((document.getElementById("nombreSocio").value = resultado.nombre,
        document.getElementById("localidadSocio").value = resultado.localidad,
        document.getElementById("edadSocio").value = resultado.edad),
        //habilitamos btn cuotas
        btnCuotasSocio.disabled = false,
        //cargamos datos en el local storage
        //tmb podria guardar resultado como formato JSON
        localStorage.setItem("dni", resultado.dni),
        localStorage.setItem("localidad", resultado.localidad),
        localStorage.setItem("edad", resultado.edad),
        localStorage.setItem("nombre", resultado.nombre)
    )
    return resultado;
})
//funcion para calcular el cobro antes de realizarlo
btnCalcularCuota.addEventListener("click", () => {
    //Comprobamos que selecciones una facha
    var comboAño = document.getElementById("slcAño").value;
    var comboMes = document.getElementById("slcMes").value;
    if (comboAño == 0 || comboMes == 0) {
        document.getElementById("alertaPago").innerHTML = "Seleccione una fecha";
    } else {
        //Controlar que la fecha seleccionada no esta paga
        var comboMesTexto = document.getElementById("slcMes");
        let dniSocio = parseInt(document.getElementById('dniSocioCobrar').innerHTML);
        var mesCuota = comboMesTexto.options[comboMesTexto.selectedIndex].text;
        const resultado = cuotas.find((el) => el.dni == dniSocio && el.año == comboAño && el.mes == mesCuota);
        if (resultado != null) {
            document.getElementById("alertaPago").innerHTML = "La fecha seleccionada ya fue liquidada";
        } else {
            //calcular dias demora pago
            const fechaActual = new Date('YYYY-MM-DD').toLocaleDateString();
            const fechaSeleccionada = comboAño + "/" + comboMes + "/1";
            //calcular diferencia en dias entra las dos fechas usamos libreria moment.js
            var fecha1 = moment(fechaSeleccionada)
            var fecha2 = moment('2022-8-2')
            var diasDemora = fecha2.diff(fecha1, 'days');

            calcularInteres(diasDemora);
            let interes = interesCuota;
            let montoFinal = valorCuota + interes;
            //pasamos los valores al label
            document.getElementById("labelMonto").innerText = valorCuota;
            document.getElementById("labelInteres").innerText = interes;
            document.getElementById("labelMontoFinal").innerText = montoFinal;
            btnCobrarCuota.disabled = false;
            document.getElementById("alertaPago").innerHTML = "Cobro Aprobado";
        }
    }
}
)
//calcular interes cuotas
function calcularInteres(fecha) {
    if (fecha <= 10) {
        interesCuota = valorCuota - valorCuota * 1.05;
    } else if (fecha > 10 && fecha <= 20) {
        interesCuota = 0;
    } else if (fecha > 20 && fecha <= 30) {
        interesCuota = valorCuota * 0.1;
    } else {
        interesCuota = valorCuota * 0.1 + valorCuota * (Math.trunc(fecha / 30) / 10);
    }
    return interesCuota;
}
//funcion cobrar cuota asociada al btnCobrarCuota
btnCobrarCuota.addEventListener("click", () => {
    let dniSocio = parseInt(document.getElementById('dniSocioCobrar').innerHTML);
    var comboAño = document.getElementById("slcAño");
    var añoCuota = comboAño.options[comboAño.selectedIndex].text;
    var comboMes = document.getElementById("slcMes");
    var mesCuota = comboMes.options[comboMes.selectedIndex].text;
    let fechaCobro = new Date().toLocaleDateString();
    let montoCuota = parseInt(document.getElementById("labelMonto").innerHTML);
    let interesCuota = parseInt(document.getElementById("labelInteres").innerHTML);
    let montoFinal = montoCuota + interesCuota;
    //declaramos un variable donde cargar el objeto cuota creado arriba
    let cuotaTemporal = new Cuota(dniSocio, añoCuota, mesCuota, fechaCobro, montoCuota, interesCuota, montoFinal);
    cuotas.push(cuotaTemporal);
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cobro exitoso',
        showConfirmButton: false,
        timer: 1500
    })
    limpiarListadoCuotas();
    listarCuotas(dniSocio);
    limpiarCobros();
})
//funcion limpiar campos cobros
function limpiarCobros() {
    document.getElementById("labelMonto").innerText = "";
    document.getElementById("labelInteres").innerText = "";
    document.getElementById("labelMontoFinal").innerText = "";
    document.getElementById("alertaPago").innerHTML = "";
    btnCobrarCuota.disabled = true;
}
//comprueba si el local storage esta con datos, para volver a cargarlos
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

    bandera == "" ? Swal.fire({
        icon: 'error',
        // title: 'Tiene que completar todos los campos',
        text: 'No se cargo ningun socio',
        //footer: '<a href="">Why do I have this issue?</a>'
    }) :
        Swal.fire({
            title: 'Estas seguro?',
            text: "Esta por eliminar al socio " + resultado.nombre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!',
            input: 'checkbox',
            inputPlaceholder: 'Eliminar registro de pagos'
        }).then((result) => {
            if (result.isConfirmed) {
                if (result.value) {
                    (socios.splice(position, 1),
                        eliminarCuotas(dni),
                        limpiarFormulario(),
                        Swal.fire(
                            'Eliminado!',
                            resultado.nombre + ' fue eliminado',
                            'success'
                        )
                    )
                } else {
                    (socios.splice(position, 1),
                        limpiarFormulario(),
                        Swal.fire(
                            'Eliminado!',
                            resultado.nombre + ' fue eliminado',
                            'success'
                        )
                    )
                }
                ocultarSocios();
                listarSocios();
            }
        }
        )

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
    btnCuotasSocio.disabled = true;
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
}
//funcion descargar pdf
btnDescargarPDF.addEventListener("click", () => {
    const pdf = document.getElementById("listadoCuotasId");
    let nombre = document.querySelector("#nombreSocioCobrar").textContent;
    console.log(nombre);
    html2pdf()
        .from(pdf)
        .save("Cuotas " + nombre);
})
//funcion eliminar registro de pagos
function eliminarCuotas(documento) {
    const resultado = cuotas.map((el) => el.dni === documento);
    cuotas.splice(resultado)
}