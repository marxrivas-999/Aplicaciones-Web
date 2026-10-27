AOS.init({ duration: 700, once: true });

const pared = document.querySelector("#pared");

if (pared) {
  const abecedario = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let i = 0; i < abecedario.length; i++) {
    const letra = abecedario[i];
    const celda = document.createElement("div");
    celda.className = "letra";
    celda.id = "letra-" + letra;
    celda.innerHTML = '<span class="foco"></span>' + letra;
    pared.appendChild(celda);
  }
}