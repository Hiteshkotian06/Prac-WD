export const cart = [];

// Add to Cart funtion
// We had this in the amazon.js we shifted this to this file to make it more understanding same for updateCartQuantity
export function addToCart(prod_id, selectedQuantity){
   let matchingItem;
    cart.forEach((cartItem) => {
      if(cartItem.prod_id === prod_id){
        matchingItem = cartItem;
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
}

// Cart Update quantity function
export function updateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}