// const products = [{
//   image : "images/products/athletic-cotton-socks-6-pairs.jpg",
//   name : "Black and Gray Athletic Cotton Socks - 6 Pairs",
//   rating : {stars : 4.5, count : 87},
//   priceCents : 1090    //Here we used cent and not the decimal bcoz javascript create issue while working withe decimal
// },
// {
//   image : "images/products/intermediate-composite-basketball.jpg",
//   name : "Intermediate Size Basketball",
//   rating : {stars : 4, count : 127},
//   priceCents : 2095    //Here we used cent and not the decimal bcoz javascript create issue while working withe decimal
// },
// {
//   image : "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
//   name : "Adults Plain Cotton T-Shirt - 2 Pack",
//   rating : {stars : 4.5, count : 56},
//   priceCents : 799     //Here we used cent and not the decimal bcoz javascript create issue while working withe decimal
// }]

// We will be using the product data directly from the product file in Data file -- /13_Amazon_Project/data/products.js

import {cart} from '../data/cart.js'

let productHtml = ''

products.forEach((prod) => {
  productHtml += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${prod.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${prod.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${prod.rating.stars * 10}.png">  <!-- Here mulitpling bcoz name of img file is that way -->
        <div class="product-rating-count link-primary">
          ${prod.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(prod.priceCents / 100).toFixed(2)}  <!-- Here I'm using toFixed to get 2 digit after decimal -->
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" data-id ="${prod.id}">
        Add to Cart
      </button>
    </div>
  `
});

document.querySelector('.js-productHTML-grid').innerHTML = productHtml;

document.querySelectorAll('.js-add-to-cart').forEach((addToCartButton) => {
  addToCartButton.addEventListener('click', () => {
  
    const prod_id = addToCartButton.dataset.id;

    // We need to get the container of the clicked product
    const productContainer = addToCartButton.closest('.product-container');
  
    const quantitySelect = productContainer.querySelector('select');
    const selectedQuantity = parseInt(quantitySelect.value);

    let matchingItem;
    cart.forEach((item) => {
      if(item.prod_id === prod_id){
        matchingItem = item;
      }
    })

    if(matchingItem){
      matchingItem.quantity = selectedQuantity;
    } else {
      cart.push({
      prod_id,
      quantity : selectedQuantity
    });
    } 

    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });

    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    // Keep Added till the quantity is not zero
    const addedMessage = productContainer.querySelector('.added-to-cart');
    if (selectedQuantity > 0) {
      addedMessage.style.opacity = 1;
    } else {
      addedMessage.style.opacity = 0;
    }
    // hide again after 1 second
    // setTimeout(() => {
    //   addedMessage.style.opacity = 0;
    // }, 1000);
  
    // console.log(cart)
  });

});
