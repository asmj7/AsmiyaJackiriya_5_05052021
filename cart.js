document.querySelector('.number').innerHTML = localStorage.getItem('number') || 0;

function cartPage(product) {

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
    colors.innerHTML = "<strong>Couleur : </strong>" + `${product.color}`;

    // input pour la quantité
    let p = document.createElement('p');
    p.className = 'quantity';
    p.innerHTML = "<strong>Chosissez la quantité</strong>"
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

        // Calcul du total
        let totalPrice = 0;
        produits.forEach(element => {
            totalPrice += element.count * element.price;
            console.log(element.count)
            let totalPriceHTML = document.querySelector('.total-price');
            totalPriceHTML.innerHTML = "Total : " + totalPrice + ' €';
        });

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
        // Calcul du total
        let totalPrice = 0;
        produits.forEach(element => {
            totalPrice += element.count * element.price;
            console.log(element.count)
            let totalPriceHTML = document.querySelector('.total-price');
            totalPriceHTML.innerText = 'Total : ' + totalPrice + ' €';
        });

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
    let totalPrice = 0;
    produits.forEach(element => {
        cartPage(element);
        // Calcul du total
        totalPrice += element.count * element.price;
        // console.log(element.count)
    });
    let totalPriceHTML = document.querySelector('.total-price');
    totalPriceHTML.innerText = 'Total : ' + totalPrice.toFixed(2) + ' €';
}
loopOfProducts();

// Vérifier le format de l'adresse mail
function validation() {

    let form = document.querySelector('#form_1');
    let email = document.querySelector('#email').value;
    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    let invalid = document.querySelector('.text-invalid');

    if (email.match(pattern)) {
        form.classList.add('valid');
        form.classList.remove('invalid');
        invalid.innerText = '';
    }
    else {
        form.classList.remove('valid');
        form.classList.add('invalid');
        invalid.innerText = 'Adresse e-mail non valide';
        invalid.style.color = '#F04824';
    }
}

// Vérifier si tous les champs sont bien remplis à la validation
function validateForm() {
    var x = document.forms["myForm"]["fname"]["lname"]["city"]["email"].value;
    let form = document.querySelector('#form_1');
    let empty = document.querySelector('.empty');
    if (x == "" || form.className == 'invalid') {
        empty.innerText = 'veuillez remplir les champs obligatoires';
        empty.style.color = '#F04824';
        return false;
    }
}

// Récupérer les informations de contact de l'utilisateur à la validation
let submit = document.querySelector('.submit');

submit.addEventListener('click', function (event) {
    event.preventDefault();
    let myForm = document.getElementById('form_1');
    let formData = new FormData(myForm);
    let produits = JSON.parse(localStorage.getItem('produits'));
    let products = [];
    let totalPrice = 0;

    produits.forEach(function (produit) {
        totalPrice += produit.count * produit.price;
        for (let i = 0; i < produit.count; i++) {
            products.push(produit.id);
        }
    })

    fetch("http://localhost:3000/api/teddies/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            contact: {
                firstName: formData.get('fname'),
                lastName: formData.get('lname'),
                address: formData.get('adress'),
                city: formData.get('city'),
                email: formData.get('email')
            },
            products: products
        })
    })
        .then(function (response) {
            return response.json();
        }).then(function (response) {
            console.log(response)
            window.location.replace(`./confirm.html?id=${response.orderId}` + totalPrice)
            let orderNumber = document.querySelector('.order-number')
            let totalP = document.querySelector('.total-Price')

            orderNumber.innerText += response.orderId;
            totalP.innerText += totalPrice;
        })
        .catch(function (error) {
            console.log(error)
        });
})

