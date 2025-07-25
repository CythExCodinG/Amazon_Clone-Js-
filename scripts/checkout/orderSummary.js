import { cart } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js"
import { formatCurrency } from "../utils/money.js";
import { removeFromCart, updateDeliveryOption } from "../../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let finalHtml = ""
  let html = '';
  let productName = ""
  let productImage = ""
  let quantity = ""
  let price = ""
  let id = "";
  cart.forEach((cartItem) => {
    products.forEach((product) => {

      if (cartItem.productId == product.id) {
        productName = product.name;
        productImage = product.image;
        quantity = cartItem.quantity;
        price = product.priceCents;
        id = product.id;
      }
    })
    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const dateString = deliveryDate.format(
      `dddd, MMMM D`
    )

    html =
      `
    <div class="cart-item-container 
    js-cart-item-container-${id}">
            <div class="delivery-date">
              Delivery date: ${dateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src=${productImage}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${productName}
                </div>
                <div class="product-price">
                $${formatCurrency(price)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label quantity-input-${id}">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quant-link" data-update-id="${id}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary 
                  js-delete-link" data-product-id=${id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${deliveryOptionsHTML(id, cartItem)}  
              </div>
            </div>
          </div>
    `
    finalHtml += html;
  })
  document.querySelector('.order-summary').innerHTML = finalHtml;



  function deliveryOptionsHTML(id, cartItem) {
    let html = ``;
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`
      const dateString = deliveryDate.format(
        `dddd, MMMM D`
      )

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${id}"
      data-delivery-option-id="${deliveryOption.id}"
      >
          <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input" name="delivery-option-${id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        let deleteId = link.dataset.productId;
        removeFromCart(deleteId);

        const container = document.querySelector(`.js-cart-item-container-${deleteId}`)
        container.remove();
        renderPaymentSummary()
      })
    })

  let TotalItemsElements = document.querySelector('.return-to-home-link');
  if (cart.length > 1) {
    TotalItemsElements.innerHTML = cart.length + ' items';
  }
  else {
    TotalItemsElements.innerHTML = cart.length + ' item';
  }

  document.querySelectorAll('.js-delivery-option')
    .forEach((option) => {
      option.addEventListener('click', () => {
        const { productId, deliveryOptionId } = option.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary()
      })
    })
}

