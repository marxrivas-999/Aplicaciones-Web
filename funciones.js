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