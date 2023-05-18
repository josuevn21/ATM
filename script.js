// Objetos del DOM
const loginForm = document.getElementById('login-form');
const operacionesSection = document.getElementById('operaciones');
const saldoActual = document.getElementById('saldo-actual');
const inputCantidad = document.getElementById('cantidad');
const btnDepositar = document.getElementById('btn-depositar');
const btnRetirar = document.getElementById('btn-retirar');
const btnCerrarSesion = document.getElementById('btn-cerrar-sesion');
const nombreUsuario = document.getElementById('nombreUsuario');

// Datos de usuarios predefinidos
const usuarios = [
    { usuario: "Josue", contrasena: "password1", saldo: 100 },
    { usuario: "Victoria", contrasena: "password2", saldo: 200 },
    { usuario: "Caro", contrasena: "password3", saldo: 300 }
];

let usuarioActual = null;


// Función para actualizar el saldo en el DOM
function actualizarSaldo() {
    saldoActual.textContent = "$" + usuarioActual.saldo.toFixed(2);
}

function actualizarNombre() {
  nombreUsuario.textContent =  usuarioActual.usuario
}
// Función para mostrar el formulario de login
function mostrarLogin() {
    loginForm.style.display = "block";
    operacionesSection.style.display = "none";
}

// Función para mostrar la sección de operaciones
function mostrarOperaciones() {
  
    loginForm.style.display = "none";
    operacionesSection.style.display = "block";
    actualizarNombre();
    actualizarSaldo();
}

// Función para realizar el login
function login(e) {
    e.preventDefault();
    const usuario = document.getElementById("usuario").value;
    const contrasena = document.getElementById("contrasena").value;

    const usuarioEncontrado = usuarios.find(
        (user) => user.usuario === usuario && user.contrasena === contrasena
    );

    if (usuarioEncontrado) {
        usuarioActual = usuarioEncontrado;
        console.log(usuarioEncontrado.usuario)
        mostrarOperaciones();
        loginForm.reset();
        
    } else {
        //mostrarError("Credenciales inválidas. Por favor, inténtelo de nuevo.");
        createAlert('Opps!','','Credenciales inválidas. Por favor, inténtelo de nuevo.','danger',true,false,'pageMessages');
    }
}

// Función para mostrar mensajes de error
function mostrarError(mensaje) {
    const errorElement = document.createElement("p");
    errorElement.classList.add("error");
    errorElement.textContent = mensaje;
    loginForm.appendChild(errorElement);
}

// Función para realizar un depósito
function depositar(e) {
    e.preventDefault();
    const cantidad = parseFloat(inputCantidad.value);
    if ((isNaN(cantidad) || cantidad <= 0)) {
        /*mostrarError("Por favor, ingrese una cantidad válida.");
        alert("Por favor, ingrese una cantidad válida.")*/
        createAlert('Opps!','','Por favor, ingrese una cantidad válida.','danger',true,false,'pageMessages');
        return;
    }else if(usuarioActual.saldo+cantidad >950){
        //alert("No puedes tener mas de $950 en tu cuenta bancaria. Su saldo actual es: $" + usuarioActual.saldo.toFixed(2))
        createAlert('Opps!','','No puedes tener mas de $950 en tu cuenta bancaria. ','danger',true,false,'pageMessages');
    } else{
        usuarioActual.saldo += cantidad;
        actualizarSaldo();
        inputCantidad.value = "";
    }
}

// Función para realizar un retiro
function retirar(e) {
    e.preventDefault();
    const cantidad = parseFloat(inputCantidad.value);
    if (isNaN(cantidad) || cantidad <= 0) {
        //mostrarError("Por favor, ingrese una cantidad válida.");
        //alert("Por favor, ingrese una cantidad válida.");
        createAlert('Opps!','','Por favor, ingrese una cantidad válida.','danger',true,false,'pageMessages');
        return;
    } else if (cantidad > usuarioActual.saldo) {
        /*mostrarError(
        "Fondos insuficientes. Su saldo actual es: $" +
        usuarioActual.saldo.toFixed(2)
        );
        alert("Fondos insuficientes. Su saldo actual es: $" + usuarioActual.saldo.toFixed(2));*/
        createAlert('Opps!','','Fondos insuficientes.','danger',true,false,'pageMessages');
    } else if(usuarioActual.saldo-cantidad <10){
        //alert("No puedes tener menos de 10 en tu cuenta bancaria . Su saldo actual es: $" + usuarioActual.saldo.toFixed(2));
        createAlert('Opps!','','No puedes tener menos de 10 en tu cuenta bancaria','danger',true,false,'pageMessages');
    } else {
        usuarioActual.saldo -= cantidad;
        actualizarSaldo();
        inputCantidad.value = "";
    }
}

// Función para cerrar sesión
function cerrarSesion() {
    usuarioActual = null;
    mostrarLogin();
}

// Event listeners
loginForm.addEventListener("submit", login);
btnDepositar.addEventListener("click", depositar);
btnRetirar.addEventListener("click", retirar);
btnCerrarSesion.addEventListener("click", cerrarSesion);

// Mostrar formulario de login inicialmente
mostrarLogin();


// Funcion createAlert

function createAlert(title, summary, details, severity, dismissible, autoDismiss, appendToId) {
    var iconMap = {
      info: "fa fa-info-circle",
      success: "fa fa-thumbs-up",
      warning: "fa fa-exclamation-triangle",
      danger: "fa ffa fa-exclamation-circle"
    };
  
    var iconAdded = false;
  
    var alertClasses = ["alert", "animated", "flipInX"];
    alertClasses.push("alert-" + severity.toLowerCase());
  
    if (dismissible) {
      alertClasses.push("alert-dismissible");
    }
  
    var msgIcon = $("<i />", {
      "class": iconMap[severity] // you need to quote "class" since it's a reserved keyword
    });
  
    var msg = $("<div />", {
      "class": alertClasses.join(" ") // you need to quote "class" since it's a reserved keyword
    });
  
    if (title) {
      var msgTitle = $("<h4 />", {
        html: title
      }).appendTo(msg);
      
      if(!iconAdded){
        msgTitle.prepend(msgIcon);
        iconAdded = true;
      }
    }
  
    if (summary) {
      var msgSummary = $("<strong />", {
        html: summary
      }).appendTo(msg);
      
      if(!iconAdded){
        msgSummary.prepend(msgIcon);
        iconAdded = true;
      }
    }
  
    if (details) {
      var msgDetails = $("<p />", {
        html: details
      }).appendTo(msg);
      
      if(!iconAdded){
        msgDetails.prepend(msgIcon);
        iconAdded = true;
      }
    }
    
  
    if (dismissible) {
      var msgClose = $("<span />", {
        "class": "close", // you need to quote "class" since it's a reserved keyword
        "data-dismiss": "alert",
        html: "<i class='fa fa-times-circle'></i>"
      }).appendTo(msg);
    }
    
    $('#' + appendToId).prepend(msg);
    
    if(autoDismiss){
      setTimeout(function(){
        msg.addClass("flipOutX");
        setTimeout(function(){
          msg.remove();
        },1000);
      }, 5000);
    }
  }
