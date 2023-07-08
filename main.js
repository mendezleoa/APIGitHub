const resultados = document.getElementById("resultados")

const botonTemas = document.getElementById("temas");
const form = document.getElementById("form");
let timer;

form.addEventListener("input", () => {

  clearTimeout(timer);

  timer = setTimeout(() => {
    let users = document.getElementById("text-input").value
    fetch('https://api.github.com/search/users?q='+ users )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data.items);
      resultados.innerHTML = '';
      data.items.slice(0,5).forEach(user => {
        buscarUsuario(user.url);
      });
    })
    .catch((error) => {
      console.log(error);
    })
  }, 700)
})

function buscarUsuario(user) {
  fetch(user)
    .then((resp_u) => resp_u.json())
    .then((data_u) => {
      console.log(data_u);
      let bio = '';
      if (!data_u.bio) {
        bio = "Sin biografía";
      } else {
        bio = data_u.bio;
      }
      resultados.innerHTML += `
      <div class="tarjeta">
        <img src="${data_u.avatar_url}" class="avatar">
        <div class="datos">
          <h2>Id: ${data_u.login}</h2>
          <p>Repositorios: ${data_u.public_repos}</p>
          <p class="bio">Biografía: ${bio}</p>
        </div>
      </div>`;
    })
}

botonTemas.addEventListener("click", () => {
  document.body.classList.toggle("dark")
});