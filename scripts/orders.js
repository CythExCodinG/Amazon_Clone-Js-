import { orders } from "../data/order.js";
import { formatCurrency } from "./utils/money.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { products } from "../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";



async function loadOrders() {
  await loadProductsFetch()
  let html = ``;
  orders.forEach((order) => {
    let productHtml = ``;
    // console.log(order)
    const orderId = order.id;
    const orderTime = order.orderTime;
    const formattedTime = dayjs(orderTime).format('D MMMM');
    const estimatedDeliveryTime = order.estimatedDeliveryTime
    const formattedDate = dayjs(estimatedDeliveryTime).format('D MMMM')
    order.products.forEach((product) => {
      const productId = product.productId;
      const productObj = getProduct(productId);
      const image = productObj.image;
      // console.log(productObj)
      const name = productObj.name;
      productHtml += `
      <div class="product-image-container">
            <img src="${image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${name}
            </div>
            <div class="product-delivery-date">
              Arriving on:${formattedDate}
            </div>
            <div class="product-quantity">
              Quantity: 1
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
      `
    })
    html += `
    <div class="order-container">

        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${formattedTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$35.06</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${orderId}</div>
          </div>
        </div>

        <div class="order-details-grid">
          ${productHtml}
        </div>
      </div>
    `
  })

  document.querySelector('.orders-grid').innerHTML = html
}
loadOrders()