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
    const carnet = document.querySelector("#carnet");
    const vista = document.querySelector("#vista");
    const registro = document.querySelector("#registro");

    if (!carnet || !registro) {
        console.error(
            "No se encontró #carnet o #registro. Revisa los IDs del HTML."
        );
    }

    if (personaje && vista) {
        personaje.addEventListener("change", function () {
            if (personaje.value === "") {
                vista.classList.add("oculto");
                vista.removeAttribute("src");
            } else {
                vista.src = "img/" + personaje.value + ".jpg";
                vista.classList.remove("oculto");
            }
        });
    }

    function revisar(campo, estaBien, textoError) {
        const aviso = document.querySelector("#error-" + campo.id);

        campo.classList.toggle("bien", estaBien);
        campo.classList.toggle("mal", !estaBien);

        if (aviso) {
            aviso.textContent = estaBien ? "" : textoError;
        }

        return estaBien;
    }

    formularioClub.addEventListener("submit", function (e) {
        e.preventDefault();

        if (!carnet || !registro) {
            alert("Error: revisa los elementos carnet y registro en el HTML.");
            return;
        }

        let todoBien = true;

        if (!revisar(
            nombre,
            nombre.value.trim().length >= 3,
            "Escribe al menos 3 letras."
        )) todoBien = false;

        if (!revisar(
            correo,
            correo.validity.valid && correo.value.trim() !== "",
            "Escribe un correo válido."
        )) todoBien = false;

        if (!revisar(
            edad,
            edad.value !== "" &&
            Number(edad.value) >= 10 &&
            Number(edad.value) <= 99,
            "La edad debe estar entre 10 y 99."
        )) todoBien = false;

        if (!revisar(
            personaje,
            personaje.value !== "",
            "Elige un personaje."
        )) todoBien = false;

        if (!revisar(
            temporada,
            temporada.value !== "",
            "Elige una temporada."
        )) todoBien = false;


        const marcados = document.querySelectorAll(
            'input[name="gustos"]:checked'
        );

        const avisoGustos = document.querySelector("#error-gustos");

        if (marcados.length === 0) {
            if (avisoGustos) {
                avisoGustos.textContent = "Elige al menos una opción.";
            }
            todoBien = false;
        } else if (avisoGustos) {
            avisoGustos.textContent = "";
        }

        if (!todoBien) {
            Swal.fire({
                icon: "error",
                title: "Revisa el formulario",
                text: "Hay campos que necesitan tu atención.",
                background: "#1b2a41",
                color: "#f2f2f2",
                confirmButtonColor: "#e1202b"
            });
            return;
        }

        const gustos = Array.from(marcados)
            .map(function (opcion) {
                return opcion.value;
            })
            .join(", ");

        const nombreCompleto = nombre.value.trim();
        const nombrePersonaje =
            personaje.options[personaje.selectedIndex].text;

        carnet.innerHTML = `
            <h2>Tu carnet</h2>
            <div class="contenido-carnet">
                <img
                    class="foto-carnet"
                    src="img/${personaje.value}.jpg"
                    alt="${nombrePersonaje}"
                >
                <h2>Club Hellfire</h2>
                <p class="nombre-carnet">${nombreCompleto}</p>
                <p>Personaje: ${nombrePersonaje}</p>
                <p>Temporada favorita: ${temporada.value}</p>
                <p>Gustos: ${gustos}</p>
                <p class="frase-carnet">Miembro oficial del Club Hellfire</p>
                <button
                    type="button"
                    id="boton-nuevo"
                    class="boton-rojo"
                >
                    Unir un nuevo miembro
                </button>
            </div>
        `;

        registro.classList.add("oculto");
        carnet.classList.remove("oculto");

        Swal.fire({
            icon: "success",
            title: "¡Bienvenido al Club Hellfire!",
            text: nombreCompleto + ", ya eres parte del club.",
            background: "#1b2a41",
            color: "#f2f2f2",
            confirmButtonColor: "#e1202b"
        });

        const fotoCarnet = carnet.querySelector(".foto-carnet");

        fotoCarnet.addEventListener("error", function () {
            console.error(
                "No se pudo cargar la imagen: " + fotoCarnet.src
            );
        });

        formularioClub.reset();

        if (vista) {
            vista.classList.add("oculto");
            vista.removeAttribute("src");
        }

        formularioClub.querySelectorAll(".bien, .mal").forEach(
            function (campo) {
                campo.classList.remove("bien", "mal");
            }
        );

        document.querySelector("#boton-nuevo").addEventListener(
            "click",
            function () {
                carnet.classList.add("oculto");
                registro.classList.remove("oculto");
            }
        );
    });
}