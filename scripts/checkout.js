import { renderOrderSummary } from "./checkout/orderSummary.js"
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
import '../data/cart-oop.js';

async function loadPage() {

  try {
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      loadCart(() => {
        // reject('error3')
        resolve();
      })
    })
  } catch (error) {
    console.log("Bhai gya tu")
  }

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage()


/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    })
  })
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
})
*/
// new Promise((resolve) => {
//   loadProducts(() => {
//     resolve('value');
//   });
// }).then((value) => {
//   console.log(value)

//   return new Promise((resolve) => {
//     loadCart(() => {
//       resolve();
//     })
//   })
// }).then(() => {
//   renderOrderSummary();
//   renderPaymentSummary();
// });



// loadProducts(() => {
//   loadCart(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//   })
// })
