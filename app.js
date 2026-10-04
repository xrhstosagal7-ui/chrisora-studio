let allProducts = [], activeFilter = null;

const grid = document.querySelector("#products");

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

function render() {
  const list = activeFilter
    ? allProducts.filter(p => p.category === activeFilter)
    : allProducts;

  grid.innerHTML = list.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.name}">
      <div class="product-info">
        <p class="eyebrow">${p.category}</p>
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <div class="product-bottom">
          <span>${p.price}</span>
          <a href="${p.link}" target="_blank" rel="noopener">View</a>
        </div>
      </div>
    </article>
  `).join("");
}

Promise.all([
  fetch("products.json").then(r => r.json()),
  fetch("site-settings.json").then(r => r.json())
])
.then(([productData, settings]) => {
  allProducts = productData.products || [];
  applySettings(settings);
  render();
})
.catch(error => {
  console.error("Chrisora Studio error:", error);
});

document.querySelectorAll("[data-filter]").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    render();
  });
});

const clearFilter = document.querySelector("#clearFilter");

if (clearFilter) {
  clearFilter.addEventListener("click", () => {
    activeFilter = null;
    render();
  });
}
