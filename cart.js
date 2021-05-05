const url2 = 'http://localhost:3000/api/teddies/';

const urlParams2 = new URLSearchParams(window.location.search);
const id2 = urlParams2.get('id');

// document.querySelector('.btnAdd').addEventListener("click", getSelectedTeddies);

function getSelectedTeddies(teddy) {

  let src = document.querySelector(".p3-teddy-pic").src = `${teddy.imageUrl}`;
  let nameTeddy = document.querySelector('.p3-teddy-name');
  nameTeddy.innerText = `${teddy.name}`;
  let price = document.querySelector('.p3-price')
  price.innerText = `${(teddy.price/100).toFixed(2)+' €'}`;

}

fetch(url2 + id2)
  .then(function (response) {
    return response.json();
  }).then(getSelectedTeddies)
  .catch(function (error) {
    console.log(error)
  });