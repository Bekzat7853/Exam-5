// Import
import {
  openSidebar,
  hideSidebar,
  $openMenuBtn,
  $closeMenuBtn,
  $menu,
  renderChangeBlock,
  getPastry,
  $modal,
  $openBtn,
  $modalBackdrop,
} from "./frontend.js";
// Import

// Render Change Block
renderChangeBlock(getPastry);
// Render Change Block

// SiderBar
$openMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  openSidebar($menu);
});

$closeMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  hideSidebar($menu);
});
// SiderBar

// Modal
$openBtn.addEventListener("click", () => {
  $modal.classList.remove("hide");
  $modal.classList.add("show");
});

$modal.addEventListener("click", (e) => {
  let target = event.target;
  if (target === $modalBackdrop) {
    $modal.classList.remove("show");
    $modal.classList.add("hide");
  }
});
// Modal
