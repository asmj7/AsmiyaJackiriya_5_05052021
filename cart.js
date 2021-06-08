document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;

function cartPage(product) {

    let totalPrice = 0;
    // Création d'une balise article, et de 5 div 
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

    // image de teddy
    let img = document.createElement('img');
    img.className = 'p3-teddy-pic';
    img.setAttribute('src', product.image);

    // nom et couleurs
    let h2 = document.createElement('h2');
    h2.className = 'p3-teddy-name';
    h2.innerText = product.name;
    let colors = document.createElement('div');
    colors.setAttribute('value', "#")
    colors.className = 'p3-colors';
    colors.innerText = "Couleur : "

    // input pour la quantité
    let p = document.createElement('p');
    p.className = 'quantity';
    p.innerText = "Chosissez la quantité"
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

    imgContainer.appendChild(img);

    teddyInfo.appendChild(h2);
    teddyInfo.appendChild(colors);

    inputGroup.appendChild(p);
    inputGroup.appendChild(buttonOne);
    inputGroup.appendChild(input);
    inputGroup.appendChild(buttonTwo);

    let selectedProduct = document.querySelector('.selected-product');

    selectedProduct.appendChild(article);
    article.appendChild(imgContainer);
    article.appendChild(infoContainer);

    infoContainer.appendChild(teddyInfo);
    infoContainer.appendChild(inputGroup);

    infoContainer.appendChild(total);

    // Calcul du total
    let totalPriceHTML = document.querySelector('.total-price');
    totalPrice = product.count * product.price;
    totalPriceHTML.innerText += totalPrice + ' €';
    

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
        };

        document.querySelector(`[id="${product.id}"] .choose-qty`).value = produits[productIndex].count;
        document.querySelector(`[id="${product.id}"] .total`).innerText = `${((produits[productIndex].price * (produits[productIndex].count))).toFixed(2)} €`;
        localStorage.setItem('produits', JSON.stringify(produits));

        let msgTotal = produits.reduce(function (prev, cur) {
            return prev + cur.count;
        }, 0);
        document.querySelector('.number').innerHTML = msgTotal;
        localStorage.setItem('number', msgTotal);
    });

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
        };

        localStorage.setItem('produits', JSON.stringify(produits));
        let msgTotal = produits.reduce(function (prev, cur) {
            return prev + cur.count;
        }, 0);
        document.querySelector('.number').innerHTML = msgTotal;
        localStorage.setItem('number', msgTotal);

    });
};

//Boucle de la fonction cartPage pour chaque 
// produit présent dans le localStorage
function loopOfProducts() {
    let produits = JSON.parse(localStorage.getItem('produits'));
    produits.forEach(element => {
        cartPage(element);
    });
}
loopOfProducts();



