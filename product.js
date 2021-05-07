const url = 'http://localhost:3000/api/teddies/';

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

//Afficher le produit sélectionné
function getParameter(teddy) {
  let src = document.querySelector(".scnd-teddy-pic").src = `${teddy.imageUrl}`;
  let name = document.querySelector('.scnd-teddy-name');
  let description = document.querySelector('.description');
  name.innerText = `${teddy.name}`;
  description.innerText = `${teddy.description}`;
  let price = document.querySelector('.scnd-price')
  price.innerText = `${(teddy.price/100).toFixed(2)+' €'}`;
  // let a = document.querySelector('.btnAdd');
  // a.setAttribute('href', `${teddy._id}`);
  let options = teddy.colors;
  optionList(options);

  console.log(teddy)
  console.log(teddy.colors)
};

// Input avec liste de couleurs
function listHTML(teddy) {
  let datalist = document.querySelector('#select')

  let options = document.createElement('option')
  options.innerHTML = teddy;
  datalist.appendChild(options);
};

function optionList(colors) {
  colors.forEach((teddy) => {
    listHTML(teddy);
  });
};

fetch(url + id)
  .then(function (response) {
    return response.json();
  }).then(getParameter)
  // .then(listHTML)
  // .then(optionList(`${teddy.colors}`))
  .catch(function (error) {
    console.log(error)
  });