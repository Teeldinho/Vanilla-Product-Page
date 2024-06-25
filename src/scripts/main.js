import { productsData } from "../data/productsData.js";

/**
 * Renders a star rating based on the given rating value.
 * @param {number} rating - The rating value to render.
 */
export function renderStars(rating) {
  const maxStars = 5;
  let stars = "";
  for (let i = 1; i <= maxStars; i++) {
    stars += `<span class="${i <= rating ? "text-black" : "text-gray-200"}">★</span>`;
  }
  return stars;
}

/**
 * Creates a product card element based on the given product data.
 * @param {object} product - The product data to use.
 */
export function createProductCard(product) {
  const card = document.createElement("div");
  card.classList.add("flex-1", "w-full", "product-card");

  const content = `
    <div class="flex flex-col flex-1 w-full gap-2 md:gap-3 md:w-72 lg:w-80">

        <div class="relative rounded-lg overflow-hidden h-48 md:h-[355px] w-full bg-cover bg-center bg-[url(${product.imageSrc})] hover:bg-[url(${
    product.hoverImageSrc
  })] transition-all duration-2000">
            <div class="absolute flex flex-wrap items-center justify-between w-full gap-2 px-2 top-2">
                <span class="${
                  product.label ? "flex" : "invisible"
                } items-center justify-center max-w-fit flex-nowrap bg-white text-gray-800 tracking-wider rounded-full text-sm md:text-sm font-medium px-1.5 md:px-3 py-0.20 md:py-1.20 uppercase border-2 border-black">
                 ${product.label}
                </span>
            
                <span class="${
                  product.discount && product.discount > 0 ? "flex" : "invisible"
                } items-center justify-center max-w-fit flex-nowrap tracking-wider bg-emerald-800/60 rounded-full text-white text-sm md:text-sm font-medium px-1.5 md:px-3 py-0.25 md:py-1.25 uppercase border-1 border-black">
                 Save ${product.discount}%
                </span>
            </div>

        </div>

      <div class="flex flex-col md:gap-1">
        <h3 class="text-lg md:text-xl font-bebasNeue line-clamp-1">${product.title}</h3>
        
        <div class="flex items-center">
          ${renderStars(product.rating)}
          <span class="ml-2 text-xs md:text-sm text-gray-500 capitalize line-clamp-1 font-poppins">${product.reviews} Reviews</span>
        </div>

          <span class="text-base md:text-lg font-semibold text-gray-700 font-poppins">$${product.price}</span>
        </div>
      </div>

    </div>
  `;
  card.innerHTML = content;
  return card;
}

// Function to render product cards into a given container
function renderProducts(products, container) {
  container.innerHTML = ""; // Clear existing content
  products.forEach((product) => {
    const card = createProductCard(product);
    container.appendChild(card);
  });
}

// Function to set up event listeners
function setupEventListeners() {
  const showMoreButton = document.getElementById("show-more-button");
  const closeButton = document.getElementById("close-button");
  const previewSectionContainer = document.getElementById("preview-section-container");
  const showMoreSectionContainer = document.getElementById("show-more-section-container");
  const tabletDesktopSectionContainer = document.getElementById("tablet-desktop-section-container");

  // Show more button event listener
  showMoreButton.addEventListener("click", () => {
    previewSectionContainer.classList.add("slide-down-leave-active");
    previewSectionContainer.classList.add("hidden");
    showMoreSectionContainer.classList.remove("hidden");
    showMoreSectionContainer.classList.add("slide-down-enter-active");
  });

  // Close button event listener
  closeButton.addEventListener("click", () => {
    showMoreSectionContainer.classList.remove("slide-down-enter-active");
    showMoreSectionContainer.classList.add("slide-down-leave-active");
    setTimeout(() => {
      showMoreSectionContainer.classList.add("hidden");
      previewSectionContainer.classList.remove("hidden");
      previewSectionContainer.classList.remove("slide-down-leave-active");
    }, 1500);
  });

  // Handle window resize to show/hide sections based on screen width
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      previewSectionContainer.classList.add("hidden");
      showMoreSectionContainer.classList.add("hidden");
      tabletDesktopSectionContainer.classList.remove("hidden");
    } else {
      previewSectionContainer.classList.remove("hidden");
      tabletDesktopSectionContainer.classList.add("hidden");
    }
  });

  // Initial check to set correct visibility
  if (window.innerWidth >= 768) {
    previewSectionContainer.classList.add("hidden");
    showMoreSectionContainer.classList.add("hidden");
    tabletDesktopSectionContainer.classList.remove("hidden");
  } else {
    previewSectionContainer.classList.remove("hidden");
    tabletDesktopSectionContainer.classList.add("hidden");
  }
}

// Initialize the app
function init() {
  const previewSectionView = document.getElementById("preview-section-view");
  const showMoreSectionView = document.getElementById("show-more-section-view");
  const tabletDesktopSectionView = document.getElementById("tablet-desktop-section-view");

  // Render initial products for preview section (first 4 products)
  renderProducts(productsData.slice(0, 4), previewSectionView);

  // Render remaining products for show more section (excluding first 4 products)
  renderProducts(productsData.slice(4), showMoreSectionView);

  // Render all products for tablet and desktop section
  renderProducts(productsData, tabletDesktopSectionView);

  // Set up event listeners
  setupEventListeners();
}

// Run the init function on DOM content loaded
document.addEventListener("DOMContentLoaded", init);
