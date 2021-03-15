window.addEventListener("DOMContentLoaded", (e) => {
  // Render Pastry
  let url = "http://localhost:1717";

  const getPastry = async () => {
    let r = await fetch(`${url}/pastry`);
    let pastry = r.json();

    return pastry;
  };

  const $product = document.querySelector(".product");

  const renderPastry = async (e) => {
    let pastry = await getPastry();

    pastry.forEach((item) => {
      const $productItem = document.createElement("div");
      $productItem.classList.add("product__item");
      $productItem.innerHTML = `
                <div class="product__item-img">
                    <img src="${item.image}" alt="Pastry" width="230px" height="230px" />
                </div>
                <div class="product__item-info">
                    <h3 class="product__item-title" value="${item.name}">${item.name}</h3>
                    <p class="product__item-ing">
                        ${item.ingredients}
                    </p>
                    <p class="product__item-price" value="${item.cost}">$<span>${item.cost}</span></p>
                    <button class="product__item-btn" type="button">
                        Add to cart
                    </button>
                </div>
            `;

      if (item.inStock === 0) {
        $productItem.lastElementChild.lastElementChild.classList.add(
          "product__item-btn__disable"
        );
        $productItem.lastElementChild.lastElementChild.textContent =
          "Not avaliable";
        $productItem.lastElementChild.lastElementChild.setAttribute(
          "disabled",
          ""
        );
      }

      $product.append($productItem);
    });
  };
  renderPastry();
  // Render Pastry

  // SiderBars
  const $openMenuBtn = document.querySelector("#openMenu");
  const $openCartBtn = document.querySelector("#openCart");
  const $closeMenuBtn = document.querySelector("#closeMenu");
  const $closeCartBtn = document.querySelector("#closeCart");
  const $menu = document.querySelector(".menu");
  const $cart = document.querySelector(".cart");

  const openSidebar = (sidebar) => {
    sidebar.classList.remove("hide");
    sidebar.classList.add("fade");
    sidebar.classList.add("show");
  };

  const hideSidebar = (sidebar) => {
    sidebar.classList.remove("show");
    sidebar.classList.remove("fade");
    sidebar.classList.add("hide");
  };

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
  // SiderBars

  // Add product
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
  // Add product

  // Get Total Price
  function getFullPrice() {
    const $price = document.querySelectorAll(".cart__catalog__item-price span");
    const $totalPrice = document.querySelector(".cart__total-price");

    let result = 0;

    $price.forEach((item) => {
      result += Number(item.textContent);
    });

    $totalPrice.textContent = `$ ${result}`;
  }
  // Get Total Price
});
