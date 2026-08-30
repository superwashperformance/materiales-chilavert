/**
 * Base de Datos Tecnica y Catalogo de Materiales
 * Materiales Chilavert
 */

const catalogData = {
    categories: [
        { id: 'cementos', name: 'Cementos y Cales', icon: 'fa-cubes', description: 'Cementos portland, de albanileria y cales hidraulicas y aereas.' },
        { id: 'aridos', name: 'Aridos', icon: 'fa-mountain', description: 'Arena de rio, piedra partida 6/20, cascote granza y mezclas.' },
        { id: 'ladrillos', name: 'Ladrillos y Bloques', icon: 'fa-border-all', description: 'Ladrillos comunes, ceramicos huecos, portantes y bloques de hormigon/Retak.' },
        { id: 'hierros', name: 'Hierros y Acero', icon: 'fa-bars-staggered', description: 'Barras ADN 420 (6mm a 25mm), mallas electrosoldadas y alambres.' },
        { id: 'adhesivos', name: 'Adhesivos y Pastinas', icon: 'fa-fill-drip', description: 'Pegamentos Weber/Klaukol para ceramicas y porcelanatos, pastinas y aditivos.' },
        { id: 'aislantes', name: 'Hidrofugos e Impermeabilizantes', icon: 'fa-shield-halved', description: 'Ceresita, hidrofugos de masa, membranas asfalticas y emulsiones.' },
        { id: 'pinturas', name: 'Pinturas y Revestimientos', icon: 'fa-paint-roller', description: 'Latex exterior e interior, fijadores selladores y enduidos.' },
        { id: 'chapas', name: 'Chapas y Techos', icon: 'fa-house-chimney', description: 'Chapas sinusoidales, trapezoidales, perfiles y aislaciones termicas.' }
    ],

    materials: [
        // Cementos y Cales
        { id: 'cemento_50kg', category: 'cementos', name: 'Cemento Portland (Bolsa 50 kg)', unit: 'bolsa', packQty: 50, packUnit: 'kg', price: 8642.06, brand: 'Loma Negra / Avellaneda', defaultWaste: 5 },
        { id: 'cemento_albanileria_25kg', category: 'cementos', name: 'Cemento de Albanileria / Hidralit (25 kg)', unit: 'bolsa', packQty: 25, packUnit: 'kg', price: 7223.84, brand: 'Hidralit / Loma Negra', defaultWaste: 5 },
        { id: 'cal_hidraulica_25kg', category: 'cementos', name: 'Cal Hidraulica (Bolsa 25 kg)', unit: 'bolsa', packQty: 25, packUnit: 'kg', price: 7752.78, brand: 'Cacique / El Milagro', defaultWaste: 5 },
        { id: 'cal_aerea_20kg', category: 'cementos', name: 'Cal Aerea Hidratada (Bolsa 20 kg)', unit: 'bolsa', packQty: 20, packUnit: 'kg', price: 16821.11, brand: 'El Milagro', defaultWaste: 5 },
        { id: 'yeso_30kg', category: 'cementos', name: 'Yeso Tuyango (Bolsa 30 kg)', unit: 'bolsa', packQty: 30, packUnit: 'kg', price: 16940.13, brand: 'Tuyango', defaultWaste: 8 },

        // Aridos
        { id: 'arena_m3', category: 'aridos', name: 'Arena de Rio Limpia (M3)', unit: 'm3', packQty: 1, packUnit: 'm3', price: 43612.45, brand: 'Granel', defaultWaste: 10 },
        { id: 'bolson_arena', category: 'aridos', name: 'Bolson de Arena (1 m3)', unit: 'bolson', packQty: 1, packUnit: 'm3', price: 49315.95, brand: 'Embolsado', defaultWaste: 8 },
        { id: 'piedra_partida_m3', category: 'aridos', name: 'Piedra Partida 6/20 (M3)', unit: 'm3', packQty: 1, packUnit: 'm3', price: 87951.23, brand: 'Granel', defaultWaste: 10 },
        { id: 'bolson_piedra', category: 'aridos', name: 'Bolson Piedra Partida 6/20', unit: 'bolson', packQty: 1, packUnit: 'm3', price: 93291.69, brand: 'Embolsado', defaultWaste: 8 },
        { id: 'cascote_granza_m3', category: 'aridos', name: 'Cascote Granza Partido (M3)', unit: 'm3', packQty: 1, packUnit: 'm3', price: 45375.00, brand: 'Granel', defaultWaste: 10 },
        { id: 'bolson_cascote', category: 'aridos', name: 'Bolson de Cascote Granza', unit: 'bolson', packQty: 1, packUnit: 'm3', price: 61351.05, brand: 'Embolsado', defaultWaste: 8 },

        // Ladrillos y Bloques
        { id: 'ladrillo_comun', category: 'ladrillos', name: 'Ladrillo Comun de Campo', unit: 'unidad', packQty: 1000, packUnit: 'millar', price: 279.51, brand: 'Seleccionado', defaultWaste: 7 },
        { id: 'ladrillo_hueco_8', category: 'ladrillos', name: 'Ladrillo Hueco 8x18x33 (Tabique)', unit: 'unidad', packQty: 198, packUnit: 'pallet', price: 705.07, brand: 'Fanelli / Ctibor', defaultWaste: 7 },
        { id: 'ladrillo_hueco_12', category: 'ladrillos', name: 'Ladrillo Hueco 12x18x33', unit: 'unidad', packQty: 144, packUnit: 'pallet', price: 852.15, brand: 'Fanelli / Ctibor', defaultWaste: 7 },
        { id: 'ladrillo_hueco_18', category: 'ladrillos', name: 'Ladrillo Hueco 18x18x33', unit: 'unidad', packQty: 90, packUnit: 'pallet', price: 1311.12, brand: 'Fanelli / Ctibor', defaultWaste: 7 },
        { id: 'ladrillo_portante_12', category: 'ladrillos', name: 'Ladrillo Ceramico Portante 12x19x33', unit: 'unidad', packQty: 126, packUnit: 'pallet', price: 1333.55, brand: 'Fanelli', defaultWaste: 7 },
        { id: 'ladrillo_portante_18', category: 'ladrillos', name: 'Ladrillo Ceramico Portante 18x19x33', unit: 'unidad', packQty: 90, packUnit: 'pallet', price: 1566.47, brand: 'Fanelli', defaultWaste: 7 },
        { id: 'bloque_hormigon_20', category: 'ladrillos', name: 'Bloque Hormigon 20x20x40 Estandar', unit: 'unidad', packQty: 126, packUnit: 'pallet', price: 2091.04, brand: 'Estandar', defaultWaste: 5 },
        { id: 'bloque_retak_15', category: 'ladrillos', name: 'Bloque HCCA Retak 15x25x50 cm', unit: 'unidad', packQty: 96, packUnit: 'pallet', price: 4350.00, brand: 'Retak', defaultWaste: 5 },

        // Hierros ADN 420
        { id: 'hierro_6mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 6 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 8059.10, weightPerMeter: 0.222, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_8mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 8 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 12907.27, weightPerMeter: 0.395, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_10mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 10 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 20006.26, weightPerMeter: 0.617, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_12mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 12 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 28761.10, weightPerMeter: 0.888, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_16mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 16 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 49049.99, weightPerMeter: 1.580, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_20mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 20 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 76679.43, weightPerMeter: 2.470, brand: 'Acindar', defaultWaste: 8 },
        { id: 'hierro_25mm', category: 'hierros', name: 'Barra Hierro ADN 420 - 25 mm (12m)', unit: 'barra', packQty: 1, packUnit: 'barra', price: 119520.56, weightPerMeter: 3.850, brand: 'Acindar', defaultWaste: 8 },
        { id: 'alambre_recocido', category: 'hierros', name: 'Alambre Negro Recocido No 16 (kg)', unit: 'kg', packQty: 1, packUnit: 'kg', price: 5714.41, brand: 'Acindar', defaultWaste: 5 },
        { id: 'malla_simar084', category: 'hierros', name: 'Malla Electrosoldada R-084 (15x25 3.75mm 2x5m)', unit: 'panel', packQty: 1, packUnit: 'panel', price: 33491.71, brand: 'Acindar', defaultWaste: 8 },

        // Adhesivos y Pastinas
        { id: 'adhesivo_ceramico_30kg', category: 'adhesivos', name: 'Adhesivo Ceramico Impermeable (30 kg)', unit: 'bolsa', packQty: 30, packUnit: 'kg', price: 5461.96, brand: 'Weber / Klaukol', defaultWaste: 8 },
        { id: 'adhesivo_porcelanato_30kg', category: 'adhesivos', name: 'Adhesivo Porcelanato Flexible (30 kg)', unit: 'bolsa', packQty: 30, packUnit: 'kg', price: 26722.72, brand: 'Weber Pro / Klaukol', defaultWaste: 8 },
        { id: 'pastina_2kg', category: 'adhesivos', name: 'Pastina de Colores (Bolsa 2 kg)', unit: 'bolsa', packQty: 2, packUnit: 'kg', price: 7595.90, brand: 'Weber Prestige', defaultWaste: 10 },

        // Hidrofugos y Pinturas
        { id: 'hidrofugo_ceresita_10kg', category: 'aislantes', name: 'Hidrofugo Quimico Ceresita (10 kg)', unit: 'balde', packQty: 10, packUnit: 'kg', price: 33788.42, brand: 'Weber Ceresita', defaultWaste: 5 },
        { id: 'hidrofugo_ceresita_20kg', category: 'aislantes', name: 'Hidrofugo Quimico Ceresita (20 kg)', unit: 'balde', packQty: 20, packUnit: 'kg', price: 61369.48, brand: 'Weber Ceresita', defaultWaste: 5 },
        { id: 'pintura_latex_20l', category: 'pinturas', name: 'Latex Ext/Int Profesional (20 L)', unit: 'balde', packQty: 20, packUnit: 'litros', price: 114094.40, brand: 'Weberpaint / Sinteplast', defaultWaste: 5 },
        { id: 'fijador_sellador_4l', category: 'pinturas', name: 'Fijador Sellador al Agua (4 L)', unit: 'bidon', packQty: 4, packUnit: 'litros', price: 20402.52, brand: 'Weberpaint / Sinteplast', defaultWaste: 5 }
    ],

    masonryTypes: {
        ladrillo_comun_15: {
            name: 'Ladrillo Comun (Pared 15 cm)',
            brickId: 'ladrillo_comun',
            unitsPerM2: 60,
            mortarM3PerM2: 0.032,
            mortarType: 'asiento_comun',
            renderM2: 2
        },
        ladrillo_comun_30: {
            name: 'Ladrillo Comun (Pared 30 cm)',
            brickId: 'ladrillo_comun',
            unitsPerM2: 120,
            mortarM3PerM2: 0.075,
            mortarType: 'asiento_comun',
            renderM2: 2
        },
        hueco_8: {
            name: 'Ladrillo Hueco 8x18x33 (Tabique 8 cm)',
            brickId: 'ladrillo_hueco_8',
            unitsPerM2: 16,
            mortarM3PerM2: 0.015,
            mortarType: 'asiento_hueco',
            renderM2: 2
        },
        hueco_12: {
            name: 'Ladrillo Hueco 12x18x33 (Muro 12 cm)',
            brickId: 'ladrillo_hueco_12',
            unitsPerM2: 16,
            mortarM3PerM2: 0.023,
            mortarType: 'asiento_hueco',
            renderM2: 2
        },
        hueco_18: {
            name: 'Ladrillo Hueco 18x18x33 (Muro 18 cm)',
            brickId: 'ladrillo_hueco_18',
            unitsPerM2: 16,
            mortarM3PerM2: 0.035,
            mortarType: 'asiento_hueco',
            renderM2: 2
        },
        portante_12: {
            name: 'Ladrillo Portante 12x19x33',
            brickId: 'ladrillo_portante_12',
            unitsPerM2: 16,
            mortarM3PerM2: 0.025,
            mortarType: 'asiento_portante',
            renderM2: 2
        },
        portante_18: {
            name: 'Ladrillo Portante 18x19x33',
            brickId: 'ladrillo_portante_18',
            unitsPerM2: 16,
            mortarM3PerM2: 0.038,
            mortarType: 'asiento_portante',
            renderM2: 2
        },
        bloque_hormigon_20: {
            name: 'Bloque de Hormigon 20x20x40',
            brickId: 'bloque_hormigon_20',
            unitsPerM2: 12.5,
            mortarM3PerM2: 0.020,
            mortarType: 'asiento_bloque',
            renderM2: 2
        },
        bloque_retak_15: {
            name: 'Bloque Retak HCCA 15 cm',
            brickId: 'bloque_retak_15',
            unitsPerM2: 8,
            adhesiveKgPerM2: 5.0,
            mortarType: 'adhesivo_retak',
            renderM2: 0
        }
    },

    mortarDosages: {
        asiento_comun: {
            name: 'Mortero 1:1:4 (Cemento, Cal Hidraulica, Arena)',
            cementoKg: 110,
            calKg: 210,
            arenaM3: 1.05,
            aguaL: 220
        },
        asiento_hueco: {
            name: 'Mortero 1:1/2:4 (Cemento, Cal Hidraulica, Arena)',
            cementoKg: 160,
            calKg: 110,
            arenaM3: 1.05,
            aguaL: 220
        },
        asiento_portante: {
            name: 'Mortero Cemento y Cal 1:1/4:3',
            cementoKg: 260,
            calKg: 65,
            arenaM3: 1.05,
            aguaL: 230
        },
        asiento_bloque: {
            name: 'Mortero 1:1/2:3',
            cementoKg: 250,
            calKg: 70,
            arenaM3: 1.05,
            aguaL: 220
        },
        revoque_impermeable: {
            name: 'Capa Aisladora / Azotado 1:3 + Hidrofugo',
            thicknessM: 0.008,
            cementoKgPerM3: 450,
            arenaM3PerM3: 1.10,
            hidrofugoKgPerM3: 4.5,
            aguaLPerM3: 200
        },
        revoque_grueso: {
            name: 'Revoque Grueso 1:1:4 (Cal, Cemento, Arena)',
            thicknessM: 0.015,
            cementoKgPerM3: 120,
            calKgPerM3: 190,
            arenaM3PerM3: 1.05,
            aguaLPerM3: 220
        },
        revoque_fino: {
            name: 'Revoque Fino a la Cal 1:1/4:3',
            thicknessM: 0.003,
            cementoKgPerM3: 50,
            calAereaKgPerM3: 250,
            arenaM3PerM3: 0.95,
            aguaLPerM3: 250
        }
    },

    subfloorDosages: {
        contrapiso_cascote: {
            name: 'Contrapiso de Cascote 1:1/4:4:8 (Cemento, Cal, Arena, Cascote)',
            cementoKg: 100,
            calKg: 30,
            arenaM3: 0.45,
            cascoteM3: 0.90,
            aguaL: 160
        },
        contrapiso_granza: {
            name: 'Contrapiso de Granza/Piedra 1:3:6 (Cemento, Arena, Granza)',
            cementoKg: 160,
            arenaM3: 0.50,
            piedraM3: 0.90,
            aguaL: 160
        },
        carpeta_nivelacion: {
            name: 'Carpeta 1:3 (Cemento, Arena)',
            cementoKg: 450,
            arenaM3: 1.10,
            aguaL: 200
        }
    },

    concreteDosages: {
        h21_standard: {
            name: 'Hormigon Estructural H-21 (1:2:3 Cemento, Arena, Piedra 6/20)',
            cementoKg: 350,
            arenaM3: 0.65,
            piedraM3: 0.85,
            aguaL: 185,
            steelKgPerM3: {
                platea: 65,
                bases: 60,
                columnas: 120,
                vigas: 100,
                losas: 80,
                encadenados: 85
            },
            formworkM2PerM3: {
                platea: 0.8,
                bases: 2.0,
                columnas: 12.0,
                vigas: 8.0,
                losas: 6.5,
                encadenados: 5.0
            }
        }
    },

    products: [
        { id: '01005', category: 'cementos', name: 'Cemento x 50 kg', description: 'Cemento portland de uso general.', brand: 'Loma Negra / Avellaneda', features: ['Bolsa 50 kg', 'Uso general'] },
        { id: '01050', category: 'cementos', name: 'Cemento Rapido Gris', description: 'Cemento de frague rapido.', brand: 'Loma Negra', features: ['Bolsa 1 kg'] },
        { id: '01113', category: 'cementos', name: 'Hidralit x 25 kg', description: 'Cemento de albanileria.', brand: 'Loma Negra', features: ['Bolsa 25 kg', 'Plastico y trabajable'] },
        { id: '02005', category: 'cementos', name: 'Cal Hidraulica', description: 'Cal para mezclas de asentamiento y revoques.', brand: 'Cacique / El Milagro', features: ['Bolsa 25 kg'] },
        { id: '02120', category: 'cementos', name: 'Cal Aerea El Milagro', description: 'Cal hidratada de alta pureza.', brand: 'El Milagro', features: ['Bolsa 20 kg', 'Para revoques finos'] },
        { id: '03000', category: 'aridos', name: 'Arena (M3)', description: 'Arena de rio limpia para construccion.', brand: 'Granel', features: ['Por metro cubico', 'Ideal hormigon y revoques'] },
        { id: '03300', category: 'aridos', name: 'Piedra Partida 6/20 (M3)', description: 'Piedra partida clasificada.', brand: 'Granel', features: ['Por metro cubico'] },
        { id: '03500', category: 'aridos', name: 'Cascote Granza (M3)', description: 'Cascote limpio y partido.', brand: 'Granel', features: ['Por metro cubico'] },
        { id: '04000', category: 'ladrillos', name: 'Ladrillo Comun', description: 'Ladrillo de campo de primera calidad.', brand: 'Generica', features: ['Por unidad o pallet'] },
        { id: '05006', category: 'ladrillos', name: 'Ladrillo Hueco 8x18x33', description: 'Ladrillo ceramico para tabiques.', brand: 'Fanelli / Ctibor', features: ['Ceramico', 'Tabique interno'] },
        { id: '05010', category: 'ladrillos', name: 'Ladrillo Hueco 12x18x33', description: 'Ladrillo ceramico para muros.', brand: 'Fanelli / Ctibor', features: ['Ceramico', 'Muro estandar'] },
        { id: '05012', category: 'ladrillos', name: 'Ladrillo Hueco 18x18x33', description: 'Ladrillo ceramico para cerramientos exteriores.', brand: 'Fanelli / Ctibor', features: ['Aislacion acustica y termica'] },
        { id: '09001', category: 'hierros', name: 'Barra ADN 420 - 6 mm', description: 'Hierro aleteado para construccion.', brand: 'Acindar', features: ['Barra 12 metros', 'Acero ADN 420'] },
        { id: '09003', category: 'hierros', name: 'Barra ADN 420 - 10 mm', description: 'Hierro aleteado para construccion.', brand: 'Acindar', features: ['Barra 12 metros', 'Acero ADN 420'] },
        { id: '09011', category: 'hierros', name: 'Malla Sima R-084 15x25', description: 'Malla electrosoldada.', brand: 'Acindar', features: ['Panel 2x5 mts', 'Hierro 3.75 mm'] },
        { id: '11100', category: 'adhesivos', name: 'Weber Impermeable 30 kg', description: 'Adhesivo para ceramicas interiores y exteriores.', brand: 'Weber', features: ['Bolsa 30 kg', 'Impermeable'] },
        { id: '11104', category: 'adhesivos', name: 'Weber Porcelanato Pro 30 kg', description: 'Adhesivo flexible para porcelanatos.', brand: 'Weber', features: ['Bolsa 30 kg', 'Alta adherencia'] },
        { id: '13213', category: 'aislantes', name: 'Ceresita 10 kg', description: 'Hidrofugo tradicional.', brand: 'Weber', features: ['Balde 10 kg'] }
    ]
};