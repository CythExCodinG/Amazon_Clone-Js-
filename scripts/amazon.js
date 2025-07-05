import { cart, addToCart } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let finalHtml = '';

  products.forEach((product) => {
    let productHtml = `
    <div class=product-container>
      <div class="product-image-container">
      <img class="product-image" src=${product.image}>
      </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars" src="${product.getRatingUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.getPrice()}
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

          ${product.extraInfoHTML()}
    
          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      </div>
  `
    finalHtml += productHtml
  })

  // function addToCart(productId) {
  //   let matchingItem;
  //   cart.forEach((item) => {
  //     if (productId === item.productId) {
  //       matchingItem = item;
  //     }
  //   })

  //   if (matchingItem) {
  //     matchingItem.quantity += 1;
  //   }
  //   else {
  //     cart.push({
  //       productId: productId,
  //       quantity: 1
  //     });
  //   }
  // }

  function updateCartCount() {
    let cartQuantityElement = document.querySelector('.cart-quantity');
    let itemQuantity = 0;
    cart.forEach((item) => {
      itemQuantity += item.quantity;
    })
    console.log(itemQuantity)
    cartQuantityElement.innerHTML = itemQuantity;
  }
  const productElement = document.querySelector('.products-grid');
  productElement.innerHTML = finalHtml;
  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        var productId = button.dataset.productId;
        addToCart(productId);

        // let matchingItem;
        // cart.forEach((item) => {
        //   if (productId === item.productId) {
        //     matchingItem = item;
        //   }
        // })

        // if (matchingItem) {
        //   matchingItem.quantity += 1;
        // }
        // else {
        //   cart.push({
        //     productId: productId,
        //     quantity: 1
        //   });
        // }

        updateCartCount();
      })
    })

}