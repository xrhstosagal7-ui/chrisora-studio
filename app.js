let allProducts = [];
let activeFilter = null;

const grid = document.querySelector("#products");
const categoryGrid = document.querySelector(".category-grid");

function applySettings(settings) {
  if (!settings) return;

  const heroTitle = document.querySelector(".hero h1");
  const heroSubtitle = document.querySelector(".hero .lead");
  const heroButton = document.querySelector(".hero .actions .button");
  const pinterestButton = document.querySelector("header .pill");
  const productsTitle = document.querySelector("#shop .section-head h2");
  const productsSubtitle = document.querySelector("#shop .section-head .lead");
  const footer = document.querySelector("footer");

  if (heroTitle && settings.heroTitle) {
    heroTitle.textContent = settings.heroTitle;
  }

  if (heroSubtitle && settings.heroSubtitle) {
    heroSubtitle.textContent = settings.heroSubtitle;
  }

  if (heroButton) {
    if (settings.heroButtonText) {
      heroButton.textContent = settings.heroButtonText;
    }

    if (settings.heroButtonLink) {
      heroButton.href = settings.heroButtonLink;
    }
  }

  if (pinterestButton) {
    if (settings.pinterestButtonText) {
      pinterestButton.textContent = settings.pinterestButtonText;
    }

    if (settings.pinterestButtonLink) {
      pinterestButton.href = settings.pinterestButtonLink;
    }
  }

  if (productsTitle && settings.productsTitle) {
    productsTitle.textContent = settings.productsTitle;
  }

  if (productsSubtitle && settings.productsSubtitle) {
    productsSubtitle.textContent = settings.productsSubtitle;
  }

  if (footer && settings.footerText) {
    let footerText = footer.querySelector(".footer-text");

    if (!footerText) {
      footerText = document.createElement("p");
      footerText.className = "footer-text";
      footer.appendChild(footerText);
    }

    footerText.textContent = settings.footerText;
  }
}

function renderCategories(categories) {
  if (!categoryGrid || !categories) return;

  categoryGrid.innerHTML = categories.map(category => `
    <button type="button" data-filter="${category.name}">
      ${category.name}
      <span>${category.number}</span>
    </button>
  `).join("");

  categoryGrid.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      render();
    });
  });
}

function render() {
  if (!grid) return;

  const list = activeFilter
    ? allProducts.filter(product => product.category === activeFilter)
    : allProducts;

  grid.innerHTML = list.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <p class="eyebrow">${product.category}</p>
        <h3>${product.name}</h3>
        <p>${product.description}</p>

        <div class="product-bottom">
          <span>${product.price}</span>
          <a href="${product.link}" target="_blank" rel="noopener">
            View
          </a>
        </div>
      </div>
    </article>
  `).join("");
}

Promise.all([
  fetch("products.json").then(response => response.json()),
  fetch("site-settings.json").then(response => response.json()),
  fetch("categories.json").then(response => response.json())
])
  .then(([productData, settings, categoryData]) => {
    allProducts = productData.products || [];

    applySettings(settings);

    renderCategories(categoryData.categories || []);

    render();
  })
  .catch(error => {
    console.error("Chrisora Studio error:", error);
  });
