const url2 = 'http://localhost:3000/api/teddies/';


function getId() {
  let btn = document.querySelector('.btnAdd').getAttribute('href')
  console.log(btn)

  btn.addEventListener('click', (e)=>{
    localStorage.setItem('shoppingCart', )
  })
}

    

  function increment() {}

  function decrement() {}


fetch(url2)
  .then(function (response) {
    return response.json();
  })
  .catch(function (error) {
    console.log(error)
  }); 