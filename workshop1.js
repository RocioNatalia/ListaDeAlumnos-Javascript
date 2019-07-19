function mostrarEnPantallaListaEnLocal() {
  var listaEnStorage = JSON.parse(localStorage.getItem("listaAlumnos"));

  if (listaEnStorage) {
    listaEnStorage.forEach(alumno => {
      var listaEstudiantes = document.getElementById("listaAlumnos");

      //crear el parrafo para cada alumno
      var estudianteDatos = document.createElement("li");
      estudianteDatos.id = alumno.dni;

      //agrego LI a UL
      listaEstudiantes.appendChild(estudianteDatos);

      estudianteDatos.innerHTML = `
    <h4> ${alumno.nombre} ${alumno.apellido} </h4>
    <h5>${alumno.dni} </h5>
    <h6> ${alumno.email}</h6>
    <hr>`;
    });
  }
}

mostrarEnPantallaListaEnLocal();

//validar que los datos sean los correctos
function validarNombreOApellido(nodoInput) {
  var nombre = nodoInput.value;

  if (nombre) {
    nodoInput.className = "form-control is-valid ingreso";
  } else {
    nodoInput.className = "form-control is-invalid";
  }
  habilitarBoton(nodoInput);
}

function validarDni(nodoInput) {
  var documentoIngresado = nodoInput.value;

  let listaEnStorage = JSON.parse(localStorage.getItem("listaAlumnos"));
  var encontradosEnLocal = [];

  if (localStorage.getItem("listaAlumnos")) {
    listaEnStorage.forEach(alumno => {
      if (alumno.dni == documentoIngresado) {
        encontradosEnLocal.push(alumno.dni);
      }
    });
  }

  //indicar que ese dni ya esta registrado
  if (encontradosEnLocal.length > 0) {
    //Acceder a div del dni
    var avisoErrorDni = document.getElementById("errorDni");
    avisoErrorDni.innerHTML = "Ese DNI ya esta registrado";
  } else {
    var avisoErrorDni = document.getElementById("errorDni");
    avisoErrorDni.innerHTML = "";
  }

  if (nodoInput.value > 0 && encontradosEnLocal.length == 0) {
    nodoInput.className = "form-control is-valid ingreso";
  } else {
    nodoInput.className = "form-control is-invalid";
  }
  habilitarBoton(nodoInput);
}

function validarEmail(nodoInput) {
  var mail = nodoInput.value;
  //Patron para que sea un mail valido
  var patron = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (mail.search(patron) == 0) {
    nodoInput.className = "form-control is-valid ingreso";
  } else {
    nodoInput.className = "form-control is-invalid";
  }
  habilitarBoton(nodoInput);
}

//para habilitar y deshabilitar el boton
function habilitarBoton() {
  var datosValidados = document.getElementsByClassName("ingreso");
  var boton = document.getElementById("botonDeIngreso");
  //los cuatros datos deben ser validos para crear el objeto y guardarlo
  if (datosValidados.length == 4) {
    //habilitar el boton
    boton.className = "boton azul entero";
    boton.disabled = false;
  } else {
    boton.className = "boton gris entero";
    boton.disabled = true;
  }
}

//Ingresar Alumno
function datosValidados() {
  //traer los datos del input
  let nombre = document.getElementById("name").value;
  let apellido = document.getElementById("lastName").value;
  let dni = document.getElementById("dni").value;
  let email = document.getElementById("mail").value;

  //ver si no existe ese alumno , si no existe crearlo
  var estudianteIdenticado = document.getElementById(dni);
  if (!estudianteIdenticado) {
    //creacion del objeto alumno nuevo
    var alumnoNuevo = new AlumnoNuevo(nombre, apellido, dni, email);

    //mostrar los datos en pantalla

    //Acceder a la UL
    var listaEstudiantes = document.getElementById("listaAlumnos");
    //crear un nuevo LI
    var estudiante = document.createElement("li");
    //AGREGAR UN ID IDENTIFICATORIO A LA LI
    estudiante.id = dni;
    //agrego LI a UL
    listaEstudiantes.appendChild(estudiante);

    //piso con los datos li
    estudiante.innerHTML = `
    <h4> ${nombre} ${apellido} </h4>
    <h5>${dni} </h5>
    <h6> ${email}</h6>
    <hr>`;

    //agregar al local storage en un array

    if (localStorage.getItem("listaAlumnos") === null) {
      let usuarios = [];
      usuarios.push(alumnoNuevo);
      localStorage.setItem("listaAlumnos", JSON.stringify(usuarios));
    } else {
      let usuarios = JSON.parse(localStorage.getItem("listaAlumnos"));
      usuarios.push(alumnoNuevo);
      localStorage.setItem("listaAlumnos", JSON.stringify(usuarios));
    }
  }
}

//template del objeto alumno nuevo
class AlumnoNuevo {
  constructor(name, lastname, dni, mail) {
    this.nombre = name;
    this.apellido = lastname;
    this.dni = dni;
    this.email = mail;
  }
}

//Eliminar Alumno
function eliminarAlumno() {
  var dniElimina = document.getElementById("dniEliminar").value;
  var listaEnStorage = JSON.parse(localStorage.getItem("listaAlumnos"));
  var listaNueva = listaEnStorage.filter(alumno => alumno.dni != dniElimina);

  localStorage.setItem("listaAlumnos", JSON.stringify(listaNueva));

  //borrar en pantalla
  if (document.getElementById(dniElimina)) {
    var liAlumnoAEliminar = document.getElementById(dniElimina);
    liAlumnoAEliminar.innerHTML = "";
  }
}

//Buscar alumno
function buscarAlumno() {
  let alumnos = JSON.parse(localStorage.getItem("listaAlumnos"));
  let textoBuscado = document.getElementById("buscado").value.toLowerCase();
  var listaEncontrados = document.getElementById("encontrados");
  listaEncontrados.innerHTML = " ";

  alumnos.forEach(alumno => {
    if (
      alumno.nombre.toLowerCase().includes(textoBuscado) ||
      alumno.apellido.toLowerCase().includes(textoBuscado)
    ) {
      var alumnoEncontrado = document.createElement("li");

      listaEncontrados.appendChild(alumnoEncontrado);

      //piso con los datos li
      alumnoEncontrado.innerHTML = `
    <h4> ${alumno.nombre} ${alumno.apellido} </h4>
    <h5>${alumno.dni} </h5>
    <h6> ${alumno.email}</h6>
    <hr>`;
    }
  });
}
