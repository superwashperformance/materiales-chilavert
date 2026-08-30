/**
 * Controlador de Interfaz de Usuario para la Calculadora de Materiales
 * Materiales Chilavert
 */

document.addEventListener("DOMContentLoaded", () => {
    'use strict';

    // Estado local de la calculadora
    const CalcState = {
        currentStep: 1,
        selectedModule: 'muros',
        workData: {
            name: '',
            client: '',
            location: '',
            date: new Date().toISOString().split('T')[0],
            area: '',
            floors: '1',
            notes: ''
        },
        openings: [],
        steelBars: [
            { diameterMm: 10, lengthM: 6.0, count: 8, name: 'Armadura Principal' },
            { diameterMm: 6, lengthM: 1.2, count: 25, name: 'Estribos' }
        ],
        currentResult: null,
        savedCalculations: [],
        budgetOptions: {
            laborCost: 0,
            extraCosts: 0,
            taxesPercent: 0,
            currency: 'ARS'
        }
    };

    // Cargar estado previo de localStorage si existe
    try {
        const saved = localStorage.getItem('chilavert_calc_work');
        if (saved) {
            const parsed = JSON.parse(saved);
            Object.assign(CalcState.workData, parsed.workData || {});
            CalcState.savedCalculations = parsed.savedCalculations || [];
        }
    } catch(e) {
        console.warn('No se pudo acceder a localStorage', e);
    }

    // Elementos DOM Principales
    const stepItems = document.querySelectorAll('.step-item');
    const stepPanels = document.querySelectorAll('.calc-step-panel');
    const moduleCards = document.querySelectorAll('.module-card');
    const openingsListEl = document.getElementById('openings-list');
    const addOpeningBtn = document.getElementById('btn-add-opening');
    const steelBarsListEl = document.getElementById('steel-bars-list');
    const addSteelBarBtn = document.getElementById('btn-add-steel-bar');
    const moduleFormContainer = document.getElementById('module-form-container');

    // 1. Manejo del Stepper / Pasos
    function goToStep(stepNumber) {
        if (stepNumber < 1 || stepNumber > 5) return;

        // Validaciones al avanzar
        if (stepNumber > 1 && CalcState.currentStep === 1) {
            const nameInput = document.getElementById('work-name');
            if (nameInput && !nameInput.value.trim()) {
                alert('Por favor, ingresá al menos el nombre o referencia de la obra.');
                nameInput.focus();
                return;
            }
            saveWorkDataFromInputs();
        }

        if (stepNumber === 4) {
            // Ejecutar calculo antes de ir al paso 4
            const success = executeCurrentCalculation();
            if (!success) return;
        }

        if (stepNumber === 5) {
            renderMasterBudget();
        }

        CalcState.currentStep = stepNumber;

        // Actualizar Stepper Header
        stepItems.forEach(item => {
            const s = parseInt(item.getAttribute('data-step'));
            item.classList.remove('active', 'completed');
            if (s === stepNumber) item.classList.add('active');
            else if (s < stepNumber) item.classList.add('completed');
        });

        // Actualizar Paneles
        stepPanels.forEach(panel => {
            panel.classList.remove('active');
            if (parseInt(panel.getAttribute('data-step')) === stepNumber) {
                panel.classList.add('active');
            }
        });

        window.scrollTo({ top: 150, behavior: 'smooth' });
    }

    // Eventos en botones del stepper
    stepItems.forEach(item => {
        item.addEventListener('click', () => {
            const s = parseInt(item.getAttribute('data-step'));
            if (s <= CalcState.currentStep + 1) goToStep(s);
        });
    });

    document.querySelectorAll('[data-action="next-step"]').forEach(btn => {
        btn.addEventListener('click', () => goToStep(CalcState.currentStep + 1));
    });

    document.querySelectorAll('[data-action="prev-step"]').forEach(btn => {
        btn.addEventListener('click', () => goToStep(CalcState.currentStep - 1));
    });
    // 2. Seleccion de Modulo Constructivo
    moduleCards.forEach(card => {
        card.addEventListener('click', () => {
            moduleCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            CalcState.selectedModule = card.getAttribute('data-module');
            renderModuleForm(CalcState.selectedModule);
            goToStep(3);
        });
    });

    function saveWorkDataFromInputs() {
        CalcState.workData.name = document.getElementById('work-name')?.value.trim() || 'Obra Sin Nombre';
        CalcState.workData.client = document.getElementById('work-client')?.value.trim() || '';
        CalcState.workData.location = document.getElementById('work-location')?.value.trim() || '';
        CalcState.workData.date = document.getElementById('work-date')?.value || '';
        CalcState.workData.area = document.getElementById('work-area')?.value || '';
        CalcState.workData.floors = document.getElementById('work-floors')?.value || '1';
        CalcState.workData.notes = document.getElementById('work-notes')?.value.trim() || '';

        try {
            localStorage.setItem('chilavert_calc_work', JSON.stringify({
                workData: CalcState.workData,
                savedCalculations: CalcState.savedCalculations
            }));
        } catch(e) {}
    }

    // 3. Renderizado Dinamico de Formularios por Modulo
    function renderModuleForm(moduleType) {
        if (!moduleFormContainer) return;

        let html = '';
        if (moduleType === 'muros') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-ruler-combined"></i> 1. Dimensiones del Muro</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Largo Total</label>
                            <div class="input-with-unit">
                                <input type="number" id="muro-length" step="0.01" min="0.1" value="10.00" required>
                                <span class="input-unit-badge">m</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Alto / Altura</label>
                            <div class="input-with-unit">
                                <input type="number" id="muro-height" step="0.01" min="0.1" value="2.60" required>
                                <span class="input-unit-badge">m</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Cantidad de Paredes Iguales</label>
                            <input type="number" id="muro-count" class="form-control" min="1" value="1">
                        </div>
                        <div class="form-group">
                            <label>Desperdicio Estimado</label>
                            <div class="input-with-unit">
                                <input type="number" id="muro-waste" min="0" max="30" value="7">
                                <span class="input-unit-badge">%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Gestor de Aberturas -->
                    <div class="openings-manager">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong><i class="fa-solid fa-door-open"></i> Descontar Aberturas (Puertas/Ventanas)</strong>
                        </div>
                        <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 0.5rem; margin-top: 0.75rem; align-items: end;">
                            <div>
                                <label style="font-size:0.75rem;">Tipo / Nombre</label>
                                <input type="text" id="new-op-name" class="form-control" placeholder="Ej: Ventana Living" style="padding: 0.45rem;">
                            </div>
                            <div>
                                <label style="font-size:0.75rem;">Ancho (m)</label>
                                <input type="number" id="new-op-w" class="form-control" step="0.05" placeholder="1.50" style="padding: 0.45rem;">
                            </div>
                            <div>
                                <label style="font-size:0.75rem;">Alto (m)</label>
                                <input type="number" id="new-op-h" class="form-control" step="0.05" placeholder="1.20" style="padding: 0.45rem;">
                            </div>
                            <div>
                                <label style="font-size:0.75rem;">Cant</label>
                                <input type="number" id="new-op-c" class="form-control" value="1" min="1" style="padding: 0.45rem;">
                            </div>
                            <button type="button" id="btn-add-op" class="btn btn-primary" style="padding: 0.45rem 0.85rem;"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <div id="openings-list-container" style="margin-top: 0.75rem;"></div>
                    </div>
                </div>

                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-cubes"></i> 2. Tipo de Mampuesto y Mezcla</h3>
                    <div class="form-group mb-md">
                        <label>Tipo de Ladrillo o Bloque</label>
                        <select id="muro-type" class="form-control">
                            <option value="hueco_12" selected>Ladrillo Cerámico Hueco 12x18x33 (Muro estándar 12cm)</option>
                            <option value="hueco_8">Ladrillo Cerámico Hueco 8x18x33 (Tabique 8cm)</option>
                            <option value="hueco_18">Ladrillo Cerámico Hueco 18x18x33 (Muro exterior 18cm)</option>
                            <option value="ladrillo_comun_15">Ladrillo Común de Campo (Pared de 15cm)</option>
                            <option value="ladrillo_comun_30">Ladrillo Común de Campo (Pared de 30cm)</option>
                            <option value="portante_12">Ladrillo Cerámico Portante 12x19x33</option>
                            <option value="portante_18">Ladrillo Cerámico Portante 18x19x33</option>
                            <option value="bloque_hormigon_20">Bloque de Hormigón 20x20x40</option>
                            <option value="bloque_retak_15">Bloque HCCA Retak 15x25x50 cm</option>
                        </select>
                    </div>
                    <div class="form-group mb-md">
                        <label>Revoques y Terminación</label>
                        <select id="muro-rendering" class="form-control">
                            <option value="none">Solo Mampostería y Mortero de Asiento</option>
                            <option value="grueso">Incluir Revoque Grueso (2 caras)</option>
                            <option value="completo" selected>Revoque Completo (Azotado Hidrófugo Ceresita + Grueso 2 caras)</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (moduleType === 'pisos') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-ruler-combined"></i> Dimensiones del Ambiente</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Largo del Ambiente</label>
                            <div class="input-with-unit">
                                <input type="number" id="piso-length" step="0.01" min="0.1" value="5.00">
                                <span class="input-unit-badge">m</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Ancho del Ambiente</label>
                            <div class="input-with-unit">
                                <input type="number" id="piso-width" step="0.01" min="0.1" value="4.00">
                                <span class="input-unit-badge">m</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Cantidad de Ambientes Iguales</label>
                            <input type="number" id="piso-count" class="form-control" min="1" value="1">
                        </div>
                        <div class="form-group">
                            <label>Desperdicio / Cortes</label>
                            <div class="input-with-unit">
                                <input type="number" id="piso-waste" min="0" max="30" value="10">
                                <span class="input-unit-badge">%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-border-all"></i> Tipo de Revestimiento y Adhesivo</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Tipo de Revestimiento</label>
                            <select id="piso-type" class="form-control">
                                <option value="porcelanato" selected>Porcelanato (Usa Weber Porcelanato Pro)</option>
                                <option value="ceramica">Cerámica Tradicional (Usa Weber Impermeable)</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Metros por Caja</label>
                            <div class="input-with-unit">
                                <input type="number" id="piso-boxm2" step="0.05" value="1.80">
                                <span class="input-unit-badge">m²</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Ancho Placa (cm)</label>
                            <input type="number" id="piso-piece-w" class="form-control" value="60">
                        </div>
                        <div class="form-group">
                            <label>Largo Placa (cm)</label>
                            <input type="number" id="piso-piece-h" class="form-control" value="60">
                        </div>
                    </div>
                </div>
            `;
        } else if (moduleType === 'contrapisos') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-ruler-combined"></i> Dimensiones del Contrapiso</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Largo</label>
                            <div class="input-with-unit"><input type="number" id="contra-length" step="0.01" value="6.00"><span class="input-unit-badge">m</span></div>
                        </div>
                        <div class="form-group">
                            <label>Ancho</label>
                            <div class="input-with-unit"><input type="number" id="contra-width" step="0.01" value="4.00"><span class="input-unit-badge">m</span></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Espesor</label>
                            <div class="input-with-unit"><input type="number" id="contra-thickness" step="0.5" value="10"><span class="input-unit-badge">cm</span></div>
                        </div>
                        <div class="form-group">
                            <label>Desperdicio</label>
                            <div class="input-with-unit"><input type="number" id="contra-waste" value="10"><span class="input-unit-badge">%</span></div>
                        </div>
                    </div>
                </div>
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-trowel"></i> Dosificación y Agregados</h3>
                    <div class="form-group">
                        <label>Tipo de Contrapiso</label>
                        <select id="contra-type" class="form-control">
                            <option value="cascote" selected>Contrapiso Tradicional de Cascote (1:1/4:4:8 Cemento, Cal, Arena, Cascote)</option>
                            <option value="granza">Contrapiso de Piedra/Granza (1:3:6 Cemento, Arena, Granza)</option>
                        </select>
                    </div>
                </div>
            `;
        } else if (moduleType === 'carpetas') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-ruler-combined"></i> Dimensiones de la Carpeta</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Largo</label>
                            <div class="input-with-unit"><input type="number" id="carpeta-length" step="0.01" value="6.00"><span class="input-unit-badge">m</span></div>
                        </div>
                        <div class="form-group">
                            <label>Ancho</label>
                            <div class="input-with-unit"><input type="number" id="carpeta-width" step="0.01" value="4.00"><span class="input-unit-badge">m</span></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Espesor</label>
                            <div class="input-with-unit"><input type="number" id="carpeta-thickness" step="0.5" value="2.5"><span class="input-unit-badge">cm</span></div>
                        </div>
                        <div class="form-group">
                            <label>Desperdicio</label>
                            <div class="input-with-unit"><input type="number" id="carpeta-waste" value="8"><span class="input-unit-badge">%</span></div>
                        </div>
                    </div>
                </div>
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-layer-group"></i> Dosificación</h3>
                    <p style="color: var(--color-text-light); font-size: 0.95rem;">Dosificación estándar 1:3 (Cemento Portland y Arena de río limpia tamizada). Espesor recomendado entre 2 y 3 cm sobre contrapiso curado.</p>
                </div>
            `;
        } else if (moduleType === 'pintura') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-paint-roller"></i> Superficie a Pintar</h3>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Superficie Neta Total (m²)</label>
                            <div class="input-with-unit"><input type="number" id="pintura-area" step="0.1" value="80.0"><span class="input-unit-badge">m²</span></div>
                        </div>
                        <div class="form-group">
                            <label>Cantidad de Manos</label>
                            <input type="number" id="pintura-coats" class="form-control" min="1" max="5" value="2">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Rendimiento por Litro / Mano</label>
                            <div class="input-with-unit"><input type="number" id="pintura-yield" step="0.5" value="10.0"><span class="input-unit-badge">m²/L</span></div>
                        </div>
                        <div class="form-group">
                            <label>Desperdicio</label>
                            <div class="input-with-unit"><input type="number" id="pintura-waste" value="5"><span class="input-unit-badge">%</span></div>
                        </div>
                    </div>
                </div>
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-spray-can"></i> Preparación de Superficie</h3>
                    <div class="form-group">
                        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
                            <input type="checkbox" id="pintura-primer" checked style="width: 18px; height: 18px;">
                            <span>Incluir Fijador / Sellador al Agua (1 mano previa)</span>
                        </label>
                    </div>
                </div>
            `;
        } else if (moduleType === 'hormigon') {
            html = `
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-monument"></i> Elemento Estructural</h3>
                    <div class="form-group mb-md">
                        <label>Tipo de Estructura</label>
                        <select id="hormigon-type" class="form-control">
                            <option value="columnas" selected>Columnas</option>
                            <option value="vigas">Vigas</option>
                            <option value="platea">Platea de Fundación</option>
                            <option value="losas">Losa Maciza / Aligerada</option>
                            <option value="bases">Bases Aisladas</option>
                            <option value="encadenados">Vigas de Encadenado</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Ancho / Base</label>
                            <div class="input-with-unit"><input type="number" id="h-width" value="20"><span class="input-unit-badge">cm</span></div>
                        </div>
                        <div class="form-group">
                            <label>Alto / Espesor</label>
                            <div class="input-with-unit"><input type="number" id="h-depth" value="20"><span class="input-unit-badge">cm</span></div>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Largo / Altura</label>
                            <div class="input-with-unit"><input type="number" id="h-length" step="0.05" value="2.80"><span class="input-unit-badge">m</span></div>
                        </div>
                        <div class="form-group">
                            <label>Cantidad de Elementos</label>
                            <input type="number" id="h-count" class="form-control" value="4">
                        </div>
                    </div>
                </div>
                <div class="calc-card">
                    <h3 class="calc-card-title"><i class="fa-solid fa-triangle-exclamation"></i> Calidad y Advertencia Técnica</h3>
                    <div class="calc-disclaimer">
                        <strong>Dosificación H-21 (1:2:3):</strong> Estimación aproximada para cómputo de compra. No sustituye la memoria de cálculo, planos estructurales ni el ensayo de probetas de hormigón firmado por profesional matriculado.
                    </div>
                </div>
            `;
        } else if (moduleType === 'acero') {
            html = `
                <div class="calc-card" style="grid-column: 1 / -1;">
                    <h3 class="calc-card-title"><i class="fa-solid fa-bars-staggered"></i> Planilla de Despiece de Barras de Hierro ADN 420</h3>
                    <div id="steel-bars-container"></div>
                    <button type="button" id="btn-add-bar-row" class="btn btn-primary mt-md" style="margin-top: 1rem;">
                        <i class="fa-solid fa-plus"></i> Agregar Posición / Diámetro
                    </button>
                </div>
            `;
        }

        moduleFormContainer.innerHTML = html;

        // Configurar gestores dinámicos
        if (moduleType === 'muros') setupOpeningsManager();
        if (moduleType === 'acero') setupSteelManager();
    }
    // Gestor de Aberturas
    function setupOpeningsManager() {
        const btnAdd = document.getElementById('btn-add-op');
        const container = document.getElementById('openings-list-container');

        function render() {
            if (!container) return;
            if (CalcState.openings.length === 0) {
                container.innerHTML = '<p style="color:#94a3b8; font-size:0.85rem; margin:0;">No hay aberturas descontadas aún.</p>';
                return;
            }
            container.innerHTML = CalcState.openings.map((op, idx) => `
                <div class="opening-item">
                    <span><strong>${op.name}</strong>: ${op.width}m × ${op.height}m (${op.count} u) = <strong>${CalculatorEngine.round(op.width * op.height * op.count, 2)} m²</strong></span>
                    <button type="button" class="btn-remove-opening" data-idx="${idx}"><i class="fa-solid fa-trash"></i></button>
                </div>
            `).join('');

            container.querySelectorAll('.btn-remove-opening').forEach(b => {
                b.addEventListener('click', (e) => {
                    const idx = parseInt(b.getAttribute('data-idx'));
                    CalcState.openings.splice(idx, 1);
                    render();
                });
            });
        }

        if (btnAdd) {
            btnAdd.onclick = () => {
                const name = document.getElementById('new-op-name')?.value.trim() || 'Abertura';
                const w = parseFloat(document.getElementById('new-op-w')?.value);
                const h = parseFloat(document.getElementById('new-op-h')?.value);
                const c = parseInt(document.getElementById('new-op-c')?.value) || 1;

                if (!w || !h || w <= 0 || h <= 0) {
                    alert('Ingresá medidas válidas para la abertura.');
                    return;
                }

                CalcState.openings.push({ name, width: w, height: h, count: c });
                document.getElementById('new-op-name').value = '';
                document.getElementById('new-op-w').value = '';
                document.getElementById('new-op-h').value = '';
                document.getElementById('new-op-c').value = '1';
                render();
            };
        }

        render();
    }

    // Gestor de Acero
    function setupSteelManager() {
        const container = document.getElementById('steel-bars-container');
        const btnAdd = document.getElementById('btn-add-bar-row');

        function render() {
            if (!container) return;
            container.innerHTML = `
                <table class="calc-materials-table" style="margin-top: 1rem;">
                    <thead>
                        <tr>
                            <th>Identificación</th>
                            <th>Diámetro</th>
                            <th>Largo por Barra (m)</th>
                            <th>Cantidad</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${CalcState.steelBars.map((bar, idx) => `
                            <tr>
                                <td><input type="text" class="form-control bar-name" data-idx="${idx}" value="${bar.name}" style="padding: 0.4rem;"></td>
                                <td>
                                    <select class="form-control bar-diam" data-idx="${idx}" style="padding: 0.4rem;">
                                        ${[6, 8, 10, 12, 16, 20, 25].map(d => `<option value="${d}" ${bar.diameterMm === d ? 'selected' : ''}>Ø ${d} mm</option>`).join('')}
                                    </select>
                                </td>
                                <td><input type="number" step="0.1" class="form-control bar-len" data-idx="${idx}" value="${bar.lengthM}" style="padding: 0.4rem;"></td>
                                <td><input type="number" class="form-control bar-count" data-idx="${idx}" value="${bar.count}" style="padding: 0.4rem;"></td>
                                <td><button type="button" class="btn-remove-opening btn-remove-bar" data-idx="${idx}"><i class="fa-solid fa-trash"></i></button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;

            // Eventos para actualizar estado en vivo
            container.querySelectorAll('.bar-name').forEach(i => i.onchange = (e) => CalcState.steelBars[e.target.dataset.idx].name = e.target.value);
            container.querySelectorAll('.bar-diam').forEach(i => i.onchange = (e) => CalcState.steelBars[e.target.dataset.idx].diameterMm = parseInt(e.target.value));
            container.querySelectorAll('.bar-len').forEach(i => i.onchange = (e) => CalcState.steelBars[e.target.dataset.idx].lengthM = parseFloat(e.target.value) || 0);
            container.querySelectorAll('.bar-count').forEach(i => i.onchange = (e) => CalcState.steelBars[e.target.dataset.idx].count = parseInt(e.target.value) || 1);

            container.querySelectorAll('.btn-remove-bar').forEach(b => {
                b.onclick = () => {
                    CalcState.steelBars.splice(parseInt(b.dataset.idx), 1);
                    render();
                };
            });
        }

        if (btnAdd) {
            btnAdd.onclick = () => {
                CalcState.steelBars.push({ diameterMm: 12, lengthM: 4.0, count: 4, name: 'Posición ' + (CalcState.steelBars.length + 1) });
                render();
            };
        }

        render();
    }

    // 4. Ejecucion del Calculo Matematico
    function executeCurrentCalculation() {
        const mod = CalcState.selectedModule;
        let result = null;

        try {
            if (mod === 'muros') {
                const length = parseFloat(document.getElementById('muro-length')?.value);
                const height = parseFloat(document.getElementById('muro-height')?.value);
                const count = parseInt(document.getElementById('muro-count')?.value) || 1;
                const masonryType = document.getElementById('muro-type')?.value;
                const rendering = document.getElementById('muro-rendering')?.value;
                const waste = parseFloat(document.getElementById('muro-waste')?.value);

                if (!length || !height || length <= 0 || height <= 0) {
                    alert('Para calcular muros necesitás ingresar largo y alto mayores a cero.');
                    return false;
                }

                result = CalculatorEngine.calculateMuros({
                    length, height, count,
                    masonryType,
                    includeRendering: rendering,
                    wastePercent: waste,
                    openings: CalcState.openings
                });
            } else if (mod === 'pisos') {
                const length = parseFloat(document.getElementById('piso-length')?.value);
                const width = parseFloat(document.getElementById('piso-width')?.value);
                const count = parseInt(document.getElementById('piso-count')?.value) || 1;
                const tileType = document.getElementById('piso-type')?.value;
                const boxM2 = parseFloat(document.getElementById('piso-boxm2')?.value);
                const pieceWidthCm = parseFloat(document.getElementById('piso-piece-w')?.value);
                const pieceHeightCm = parseFloat(document.getElementById('piso-piece-h')?.value);
                const waste = parseFloat(document.getElementById('piso-waste')?.value);

                if (!length || !width || length <= 0 || width <= 0) {
                    alert('Ingresá dimensiones válidas para el ambiente.');
                    return false;
                }

                result = CalculatorEngine.calculatePisos({
                    length, width, count, tileType, boxM2, pieceWidthCm, pieceHeightCm, wastePercent: waste
                });
            } else if (mod === 'contrapisos') {
                const length = parseFloat(document.getElementById('contra-length')?.value);
                const width = parseFloat(document.getElementById('contra-width')?.value);
                const thicknessCm = parseFloat(document.getElementById('contra-thickness')?.value);
                const type = document.getElementById('contra-type')?.value;
                const waste = parseFloat(document.getElementById('contra-waste')?.value);

                if (!length || !width || !thicknessCm) {
                    alert('Completá las dimensiones del contrapiso.');
                    return false;
                }

                result = CalculatorEngine.calculateContrapisos({
                    length, width, thicknessCm, type, wastePercent: waste
                });
            } else if (mod === 'carpetas') {
                const length = parseFloat(document.getElementById('carpeta-length')?.value);
                const width = parseFloat(document.getElementById('carpeta-width')?.value);
                const thicknessCm = parseFloat(document.getElementById('carpeta-thickness')?.value);
                const waste = parseFloat(document.getElementById('carpeta-waste')?.value);

                if (!length || !width) {
                    alert('Ingresá las medidas de la carpeta.');
                    return false;
                }

                result = CalculatorEngine.calculateCarpetas({
                    length, width, thicknessCm, wastePercent: waste
                });
            } else if (mod === 'pintura') {
                const area = parseFloat(document.getElementById('pintura-area')?.value);
                const coats = parseInt(document.getElementById('pintura-coats')?.value);
                const yieldM2PerLiter = parseFloat(document.getElementById('pintura-yield')?.value);
                const includePrimer = document.getElementById('pintura-primer')?.checked;
                const waste = parseFloat(document.getElementById('pintura-waste')?.value);

                if (!area || area <= 0) {
                    alert('Ingresá la superficie a pintar.');
                    return false;
                }

                result = CalculatorEngine.calculatePintura({
                    area, coats, yieldM2PerLiter, includePrimer, wastePercent: waste
                });
            } else if (mod === 'hormigon') {
                const elementType = document.getElementById('hormigon-type')?.value;
                const width = parseFloat(document.getElementById('h-width')?.value);
                const depth = parseFloat(document.getElementById('h-depth')?.value);
                const length = parseFloat(document.getElementById('h-length')?.value);
                const thickness = depth;
                const count = parseInt(document.getElementById('h-count')?.value) || 1;

                result = CalculatorEngine.calculateHormigon({
                    elementType, width, depth, height: length, length, thickness, count
                });
            } else if (mod === 'acero') {
                if (CalcState.steelBars.length === 0) {
                    alert('Agregá al menos una barra a la planilla de despiece.');
                    return false;
                }
                result = CalculatorEngine.calculateAcero({
                    bars: CalcState.steelBars
                });
            }

            CalcState.currentResult = result;
            renderResultsView(result);
            return true;
        } catch(err) {
            console.error('Error calculando:', err);
            alert('Ocurrió un error en el cálculo: ' + err.message);
            return false;
        }
    }
    // 5. Renderizado de la Vista de Resultados (Paso 4)
    function renderResultsView(result) {
        const container = document.getElementById('results-view-container');
        if (!container || !result) return;

        let metricsHtml = '';
        if (result.summary) {
            const s = result.summary;
            if (s.netArea !== undefined) {
                metricsHtml += `<div><div class="summary-metric-val">${s.netArea} m²</div><div class="summary-metric-lbl">Superficie Neta</div></div>`;
            }
            if (s.volume !== undefined) {
                metricsHtml += `<div><div class="summary-metric-val">${s.volume} m³</div><div class="summary-metric-lbl">Volumen Final</div></div>`;
            }
            if (s.totalLiters !== undefined) {
                metricsHtml += `<div><div class="summary-metric-val">${s.totalLiters} L</div><div class="summary-metric-lbl">Litros Finales</div></div>`;
            }
            if (s.totalWeightKg !== undefined) {
                metricsHtml += `<div><div class="summary-metric-val">${s.totalWeightKg} kg</div><div class="summary-metric-lbl">Peso Total Acero</div></div>`;
            }
            metricsHtml += `<div><div class="summary-metric-val">$ ${result.summary.totalEstimatedCost ? result.summary.totalEstimatedCost.toLocaleString('es-AR') : '0'}</div><div class="summary-metric-lbl">Costo Materiales Ref.</div></div>`;
        }

        let disclaimerHtml = '';
        if (result.disclaimer) {
            disclaimerHtml = `<div class="calc-disclaimer"><i class="fa-solid fa-triangle-exclamation"></i> ${result.disclaimer}</div>`;
        }

        const tableRows = result.items.map(it => `
            <tr>
                <td><strong>${it.name}</strong> ${it.extraInfo ? `<br><small style="color:#64748b">${it.extraInfo}</small>` : ''}</td>
                <td>${it.theoreticalQty} ${it.unit}</td>
                <td><span class="badge-waste">+${it.wastePercent}%</span></td>
                <td><strong>${it.commercialQty}</strong> <span style="color:#64748b; font-size:0.85rem;">${it.commercialUnit || it.unit}</span></td>
                <td>$ ${it.unitPrice ? it.unitPrice.toLocaleString('es-AR') : 'A cotizar'}</td>
                <td><strong>$ ${it.subtotal ? it.subtotal.toLocaleString('es-AR') : '0'}</strong></td>
            </tr>
        `).join('');

        container.innerHTML = `
            ${disclaimerHtml}
            <div class="result-summary-box">
                ${metricsHtml}
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                <h3 style="color: var(--color-primary); font-size: 1.25rem; margin: 0;">Detalle de Compra Comercial</h3>
                <button type="button" id="btn-show-trace" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 0.85rem;">
                    <i class="fa-solid fa-calculator" style="margin-right: 6px;"></i> Ver Memoria de Cálculo
                </button>
            </div>

            <table class="calc-materials-table">
                <thead>
                    <tr>
                        <th>Material</th>
                        <th>Cant. Teórica</th>
                        <th>Desperdicio</th>
                        <th>Cant. Comercial Recomendada</th>
                        <th>Precio Ref.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${tableRows}
                </tbody>
            </table>

            <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 1.5rem;">
                <button type="button" id="btn-add-to-master-budget" class="btn btn-accent" style="flex: 1;">
                    <i class="fa-solid fa-plus-circle" style="margin-right: 8px;"></i> Agregar al Presupuesto Maestro
                </button>
                <button type="button" id="btn-calc-another" class="btn btn-primary" style="flex: 1;">
                    <i class="fa-solid fa-layer-group" style="margin-right: 8px;"></i> Calcular Otro Módulo
                </button>
            </div>
        `;

        // Eventos
        document.getElementById('btn-show-trace')?.addEventListener('click', () => showTraceModal(result.trace));
        
        document.getElementById('btn-add-to-master-budget')?.addEventListener('click', () => {
            CalcState.savedCalculations.push({
                module: CalcState.selectedModule,
                date: new Date().toISOString(),
                result: result
            });
            saveWorkDataFromInputs();
            goToStep(5);
        });

        document.getElementById('btn-calc-another')?.addEventListener('click', () => {
            CalcState.savedCalculations.push({
                module: CalcState.selectedModule,
                date: new Date().toISOString(),
                result: result
            });
            saveWorkDataFromInputs();
            goToStep(2);
        });
    }

    // Modal de Trazabilidad y Memoria de Calculo
    function showTraceModal(trace) {
        const modal = document.getElementById('calc-trace-modal');
        const content = document.getElementById('trace-modal-content');
        if (!modal || !content || !trace) return;

        content.innerHTML = `
            <h3 style="color: var(--color-primary); margin-bottom: 1rem;">${trace.title}</h3>
            ${trace.steps.map(s => `
                <div class="formula-step">
                    <div class="formula-lbl">${s.formula}</div>
                    <div class="formula-math">${s.calc}</div>
                </div>
            `).join('')}
        `;

        modal.classList.add('active');
    }

    document.getElementById('close-trace-modal')?.addEventListener('click', () => {
        document.getElementById('calc-trace-modal')?.classList.remove('active');
    });

    // 6. Presupuesto Maestro Consolidado (Paso 5)
    function renderMasterBudget() {
        const container = document.getElementById('master-budget-container');
        if (!container) return;

        const allCalculations = CalcState.savedCalculations.map(c => c.result);
        if (CalcState.currentResult && !allCalculations.includes(CalcState.currentResult)) {
            allCalculations.push(CalcState.currentResult);
        }

        const consolidated = CalculatorEngine.consolidateBudget(allCalculations, CalcState.budgetOptions);

        const rows = consolidated.materials.map((m, idx) => `
            <tr>
                <td><strong>${m.name}</strong></td>
                <td><input type="number" class="form-control edit-qty" data-id="${m.id}" value="${m.commercialQty}" style="width: 80px; padding: 0.35rem;"></td>
                <td>${m.commercialUnit || m.unit}</td>
                <td><input type="number" class="form-control edit-price" data-id="${m.id}" value="${m.unitPrice}" style="width: 110px; padding: 0.35rem;"></td>
                <td><strong>$ ${(m.commercialQty * m.unitPrice).toLocaleString('es-AR')}</strong></td>
            </tr>
        `).join('');

        const totals = consolidated.totals;

        container.innerHTML = `
            <div style="margin-bottom: 1.5rem; background: var(--color-bg-light); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--color-border);">
                <h3 style="margin: 0 0 0.5rem 0; color: var(--color-primary);"><i class="fa-solid fa-clipboard-check"></i> Presupuesto de Obra: ${CalcState.workData.name || 'Sin Título'}</h3>
                <p style="margin: 0; color: var(--color-text-light); font-size: 0.9rem;">
                    Cliente: <strong>${CalcState.workData.client || 'Particular'}</strong> | Ubicación: <strong>${CalcState.workData.location || 'Localidad a definir'}</strong> | Fecha: <strong>${CalcState.workData.date}</strong>
                </p>
            </div>

            <table class="calc-materials-table">
                <thead>
                    <tr>
                        <th>Material Requerido</th>
                        <th>Cantidad</th>
                        <th>Unidad</th>
                        <th>Precio Unitario Ref.</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    ${rows}
                </tbody>
            </table>

            <!-- Desglose de Totales -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 1.5rem;">
                <div class="calc-card">
                    <h4 style="color: var(--color-primary); margin-bottom: 1rem;">Mano de Obra y Costos Extra</h4>
                    <div class="form-group mb-sm">
                        <label>Costo Estimado Mano de Obra ($)</label>
                        <input type="number" id="budget-labor" class="form-control" value="${CalcState.budgetOptions.laborCost}">
                    </div>
                    <div class="form-group mb-sm">
                        <label>Gastos Varios / Flete ($)</label>
                        <input type="number" id="budget-extra" class="form-control" value="${CalcState.budgetOptions.extraCosts}">
                    </div>
                    <div class="form-group">
                        <label>Impuestos / IVA (%)</label>
                        <input type="number" id="budget-tax" class="form-control" value="${CalcState.budgetOptions.taxesPercent}">
                    </div>
                </div>

                <div class="calc-card" style="background: var(--color-primary-dark); color: white;">
                    <h4 style="color: var(--color-accent); margin-bottom: 1rem;">Resumen Consolidado</h4>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Materiales:</span>
                        <strong>$ ${totals.materialsTotal.toLocaleString('es-AR')}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Mano de Obra:</span>
                        <strong>$ ${totals.laborTotal.toLocaleString('es-AR')}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>Gastos / Fletes:</span>
                        <strong>$ ${totals.extraTotal.toLocaleString('es-AR')}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 0.5rem;">
                        <span>Impuestos (${totals.taxesPercent}%):</span>
                        <strong>$ ${totals.taxesAmount.toLocaleString('es-AR')}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 1.4rem; color: var(--color-accent); font-weight: 800;">
                        <span>TOTAL ESTIMADO:</span>
                        <span>$ ${totals.grandTotal.toLocaleString('es-AR')}</span>
                    </div>
                </div>
            </div>

            <!-- Acciones de Exportacion -->
            <div class="calc-nav-actions no-print" style="margin-top: 2rem;">
                <div style="display: flex; gap: 0.75rem;">
                    <button type="button" id="btn-print-budget" class="btn btn-primary">
                        <i class="fa-solid fa-print" style="margin-right: 6px;"></i> Imprimir / Guardar PDF
                    </button>
                    <button type="button" id="btn-csv-budget" class="btn btn-primary">
                        <i class="fa-solid fa-file-csv" style="margin-right: 6px;"></i> Exportar CSV
                    </button>
                </div>
                <a href="#" id="btn-wa-budget" class="btn btn-whatsapp">
                    <i class="fa-brands fa-whatsapp" style="margin-right: 8px;"></i> Solicitar Cotización de Materiales
                </a>
            </div>
        `;

        // Eventos de actualizacion de costos en vivo
        document.getElementById('budget-labor')?.addEventListener('change', (e) => {
            CalcState.budgetOptions.laborCost = parseFloat(e.target.value) || 0;
            renderMasterBudget();
        });
        document.getElementById('budget-extra')?.addEventListener('change', (e) => {
            CalcState.budgetOptions.extraCosts = parseFloat(e.target.value) || 0;
            renderMasterBudget();
        });
        document.getElementById('budget-tax')?.addEventListener('change', (e) => {
            CalcState.budgetOptions.taxesPercent = parseFloat(e.target.value) || 0;
            renderMasterBudget();
        });

        // Imprimir / PDF
        document.getElementById('btn-print-budget')?.addEventListener('click', () => {
            window.print();
        });

        // Exportar CSV
        document.getElementById('btn-csv-budget')?.addEventListener('click', () => {
            exportBudgetToCSV(consolidated);
        });

        // WhatsApp Cotizacion
        const waBtn = document.getElementById('btn-wa-budget');
        if (waBtn) {
            const waNumber = (typeof siteConfig !== 'undefined' && siteConfig.contact.whatsapp) ? siteConfig.contact.whatsapp.replace(/\D/g, '') : '';
            let msg = `*SOLICITUD DE COTIZACIÓN - MATERIALES CHILAVERT*\n`;
            msg += `Obra: ${CalcState.workData.name || 'Sin título'}\n`;
            msg += `Cliente: ${CalcState.workData.client || '-'}\n\n`;
            msg += `*Lista de Materiales Calculada:*\n`;
            consolidated.materials.forEach(m => {
                msg += `• ${m.commercialQty} ${m.commercialUnit || m.unit} - ${m.name}\n`;
            });
            msg += `\nTotal Estimado Materiales: $ ${totals.materialsTotal.toLocaleString('es-AR')}\n`;
            msg += `Agradeceré me confirmen stock y precios formales.`;

            waBtn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;
        }
    }

    // Exportador CSV
    function exportBudgetToCSV(consolidated) {
        let csv = 'Material,Cantidad,Unidad,Precio Unitario,Subtotal\n';
        consolidated.materials.forEach(m => {
            csv += `"${m.name}",${m.commercialQty},"${m.commercialUnit || m.unit}",${m.unitPrice},${m.commercialQty * m.unitPrice}\n`;
        });
        csv += `\nTotal Materiales,,,,${consolidated.totals.materialsTotal}\n`;
        csv += `Mano de Obra,,,,${consolidated.totals.laborTotal}\n`;
        csv += `Total General,,,,${consolidated.totals.grandTotal}\n`;

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Presupuesto_${(CalcState.workData.name || 'Obra').replace(/\s+/g, '_')}.csv`;
        link.click();
    }

    // Inicializar primer formulario al cargar
    renderModuleForm('muros');
});
