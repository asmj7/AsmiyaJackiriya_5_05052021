// Appel de l'API 
const url = 'http://localhost:3000/api/teddies';

// à utiliser dans product.js
// const urlParams = new URLSearchParams(window.location.search);
// const id = urlParams.get('id');

/**
 * product = {
    id: ObjectID
    name: string
    price: number
    description: string
    imageUrl: string
 }
 * 
*/
function generateProductHTML(teddy) {
  //Selectionner la div qui va contenir le outerHTML du teddy-container
  let container = document.querySelector('.articles-container')

  //Création de la balise article et ajout d'une classe
  let article = document.createElement('article')
  article.className = 'teddy-container'

  //Child de l'article
  let image = document.createElement('div');
  image.className = 'teddy';
  let info = document.createElement('div');
  info.className = 'teddy-info';
  let description = document.createElement('div');
  description.className = 'description';
  description.innerText = teddy.description;
  let a = document.createElement('a');
  a.className = "btnAdd";
  a.setAttribute('href', `products.html?id=${teddy._id}`);
  a.innerText = "Afficher plus";

  //Child des autres balises
  let img = document.createElement('img');
  img.className = 'teddy-pic';
  img.setAttribute('src', teddy.imageUrl);
  let h2 = document.createElement('h2');
  h2.className = 'teddy-name';
  h2.innerText = teddy.name;
  let span = document.createElement('span');
  span.className = 'price';
  span.innerText = `${teddy.price} €`;

  image.appendChild(img);
  info.appendChild(h2);
  info.appendChild(span);
  article.appendChild(image);
  article.appendChild(info);
  article.appendChild(description);
  article.appendChild(a);

  container.appendChild(article);
}

function handleProductsData(products) {
  // parcourir les produits
  products.forEach(teddy => {
    // afficher les produits
    generateProductHTML(teddy);
  });
}

fetch(url)
  .then(function (reponse) {
    return reponse.json();
  }).then(handleProductsData)
  .catch(function (error) {
    console.log(error);
  });




