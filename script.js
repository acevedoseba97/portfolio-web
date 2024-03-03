const d = document,
  w = window;
let menuVisible = false;

//Función que oculta o muestra el menú
function mostrarOcultarMenu() {
  if (menuVisible) {
    d.getElementById("nav").classList = "";
    menuVisible = false;
  } else {
    d.getElementById("nav").classList = "responsive";
    menuVisible = true;
  }
}

//Función que oculta el menú tras seleccionar una opción
function seleccionar() {
  d.getElementById("nav").classList = "";
  menuVisible = false;
}

//detecto el click según el elemento que origina el evento
d.addEventListener("click", (e) => {
  if (
    e.target.matches("header .nav-responsive") ||
    e.target.matches("header .nav-responsive *")
  ) {
    //console.log(e.target);
    mostrarOcultarMenu();
  }

  if (e.target.matches("#nav ul li a")) {
    seleccionar();
  }
});

//detecto el click del pdf del CV
d.getElementById("downloadCV").addEventListener("click", function () {
  let link = this.querySelector("a");
  link.click();
});

//Función para el formulario de contacto
function contactForm() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");

  //console.log($inputs);

  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;

      //console.log($input, pattern);

      //Validación de expresiones regulares
      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);

        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Enviando formulario");

    const $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response");

    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/acevedosebastian787b@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((response) =>
        response.ok ? response.json() : Promise.reject(response)
      )
      .then((json) => {
        console.log(json);
        $loader.classList.add("none");
        $response.classList.remove("none");
        /* $response.innerHTML = `<p>${json.message}</p>`; */
        $form.reset();
      })
      .catch((error) => {
        console.log(error);
        let message =
          error.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.innerHTML = `<p>Error ${error.status}: ${message}</p>`;
      })
      .finally(() => {
        setTimeout(() => {
          $response.classList.add("none");
          $response.innerHTML = "";
        }, 3000);
      });
  });
}

d.addEventListener("DOMContentLoaded", contactForm);
