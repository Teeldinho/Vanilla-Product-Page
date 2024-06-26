import { productsData } from "../data/productsData.js";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function renderStars(rating) {
  const maxStars = 5;
  let stars = "";
  for (let i = 1; i <= maxStars; i++) {
    stars += `<span class="${i <= rating ? "text-black" : "text-gray-200"}">★</span>`;
  }
  return stars;
}

document.addEventListener("DOMContentLoaded", () => {
  const previewSectionView = document.getElementById("preview-section-view");
  const showMoreSectionView = document.getElementById("show-more-section-view");
  const tabletDesktopSectionView = document.getElementById("tablet-desktop-section-view");
  const template = document.getElementById("product-card-template").content;

  // Function to create a product card
  function createProductCard(product) {
    const clone = document.importNode(template, true);
    clone.querySelector(".primary-image").src = product.imageSrc;
    clone.querySelector(".primary-image").alt = product.imageAlt;
    clone.querySelector(".secondary-image").src = product.hoverImageSrc;
    clone.querySelector(".title").textContent = product.title;
    clone.querySelector(".stars").innerHTML = renderStars(product.rating);
    clone.querySelector(".reviews").textContent = `${product.reviews} Reviews`;
    clone.querySelector(".price").textContent = formatPrice(product.price);

    const label = clone.querySelector(".label");
    if (product.label) {
      label.textContent = product.label;
    } else {
      label.classList.add("hidden");
    }

    const discount = clone.querySelector(".discount");
    if (product.discount) {
      discount.textContent = `Save ${product.discount}%`;
    } else {
      discount.classList.add("hidden");
    }

    return clone;
  }

  // Render initial 4 products in preview section
  productsData.slice(0, 4).forEach((product) => {
    previewSectionView.appendChild(createProductCard(product));
  });

  // Render remaining products in show more section
  productsData.slice(4).forEach((product) => {
    showMoreSectionView.appendChild(createProductCard(product));
  });

  // Render all products in tablet and desktop section
  productsData.forEach((product) => {
    tabletDesktopSectionView.appendChild(createProductCard(product));
  });

  setupEventListeners();
});

function setupEventListeners() {
  document.getElementById("show-more-button").addEventListener("click", function () {
    const previewSectionContainer = document.getElementById("preview-section-container");
    const showMoreSectionContainer = document.getElementById("show-more-section-container");

    previewSectionContainer.classList.add("hidden");
    showMoreSectionContainer.classList.remove("hidden");
    showMoreSectionContainer.classList.add("flex", "slide-down-enter-active");
    showMoreSectionContainer.classList.remove("slide-down-leave-active");
  });

  document.getElementById("close-button").addEventListener("click", function () {
    const previewSectionContainer = document.getElementById("preview-section-container");
    const showMoreSectionContainer = document.getElementById("show-more-section-container");

    showMoreSectionContainer.classList.add("slide-down-leave-active");
    showMoreSectionContainer.classList.remove("slide-down-enter-active");
    setTimeout(() => {
      showMoreSectionContainer.classList.remove("flex");
      showMoreSectionContainer.classList.add("hidden");
      previewSectionContainer.classList.remove("hidden");
    }, 2000);
  });

  // Update view based on screen width
  function updateViewBasedOnWidth() {
    const desktopSectionContainer = document.getElementById("tablet-desktop-section-container");
    const linkToViewAll = document.getElementById("link-to-view-all");
    const width = window.innerWidth;
    if (width >= 768) {
      // md breakpoint
      desktopSectionContainer.classList.remove("hidden");
      linkToViewAll.classList.remove("hidden");
    } else {
      desktopSectionContainer.classList.add("hidden");
      linkToViewAll.classList.add("hidden");
    }
  }

  window.addEventListener("resize", updateViewBasedOnWidth);
  updateViewBasedOnWidth();
}
