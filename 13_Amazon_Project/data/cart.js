export let cart = [{
  prod_id : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity : 2
}, {
  prod_id : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity : 1
}];

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

export function removeFromCart(productId){
  
  // let newCart = [];
  // cart.forEach((cartItem) => {
  //   if(cartItem.prod_id !== productId){
  //     newCart.push(cartItem);
  //   }
  // })
  // cart = newCart;

  cart = cart.filter((cartItem => cartItem.prod_id !== productId))  //-- this work same as above also short and clean
}
