document.addEventListener("DOMContentLoaded", () => {
    if (typeof catalogData === "undefined") return;

    const productsGrid = document.getElementById("products-grid");
    const categoryList = document.getElementById("category-filter-list");
    const searchInput = document.getElementById("search-input");
    const countLabel = document.getElementById("product-count");
    const titleLabel = document.getElementById("current-category-title");

    // Read URL params
    const urlParams = new URLSearchParams(window.location.search);
    let activeCategory = urlParams.get("categoria") || "all";
    let searchQuery = "";

    // WhatsApp base URL from config
    const waNumber = (typeof siteConfig !== "undefined" && siteConfig.contact.whatsapp) ? siteConfig.contact.whatsapp.replace(/\D/g, "") : "";
    const waBaseUrl = `https://wa.me/${waNumber}?text=`;

    // Render Sidebar Categories
    function renderCategories() {
        let html = `<li><a data-cat="all" class="${activeCategory === "all" ? "active" : ""}">Todas las categorías</a></li>`;
        html += catalogData.categories.map(cat => 
            `<li><a data-cat="${cat.id}" class="${activeCategory === cat.id ? "active" : ""}">${cat.name}</a></li>`
        ).join("");
        categoryList.innerHTML = html;

        // Add click events
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
            });
        });
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
            productsGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 2rem;">No se encontraron productos.</div>`;
            return;
        }

        // Render HTML con fotos reales
        productsGrid.innerHTML = filtered.map(prod => {
            const catObj = catalogData.categories.find(c => c.id === prod.category);
            const catName = catObj ? catObj.name : "";
            const prodImg = (catObj && catObj.image) 
                ? `<div class="card-img-wrapper"><img src="${catObj.image}" alt="${prod.name}" loading="lazy"></div>` 
                : `<div class="card-img-placeholder"><i class="fa-solid fa-image"></i></div>`;
            const msg = encodeURIComponent(`Hola, me interesa el producto: ${prod.name}`);
            return `
            <div class="card">
                ${prodImg}
                <div class="card-body">
                    <span style="font-size: 0.8rem; color: var(--color-accent); font-weight: bold; text-transform: uppercase;">${catName}</span>
                    <h3 class="card-title">${prod.name}</h3>
                    <p class="card-desc">${prod.description}</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <a href="producto-detalle.html?id=${prod.id}" class="btn btn-primary" style="flex: 1; padding: 0.5rem; font-size: 0.9rem;">Ver</a>
                        <a href="${waBaseUrl}${msg}" class="btn btn-whatsapp" style="flex: 1; padding: 0.5rem; font-size: 0.9rem;">Consultar</a>
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
});
