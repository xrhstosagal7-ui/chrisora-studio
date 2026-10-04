let allProducts=[],activeFilter=null;
const grid=document.querySelector("#products");
const render=()=>{const list=activeFilter?allProducts.filter(p=>p.category===activeFilter):allProducts;
grid.innerHTML=list.map(p=>`<article class="product"><div class="product-img"><img loading="lazy" src="${p.image}" alt="${p.name}"></div><div class="product-info"><div class="tag">${p.category} · ${p.price}</div><h3>${p.name}</h3><p>${p.description||""}</p><a class="buy" href="${p.link}" target="_blank" rel="nofollow sponsored noopener">View find ↗</a></div></article>`).join("")||"<p>No finds in this category yet.</p>"};
fetch("products.json").then(r=>r.json()).then(d=>{allProducts=d;render()});
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{activeFilter=b.dataset.filter;render();document.querySelector("#shop").scrollIntoView({behavior:"smooth"})}));
document.querySelector("#clearFilter").addEventListener("click",()=>{activeFilter=null;render()});
