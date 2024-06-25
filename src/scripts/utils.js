/**
 * Formats a price value as a currency string.
 * @param {number} price - The price value to format.
 */
export function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

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

        <div class="relative rounded-lg overflow-hidden md:h-[355px] w-full">

              <img src="${product.imageSrc}" alt="${product.imageAlt}" class="product-image w-full h-48 md:h-full object-cover" data-hover="${
    product.hoverImageSrc || ""
  }">
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
