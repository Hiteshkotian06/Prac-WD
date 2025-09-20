import {cart, removeFromCart} from '../data/cart.js'
import { products } from '../data/products.js';
import { formatCurrency } from './Utlise/money.js';

let cartSummary = ``;

cart.forEach((cartItem) =>{
  const prod_id = cartItem.prod_id; 

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === prod_id){
      matchingProduct = product;
    }
  })

  cartSummary += 
  `
  <div class="cart-item-container js-delete-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label quantity-update">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingProduct.id}>
            Update
          </span>
          <input class="quantity-input value-input-${matchingProduct.id}" data-product-id = ${matchingProduct.id}>
          <span class="save-quantity-link link-primary js-save-link" data-product-id = ${matchingProduct.id}>Save</span>
  
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id = ${matchingProduct.id}>
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
})

document.querySelector('.js-order-summary').innerHTML = cartSummary;

// Clicking the Delete button Remove the product from cart
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
  const productId = link.dataset.productId;

  removeFromCart(productId);
  const deleteContianer = document.querySelector(`.js-delete-${productId}`)
  deleteContianer.remove();
  updateCheckoutHeader();
  })
})

// Checkout Header Items Quantity 
function updateCheckoutHeader(){
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
})

  document.querySelector('.js-checkout-items').innerHTML = `${cartQuantity} Items`
}
updateCheckoutHeader();

// Update Button
document.querySelectorAll('.js-update-link').forEach((updateButton) => {
  updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;

      const container = document.querySelector(
        `.js-delete-${productId}`
      );
      container.classList.add('is-editing-quantity');
  });
})

// Save button click Reappear Update button
// Save button function to work on save click and Enter press
function saveQuantity(productId){
  const container = document.querySelector(`.js-delete-${productId}`);
  container.classList.remove('is-editing-quantity');

  // Finding the input
  const quantityInput = document.querySelector(`.value-input-${productId}`);
  const newQuantity = Number(quantityInput.value);

  // Find the cart item and update it
  const cartItem = cart.find(item => item.prod_id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
  }
  // Update UI: quantity text
  const quantityLabel = document.querySelector(`.js-delete-${productId} .quantity-update`);
  quantityLabel.innerText = newQuantity;

  // Update checkout header total
  updateCheckoutHeader();

  // Save to localStorage (so it persists after refresh)
  localStorage.setItem('cart', JSON.stringify(cart));
}

document.querySelectorAll('.js-save-link').forEach((savebutton) => {
  savebutton.addEventListener('click', () => {    
  const productId = savebutton.dataset.productId;
  saveQuantity(productId);
  });
})

// Enter key inside input
document.querySelectorAll('.quantity-input').forEach((input) => {
  input.addEventListener('keydown', (event) => {
    const productId = input.dataset.productId;
    if (event.key === 'Enter') { 
      saveQuantity(productId);
    }
  });
});