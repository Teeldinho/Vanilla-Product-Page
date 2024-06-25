import { productsData } from "../data/productsData.js";
import { createProductCard } from "./utils.js";

// Function to inject product cards into a given container
function injectProducts(container, products) {
  container.innerHTML = "";
  products.forEach((product) => {
    container.appendChild(createProductCard(product));
  });
}

function setupEventListeners() {
  const showMoreButton = document.getElementById("show-more-button");
  const closeButton = document.getElementById("close-button");
  const previewSectionContainer = document.getElementById("preview-section-container");
  const showMoreSectionContainer = document.getElementById("show-more-section-container");

  showMoreButton.addEventListener("click", () => {
    previewSectionContainer.classList.add("hidden");
    showMoreSectionContainer.classList.remove("hidden");
    showMoreSectionContainer.classList.add("flex");
  });

  closeButton.addEventListener("click", () => {
    showMoreSectionContainer.classList.add("hidden");
    showMoreSectionContainer.classList.remove("flex");
    previewSectionContainer.classList.remove("hidden");
  });
}

// Function to update the view based on window width
function updateViewBasedOnWidth() {
  const tabletDesktopSectionContainer = document.getElementById("tablet-desktop-section-container");
  const linkToViewAll = document.getElementById("link-to-view-all");
  const width = window.innerWidth;
  if (width >= 768) {
    // md breakpoint
    tabletDesktopSectionContainer.classList.remove("hidden");
    linkToViewAll.classList.remove("hidden");
  } else {
    tabletDesktopSectionContainer.classList.add("hidden");
    linkToViewAll.classList.add("hidden");
  }
}

// Initial setup
function init() {
  const previewSectionView = document.getElementById("preview-section-view");
  const showMoreSectionView = document.getElementById("show-more-section-view");
  const tabletDesktopSectionView = document.getElementById("tablet-desktop-section-view");

  // Inject initial products into the respective sections
  injectProducts(previewSectionView, productsData.slice(0, 4));
  injectProducts(showMoreSectionView, productsData.slice(4));
  injectProducts(tabletDesktopSectionView, productsData);

  // Setup event listeners
  setupEventListeners();

  // Update view based on the initial window width
  updateViewBasedOnWidth();

  // Add event listener for window resize
  window.addEventListener("resize", updateViewBasedOnWidth);
}

// Initialize the app once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", init);
