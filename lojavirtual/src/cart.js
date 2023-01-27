function getCartProducts() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function updatedCartCount() {
  const products = getCartProducts();
  const total = products.reduce((prev, curr) => {
    return prev + curr.qtd;
  }, 0);

  document.querySelector(".badge").innerHTML = total;
}

export function getProductFromCart(product) {
  const products = getCartProducts();
  const productsInCart = products.find(
    (cartProduct) => cartProduct.id === product.id
  );

  return productsInCart;
}

export function addToCart(product) {
  const products = getCartProducts();

  const productsInCart = getProductFromCart(product);

  const qtd = productsInCart?.qtd || 1;

  if (productsInCart) {
    const updatedCart = products.map((cartProduct) => {
      if (cartProduct.id === product.id) {
        return { ...cartProduct, qtd: qtd + 1 };
      }
      return cartProduct;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  } else {
    products.push({ ...product, qtd });

    localStorage.setItem("cart", JSON.stringify(products));
  }
}
