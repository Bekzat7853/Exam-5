// Import
import {
  renderPastry,
  openSidebar,
  hideSidebar,
  getFullPrice,
  $product,
  $openMenuBtn,
  $openCartBtn,
  $closeMenuBtn,
  $closeCartBtn,
  $menu,
  $cart,
} from "./frontend.js";
// Import

// Get Pastry and Render
renderPastry();
// Get Pastry and Render

// SiderBar
$openMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openSidebar($menu);
});

$openCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openSidebar($cart);
});

$closeMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideSidebar($menu);
});

$closeCartBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideSidebar($cart);
});
// SiderBar

// Add to cart
$product.addEventListener("click", (e) => {
  let target = e.target;

  const $cartCatalog = document.querySelector(".cart__catalog");
  const $cartCount = document.querySelector(".cart-block__count");

  if (target && target.classList.contains("product__item-btn")) {
    const name = target.parentElement.firstElementChild.getAttribute("value");
    const price = target.parentElement.lastElementChild.previousElementSibling.getAttribute(
      "value"
    );

    const $item = document.createElement("div");
    $item.classList.add("cart__catalog__item");
    $item.innerHTML = `
      <div class="cart__catalog-left">
        <h4 class="cart__catalog__item-title">${name}</h4>

        <p class="cart__catalog__item-count">
          <span>2</span>
          items
        </p>
      </div>
      <p class="cart__catalog__item-price">
        $
        <span>${price}</span>
      </p>
      `;
    $cartCount.textContent = $cartCatalog.childElementCount + 1;
    $cartCatalog.append($item);

    getFullPrice();
  }
});
// Add to cart
