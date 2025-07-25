
import { cart } from "../../data/cart.js"
import { getProduct, products } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/order.js";

export function renderPaymentSummary() {
  let totalPriceCents = 0;
  let shippingPriceCents = 0;
  let count = 0;
  cart.forEach((cartItem) => {
    count += 1;
    const product = getProduct(cartItem.productId)
    totalPriceCents += (product.priceCents * cartItem.quantity);
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  })
  const totalBeforeTax = formatCurrency(shippingPriceCents + totalPriceCents);
  const taxCents = (totalBeforeTax * 0.1);
  const totalCents = Number(totalBeforeTax) + taxCents;


  const paymentSummaryHTML =
    `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${count}):</div>
        <div class="payment-summary-money">${formatCurrency(totalPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
        <div class="payment-summary-money">${formatCurrency(shippingPriceCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
        <div class="payment-summary-money">${totalBeforeTax}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">${Number(taxCents).toFixed(2)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">${Number(totalCents).toFixed(2)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order">
      Place your order
    </button>
    `

  document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;

  document.querySelector('.js-place-order').addEventListener('click', async () => {
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });


    const order = await response.json()
    console.log(order);
    addOrder(order);


    window.location.href = 'orders.html'
  });
}

