const resultados = document.getElementById("resultados")

const botonTemas = document.getElementById("temas");
const form = document.getElementById("form");
let timer;

form.addEventListener("input", () => {

  clearTimeout(timer);

  timer = setTimeout(() => {
    let users = document.getElementById("text-input").value
    if (users.trim().length == 0) {
      return
    } else {
      fetch('https://api.github.com/search/users?q='+ users )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data.items);
        resultados.innerHTML = '';
        data.items.slice(0,3).forEach(user => {
          buscarUsuario(user.url);
        });
      })
      .catch((error) => {
        console.log(error);
      })
    }
  }, 700)
})

function buscarUsuario(user) {
  fetch(user)
    .then((resp_u) => resp_u.json())
    .then((data_u) => {
      console.log(data_u);
      let nombre = '';
      if (!data_u.name) {
        nombre = data_u.login;
      } else {
        nombre = data_u.name;
      }

      let company = '';
      if (!data_u.company) {
        company = "Ninguna afiliada";
      } else {
        company = data_u.company;
      }

      let url = '';
      if (data_u.html_url.length == 26) {
        url = data_u.html_url;
      } else {
        url = data_u.html_url.substring(0,25) + "...";
      }
      resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${data_u.avatar_url}" class="avatar">
        <div class="datos">
          <h2>Id: ${data_u.login}</h2>
          <h3>Nombre: ${nombre}</h3>
          <p>Repositorios: ${data_u.public_repos}</p>
          <p>Empresa: ${company}</p>
          <p>Link del usuario: <a href="${data_u.html_url}" target="_blank" rel="noopener noreferrer">${url}</a></p>
        </div>
      </div>`;
    })
}

if (localStorage.getItem('theme') == "dark") {
  document.body.classList.add("dark")
}

botonTemas.addEventListener("click", () => {
  document.body.classList.toggle("dark")
  if (document.body.classList.value == "dark") {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});