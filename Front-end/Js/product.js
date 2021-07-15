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
  price.innerText = `${(teddy.price / 100).toFixed(2) + ' €'}`;
  let options = teddy.colors;
  optionList(options);
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
  // .then(cartHTML)
  .catch(function (error) {
    console.log(error)
  });


let btnAdd = document.querySelector('.btnAdd');
btnAdd.addEventListener("click", function () {
  // console.log(this.closest('.scnd-teddy-container').getAttribute('data-id'));
  let name = document.querySelector('.scnd-teddy-name').innerText;
  let image = document.querySelector('.scnd-teddy-pic').getAttribute('src');
  let color = document.querySelector('#select').value
  let price = parseInt(document.querySelector('.scnd-price').innerText);
  let produits = JSON.parse(localStorage.getItem('produits')) || [];
  let productIndex = produits.findIndex(function (element) {
    console.log(element.price);
    return element.id === id;
  })
  console.log(productIndex)
  console.log(produits);
  console.log(produits[productIndex]);
  if (productIndex === -1) {
    produits.push({
      id: id,
      image: image,
      price: price,
      name: name,
      color: color,
      count: 1
    })
  } else {
    produits[productIndex] = {
      id: id,
      image: image,
      price: price,
      name: name,
      color: color,
      count: produits[productIndex].count + 1
    }
  }
  localStorage.setItem('produits', JSON.stringify(produits))

  let msgTotal = produits.reduce(function (prev, cur) {
    console.log(prev);
    console.log(cur);
    return prev + cur.count;
  }, 0)
  console.log(msgTotal);
  document.querySelector('.number').innerHTML = msgTotal;
  localStorage.setItem('number', msgTotal)

  alert(name + " (" + color + ") a été ajouté au panier !");

});


document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;