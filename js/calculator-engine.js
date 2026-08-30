// Calculadora de Materiales Simplificada y Directa - Materiales Chilavert

const ConstructionCalculator = {
    // Definición de tipos de cálculo
    types: {
        muros: {
            name: "Mampostería y Paredes",
            options: [
                { id: "hueco12", name: "Ladrillo Cerámico Hueco 12x18x33 (Muro 12 cm)", unit: "m2" },
                { id: "hueco8", name: "Ladrillo Cerámico Hueco 8x18x33 (Tabique 8 cm)", unit: "m2" },
                { id: "hueco18", name: "Ladrillo Cerámico Hueco 18x18x33 (Muro 18 cm)", unit: "m2" },
                { id: "portante12", name: "Ladrillo Cerámico Portante 12x19x33", unit: "m2" },
                { id: "portante18", name: "Ladrillo Cerámico Portante 18x19x33", unit: "m2" },
                { id: "bloque20", name: "Bloque de Hormigón 20x19x39", unit: "m2" },
                { id: "bloque12", name: "Bloque de Hormigón 12x19x39", unit: "m2" },
                { id: "comun", name: "Ladrillo Común Macizo (Pared de 15 cm)", unit: "m2" },
                { id: "comun30", name: "Ladrillo Común Macizo (Pared de 30 cm)", unit: "m2" }
            ]
        },
        contrapisos: {
            name: "Contrapisos y Carpetas",
            options: [
                { id: "contrapiso_cascote", name: "Contrapiso de Cascote / Albañilería", unit: "m2_esp" },
                { id: "contrapiso_pobre", name: "Contrapiso de Hormigón Pobre", unit: "m2_esp" },
                { id: "carpeta_cemento", name: "Carpeta de Nivelación (Cemento y Arena)", unit: "m2_esp" }
            ]
        },
        revoques: {
            name: "Revoques e Impermeabilización",
            options: [
                { id: "revoque_grueso", name: "Revoque Grueso (Frisado)", unit: "m2" },
                { id: "revoque_fino", name: "Revoque Fino a la Cal", unit: "m2" },
                { id: "capa_aisladora", name: "Capa Aisladora Hidrófuga (Weber HD / Ceresita)", unit: "m2" }
            ]
        },
        hormigon: {
            name: "Hormigón Estructural (H-21)",
            options: [
                { id: "losa_hormigon", name: "Losa Maciza / Cimientos", unit: "m3" },
                { id: "columnas_vigas", name: "Columnas y Vigas", unit: "m3" }
            ]
        },
        pisos: {
            name: "Colocación de Pisos y Revestimientos",
            options: [
                { id: "porcelanato", name: "Porcelanatos (Adhesivo Flexible / Porcellanato)", unit: "m2" },
                { id: "ceramico", name: "Cerámicos Esmaltados (Adhesivo Impermeable)", unit: "m2" }
            ]
        }
    },

    init() {
        this.renderSubcategories();
        this.bindEvents();
        this.calculate();
    },

    renderSubcategories() {
        const catSelect = document.getElementById("calc-category");
        const itemSelect = document.getElementById("calc-item");
        if (!catSelect || !itemSelect) return;

        const currentCat = catSelect.value;
        const catData = this.types[currentCat];

        if (catData) {
            itemSelect.innerHTML = catData.options.map(opt => `
                <option value="${opt.id}">${opt.name}</option>
            `).join("");
        }

        this.updateDimensionInputs();
    },

    updateDimensionInputs() {
        const catSelect = document.getElementById("calc-category");
        const itemSelect = document.getElementById("calc-item");
        const dimThicknessGroup = document.getElementById("dim-thickness-group");
        const dimHeightLabel = document.getElementById("dim-height-label");

        if (!catSelect || !itemSelect) return;
        const currentCat = catSelect.value;
        const currentItemId = itemSelect.value;

        // Mostrar u ocultar espesor
        if (currentCat === "contrapisos" || currentCat === "hormigon") {
            if (dimThicknessGroup) dimThicknessGroup.style.display = "block";
            if (dimHeightLabel) dimHeightLabel.textContent = "Ancho (m)";
        } else {
            if (dimThicknessGroup) dimThicknessGroup.style.display = "none";
            if (dimHeightLabel) dimHeightLabel.textContent = "Alto / Altura (m)";
        }
    },

    bindEvents() {
        const catSelect = document.getElementById("calc-category");
        const itemSelect = document.getElementById("calc-item");
        const lengthInput = document.getElementById("calc-length");
        const heightInput = document.getElementById("calc-height");
        const thickInput = document.getElementById("calc-thickness");

        if (catSelect) {
            catSelect.addEventListener("change", () => {
                this.renderSubcategories();
                this.calculate();
            });
        }

        if (itemSelect) {
            itemSelect.addEventListener("change", () => {
                this.updateDimensionInputs();
                this.calculate();
            });
        }

        [lengthInput, heightInput, thickInput].forEach(inp => {
            if (inp) {
                inp.addEventListener("input", () => this.calculate());
            }
        });
    },

    calculate() {
        const catSelect = document.getElementById("calc-category");
        const itemSelect = document.getElementById("calc-item");
        const lengthInput = document.getElementById("calc-length");
        const heightInput = document.getElementById("calc-height");
        const thickInput = document.getElementById("calc-thickness");

        if (!catSelect || !itemSelect) return;

        const category = catSelect.value;
        const itemId = itemSelect.value;
        const length = parseFloat(lengthInput ? lengthInput.value : 0) || 0;
        const height = parseFloat(heightInput ? heightInput.value : 0) || 0;
        const thicknessCm = parseFloat(thickInput ? thickInput.value : 10) || 10;

        const area = length * height;
        const volumeM3 = area * (thicknessCm / 100);

        let materials = [];
        let summaryText = "";

        // MAMPOSTERIA
        if (category === "muros") {
            summaryText = `Superficie: ${area.toFixed(2)} m² (${length}m largo x ${height}m alto)`;
            if (itemId === "hueco12") {
                materials.push({ name: "Ladrillo Cerámico Hueco 12x18x33", spec: "Unidades", qty: Math.ceil(area * 15), unit: "unid." });
                materials.push({ name: "Cemento de Albañilería (Hidralit / Plasticor)", spec: "Bolsas de 20 kg", qty: Math.ceil(area * 0.16), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.035).toFixed(2)), unit: "m³" });
            } else if (itemId === "hueco8") {
                materials.push({ name: "Ladrillo Cerámico Hueco 8x18x33", spec: "Unidades", qty: Math.ceil(area * 15), unit: "unid." });
                materials.push({ name: "Cemento de Albañilería (Hidralit / Plasticor)", spec: "Bolsas de 20 kg", qty: Math.ceil(area * 0.12), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.025).toFixed(2)), unit: "m³" });
            } else if (itemId === "hueco18") {
                materials.push({ name: "Ladrillo Cerámico Hueco 18x18x33", spec: "Unidades", qty: Math.ceil(area * 15), unit: "unid." });
                materials.push({ name: "Cemento de Albañilería (Hidralit / Plasticor)", spec: "Bolsas de 20 kg", qty: Math.ceil(area * 0.22), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.05).toFixed(2)), unit: "m³" });
            } else if (itemId === "portante12") {
                materials.push({ name: "Ladrillo Cerámico Portante 12x19x33", spec: "Unidades", qty: Math.ceil(area * 16), unit: "unid." });
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.12), unit: "bolsas" });
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.22), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.04).toFixed(2)), unit: "m³" });
            } else if (itemId === "portante18") {
                materials.push({ name: "Ladrillo Cerámico Portante 18x19x33", spec: "Unidades", qty: Math.ceil(area * 16), unit: "unid." });
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.18), unit: "bolsas" });
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.32), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.06).toFixed(2)), unit: "m³" });
            } else if (itemId === "bloque20") {
                materials.push({ name: "Bloque de Hormigón 20x19x39", spec: "Unidades", qty: Math.ceil(area * 12.5), unit: "unid." });
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.18), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.045).toFixed(2)), unit: "m³" });
            } else if (itemId === "bloque12") {
                materials.push({ name: "Bloque de Hormigón 12x19x39", spec: "Unidades", qty: Math.ceil(area * 12.5), unit: "unid." });
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.12), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.03).toFixed(2)), unit: "m³" });
            } else if (itemId === "comun") {
                materials.push({ name: "Ladrillo Común Macizo", spec: "Unidades", qty: Math.ceil(area * 60), unit: "unid." });
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.45), unit: "bolsas" });
                materials.push({ name: "Cemento Portland CPC40", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.15), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.06).toFixed(2)), unit: "m³" });
            } else if (itemId === "comun30") {
                materials.push({ name: "Ladrillo Común Macizo", spec: "Unidades", qty: Math.ceil(area * 120), unit: "unid." });
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.90), unit: "bolsas" });
                materials.push({ name: "Cemento Portland CPC40", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.30), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((area * 0.12).toFixed(2)), unit: "m³" });
            }
        } 
        // CONTRAPISOS
        else if (category === "contrapisos") {
            summaryText = `Volumen: ${volumeM3.toFixed(2)} m³ (${area.toFixed(2)} m² x ${thicknessCm} cm espesor)`;
            if (itemId === "contrapiso_cascote") {
                materials.push({ name: "Cemento de Albañilería (Hidralit 20 kg)", spec: "Bolsas de 20 kg", qty: Math.ceil(volumeM3 * 6), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel o bolsón", qty: Number((volumeM3 * 0.45).toFixed(2)), unit: "m³" });
                materials.push({ name: "Cascote de Ladrillo Triturado", spec: "Acopio a granel", qty: Number((volumeM3 * 0.85).toFixed(2)), unit: "m³" });
            } else if (itemId === "contrapiso_pobre") {
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(volumeM3 * 3), unit: "bolsas" });
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(volumeM3 * 4), unit: "bolsas" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel", qty: Number((volumeM3 * 0.50).toFixed(2)), unit: "m³" });
                materials.push({ name: "Cascote / Piedra", spec: "Acopio a granel", qty: Number((volumeM3 * 0.85).toFixed(2)), unit: "m³" });
            } else if (itemId === "carpeta_cemento") {
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(volumeM3 * 8), unit: "bolsas" });
                materials.push({ name: "Arena Mediana / Fina", spec: "Acopio a granel o bolsón", qty: Number((volumeM3 * 1.1).toFixed(2)), unit: "m³" });
            }
        }
        // REVOQUES
        else if (category === "revoques") {
            summaryText = `Superficie: ${area.toFixed(2)} m² (${length}m x ${height}m)`;
            if (itemId === "revoque_grueso") {
                materials.push({ name: "Cal Hidratada Extra", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.25), unit: "bolsas" });
                materials.push({ name: "Cemento Portland CPC40", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.08), unit: "bolsas" });
                materials.push({ name: "Arena Mediana", spec: "Acopio a granel o bolsón", qty: Number((area * 0.025).toFixed(2)), unit: "m³" });
            } else if (itemId === "revoque_fino") {
                materials.push({ name: "Cal Aérea Hidratada El Milagro / Cefas", spec: "Bolsas de 25 kg", qty: Math.ceil(area * 0.15), unit: "bolsas" });
                materials.push({ name: "Arena Fina Tamizada", spec: "Acopio a granel o bolsón", qty: Number((area * 0.008).toFixed(2)), unit: "m³" });
            } else if (itemId === "capa_aisladora") {
                materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg", qty: Math.ceil(area * 0.20), unit: "bolsas" });
                materials.push({ name: "Hidrófugo Pasta/Líquido Weber HD", spec: "Envases / Baldes", qty: Math.ceil(area * 0.5), unit: "kg / L" });
                materials.push({ name: "Arena Gruesa", spec: "Acopio a granel", qty: Number((area * 0.02).toFixed(2)), unit: "m³" });
            }
        }
        // HORMIGON H-21
        else if (category === "hormigon") {
            summaryText = `Volumen: ${volumeM3.toFixed(2)} m³ (${area.toFixed(2)} m² x ${thicknessCm} cm espesor)`;
            materials.push({ name: "Cemento Portland CPC40 Avellaneda", spec: "Bolsas de 50 kg (Dosif. 350 kg/m³)", qty: Math.ceil(volumeM3 * 7), unit: "bolsas" });
            materials.push({ name: "Arena Gruesa Lavada", spec: "Acopio a granel o bolsón", qty: Number((volumeM3 * 0.65).toFixed(2)), unit: "m³" });
            materials.push({ name: "Piedra Partida 6/20", spec: "Acopio a granel o bolsón", qty: Number((volumeM3 * 0.70).toFixed(2)), unit: "m³" });
            if (itemId === "losa_hormigon") {
                materials.push({ name: "Malla Sima Electrosoldada (Panel 2x5m)", spec: "Paneles", qty: Math.ceil(area / 10), unit: "paneles" });
            }
        }
        // PISOS
        else if (category === "pisos") {
            summaryText = `Superficie: ${area.toFixed(2)} m² (${length}m x ${height}m)`;
            if (itemId === "porcelanato") {
                materials.push({ name: "Adhesivo Perfecto Flexible / Porcellanato 30kg", spec: "Bolsas de 30 kg (Rend: ~6 kg/m²)", qty: Math.ceil(area / 5), unit: "bolsas" });
                materials.push({ name: "Pastina Fluida Impermeable Weber / Perfecto", spec: "Bolsas de 1 kg / 5 kg", qty: Math.ceil(area * 0.35), unit: "kg" });
            } else if (itemId === "ceramico") {
                materials.push({ name: "Adhesivo Perfecto Impermeable 30kg", spec: "Bolsas de 30 kg (Rend: ~4 kg/m²)", qty: Math.ceil(area / 7), unit: "bolsas" });
                materials.push({ name: "Pastina Impermeable Weber / Perfecto", spec: "Bolsas de 1 kg / 5 kg", qty: Math.ceil(area * 0.3), unit: "kg" });
            }
        }

        this.renderResults(materials, summaryText);
    },

    renderResults(materials, summaryText) {
        const tableBody = document.getElementById("calc-results-tbody");
        const badgeEl = document.getElementById("calc-summary-badge");
        const waBtn = document.getElementById("calc-whatsapp-btn");

        if (badgeEl) badgeEl.textContent = summaryText;

        if (!tableBody) return;

        if (materials.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="2" style="text-align: center; color: #94a3b8; padding: 2rem;">Ingresá las medidas para calcular los materiales.</td></tr>`;
            return;
        }

        tableBody.innerHTML = materials.map(m => `
            <tr>
                <td>
                    <span class="calc-mat-name">${m.name}</span>
                    <span class="calc-mat-spec">${m.spec}</span>
                </td>
                <td>
                    <span style="font-size: 1.15rem; color: var(--color-primary);">${m.qty}</span> 
                    <span style="font-size: 0.85rem; color: var(--color-text-light); font-weight: normal;">${m.unit}</span>
                </td>
            </tr>
        `).join("");

        // Generar enlace de WhatsApp con el mensaje exacto solicitado
        if (waBtn) {
            const catSelect = document.getElementById("calc-category");
            const itemSelect = document.getElementById("calc-item");
            const itemName = itemSelect ? itemSelect.options[itemSelect.selectedIndex].text : "Materiales";

            const waNumber = (typeof siteConfig !== "undefined" && siteConfig.contact.whatsappRaw) ? siteConfig.contact.whatsappRaw : "5491139480685";

            let msg = `Hola, me contacto desde la web de Materiales Chilavert. Quisiera cotizar los siguientes materiales calculados para mi obra:\n\n`;
            msg += `🏗️ *TRABAJO:* ${itemName}\n`;
            msg += `📐 *DETALLE:* ${summaryText}\n\n`;
            msg += `📋 *LISTA DE MATERIALES CALCULADOS:*\n`;

            materials.forEach((m, idx) => {
                msg += `${idx + 1}. *${m.name}* — ${m.qty} ${m.unit} (${m.spec})\n`;
            });

            msg += `\n💬 _Aguardo su respuesta para confirmar presupuesto y disponibilidad. Muchas gracias._`;

            waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
        }
    }
};

document.addEventListener("DOMContentLoaded", () => {
    ConstructionCalculator.init();
});
