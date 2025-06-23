
let cartData = localStorage.getItem('cart');
export let cart = Array.isArray(JSON.parse(cartData)) ? JSON.parse(cartData) : [
  {
    productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
    quantity: 2,
    deliveryOptionId: `1`
  },
  {
    productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
    quantity: 1,
    deliveryOptionId: `2`
  }
];


function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart))
}
export function addToCart(productId) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  })

  if (matchingItem) {
    matchingItem.quantity += 1;
  }
  else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  let newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  })
  cart = newCart;
  saveToStorage()
}

export function updateDeliveryOption(productId, deliveryOption) {
  let matchingItem;
  cart.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  console.log("this is id", deliveryOption);
  matchingItem.deliveryOptionId = deliveryOption;
  saveToStorage();
}