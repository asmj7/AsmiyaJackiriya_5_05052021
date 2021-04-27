const url = 'http://localhost:3000/api/teddies/';
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Afficher le produit sélectionné
function getParameter(teddy) {
  let src = document.querySelector(".teddy-pic").src = `${teddy.imageUrl}`;
  let name = document.querySelector('.teddy-name');
  let description = document.querySelector('.description');
  description.innerText = `${teddy.description}`;
  name.innerText = `${teddy.name}`;
  let price = document.querySelector('.price')
  price.innerText = `${(teddy.price/100).toFixed(2)+' €'}`;
}

// Input avec liste de couleurs
function listHTML(teddy) {
  let datalist = document.querySelector('#datalist')

  let options = document.createElement('option')
  options.innerHTML = `${teddy.colors}`;
  datalist.appendChild(options)
  console.log(datalist)
}

function optionList(option) {
  option.forEach(teddy => {
    listHTML(teddy);
  });
}

fetch(url+id)
  .then(function (response) {
    return response.json();
  }).then(getParameter)
  .then(optionList)
  .catch(function (error) {
    console.log(error)
  });