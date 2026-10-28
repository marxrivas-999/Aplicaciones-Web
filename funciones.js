AOS.init({ duration: 700, once: true });

const pared = document.querySelector("#pared");

if (pared) {
  const formulario = document.querySelector("#formulario-luces");
  const caja = document.querySelector("#mensaje");
  const boton = document.querySelector("#boton-enviar");
  const respuesta = document.querySelector("#respuesta");
  const botonesRapidos = document.querySelectorAll("[data-mensaje]");
  const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const colores = ["#e1202b", "#ff7a1a", "#f2d334", "#3ddc84", "#4aa3ff", "#b06cff", "#ff5fa8", "#2ee6d6"];

  for (let i = 0; i < abecedario.length; i++) {
    const letra = abecedario[i];
    const celda = document.createElement("div");
    celda.className = "letra";
    celda.id = "letra-" + letra;
    celda.innerHTML = '<span class="foco"></span>' + letra;
    pared.appendChild(celda);
  }

  function mostrarMensaje(texto, esError) {
    respuesta.textContent = texto;
    if (esError) {
      respuesta.classList.add("error");
    } else {
      respuesta.classList.remove("error");
    }
  }

  function enviarLuces(palabra) {
    boton.disabled = true;   
    mostrarMensaje("Enviando mensaje...", false);

    for (let i = 0; i < palabra.length; i++) {
      const letra = palabra[i];
      const celda = document.querySelector("#letra-" + letra);
      const foco = celda.querySelector(".foco");
      const color = colores[abecedario.indexOf(letra) % 8];

      setTimeout(function () {
        celda.classList.add("prendida");
        foco.style.backgroundColor = color;
        foco.style.boxShadow = "0 0 12px 4px " + color;
      }, i * 900);

      setTimeout(function () {
        celda.classList.remove("prendida");
        foco.style.backgroundColor = "";
        foco.style.boxShadow = "";
      }, i * 900 + 700);
    }

    setTimeout(function () {
      boton.disabled = false;
      mostrarMensaje("Mensaje recibido: " + palabra, false);
    }, palabra.length * 900 + 700);
  }

  formulario.addEventListener("submit", function (e) {
    e.preventDefault();  
    const palabra = caja.value.trim().toUpperCase();

    let soloLetras = true;
    for (let i = 0; i < palabra.length; i++) {
      if (abecedario.includes(palabra[i]) === false) {
        soloLetras = false;
      }
    }

    if (palabra === "") {
      mostrarMensaje("Escribe una palabra para enviarla.", true);
    } else if (soloLetras === false) {
      mostrarMensaje("Usa solo letras, sin espacios, números ni acentos.", true);
    } else {
      enviarLuces(palabra);
    }
  });

  for (let i = 0; i < botonesRapidos.length; i++) {
    botonesRapidos[i].addEventListener("click", function () {
      const palabra = botonesRapidos[i].getAttribute("data-mensaje");
      caja.value = palabra;
      enviarLuces(palabra);
    });
  }
}

const botonesMundo = document.querySelectorAll(".boton-mundo");
const mundos = document.querySelectorAll(".mundo");

for (let i = 0; i < botonesMundo.length; i++) {
  botonesMundo[i].addEventListener("click", function () {
    for (let j = 0; j < botonesMundo.length; j++) {
      botonesMundo[j].classList.remove("activo");
    }
    for (let j = 0; j < mundos.length; j++) {
      mundos[j].classList.add("oculto");
    }
    botonesMundo[i].classList.add("activo");
    const id = botonesMundo[i].getAttribute("data-mundo");
    document.querySelector("#" + id).classList.remove("oculto");
  });
}

const formularioClub = document.querySelector("#formulario-club");

if (formularioClub) {
  const nombre = document.querySelector("#nombre");
  const correo = document.querySelector("#correo");
  const edad = document.querySelector("#edad");
  const personaje = document.querySelector("#personaje");
  const temporada = document.querySelector("#temporada");
  const opinion = document.querySelector("#opinion");
  const reglas = document.querySelector("#reglas");
   const carnet = document.querySelector("#carnet");

  function revisar(campo, estaBien, textoError) {
    const aviso = document.querySelector("#error-" + campo.id);
    if (estaBien) {
      campo.classList.remove("mal");
      campo.classList.add("bien");
      aviso.textContent = "";
    } else {
      campo.classList.remove("bien");
      campo.classList.add("mal");
      aviso.textContent = textoError;
    }
    return estaBien;
  }

  formularioClub.addEventListener("submit", function (e) {
    e.preventDefault();  

    let todoBien = true;
    if (revisar(nombre, nombre.value.trim().length >= 3, "Escribe al menos 3 letras.") === false) { todoBien = false; }
    if (revisar(correo, correo.value.includes("@") && correo.value.includes("."), "Escribe un correo válido.") === false) { todoBien = false; }
    if (revisar(edad, edad.value >= 10 && edad.value <= 99, "La edad debe estar entre 10 y 99.") === false) { todoBien = false; }
    if (revisar(personaje, personaje.value !== "", "Elige un personaje.") === false) { todoBien = false; }
    if (revisar(temporada, temporada.value !== "", "Elige una temporada.") === false) { todoBien = false; }
    if (revisar(opinion, opinion.value.trim().length >= 10, "Cuéntanos al menos 10 caracteres.") === false) { todoBien = false; }
    if (revisar(reglas, reglas.checked, "Debes aceptar las reglas del club.") === false) { todoBien = false; }

    if (todoBien === false) {
      Swal.fire({
        icon: "error",
        title: "Revisa el formulario",
        text: "Hay campos marcados en rojo.",
        background: "#1b2a41",
        color: "#f2f2f2",
        confirmButtonColor: "#e1202b"
      });
      return;
    }

    const marcados = document.querySelectorAll("input[name='gustos']:checked");
    let gustos = "";
    for (let i = 0; i < marcados.length; i++) {
      if (i > 0) {
        gustos = gustos + ", ";
      }
      gustos = gustos + marcados[i].value;
    }
    if (gustos === "") {
      gustos = "Sin elegir";
    }

    const nombrePersonaje = personaje.options[personaje.selectedIndex].text;
    carnet.innerHTML =
      '<img class="foto-carnet" src="img/' + personaje.value + '.jpg" alt="' + nombrePersonaje + '">' +
      "<h2>Club Hellfire</h2>" +
      '<p class="nombre-carnet">' + nombre.value.trim() + "</p>" +
      "<p>Personaje: " + nombrePersonaje + "</p>" +
      "<p>Favorita: " + temporada.value + "</p>" +
      "<p>Gustos: " + gustos + "</p>";
  
    Swal.fire({
      icon: "success",
      title: "¡Bienvenido al Club Hellfire!",
      text: nombre.value.trim() + ", ya eres parte del club.",
      background: "#1b2a41",
      color: "#f2f2f2",
      confirmButtonColor: "#e1202b"
    });

    formularioClub.reset();
    const verdes = document.querySelectorAll(".bien");
    for (let i = 0; i < verdes.length; i++) {
      verdes[i].classList.remove("bien");
    }
  });
}