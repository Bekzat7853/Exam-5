// Import
import {
  getPastry,
  uptadePastry,
  deletePastry,
  addPastry,
  url,
} from "./helper.js";

// HTML variables
const $product = document.querySelector(".product");

const $openMenuBtn = document.querySelector("#openMenu");
const $openCartBtn = document.querySelector("#openCart");
const $closeMenuBtn = document.querySelector("#closeMenu");
const $closeCartBtn = document.querySelector("#closeCart");
const $menu = document.querySelector(".menu");
const $cart = document.querySelector(".cart");

const $changeBlock = document.querySelector(".change");

const $modal = document.querySelector(".modal");
const $modalBackdrop = document.querySelector(".modal-backdrop");
const $openBtn = document.querySelector("#addNewItem");

const $form = document.querySelector(".modal-form");

// Render Pastry Block
const renderPastry = async () => {
  let pastry = await getPastry();

  pastry.forEach(({ name, cost, ingredients, image, inStock }) => {
    const $productItem = document.createElement("div");
    $productItem.classList.add("product__item");
    $productItem.innerHTML = `
              <div class="product__item-img">
                  <img src="${image}" alt="${name}" width="230px" height="230px" />
              </div>
              <div class="product__item-info">
                  <h3 class="product__item-title" value="${name}">${name}</h3>
                  <p class="product__item-ing">
                      ${ingredients}
                  </p>
                  <p class="product__item-price" value="${cost}">$<span>${cost}</span></p>
                  <button class="product__item-btn" type="button">
                      Add to cart
                  </button>
              </div>
          `;

    if (inStock === 0) {
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

// Render Change Block
const renderChangeBlock = async () => {
  let pastry = await getPastry();

  pastry.forEach((item) => {
    // Render
    const $changeItem = document.createElement("div");
    $changeItem.classList.add("change__item");
    $changeItem.setAttribute("data-pastry-id", `${item.id}`);
    $changeItem.innerHTML = `
      <div class="change__item-name">
          <p>${item.name}</p>
          <a href="#" id="name">
              <img src="/images/edit.svg" alt="edit" />
          </a>
      </div>
      <div class="change__item-price">
        <p>price: <span>$ ${item.cost}</span></p>
        <a href="#" id="cost">
            <img src="/images/edit.svg" alt="edit" />
        </a>
      </div>
      <div class="change__item-count">
        <p>in stock:</p>
        <div class="change-count">
          <a class="count-minus" href="#">
              <img src="/images/minus.svg" alt="minus" class="minus" />
          </a>
          <p class="count">${item.inStock}</p>
          <a class="count-plus" href="#">
              <img src="/images/plus.svg" alt="plus" class="plus" />
          </a>
        </div>
      </div>
      <div id="delete">
        <img src="/images/delete.svg" alt="delete" />
      </div>`;
    // Render

    // Change Name and Cost
    const $editNameBtn = document.querySelectorAll("#name");
    const $editCostBtn = document.querySelectorAll("#cost");

    $editNameBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const p = btn.parentElement.firstElementChild;
        p.innerHTML = `<input type="text" />`;

        btn.firstElementChild.setAttribute("src", "../images/done.svg");

        p.firstElementChild.addEventListener("change", (e) => {
          p.innerHTML = p.firstElementChild.value;
          btn.firstElementChild.setAttribute("src", "../images/edit.svg");
          console.log();

          uptadePastry(
            btn.parentElement.parentElement.getAttribute("data-pastry-id"),
            {
              name: p.textContent,
            }
          );
        });
      });
    });

    $editCostBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const p = btn.parentElement.firstElementChild;
        p.firstElementChild.innerHTML = `<input type="number" />`;

        btn.firstElementChild.setAttribute("src", "../images/done.svg");

        p.firstElementChild.addEventListener("change", (e) => {
          p.firstElementChild.innerHTML = `$ ${p.firstElementChild.firstElementChild.value}`;

          btn.firstElementChild.setAttribute("src", "../images/edit.svg");

          uptadePastry(
            btn.parentElement.parentElement.getAttribute("data-pastry-id"),
            {
              cost: Number(p.firstElementChild.textContent.replace("$", "")),
            }
          );
        });
      });
    });
    // Change Name and Cost

    // Change inCost
    const $decreaseBtn = document.querySelectorAll(".count-minus");
    const $increaseBtn = document.querySelectorAll(".count-plus");

    $decreaseBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        decreaseStock(
          btn.parentElement.parentElement.parentElement.getAttribute(
            "data-pastry-id"
          ),
          btn.nextElementSibling.textContent
        );
      });
    });

    $increaseBtn.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        increaseStock(
          btn.parentElement.parentElement.parentElement.getAttribute(
            "data-pastry-id"
          ),
          Number(btn.previousElementSibling.textContent)
        );
      });
    });
    // Change inCost

    // Delete Item
    const $deleteBtn = document.querySelectorAll("#delete");

    $deleteBtn.forEach((btn) => {
      btn.addEventListener("click", () => {
        deletePastry(btn.parentElement.getAttribute("data-pastry-id"));
      });
    });
    // Delete Item

    $changeBlock.append($changeItem);
  });
};

// Open Sidebar
const openSidebar = (sidebar) => {
  sidebar.classList.remove("hide");
  sidebar.classList.add("fade");
  sidebar.classList.add("show");
};

// Hide sidebar
const hideSidebar = (sidebar) => {
  sidebar.classList.remove("show");
  sidebar.classList.remove("fade");
  sidebar.classList.add("hide");
};

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

// Change count
const decreaseStock = async (id, currentStock) => {
  await uptadePastry(id, {
    inStock: currentStock - 1,
  });
};

const increaseStock = async (id, currentStock) => {
  await uptadePastry(id, {
    inStock: currentStock + 1,
  });
};

// Export
export {
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
  renderChangeBlock,
  uptadePastry,
  getPastry,
  $modal,
  $openBtn,
  $modalBackdrop,
};
