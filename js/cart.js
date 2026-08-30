// Carrito / Cotizador por WhatsApp - Materiales Chilavert

const CartManager = {
    storageKey: 'chilavert_cart',
    
    getItems() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            return raw ? JSON.parse(raw) : [];
        } catch(e) {
            return [];
        }
    },

    saveItems(items) {
        localStorage.setItem(this.storageKey, JSON.stringify(items));
        this.updateBadge();
        this.renderDrawer();
    },

    addItem(productId, qty = 1) {
        if (typeof catalogData === 'undefined') return;
        const product = catalogData.products.find(p => p.id === productId);
        if (!product) return;

        let items = this.getItems();
        const existingIdx = items.findIndex(i => i.id === productId);

        if (existingIdx >= 0) {
            items[existingIdx].qty += qty;
        } else {
            const catObj = catalogData.categories.find(c => c.id === product.category);
            items.push({
                id: product.id,
                name: product.name,
                category: catObj ? catObj.name : '',
                image: product.image || (catObj ? catObj.image : ''),
                qty: qty
            });
        }

        this.saveItems(items);
        this.showToast(`Agregado: ${product.name} (x${qty})`);
    },

    removeItem(productId) {
        let items = this.getItems().filter(i => i.id !== productId);
        this.saveItems(items);
    },

    updateQty(productId, newQty) {
        let items = this.getItems();
        const idx = items.findIndex(i => i.id === productId);
        if (idx >= 0) {
            if (newQty <= 0) {
                items.splice(idx, 1);
            } else {
                items[idx].qty = newQty;
            }
            this.saveItems(items);
        }
    },

    clearCart() {
        this.saveItems([]);
    },

    getTotalCount() {
        return this.getItems().reduce((sum, item) => sum + item.qty, 0);
    },

    updateBadge() {
        const count = this.getTotalCount();
        document.querySelectorAll('.cart-badge').forEach(badge => {
            badge.textContent = count;
            badge.classList.add('pop');
            setTimeout(() => badge.classList.remove('pop'), 250);
        });
    },

    openDrawer() {
        this.renderDrawer();
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-drawer-overlay');
        if (drawer && overlay) {
            drawer.classList.add('active');
            overlay.classList.add('active');
        }
    },

    closeDrawer() {
        const drawer = document.getElementById('cart-drawer');
        const overlay = document.getElementById('cart-drawer-overlay');
        if (drawer && overlay) {
            drawer.classList.remove('active');
            overlay.classList.remove('active');
        }
    },

    showToast(message) {
        let toast = document.getElementById('cart-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'cart-toast';
            toast.className = 'cart-toast';
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ade80; font-size: 1.2rem;"></i> <span>${message}</span>`;
        toast.classList.add('active');

        if (this.toastTimeout) clearTimeout(this.toastTimeout);
        this.toastTimeout = setTimeout(() => {
            toast.classList.remove('active');
        }, 3000);
    },

    sendWhatsAppQuotation() {
        const items = this.getItems();
        if (items.length === 0) {
            alert('Tu carrito de cotización está vacío.');
            return;
        }

        const nameInput = document.getElementById('cart-client-name');
        const locationInput = document.getElementById('cart-client-location');
        const clientName = nameInput ? nameInput.value.trim() : '';
        const clientLocation = locationInput ? locationInput.value.trim() : '';

        const waNumber = (typeof siteConfig !== 'undefined' && siteConfig.contact.whatsappRaw) 
            ? siteConfig.contact.whatsappRaw 
            : '5491139480685';

        let msg = `*SOLICITUD DE COTIZACIÓN - MATERIALES CHILAVERT*\n\n`;
        if (clientName) msg += `👤 *Cliente:* ${clientName}\n`;
        if (clientLocation) msg += `📍 *Ubicación / Obra:* ${clientLocation}\n`;
        msg += `📅 *Fecha:* ${new Date().toLocaleDateString('es-AR')}\n\n`;
        msg += `📋 *LISTA DE MATERIALES:*\n`;

        items.forEach((item, idx) => {
            msg += `${idx + 1}. *${item.name}* — Cantidad: *${item.qty}*\n`;
        });

        msg += `\n💬 _Hola, quisiera consultar disponibilidad y cotización final de estos materiales. Muchas gracias._`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
        window.open(waUrl, '_blank');
    },

    renderDrawer() {
        const bodyEl = document.getElementById('cart-drawer-items');
        const footerEl = document.getElementById('cart-drawer-footer');
        if (!bodyEl) return;

        const items = this.getItems();

        if (items.length === 0) {
            bodyEl.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fa-solid fa-cart-flatbed"></i>
                    <h4>Tu carrito está vacío</h4>
                    <p>Agregá productos desde el catálogo para solicitar tu cotización por WhatsApp.</p>
                    <a href="productos.html" class="btn btn-accent" style="margin-top: 1rem; display: inline-block;">Ver Productos</a>
                </div>
            `;
            if (footerEl) footerEl.style.display = 'none';
            return;
        }

        if (footerEl) footerEl.style.display = 'block';

        bodyEl.innerHTML = items.map(item => `
            <div class="cart-item">
                <img src="${item.image || 'img/products/cemento-avellaneda.webp'}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-info">
                    <span class="cart-item-cat">${item.category || ''}</span>
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-qty-control">
                        <button class="cart-qty-btn" onclick="CartManager.updateQty('${item.id}', ${item.qty - 1})">-</button>
                        <input type="text" class="cart-qty-input" value="${item.qty}" readonly>
                        <button class="cart-qty-btn" onclick="CartManager.updateQty('${item.id}', ${item.qty + 1})">+</button>
                    </div>
                </div>
                <button class="cart-remove-btn" onclick="CartManager.removeItem('${item.id}')" title="Eliminar producto">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `).join('');

        const totalItems = this.getTotalCount();
        const countLabel = document.getElementById('cart-total-items');
        if (countLabel) countLabel.textContent = `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
    },

    initUI() {
        // Inyectar Drawer y Overlay si no existen
        if (!document.getElementById('cart-drawer')) {
            const drawerHtml = `
                <div class="cart-drawer-overlay" id="cart-drawer-overlay" onclick="CartManager.closeDrawer()"></div>
                <aside class="cart-drawer" id="cart-drawer">
                    <div class="cart-drawer-header">
                        <h3><i class="fa-solid fa-cart-shopping"></i> Cotización de Materiales</h3>
                        <button class="cart-close-btn" onclick="CartManager.closeDrawer()">&times;</button>
                    </div>
                    <div class="cart-drawer-body" id="cart-drawer-items"></div>
                    <div class="cart-drawer-footer" id="cart-drawer-footer">
                        <div class="cart-summary-line">
                            <span>Total Items:</span>
                            <span id="cart-total-items">0 productos</span>
                        </div>
                        <div class="cart-input-group">
                            <label for="cart-client-name">Nombre / Empresa (opcional)</label>
                            <input type="text" id="cart-client-name" placeholder="Ej: Arq. Marcelo / Juan Pérez">
                        </div>
                        <div class="cart-input-group">
                            <label for="cart-client-location">Ubicación / Obra (opcional)</label>
                            <input type="text" id="cart-client-location" placeholder="Ej: Villa Ballester / San Martín">
                        </div>
                        <button class="btn-send-whatsapp-cart" onclick="CartManager.sendWhatsAppQuotation()">
                            <i class="fa-brands fa-whatsapp" style="font-size: 1.25rem;"></i> Pedir Cotización por WhatsApp
                        </button>
                    </div>
                </aside>
            `;
            document.body.insertAdjacentHTML('beforeend', drawerHtml);
        }

        // Event listeners para botones de apertura de carrito
        document.querySelectorAll('.cart-nav-btn, #cart-nav-btn, .btn-open-cart').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                CartManager.openDrawer();
            });
        });

        this.updateBadge();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    CartManager.initUI();
});
