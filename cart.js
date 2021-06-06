document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;

// function cartHTML() {
//     let produits = JSON.parse(localStorage.getItem('produits'));
//     let img = document.querySelector('.p3-teddy-pic');
//     img.setAttribute('src', produits[0].image);
//     let price = document.querySelector('.p3-price')
//     price.innerHTML = produits[0].price
// }
// cartHTML();

function cartPage(product) {



    let article = document.createElement('article');
    article.id = product.id;
    article.className = 'p3-teddy-container';
    let imgContainer = document.createElement('div');
    imgContainer.className = 'p3-teddy'
    let infoContainer = document.createElement('div');
    infoContainer.className = 'p3-infos-container'
    let teddyInfo = document.createElement('div');
    teddyInfo.className = 'p3-teddy-info';
    let inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';
    let total = document.createElement('div');
    total.className = 'total';
    total.innerText = `${((product.price * product.count)).toFixed(2)} €`;

    let img = document.createElement('img');
    img.className = 'p3-teddy-pic';
    img.setAttribute('src', product.image);

    let h2 = document.createElement('h2');
    h2.className = 'p3-teddy-name';
    h2.innerText = product.name;
    let span = document.createElement('span');
    span.className = 'p3-price';
    let colors = document.createElement('div');
    colors.className = 'p3-colors';

    let p = document.createElement('p');
    p.className = 'quantity';
    let buttonOne = document.createElement('button');
    buttonOne.className = 'minus';
    buttonOne.innerText = '-';
    let buttonTwo = document.createElement('button');
    buttonTwo.className = 'plus';
    buttonTwo.innerText = '+';
    let input = document.createElement('input');
    input.className = 'choose-qty';
    input.setAttribute('id', 'demoInput');
    input.setAttribute('value', product.count);
    input.setAttribute('min', '0');


    let pTotal = document.createElement('p');
    pTotal.className = 'total-text';
    let totalPrice = document.createElement('span');
    totalPrice.className = 'total-price';

    imgContainer.appendChild(img);

    teddyInfo.appendChild(h2);
    teddyInfo.appendChild(span);
    teddyInfo.appendChild(colors);

    inputGroup.appendChild(p);
    inputGroup.appendChild(buttonOne);
    inputGroup.appendChild(input);
    inputGroup.appendChild(buttonTwo);

    total.appendChild(pTotal);
    total.appendChild(totalPrice);

    let selectedProduct = document.querySelector('.selected-product');

    selectedProduct.appendChild(article);
    article.appendChild(imgContainer);
    article.appendChild(infoContainer);

    infoContainer.appendChild(teddyInfo);
    infoContainer.appendChild(inputGroup);

    infoContainer.appendChild(total);
    // incrémenter le nombre de produit au click sur +
    buttonTwo.addEventListener("click", function () {
        let produits = JSON.parse(localStorage.getItem('produits'));
        let productIndex = produits.findIndex(function (element) {
            return element.id === product.id;
        });
        produits[productIndex] = {
            id: product.id,
            image: product.image,
            price: product.price,
            name: product.name,
            count: produits[productIndex].count + 1
        }

        document.querySelector(`[id="${product.id}"] .choose-qty`).value = produits[productIndex].count;
        document.querySelector(`[id="${product.id}"] .total`).innerText = `${((produits[productIndex].price * (produits[productIndex].count))).toFixed(2)} €`;
        localStorage.setItem('produits', JSON.stringify(produits));

        let msgTotal = produits.reduce(function (prev, cur) {
            return prev + cur.count;
          }, 0)
         document.querySelector('.number').innerHTML = msgTotal;
          localStorage.setItem('number', msgTotal)
    })

    // Enlever le produit si la valeur est égale à 0
    buttonOne.addEventListener('click', function () {
        let produits = JSON.parse(localStorage.getItem('produits'));
        let productIndex = produits.findIndex(function (element) {
            return element.id === product.id;
        });

        if (produits[productIndex].count === 1) {
            produits.splice(productIndex, 1)
            document.getElementById(product.id).remove();
        } else {
            produits[productIndex] = {
                id: product.id,
                image: product.image,
                price: product.price,
                name: product.name,
                count: produits[productIndex].count - 1
            }
            document.querySelector(`[id="${product.id}"] .choose-qty`).value = produits[productIndex].count;
            document.querySelector(`[id="${product.id}"] .total`).innerText = `${((produits[productIndex].price * (produits[productIndex].count))).toFixed(2)} €`;
        }



        localStorage.setItem('produits', JSON.stringify(produits));
        let msgTotal = produits.reduce(function (prev, cur) {
            return prev + cur.count;
          }, 0)
         document.querySelector('.number').innerHTML = msgTotal;
          localStorage.setItem('number', msgTotal)

    })


}


//Boucle de la fonction cartPage pour chaque 
// produit présent dans le localStorage


function loopOfProducts() {
    let produits = JSON.parse(localStorage.getItem('produits'));
    produits.forEach(element => {
        cartPage(element);
    });
}

loopOfProducts();

