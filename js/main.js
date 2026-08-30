document.addEventListener("DOMContentLoaded", () => {
    // 1. Inyectar Configuración
    
    if(document.getElementById("logo-text")) {
        document.getElementById("logo-text").textContent = siteConfig.business.name;
    }
    if(document.getElementById("footer-brand")) {
        document.getElementById("footer-brand").textContent = siteConfig.business.name;
    }
    if(document.getElementById("footer-desc")) {
        document.getElementById("footer-desc").textContent = siteConfig.business.description;
    }

    // Configurar enlaces de WhatsApp
    const waNumber = siteConfig.contact.whatsapp.replace(/\D/g, "");
    const waUrl = waNumber ? `https://wa.me/${waNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}` : "#";
    
    const waBtns = [
        document.getElementById("header-whatsapp-btn"),
        document.getElementById("hero-whatsapp-btn"),
        document.getElementById("fab-whatsapp")
    ];
    
    waBtns.forEach(btn => {
        if(btn) btn.href = waUrl;
    });

    // Footer Contact Info
    const footerContactList = document.getElementById("footer-contact-list");
    if(footerContactList) {
        footerContactList.innerHTML = `
            <li><i class="fa-solid fa-phone"></i> ${siteConfig.contact.phone}</li>
            <li><i class="fa-brands fa-whatsapp"></i> ${siteConfig.contact.whatsapp}</li>
            <li><i class="fa-solid fa-envelope"></i> ${siteConfig.contact.email}</li>
            <li><i class="fa-solid fa-location-dot"></i> ${siteConfig.contact.address}</li>
        `;
    }

    // Current Year
    if(document.getElementById("current-year")) {
        document.getElementById("current-year").textContent = new Date().getFullYear();
    }

    // 2. Menú Móvil
    const menuBtn = document.getElementById("mobile-menu-btn");
    const mainNav = document.getElementById("main-nav");
    
    if(menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            mainNav.classList.toggle("active");
        });
    }

    // 3. Carrusel Vertical Cíclico Infinito ("Siempre de Abajo hacia Arriba")
    const heroSlidesWrapper = document.getElementById("hero-slides-wrapper");
    const heroIndicators = document.getElementById("hero-slider-indicators");
    const heroTitle = document.getElementById("hero-title");
    const heroSubtitle = document.getElementById("hero-subtitle");

    if (heroSlidesWrapper && siteConfig.heroSlides && siteConfig.heroSlides.length > 0) {
        const slides = siteConfig.heroSlides;
        let currentSlideIdx = 0;
        let isTransitioning = false;

        heroSlidesWrapper.innerHTML = slides.map((slide, idx) => `
            <div class="hero-slide ${idx === 0 ? 'active' : 'idle-bottom'}" style="background-image: url('${slide.image}');" data-idx="${idx}"></div>
        `).join('');

        if (heroIndicators) {
            heroIndicators.innerHTML = slides.map((_, idx) => `
                <button class="hero-indicator-dot ${idx === 0 ? 'active' : ''}" data-idx="${idx}" title="Diapositiva ${idx + 1}"></button>
            `).join('');

            heroIndicators.querySelectorAll('.hero-indicator-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    const targetIdx = parseInt(dot.getAttribute('data-idx'));
                    goToHeroSlide(targetIdx);
                });
            });
        }

        function goToHeroSlide(newIdx) {
            if (newIdx === currentSlideIdx || isTransitioning) return;
            isTransitioning = true;

            const slideEls = heroSlidesWrapper.querySelectorAll('.hero-slide');
            const dotEls = heroIndicators ? heroIndicators.querySelectorAll('.hero-indicator-dot') : [];
            const outgoing = slideEls[currentSlideIdx];
            const incoming = slideEls[newIdx];

            incoming.className = 'hero-slide idle-bottom';
            void incoming.offsetHeight;

            outgoing.className = 'hero-slide animating prev';
            incoming.className = 'hero-slide animating active';

            if (dotEls.length > 0) {
                dotEls.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === newIdx);
                });
            }

            if (heroTitle && heroSubtitle && slides[newIdx]) {
                heroTitle.style.transition = 'opacity 0.3s ease';
                heroSubtitle.style.transition = 'opacity 0.3s ease';
                heroTitle.style.opacity = '0';
                heroSubtitle.style.opacity = '0';

                setTimeout(() => {
                    if (slides[newIdx].title) heroTitle.textContent = slides[newIdx].title;
                    if (slides[newIdx].subtitle) heroSubtitle.textContent = slides[newIdx].subtitle;
                    heroTitle.style.opacity = '1';
                    heroSubtitle.style.opacity = '1';
                }, 300);
            }

            setTimeout(() => {
                outgoing.className = 'hero-slide idle-bottom';
                currentSlideIdx = newIdx;
                isTransitioning = false;
            }, 980);
        }

        if (slides.length > 1) {
            setInterval(() => {
                const nextIdx = (currentSlideIdx + 1) % slides.length;
                goToHeroSlide(nextIdx);
            }, 5000);
        }
    }

    // 4. Renderizar Categorías en Home con Fotografías de Grupos
    const catGrid = document.getElementById("categories-grid");
    if(catGrid && typeof catalogData !== "undefined") {
        catGrid.innerHTML = catalogData.categories.map(cat => {
            const imgHtml = cat.image 
                ? `<div class="card-img-wrapper"><img src="${cat.image}" alt="${cat.name}" loading="lazy"></div>` 
                : `<div class="card-img-placeholder"><i class="fa-solid ${cat.icon || 'fa-box'}"></i></div>`;
            return `
            <a href="productos.html?categoria=${cat.id}" class="card">
                ${imgHtml}
                <div class="card-body">
                    <h3 class="card-title">${cat.name}</h3>
                    <p class="card-desc">${cat.description}</p>
                    <span class="btn btn-primary" style="margin-top: 1rem;">Ver Categoría &rarr;</span>
                </div>
            </a>
            `;
        }).join("");
    }

    // 5. Productos Destacados con Foto Específica del Producto
    const featuredGrid = document.getElementById("featured-grid");
    if(featuredGrid && typeof catalogData !== "undefined") {
        const featuredProducts = catalogData.products.slice(0, 3);
        featuredGrid.innerHTML = featuredProducts.map(prod => {
            const catObj = catalogData.categories.find(c => c.id === prod.category);
            const catName = catObj ? catObj.name : "";
            const prodImgSrc = prod.image || (catObj && catObj.image) || "";
            const prodImg = prodImgSrc 
                ? `<div class="card-img-wrapper"><img src="${prodImgSrc}" alt="${prod.name}" loading="lazy"></div>` 
                : `<div class="card-img-placeholder"><i class="fa-solid fa-image"></i></div>`;

            return `
            <div class="card">
                ${prodImg}
                <div class="card-body">
                    <span style="font-size: 0.8rem; color: var(--color-accent); font-weight: bold; text-transform: uppercase;">${catName}</span>
                    <h3 class="card-title">${prod.name}</h3>
                    <p class="card-desc">${prod.description}</p>
                    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                        <a href="producto-detalle.html?id=${prod.id}" class="btn btn-primary" style="flex: 1; padding: 0.5rem; font-size: 0.9rem;">Ver</a>
                        <a href="${waUrl + encodeURIComponent(prod.name)}" class="btn btn-whatsapp" style="flex: 1; padding: 0.5rem; font-size: 0.9rem;">Consultar</a>
                    </div>
                </div>
            </div>
        `}).join("");
    }
});
