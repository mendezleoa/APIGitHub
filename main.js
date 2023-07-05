const resultados = document.getElementById("resultados")

let user = "ferxxo"

fetch('https://api.github.com/search/users?q='+ user )
.then((resp) => resp.json())
.then((data) => {
  console.log(data.items);
  fetch(data.items[0].url)
  .then((resp_u) => resp_u.json())
  .then((data_u) => {
    console.log(data_u);
  })
})
.catch((error) => {
  console.log(error)
})