import {
  addToCart,
  cartDetails,
  getProductFromCart,
  updatedCartCount,
} from "./cart";

export function minhaFunc() {
  alert("oi!");
}

export function createProductPod(product, target) {
  //   const pod = document.createElement("div");
  //   const thumb = document.createElement("img");
  //   const title = document.createElement("p");
  //   const price = document.createElement("p");

  //   title.innerHTML = product.title;
  //   price.innerHTML = product.price;
  //   thumb.src = product.thumbnail;

  //   pod.appendChild(thumb);
  //   pod.appendChild(title);
  //   pod.appendChild(price);
  const productInCart = getProductFromCart(product);

  const btnAddId = `btn_add_${product.id}_${target.replace(".", "")}`;
  const content = `
    <div class="productPod">
        <img class="productThumb" src=${product.thumbnail}>
        <p class="productTitle">${product.title}</p>
        <p>${productInCart?.qtd || ""}</p>
        <p>${product.price}</p>
        ${
          productInCart
            ? `
                <button id='${btnAddId}'>+</button>
                <button>-</button>`
            : `<button id='${btnAddId}'>Add</button>`
        }
    </div>
`;

  document.querySelector(target).insertAdjacentHTML("beforeend", content);

  document.querySelector(`#${btnAddId}`).addEventListener("click", () => {
    addToCart(product);
    updatedCartCount();
    refresh();
  });
}

export function refresh() {
  initProduct();
}

export async function initProduct() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  document.querySelector("main").innerHTML = "";
  data.products.forEach((product) => {
    createProductPod(product, "main");
  });
  cartDetails();
}
