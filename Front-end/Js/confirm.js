const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get('orderid');
const totalPrice = urlParams.get('totalprice')


let orderNumber = document.querySelector('.order-number')
let totalP = document.querySelector('.total-Price')

orderNumber.innerHTML += `<strong> ${orderId}</strong>`;
totalP.innerHTML += `<strong> ${totalPrice} €</strong>`;