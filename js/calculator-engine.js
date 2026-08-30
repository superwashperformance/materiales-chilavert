/**
 * Motor de Calculo Matematico Profesional para Materiales de Construccion
 * Materiales Chilavert
 */

const CalculatorEngine = (function() {
    'use strict';

    const Units = {
        toMeters: function(val, unit) {
            const v = parseFloat(val) || 0;
            switch((unit || 'm').toLowerCase()) {
                case 'mm': return v / 1000;
                case 'cm': return v / 100;
                case 'm': return v;
                default: return v;
            }
        },
        toM2: function(val, unit) {
            const v = parseFloat(val) || 0;
            switch((unit || 'm2').toLowerCase()) {
                case 'cm2': return v / 10000;
                case 'm2': return v;
                default: return v;
            }
        },
        toM3: function(val, unit) {
            const v = parseFloat(val) || 0;
            switch((unit || 'm3').toLowerCase()) {
                case 'l':
                case 'litros': return v / 1000;
                case 'm3': return v;
                default: return v;
            }
        }
    };

    function round(num, decimals = 2) {
        if (isNaN(num)) return 0;
        const factor = Math.pow(10, decimals);
        return Math.round(num * factor) / factor;
    }

    function getMaterial(id) {
        if (typeof catalogData !== 'undefined' && catalogData.materials) {
            return catalogData.materials.find(m => m.id === id) || null;
        }
        return null;
    }

    // 2. MUROS Y MAMPOSTERIAS
    function calculateMuros(params) {
        const length = Units.toMeters(params.length, params.lengthUnit || 'm');
        const height = Units.toMeters(params.height, params.heightUnit || 'm');
        const thickness = Units.toMeters(params.thickness, params.thicknessUnit || 'm');
        const count = parseInt(params.count) || 1;
        const masonryKey = params.masonryType || 'hueco_12';
        const masonry = (typeof catalogData !== 'undefined' && catalogData.masonryTypes) ? (catalogData.masonryTypes[masonryKey] || catalogData.masonryTypes.hueco_12) : { name: 'Muro', unitsPerM2: 16, brickId: 'ladrillo_hueco_12', mortarM3PerM2: 0.023, mortarType: 'asiento_hueco' };
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 7);

        const grossArea = length * height * count;
        let openingsArea = 0;
        const openingsBreakdown = [];

        if (Array.isArray(params.openings)) {
            params.openings.forEach(op => {
                const w = Units.toMeters(op.width, op.unit || 'm');
                const h = Units.toMeters(op.height, op.unit || 'm');
                const c = parseInt(op.count) || 1;
                const a = w * h * c;
                openingsArea += a;
                openingsBreakdown.push({
                    name: op.name || 'Abertura',
                    width: w,
                    height: h,
                    count: c,
                    area: round(a, 2)
                });
            });
        }

        const netArea = Math.max(0, grossArea - openingsArea);
        const wallVolume = netArea * (thickness || 0.12);

        const theoBricks = netArea * masonry.unitsPerM2;
        const finalBricks = Math.ceil(theoBricks * (1 + waste / 100));
        
        const brickMat = getMaterial(masonry.brickId);
        const items = [];

        items.push({
            id: masonry.brickId,
            name: brickMat ? brickMat.name : masonry.name,
            category: 'ladrillos',
            unit: 'unidad',
            theoreticalQty: round(theoBricks, 1),
            wastePercent: waste,
            finalQty: finalBricks,
            commercialQty: finalBricks,
            commercialUnit: 'unidades',
            unitPrice: brickMat ? brickMat.price : 0,
            subtotal: round(finalBricks * (brickMat ? brickMat.price : 0), 2)
        });

        // Mortero de Asiento
        if (masonry.mortarM3PerM2) {
            const mortarVolume = netArea * masonry.mortarM3PerM2 * (1 + waste / 100);
            const dosage = (typeof catalogData !== 'undefined' && catalogData.mortarDosages) ? (catalogData.mortarDosages[masonry.mortarType] || catalogData.mortarDosages.asiento_hueco) : { cementoKg: 160, calKg: 110, arenaM3: 1.05 };
            
            const cementoKg = mortarVolume * dosage.cementoKg;
            const cementoBolsas = Math.ceil(cementoKg / 50);
            const cemMat = getMaterial('cemento_50kg');
            items.push({
                id: 'cemento_50kg',
                name: 'Cemento Portland (Mortero Asiento)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(cementoKg / 50, 2),
                wastePercent: waste,
                finalQty: cementoBolsas,
                commercialQty: cementoBolsas,
                commercialUnit: 'bolsas x 50kg',
                unitPrice: cemMat ? cemMat.price : 0,
                subtotal: round(cementoBolsas * (cemMat ? cemMat.price : 0), 2)
            });

            if (dosage.calKg > 0) {
                const calKg = mortarVolume * dosage.calKg;
                const calBolsas = Math.ceil(calKg / 25);
                const calMat = getMaterial('cal_hidraulica_25kg');
                items.push({
                    id: 'cal_hidraulica_25kg',
                    name: 'Cal Hidraulica (Mortero Asiento)',
                    category: 'cementos',
                    unit: 'bolsa',
                    theoreticalQty: round(calKg / 25, 2),
                    wastePercent: waste,
                    finalQty: calBolsas,
                    commercialQty: calBolsas,
                    commercialUnit: 'bolsas x 25kg',
                    unitPrice: calMat ? calMat.price : 0,
                    subtotal: round(calBolsas * (calMat ? calMat.price : 0), 2)
                });
            }

            const arenaM3 = round(mortarVolume * dosage.arenaM3, 2);
            const arenaMat = getMaterial('arena_m3');
            items.push({
                id: 'arena_m3',
                name: 'Arena Limpia (Mortero Asiento)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: round(mortarVolume * dosage.arenaM3, 2),
                wastePercent: waste,
                finalQty: arenaM3,
                commercialQty: Math.ceil(arenaM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: arenaMat ? arenaMat.price : 0,
                subtotal: round(Math.ceil(arenaM3) * (arenaMat ? arenaMat.price : 0), 2)
            });
        }
        // Revoques
        if (params.includeRendering === 'completo' || params.includeRendering === 'grueso') {
            const renderArea = netArea * 2;
            
            if (params.includeRendering === 'completo') {
                const azotado = (typeof catalogData !== 'undefined' && catalogData.mortarDosages) ? catalogData.mortarDosages.revoque_impermeable : { thicknessM: 0.008, cementoKgPerM3: 450, hidrofugoKgPerM3: 4.5 };
                const volAzotado = netArea * azotado.thicknessM * (1 + waste / 100);
                const hidrofugoKg = volAzotado * azotado.hidrofugoKgPerM3;
                const hidrofugoBaldes = Math.ceil(hidrofugoKg / 10);
                const hidMat = getMaterial('hidrofugo_ceresita_10kg');

                items.push({
                    id: 'hidrofugo_ceresita_10kg',
                    name: 'Hidrofugo Ceresita (Capa Aisladora / Azotado)',
                    category: 'aislantes',
                    unit: 'balde',
                    theoreticalQty: round(hidrofugoKg / 10, 2),
                    wastePercent: waste,
                    finalQty: hidrofugoBaldes,
                    commercialQty: hidrofugoBaldes,
                    commercialUnit: 'baldes x 10kg',
                    unitPrice: hidMat ? hidMat.price : 0,
                    subtotal: round(hidrofugoBaldes * (hidMat ? hidMat.price : 0), 2)
                });
            }

            const grueso = (typeof catalogData !== 'undefined' && catalogData.mortarDosages) ? catalogData.mortarDosages.revoque_grueso : { thicknessM: 0.015, calKgPerM3: 190, cementoKgPerM3: 120, arenaM3PerM3: 1.05 };
            const volGrueso = renderArea * grueso.thicknessM * (1 + waste / 100);
            const calGruesoKg = volGrueso * grueso.calKgPerM3;
            const calGruesoBolsas = Math.ceil(calGruesoKg / 25);
            const cemGruesoKg = volGrueso * grueso.cementoKgPerM3;
            const cemGruesoBolsas = Math.ceil(cemGruesoKg / 50);
            const arenaGruesoM3 = round(volGrueso * grueso.arenaM3PerM3, 2);

            const calMat = getMaterial('cal_hidraulica_25kg');
            const cemMat = getMaterial('cemento_50kg');
            const arenaMat = getMaterial('arena_m3');

            items.push({
                id: 'cal_hidraulica_25kg_revoque',
                name: 'Cal Hidraulica (Revoque Grueso 2 caras)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(calGruesoKg / 25, 2),
                wastePercent: waste,
                finalQty: calGruesoBolsas,
                commercialQty: calGruesoBolsas,
                commercialUnit: 'bolsas x 25kg',
                unitPrice: calMat ? calMat.price : 0,
                subtotal: round(calGruesoBolsas * (calMat ? calMat.price : 0), 2)
            });

            items.push({
                id: 'cemento_50kg_revoque',
                name: 'Cemento Portland (Revoque Grueso 2 caras)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(cemGruesoKg / 50, 2),
                wastePercent: waste,
                finalQty: cemGruesoBolsas,
                commercialQty: cemGruesoBolsas,
                commercialUnit: 'bolsas x 50kg',
                unitPrice: cemMat ? cemMat.price : 0,
                subtotal: round(cemGruesoBolsas * (cemMat ? cemMat.price : 0), 2)
            });

            items.push({
                id: 'arena_m3_revoque',
                name: 'Arena Limpia (Revoque Grueso 2 caras)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: arenaGruesoM3,
                wastePercent: waste,
                finalQty: arenaGruesoM3,
                commercialQty: Math.ceil(arenaGruesoM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: arenaMat ? arenaMat.price : 0,
                subtotal: round(Math.ceil(arenaGruesoM3) * (arenaMat ? arenaMat.price : 0), 2)
            });
        }

        const trace = {
            title: 'Calculo de Mamposteria - ' + masonry.name,
            steps: [
                { formula: 'Superficie Bruta = Largo × Alto × Cantidad', calc: `${length} m × ${height} m × ${count} = ${round(grossArea, 2)} m²` },
                { formula: 'Superficie Aberturas = Sumatoria(Ancho × Alto × Cant)', calc: openingsBreakdown.length > 0 ? openingsBreakdown.map(o => `${o.name}: ${o.width}×${o.height}×${o.count}=${o.area}m²`).join(' + ') + ` = ${round(openingsArea, 2)} m²` : '0 m² (sin aberturas)' },
                { formula: 'Superficie Neta = Superficie Bruta − Aberturas', calc: `${round(grossArea, 2)} m² − ${round(openingsArea, 2)} m² = ${round(netArea, 2)} m²` },
                { formula: 'Cantidad Teorica Ladrillos = Superficie Neta × Rendimiento', calc: `${round(netArea, 2)} m² × ${masonry.unitsPerM2} u/m² = ${round(theoBricks, 1)} unidades` },
                { formula: 'Cantidad Final Ladrillos = Teorica × (1 + Desperdicio / 100)', calc: `${round(theoBricks, 1)} × (1 + ${waste}/100) = ${finalBricks} unidades` }
            ]
        };

        return {
            summary: {
                grossArea: round(grossArea, 2),
                openingsArea: round(openingsArea, 2),
                netArea: round(netArea, 2),
                wallVolume: round(wallVolume, 2),
                totalMaterialsCount: items.length,
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }

    // 3. PISOS Y REVESTIMIENTOS
    function calculatePisos(params) {
        const length = Units.toMeters(params.length, params.lengthUnit || 'm');
        const width = Units.toMeters(params.width, params.widthUnit || 'm');
        const count = parseInt(params.count) || 1;
        const pieceW = (parseFloat(params.pieceWidthCm) || 60) / 100;
        const pieceH = (parseFloat(params.pieceHeightCm) || 60) / 100;
        const boxM2 = parseFloat(params.boxM2) || 1.80;
        const tileType = params.tileType || 'porcelanato';
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 10);

        const netArea = length * width * count;
        const finalArea = netArea * (1 + waste / 100);
        const pieceArea = pieceW * pieceH;
        const piecesCount = pieceArea > 0 ? Math.ceil(finalArea / pieceArea) : 0;
        const boxesCount = Math.ceil(finalArea / boxM2);

        const adhesiveKg = finalArea * 5.0;
        const adhesiveBolsas = Math.ceil(adhesiveKg / 30);
        const adhesiveMatId = tileType === 'porcelanato' ? 'adhesivo_porcelanato_30kg' : 'adhesivo_ceramico_30kg';
        const adhMat = getMaterial(adhesiveMatId);

        const pastinaKg = finalArea * 0.45;
        const pastinaBolsas = Math.ceil(pastinaKg / 2);
        const pastinaMat = getMaterial('pastina_2kg');

        const items = [
            {
                id: 'piso_revestimiento',
                name: `Piso / Revestimiento (${round(pieceW*100,0)}x${round(pieceH*100,0)} cm)`,
                category: 'pisos',
                unit: 'm2',
                theoreticalQty: round(netArea, 2),
                wastePercent: waste,
                finalQty: round(finalArea, 2),
                commercialQty: boxesCount,
                commercialUnit: `cajas (${boxM2} m²/caja = ${round(boxesCount * boxM2, 2)} m²)`,
                extraInfo: `Aprox. ${piecesCount} piezas`,
                unitPrice: 0,
                subtotal: 0
            },
            {
                id: adhesiveMatId,
                name: adhMat ? adhMat.name : 'Adhesivo para piso (Bolsa 30 kg)',
                category: 'adhesivos',
                unit: 'bolsa',
                theoreticalQty: round(adhesiveKg / 30, 2),
                wastePercent: waste,
                finalQty: adhesiveBolsas,
                commercialQty: adhesiveBolsas,
                commercialUnit: 'bolsas x 30kg',
                unitPrice: adhMat ? adhMat.price : 0,
                subtotal: round(adhesiveBolsas * (adhMat ? adhMat.price : 0), 2)
            },
            {
                id: 'pastina_2kg',
                name: 'Pastina de Junta (Bolsa 2 kg)',
                category: 'adhesivos',
                unit: 'bolsa',
                theoreticalQty: round(pastinaKg / 2, 2),
                wastePercent: waste,
                finalQty: pastinaBolsas,
                commercialQty: pastinaBolsas,
                commercialUnit: 'bolsas x 2kg',
                unitPrice: pastinaMat ? pastinaMat.price : 0,
                subtotal: round(pastinaBolsas * (pastinaMat ? pastinaMat.price : 0), 2)
            }
        ];

        const trace = {
            title: 'Calculo de Pisos y Revestimientos',
            steps: [
                { formula: 'Superficie Neta = Largo × Ancho × Cantidad', calc: `${length} m × ${width} m × ${count} = ${round(netArea, 2)} m²` },
                { formula: 'Superficie Total con Desperdicio = Neta × (1 + Desp / 100)', calc: `${round(netArea, 2)} m² × (1 + ${waste}/100) = ${round(finalArea, 2)} m²` },
                { formula: 'Cajas de Cerámica/Porcelanato = Sup. Total ÷ Rendimiento Caja', calc: `${round(finalArea, 2)} m² ÷ ${boxM2} m²/caja = ${boxesCount} cajas` },
                { formula: 'Adhesivo (5 kg/m²) = Sup. Total × 5 kg ÷ 30 kg/bolsa', calc: `${round(finalArea, 2)} × 5 = ${round(adhesiveKg,1)} kg = ${adhesiveBolsas} bolsas` },
                { formula: 'Pastina (0.45 kg/m²) = Sup. Total × 0.45 kg ÷ 2 kg/bolsa', calc: `${round(finalArea, 2)} × 0.45 = ${round(pastinaKg,1)} kg = ${pastinaBolsas} bolsas` }
            ]
        };

        return {
            summary: {
                netArea: round(netArea, 2),
                finalArea: round(finalArea, 2),
                piecesCount: piecesCount,
                boxesCount: boxesCount,
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }
    // 4. CONTRAPISOS
    function calculateContrapisos(params) {
        const length = Units.toMeters(params.length, params.lengthUnit || 'm');
        const width = Units.toMeters(params.width, params.widthUnit || 'm');
        const count = parseInt(params.count) || 1;
        const thickness = (parseFloat(params.thicknessCm) || 10) / 100;
        const subfloorType = params.type || 'cascote';
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 10);

        const area = length * width * count;
        const theoVolume = area * thickness;
        const finalVolume = theoVolume * (1 + waste / 100);

        const dosageKey = subfloorType === 'granza' ? 'contrapiso_granza' : 'contrapiso_cascote';
        const dosage = (typeof catalogData !== 'undefined' && catalogData.subfloorDosages) ? catalogData.subfloorDosages[dosageKey] : { name: 'Contrapiso', cementoKg: 100, calKg: 30, arenaM3: 0.45, cascoteM3: 0.90 };

        const cementoKg = finalVolume * dosage.cementoKg;
        const cementoBolsas = Math.ceil(cementoKg / 50);
        const cemMat = getMaterial('cemento_50kg');

        const arenaM3 = round(finalVolume * dosage.arenaM3, 2);
        const arenaMat = getMaterial('arena_m3');

        const items = [
            {
                id: 'cemento_50kg',
                name: 'Cemento Portland (Contrapiso)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(cementoKg / 50, 2),
                wastePercent: waste,
                finalQty: cementoBolsas,
                commercialQty: cementoBolsas,
                commercialUnit: 'bolsas x 50kg',
                unitPrice: cemMat ? cemMat.price : 0,
                subtotal: round(cementoBolsas * (cemMat ? cemMat.price : 0), 2)
            },
            {
                id: 'arena_m3',
                name: 'Arena Limpia (Contrapiso)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: arenaM3,
                wastePercent: waste,
                finalQty: arenaM3,
                commercialQty: Math.ceil(arenaM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: arenaMat ? arenaMat.price : 0,
                subtotal: round(Math.ceil(arenaM3) * (arenaMat ? arenaMat.price : 0), 2)
            }
        ];

        if (subfloorType === 'cascote') {
            const cascoteM3 = round(finalVolume * (dosage.cascoteM3 || 0.90), 2);
            const cascMat = getMaterial('cascote_granza_m3');
            const calKg = finalVolume * (dosage.calKg || 30);
            const calBolsas = Math.ceil(calKg / 25);
            const calMat = getMaterial('cal_hidraulica_25kg');

            items.push({
                id: 'cal_hidraulica_25kg',
                name: 'Cal Hidraulica (Contrapiso Cascote)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(calKg / 25, 2),
                wastePercent: waste,
                finalQty: calBolsas,
                commercialQty: calBolsas,
                commercialUnit: 'bolsas x 25kg',
                unitPrice: calMat ? calMat.price : 0,
                subtotal: round(calBolsas * (calMat ? calMat.price : 0), 2)
            });

            items.push({
                id: 'cascote_granza_m3',
                name: 'Cascote Granza Partido (Contrapiso)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: cascoteM3,
                wastePercent: waste,
                finalQty: cascoteM3,
                commercialQty: Math.ceil(cascoteM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: cascMat ? cascMat.price : 0,
                subtotal: round(Math.ceil(cascoteM3) * (cascMat ? cascMat.price : 0), 2)
            });
        } else {
            const piedraM3 = round(finalVolume * (dosage.piedraM3 || 0.90), 2);
            const piedraMat = getMaterial('piedra_partida_m3');
            items.push({
                id: 'piedra_partida_m3',
                name: 'Piedra Partida 6/20 (Contrapiso)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: piedraM3,
                wastePercent: waste,
                finalQty: piedraM3,
                commercialQty: Math.ceil(piedraM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: piedraMat ? piedraMat.price : 0,
                subtotal: round(Math.ceil(piedraM3) * (piedraMat ? piedraMat.price : 0), 2)
            });
        }

        const trace = {
            title: 'Calculo de Contrapiso - ' + dosage.name,
            steps: [
                { formula: 'Superficie = Largo × Ancho × Cantidad', calc: `${length} m × ${width} m × ${count} = ${round(area, 2)} m²` },
                { formula: 'Volumen Teorico = Superficie × Espesor', calc: `${round(area, 2)} m² × ${thickness} m = ${round(theoVolume, 2)} m³` },
                { formula: 'Volumen Final con Desperdicio = Volumen × (1 + Desp / 100)', calc: `${round(theoVolume, 2)} m³ × (1 + ${waste}/100) = ${round(finalVolume, 2)} m³` },
                { formula: 'Cemento (Bolsas 50kg) = Vol × Dosificación ÷ 50', calc: `${round(finalVolume, 2)} m³ × ${dosage.cementoKg} kg ÷ 50 = ${cementoBolsas} bolsas` },
                { formula: 'Arena (m³) = Vol × Dosificación', calc: `${round(finalVolume, 2)} m³ × ${dosage.arenaM3} = ${arenaM3} m³` }
            ]
        };

        return {
            summary: {
                area: round(area, 2),
                thicknessCm: round(thickness * 100, 1),
                volume: round(finalVolume, 2),
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }

    // 5. CARPETAS
    function calculateCarpetas(params) {
        const length = Units.toMeters(params.length, params.lengthUnit || 'm');
        const width = Units.toMeters(params.width, params.widthUnit || 'm');
        const count = parseInt(params.count) || 1;
        const thickness = (parseFloat(params.thicknessCm) || 2.5) / 100;
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 8);

        const area = length * width * count;
        const theoVolume = area * thickness;
        const finalVolume = theoVolume * (1 + waste / 100);

        const dosage = (typeof catalogData !== 'undefined' && catalogData.subfloorDosages) ? catalogData.subfloorDosages.carpeta_nivelacion : { cementoKg: 450, arenaM3: 1.10 };
        const cementoKg = finalVolume * dosage.cementoKg;
        const cementoBolsas = Math.ceil(cementoKg / 50);
        const cemMat = getMaterial('cemento_50kg');

        const arenaM3 = round(finalVolume * dosage.arenaM3, 2);
        const arenaMat = getMaterial('arena_m3');

        const items = [
            {
                id: 'cemento_50kg',
                name: 'Cemento Portland (Carpeta Nivelacion 1:3)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(cementoKg / 50, 2),
                wastePercent: waste,
                finalQty: cementoBolsas,
                commercialQty: cementoBolsas,
                commercialUnit: 'bolsas x 50kg',
                unitPrice: cemMat ? cemMat.price : 0,
                subtotal: round(cementoBolsas * (cemMat ? cemMat.price : 0), 2)
            },
            {
                id: 'arena_m3',
                name: 'Arena Limpia (Carpeta Nivelacion 1:3)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: arenaM3,
                wastePercent: waste,
                finalQty: arenaM3,
                commercialQty: Math.ceil(arenaM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: arenaMat ? arenaMat.price : 0,
                subtotal: round(Math.ceil(arenaM3) * (arenaMat ? arenaMat.price : 0), 2)
            }
        ];

        const trace = {
            title: 'Calculo de Carpeta de Nivelacion (Dosificacion 1:3)',
            steps: [
                { formula: 'Superficie = Largo × Ancho × Cantidad', calc: `${length} m × ${width} m × ${count} = ${round(area, 2)} m²` },
                { formula: 'Volumen = Superficie × Espesor', calc: `${round(area, 2)} m² × ${thickness} m = ${round(theoVolume, 3)} m³` },
                { formula: 'Volumen Final con Desperdicio = Volumen × (1 + Desp / 100)', calc: `${round(theoVolume, 3)} m³ × (1 + ${waste}/100) = ${round(finalVolume, 3)} m³` },
                { formula: 'Cemento (Bolsas 50kg) = Vol × 450 kg/m³ ÷ 50', calc: `${round(finalVolume, 3)} m³ × 450 kg ÷ 50 = ${cementoBolsas} bolsas` },
                { formula: 'Arena (m³) = Vol × 1.10 m³/m³', calc: `${round(finalVolume, 3)} m³ × 1.10 = ${arenaM3} m³` }
            ]
        };

        return {
            summary: {
                area: round(area, 2),
                thicknessCm: round(thickness * 100, 1),
                volume: round(finalVolume, 3),
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }

    // 6. PINTURA
    function calculatePintura(params) {
        let area = parseFloat(params.area) || 0;
        if (!area && params.length && params.height) {
            const l = Units.toMeters(params.length, params.lengthUnit || 'm');
            const h = Units.toMeters(params.height, params.heightUnit || 'm');
            const c = parseInt(params.count) || 1;
            area = l * h * c;
        }

        const coats = parseInt(params.coats) || 2;
        const yieldPerL = parseFloat(params.yieldM2PerLiter) || 10.0;
        const includePrimer = params.includePrimer !== false;
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 5);

        const totalCoverArea = area * coats;
        const theoLiters = yieldPerL > 0 ? (totalCoverArea / yieldPerL) : 0;
        const finalLiters = theoLiters * (1 + waste / 100);

        let remainingLiters = Math.ceil(finalLiters);
        const baldes20 = Math.floor(remainingLiters / 20);
        remainingLiters = remainingLiters % 20;
        const baldes10 = Math.floor(remainingLiters / 10);
        remainingLiters = remainingLiters % 10;
        const bidones4 = Math.floor(remainingLiters / 4);
        remainingLiters = remainingLiters % 4;
        const potes1 = remainingLiters;

        let packDesc = [];
        if (baldes20 > 0) packDesc.push(`${baldes20} balde(s) de 20L`);
        if (baldes10 > 0) packDesc.push(`${baldes10} balde(s) de 10L`);
        if (bidones4 > 0) packDesc.push(`${bidones4} bidon(es) de 4L`);
        if (potes1 > 0) packDesc.push(`${potes1} pote(s) de 1L`);
        if (packDesc.length === 0) packDesc.push('1 pote de 1L');

        const paintMat = getMaterial('pintura_latex_20l');
        const items = [
            {
                id: 'pintura_latex_20l',
                name: `Pintura Latex Profesional (${coats} manos)`,
                category: 'pinturas',
                unit: 'litros',
                theoreticalQty: round(theoLiters, 1),
                wastePercent: waste,
                finalQty: round(finalLiters, 1),
                commercialQty: Math.ceil(finalLiters / 20) || 1,
                commercialUnit: `envases (${packDesc.join(', ')})`,
                unitPrice: paintMat ? paintMat.price : 0,
                subtotal: round((Math.ceil(finalLiters / 20) || 1) * (paintMat ? paintMat.price : 0), 2)
            }
        ];

        if (includePrimer) {
            const primerLiters = round((area / 15.0) * (1 + waste / 100), 1);
            const primerBidones = Math.ceil(primerLiters / 4);
            const primerMat = getMaterial('fijador_sellador_4l');

            items.push({
                id: 'fijador_sellador_4l',
                name: 'Fijador Sellador al Agua Concentrado',
                category: 'pinturas',
                unit: 'bidon',
                theoreticalQty: round(area / 15.0, 1),
                wastePercent: waste,
                finalQty: primerBidones,
                commercialQty: primerBidones,
                commercialUnit: 'bidones x 4L',
                unitPrice: primerMat ? primerMat.price : 0,
                subtotal: round(primerBidones * (primerMat ? primerMat.price : 0), 2)
            });
        }

        const trace = {
            title: 'Calculo de Pintura y Terminaciones',
            steps: [
                { formula: 'Superficie Total a Pintar = Superficie × Manos', calc: `${round(area, 2)} m² × ${coats} manos = ${round(totalCoverArea, 2)} m²` },
                { formula: 'Litros Teoricos = Superficie Total ÷ Rendimiento', calc: `${round(totalCoverArea, 2)} m² ÷ ${yieldPerL} m²/L = ${round(theoLiters, 2)} Litros` },
                { formula: 'Litros Finales con Desperdicio = Litros × (1 + Desp / 100)', calc: `${round(theoLiters, 2)} L × (1 + ${waste}/100) = ${round(finalLiters, 2)} Litros` },
                { formula: 'Presentacion Comercial Optima', calc: packDesc.join(', ') }
            ]
        };

        return {
            summary: {
                area: round(area, 2),
                coats: coats,
                totalLiters: round(finalLiters, 1),
                commercialPacking: packDesc.join(', '),
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }
    // 7. HORMIGON ARMADO (ESTIMATIVO)
    function calculateHormigon(params) {
        const elType = params.elementType || 'columnas';
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 7);
        let theoVolume = 0;
        let dimDesc = '';

        if (elType === 'columnas' || elType === 'bases') {
            const b = Units.toMeters(params.width, params.widthUnit || 'cm');
            const h = Units.toMeters(params.depth, params.depthUnit || 'cm');
            const l = Units.toMeters(params.height, params.heightUnit || 'm');
            const count = parseInt(params.count) || 1;
            theoVolume = b * h * l * count;
            dimDesc = `${count} u de ${round(b*100,0)}x${round(h*100,0)} cm × ${round(l,2)} m`;
        } else if (elType === 'vigas' || elType === 'encadenados') {
            const b = Units.toMeters(params.width, params.widthUnit || 'cm');
            const h = Units.toMeters(params.height, params.heightUnit || 'cm');
            const l = Units.toMeters(params.length, params.lengthUnit || 'm');
            const count = parseInt(params.count) || 1;
            theoVolume = b * h * l * count;
            dimDesc = `${count} vigas de ${round(b*100,0)}x${round(h*100,0)} cm × ${round(l,2)} m`;
        } else {
            const l = Units.toMeters(params.length, params.lengthUnit || 'm');
            const w = Units.toMeters(params.width, params.widthUnit || 'm');
            const e = Units.toMeters(params.thickness, params.thicknessUnit || 'cm');
            const count = parseInt(params.count) || 1;
            theoVolume = l * w * e * count;
            dimDesc = `${round(l,2)}x${round(w,2)} m × espesor ${round(e*100,0)} cm`;
        }

        const finalVolume = theoVolume * (1 + waste / 100);
        const dosage = (typeof catalogData !== 'undefined' && catalogData.concreteDosages) ? catalogData.concreteDosages.h21_standard : { cementoKg: 350, arenaM3: 0.65, piedraM3: 0.85, steelKgPerM3: { columnas: 120, vigas: 100, platea: 65, losas: 80, bases: 60, encadenados: 85 } };

        const cementoKg = finalVolume * dosage.cementoKg;
        const cementoBolsas = Math.ceil(cementoKg / 50);
        const arenaM3 = round(finalVolume * dosage.arenaM3, 2);
        const piedraM3 = round(finalVolume * dosage.piedraM3, 2);

        const steelRatio = (dosage.steelKgPerM3 && dosage.steelKgPerM3[elType]) || 85;
        const steelEstimatedKg = round(finalVolume * steelRatio, 1);
        const tieWireKg = Math.ceil(steelEstimatedKg * 0.015);

        const cemMat = getMaterial('cemento_50kg');
        const arenaMat = getMaterial('arena_m3');
        const piedraMat = getMaterial('piedra_partida_m3');
        const wireMat = getMaterial('alambre_recocido');

        const items = [
            {
                id: 'cemento_50kg',
                name: 'Cemento Portland H-21 (Dosif. 1:2:3)',
                category: 'cementos',
                unit: 'bolsa',
                theoreticalQty: round(cementoKg / 50, 2),
                wastePercent: waste,
                finalQty: cementoBolsas,
                commercialQty: cementoBolsas,
                commercialUnit: 'bolsas x 50kg',
                unitPrice: cemMat ? cemMat.price : 0,
                subtotal: round(cementoBolsas * (cemMat ? cemMat.price : 0), 2)
            },
            {
                id: 'arena_m3',
                name: 'Arena Limpia (Hormigon)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: arenaM3,
                wastePercent: waste,
                finalQty: arenaM3,
                commercialQty: Math.ceil(arenaM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: arenaMat ? arenaMat.price : 0,
                subtotal: round(Math.ceil(arenaM3) * (arenaMat ? arenaMat.price : 0), 2)
            },
            {
                id: 'piedra_partida_m3',
                name: 'Piedra Partida 6/20 (Hormigon)',
                category: 'aridos',
                unit: 'm3',
                theoreticalQty: piedraM3,
                wastePercent: waste,
                finalQty: piedraM3,
                commercialQty: Math.ceil(piedraM3),
                commercialUnit: 'm3 / bolsones',
                unitPrice: piedraMat ? piedraMat.price : 0,
                subtotal: round(Math.ceil(piedraM3) * (piedraMat ? piedraMat.price : 0), 2)
            },
            {
                id: 'acero_estimado',
                name: `Acero ADN 420 Estimado (${steelRatio} kg/m³)`,
                category: 'hierros',
                unit: 'kg',
                theoreticalQty: steelEstimatedKg,
                wastePercent: 8,
                finalQty: round(steelEstimatedKg * 1.08, 1),
                commercialQty: Math.ceil((steelEstimatedKg * 1.08) / 12),
                commercialUnit: 'kg aprox.',
                extraInfo: 'Ver modulo Acero para barras exactas',
                unitPrice: 3500,
                subtotal: round(steelEstimatedKg * 1.08 * 3500, 2)
            },
            {
                id: 'alambre_recocido',
                name: 'Alambre Negro Recocido No 16 (Ataduras)',
                category: 'hierros',
                unit: 'kg',
                theoreticalQty: tieWireKg,
                wastePercent: 5,
                finalQty: tieWireKg,
                commercialQty: Math.max(1, tieWireKg),
                commercialUnit: 'kg',
                unitPrice: wireMat ? wireMat.price : 0,
                subtotal: round(Math.max(1, tieWireKg) * (wireMat ? wireMat.price : 0), 2)
            }
        ];

        const trace = {
            title: `Calculo Estimativo de Hormigon - Elemento: ${elType.toUpperCase()}`,
            steps: [
                { formula: 'Dimensiones ingresadas', calc: dimDesc },
                { formula: 'Volumen Teorico', calc: `${round(theoVolume, 3)} m³` },
                { formula: 'Volumen Final con Desperdicio = Vol × (1 + Desp / 100)', calc: `${round(theoVolume, 3)} m³ × (1 + ${waste}/100) = ${round(finalVolume, 3)} m³` },
                { formula: 'Cemento H-21 = Vol × 350 kg/m³ ÷ 50', calc: `${round(finalVolume, 3)} m³ × 350 kg ÷ 50 = ${cementoBolsas} bolsas` },
                { formula: 'Arena = Vol × 0.65 m³/m³', calc: `${round(finalVolume, 3)} m³ × 0.65 = ${arenaM3} m³` },
                { formula: 'Piedra Partida 6/20 = Vol × 0.85 m³/m³', calc: `${round(finalVolume, 3)} m³ × 0.85 = ${piedraM3} m³` },
                { formula: `Acero Estimativo Cuantia (${steelRatio} kg/m³)`, calc: `${round(finalVolume, 3)} m³ × ${steelRatio} kg/m³ = ${steelEstimatedKg} kg` }
            ]
        };

        return {
            summary: {
                elementType: elType,
                volume: round(finalVolume, 3),
                steelKg: steelEstimatedKg,
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            disclaimer: 'ESTIMACION PRELIMINAR DE MATERIALES: Los valores de acero y espesores son promedios constructivos de referencia. Todo elemento estructural requiere calculo y verificacion obligatoria por parte de un Ingeniero Civil o Arquitecto matriculado.',
            items: items,
            trace: trace
        };
    }

    // 8. ACERO
    function calculateAcero(params) {
        const waste = parseFloat(params.wastePercent !== undefined ? params.wastePercent : 8);
        const barsList = Array.isArray(params.bars) ? params.bars : [];
        const items = [];
        let totalWeightKg = 0;
        let totalLinearMeters = 0;
        const steps = [];

        barsList.forEach((b) => {
            const diam = parseInt(b.diameterMm) || 8;
            const len = parseFloat(b.lengthM) || 0;
            const count = parseInt(b.count) || 1;
            const name = b.name || `Barra ${diam} mm`;

            const matId = `hierro_${diam}mm`;
            const mat = getMaterial(matId);
            const weightPerM = mat ? (mat.weightPerMeter || 0.617) : 0.617;

            const linearM = len * count;
            const linearMWithWaste = linearM * (1 + waste / 100);
            const weightKg = linearM * weightPerM;
            const finalWeightKg = linearMWithWaste * weightPerM;
            const bars12mCount = Math.ceil(linearMWithWaste / 12.0);

            totalLinearMeters += linearM;
            totalWeightKg += finalWeightKg;

            items.push({
                id: matId,
                name: mat ? mat.name : `Barra ADN 420 - ${diam} mm (12m)`,
                category: 'hierros',
                unit: 'barra',
                theoreticalQty: round(linearM / 12.0, 2),
                wastePercent: waste,
                finalQty: bars12mCount,
                commercialQty: bars12mCount,
                commercialUnit: `barras de 12 mts (${round(linearMWithWaste, 1)} m / ${round(finalWeightKg, 1)} kg)`,
                unitPrice: mat ? mat.price : 0,
                subtotal: round(bars12mCount * (mat ? mat.price : 0), 2)
            });

            steps.push({
                formula: `${name} (Ø ${diam} mm)`,
                calc: `${len} m × ${count} u = ${round(linearM, 2)} m (${round(weightKg, 2)} kg) -> Con ${waste}% desp: ${bars12mCount} barras de 12m`
            });
        });

        const wireKg = Math.ceil(totalWeightKg * 0.015);
        const wireMat = getMaterial('alambre_recocido');
        if (wireKg > 0) {
            items.push({
                id: 'alambre_recocido',
                name: 'Alambre Negro Recocido No 16 (Ataduras)',
                category: 'hierros',
                unit: 'kg',
                theoreticalQty: wireKg,
                wastePercent: 5,
                finalQty: Math.max(1, wireKg),
                commercialQty: Math.max(1, wireKg),
                commercialUnit: 'kg',
                unitPrice: wireMat ? wireMat.price : 0,
                subtotal: round(Math.max(1, wireKg) * (wireMat ? wireMat.price : 0), 2)
            });
        }

        const trace = {
            title: 'Calculo de Despiece de Acero ADN 420',
            steps: steps
        };

        return {
            summary: {
                totalLinearMeters: round(totalLinearMeters, 2),
                totalWeightKg: round(totalWeightKg, 2),
                barsTotal: items.filter(i => i.unit === 'barra').reduce((a, b) => a + b.finalQty, 0),
                totalEstimatedCost: round(items.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2)
            },
            items: items,
            trace: trace
        };
    }

    // 9. PRESUPUESTO CONSOLIDADO
    function consolidateBudget(calculationItemsList, options = {}) {
        const map = new Map();

        calculationItemsList.forEach(calcResult => {
            if (calcResult && Array.isArray(calcResult.items)) {
                calcResult.items.forEach(it => {
                    if (map.has(it.id)) {
                        const existing = map.get(it.id);
                        existing.finalQty += it.finalQty;
                        existing.commercialQty += it.commercialQty;
                        existing.subtotal = round(existing.subtotal + it.subtotal, 2);
                        existing.sources = (existing.sources || 1) + 1;
                    } else {
                        map.set(it.id, Object.assign({}, it, { sources: 1 }));
                    }
                });
            }
        });

        const materials = Array.from(map.values());
        const materialsTotal = round(materials.reduce((acc, it) => acc + (it.subtotal || 0), 0), 2);
        const laborTotal = parseFloat(options.laborCost) || 0;
        const extraTotal = parseFloat(options.extraCosts) || 0;
        const subtotalBeforeTaxes = materialsTotal + laborTotal + extraTotal;
        const taxesPercent = parseFloat(options.taxesPercent) || 0;
        const taxesAmount = round(subtotalBeforeTaxes * (taxesPercent / 100), 2);
        const grandTotal = round(subtotalBeforeTaxes + taxesAmount, 2);

        return {
            materials: materials,
            totals: {
                materialsTotal: materialsTotal,
                laborTotal: laborTotal,
                extraTotal: extraTotal,
                subtotal: subtotalBeforeTaxes,
                taxesPercent: taxesPercent,
                taxesAmount: taxesAmount,
                grandTotal: grandTotal,
                currency: options.currency || 'ARS'
            }
        };
    }

    return {
        Units: Units,
        calculateMuros: calculateMuros,
        calculatePisos: calculatePisos,
        calculateContrapisos: calculateContrapisos,
        calculateCarpetas: calculateCarpetas,
        calculatePintura: calculatePintura,
        calculateHormigon: calculateHormigon,
        calculateAcero: calculateAcero,
        consolidateBudget: consolidateBudget,
        round: round
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = CalculatorEngine;
}
