document.addEventListener("DOMContentLoaded", () => {
    if (typeof catalogData === "undefined") return;

    const productsGrid = document.getElementById("products-grid");
    const categoryList = document.getElementById("category-filter-list");
    const searchInput = document.getElementById("search-input");
    const countLabel = document.getElementById("product-count");
    const titleLabel = document.getElementById("current-category-title");
    const catalogHeader = document.getElementById("catalog-header");

    // Read URL params
    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get("categoria") || "all";
    let searchQuery = "";

    // WhatsApp base URL from config
    const waNumber = (typeof siteConfig !== "undefined" && siteConfig.contact.whatsappRaw) ? siteConfig.contact.whatsappRaw : "5491139480685";
    const waBaseUrl = `https://wa.me/${waNumber}?text=`;

    // Render Sidebar / Mobile Chips Categories
    function renderCategories() {
        let html = `<li><a data-cat="all" class="${activeCategory === "all" ? "active" : ""}">Todas las categorías</a></li>`;
        html += catalogData.categories.map(cat => 
            `<li><a data-cat="${cat.id}" class="${activeCategory === cat.id ? "active" : ""}">${cat.name}</a></li>`
        ).join("");
        categoryList.innerHTML = html;

        categoryList.querySelectorAll("a").forEach(a => {
            a.addEventListener("click", (e) => {
                e.preventDefault();
                activeCategory = e.target.getAttribute("data-cat");
                const url = new URL(window.location);
                if(activeCategory === "all") url.searchParams.delete("categoria");
                else url.searchParams.set("categoria", activeCategory);
                window.history.pushState({}, "", url);
                
                renderCategories();
                renderProducts();
                scrollToProducts();
            });
        });
    }

    function scrollToProducts() {
        if (catalogHeader) {
            catalogHeader.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    }

    // Render Products Grid
    function renderProducts() {
        let filtered = catalogData.products;
        
        if (activeCategory !== "all") {
            filtered = filtered.filter(p => p.category === activeCategory);
            const catName = catalogData.categories.find(c => c.id === activeCategory)?.name;
            titleLabel.textContent = catName || "Productos";
        } else {
            titleLabel.textContent = "Todos los Productos";
        }

        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(q) || 
                p.description.toLowerCase().includes(q) ||
                (p.brand && p.brand.toLowerCase().includes(q))
            );
            titleLabel.textContent = "Resultados de búsqueda";
        }

        countLabel.textContent = `${filtered.length} productos`;

        if (filtered.length === 0) {
            productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron productos en esta categoría.</div>`;
            return;
        }

        // Render HTML mostrando la foto específica del producto y botón de agregar al carrito
        productsGrid.innerHTML = filtered.map(prod => {
            const catObj = catalogData.categories.find(c => c.id === prod.category);
            const catName = catObj ? catObj.name : "";
            const prodImgSrc = prod.image || (catObj && catObj.image) || "";
            const prodImg = prodImgSrc 
                ? `<div class="card-img-wrapper"><img src="${prodImgSrc}" alt="${prod.name}" loading="lazy"></div>` 
                : `<div class="card-img-placeholder"><i class="fa-solid fa-image"></i></div>`;
            const msg = encodeURIComponent(`Hola, me interesa consultar por el producto: ${prod.name}`);
            return `
            <div class="card">
                ${prodImg}
                <div class="card-body">
                    <span style="font-size: 0.8rem; color: var(--color-accent); font-weight: bold; text-transform: uppercase;">${catName}</span>
                    <h3 class="card-title">${prod.name}</h3>
                    <p class="card-desc">${prod.description}</p>
                    
                    <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 1rem;">
                        <button class="btn btn-accent" style="width: 100%; padding: 0.6rem; font-size: 0.9rem;" onclick="CartManager.addItem('${prod.id}', 1)">
                            <i class="fa-solid fa-cart-plus" style="margin-right: 6px;"></i> Agregar a Cotización
                        </button>
                        <div style="display: flex; gap: 0.5rem;">
                            <a href="producto-detalle.html?id=${prod.id}" class="btn btn-primary" style="flex: 1; padding: 0.45rem; font-size: 0.85rem; text-align: center;">Ver Detalle</a>
                            <a href="${waBaseUrl}${msg}" class="btn btn-whatsapp" style="flex: 1; padding: 0.45rem; font-size: 0.85rem; text-align: center;" target="_blank"><i class="fa-brands fa-whatsapp"></i> Consultar</a>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }).join("");
    }

    // Search input event
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value;
        renderProducts();
    });

    renderCategories();
    renderProducts();

    // Si viene con categoría seleccionada por URL, auto-scroll directo a los productos
    if (activeCategory !== "all" || window.location.hash === "#products-section") {
        setTimeout(scrollToProducts, 200);
    }
});
