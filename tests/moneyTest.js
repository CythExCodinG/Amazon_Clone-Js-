import { formatCurrency } from "../scripts/utils/money.js";

if (formatCurrency(2095) === '20.95') {
  console.log("Pass")
}
else {
  console.log("Failed")
}
