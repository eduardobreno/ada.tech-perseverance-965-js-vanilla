import { updatedCartCount } from "./cart";
import { initProduct } from "./products";

function init() {
  initProduct();
  updatedCartCount();
}

init();
