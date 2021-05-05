const url2 = 'http://localhost:3000/api/teddies/';

const urlParams2 = new URLSearchParams(window.location.search);
const id2 = urlParams2.get('id');


function getSelectedTeddies(teddy) {

  let src = document.querySelector(".p3-teddy-pic").src = `${teddy.imageUrl}`;
  let nameTeddy = document.querySelector('.p3-teddy-name');
  nameTeddy.innerText = `${teddy.name}`;
  let price = document.querySelector('.p3-price')
  price.innerText = `${(teddy.price/100).toFixed(2)+' €'}`;


  //Récuperer le produit sélectionné dns le localStorage
  const btnAdd = document.querySelector('.btnAdd');
  let items = []
  for(i=0; i<btnAdd.length; i++) {
    btnAdd[i].addEventListener("click",function(e){
      if(typeof(Storage) !== 'undefined'){
    
        let item = {
          _id: teddy._id,
          name: teddy.imageUrl,
          price: teddy.price
        }

      }else {
        console.log('Erreur')
      }
    })
  }

  
}

// function incrementCart() {}

// function decrementCart() {}


fetch(url2 + id2)
  .then(function (response) {
    return response.json();
  }).then(getSelectedTeddies)
  .catch(function (error) {
    console.log(error)
  });