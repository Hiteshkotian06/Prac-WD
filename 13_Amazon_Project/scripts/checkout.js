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
            Quantity: <span class="quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-link" data-product-id = ${matchingProduct.id}>
            Update
          </span>
          <input class="quantity-input">
          <span class="save-quantity-link link-primary">Save</span>
  
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
// document.querySelectorAll('.js-update-link').forEach((updateButton) => {
//   updateButton.addEventListener('click', () => {
//     // Prevent creating multiple inputs if clicked multiple times
//     if (updateButton.nextElementSibling?.classList.contains('update-quanity-wrapper')) return;

//     // Create wrapper span
//     const wrapper = document.createElement('span');
//     wrapper.classList.add('update-quanity-wrapper');

//     // Create input
//     const input = document.createElement('input');
//     input.type = 'number';
//     input.classList.add('update-quanity');
//     input.value = updateButton.closest('.cart-item-details').querySelector('.quantity-label').textContent;

//     // Create save button
//     const saveButton = document.createElement('span');
//     saveButton.classList.add('save-updated-quantity');
//     saveButton.textContent = 'Save';

//     // Append input and save button to wrapper
//     wrapper.appendChild(input);
//     wrapper.appendChild(saveButton);

//     // Insert wrapper after update button
//     updateButton.parentNode.insertBefore(wrapper, updateButton.nextSibling);

//     // Save button click
//     saveButton.addEventListener('click', () => {
//       const newQuantity = parseInt(input.value);
//       if (isNaN(newQuantity) || newQuantity < 1) return alert('Enter a valid quantity');

//       // Update cart array
//       const productId = updateButton.closest('.cart-item-container').classList[1].split('-')[2]; // gets id from js-delete-<id>
//       cart.forEach(item => {
//         if (item.prod_id === productId) item.quantity = newQuantity;
//       });

//       // Update display
//       updateCartDisplay(); // call your combined function
//       updateButton.closest('.cart-item-details').querySelector('.quantity-label').textContent = newQuantity;

//       // Remove input & save button
//       wrapper.remove();
//       saveToStorage(); // save to localStorage
//     });
//   });
// });

// Update Button
document.querySelectorAll('.js-update-link').forEach((updateButton) => {
  updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;

      const container = document.querySelector(
        `.js-delete-${productId}`
      );
      container.classList.add('is-editing-quantity');
  })
})
