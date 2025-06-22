export const cart = [{
  productId: "54e0eccd-8f36-462b-b68a-8182611d9add",
  quantity: 2
},
{
  productId: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
  quantity: 1
}
]

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
      quantity: 1
    });
  }
}