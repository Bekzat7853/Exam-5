window.addEventListener("DOMContentLoaded", () => {
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
                    <h3 class="product__item-title">${item.name}</h3>
                    <p class="product__item-ing">
                        ${item.ingredients}
                    </p>
                    <p class="product__item-price">$<span>${item.cost}</span></p>
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
  const openMenuBtn = document.querySelector("#openMenu");
  const openCartBtn = document.querySelector("#openCart");
  const closeMenuBtn = document.querySelector("#closeMenu");
  const closeCartBtn = document.querySelector("#closeCart");
  const menu = document.querySelector(".menu");
  const cart = document.querySelector(".cart");

  const openSidebar = (sidebar) => {
    sidebar.classList.remove("hide");
    sidebar.classList.add("show");
  };

  const hideSidebar = (sidebar) => {
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
  };

  openMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSidebar(menu);
  });

  openCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSidebar(cart);
  });

  closeMenuBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideSidebar(menu);
  });

  closeCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    hideSidebar(cart);
  });
  // SiderBars
});
