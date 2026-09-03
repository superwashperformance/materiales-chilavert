const catalogData = {
    categories: [
        { 
            id: "cementos", 
            name: "Cementos y Cales", 
            image: "img/categories/cat-cementos.jpg", 
            icon: "fa-cubes", 
            description: "Cementos portland, de albañilería y cales hidráulicas y aéreas." 
        },
        { 
            id: "aridos", 
            name: "Áridos", 
            image: "img/categories/cat-aridos.jpg", 
            icon: "fa-mountain", 
            description: "Arena de río limpia, piedra partida 6/20, cascote granza y mezclas." 
        },
        { 
            id: "ladrillos", 
            name: "Ladrillos y Bloques", 
            image: "img/categories/cat-ladrillos.webp", 
            icon: "fa-border-all", 
            description: "Ladrillos comunes, cerámicos huecos, portantes y bloques de hormigón." 
        },
        { 
            id: "hierros", 
            name: "Hierros y Acero", 
            image: "img/categories/cat-hierros.png", 
            icon: "fa-bars-staggered", 
            description: "Barras ADN 420 (6mm a 25mm), mallas electrosoldadas y alambres." 
        },
        { 
            id: "adhesivos", 
            name: "Adhesivos y Pastinas", 
            image: "img/categories/cat-adhesivos.jpg", 
            icon: "fa-fill-drip", 
            description: "Línea completa Perfecto Adhesivos: Impermeable, Flexible y Porcellanato." 
        },
        { 
            id: "aislantes", 
            name: "Hidrófugos e Impermeabilizantes", 
            image: "img/categories/cat-aislantes.jpg", 
            icon: "fa-shield-halved", 
            description: "Weber HD en pasta (1kg, 4kg, 10kg, 20kg), Ceresita y membranas asfálticas." 
        },
        { 
            id: "pinturas", 
            name: "Pinturas y Revestimientos", 
            image: "img/categories/cat-pinturas.jpg", 
            icon: "fa-paint-roller", 
            description: "Línea Weberpint Látex Exterior-Interior (4kg, 10kg, 20L), fijadores y selladores." 
        }
    ],

    products: [
        // CEMENTOS Y CALES
        { 
            id: "01005", 
            category: "cementos", 
            name: "Cemento Avellaneda CPC40", 
            image: "img/products/cemento-avellaneda.webp", 
            description: "Cemento portland compuesto de alta resistencia para uso general y estructural.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 25 kg / 50 kg", "Norma IRAM 50000", "Uso estructural y general"] 
        },
        { 
            id: "01113", 
            category: "cementos", 
            name: "Hidralit Cemento de Albañilería", 
            image: "img/products/hidralit.webp", 
            description: "Cemento plástico y trabajable ideal para morteros de asiento, revoques y contrapisos.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 20 kg", "Excelente trabajabilidad", "No apto uso estructural"] 
        },
        { 
            id: "02005", 
            category: "cementos", 
            name: "Cal Hidrat Extra para Albañilería", 
            image: "img/products/cal-hidrat-extra.webp", 
            description: "Cal hidráulica hidratada de alto rendimiento para mezclas de asiento y revoques gruesos.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 25 kg", "Máxima plasticidad"] 
        },
        { 
            id: "02120", 
            category: "cementos", 
            name: "Cal Aérea El Milagro Calidad Superior", 
            image: "img/products/cal-el-milagro.webp", 
            description: "Cal aérea hidratada en polvo de máxima pureza para revoques finos y enlucidos.", 
            brand: "El Milagro / Calidra", 
            features: ["Bolsa 25 kg", "San Juan", "Blancura y fineza superior"] 
        },
        { 
            id: "01201", 
            category: "cementos", 
            name: "Cemento Rápido Juntamax Gris 1 kg", 
            image: "img/products/cemento-rapido-juntamax.webp", 
            images: ["img/products/cemento-rapido-juntamax.webp", "img/products/cemento-rapido-juntamax-info.webp"],
            description: "Cemento hidráulico de fraguado instantáneo para reparaciones urgentes, obturación de filtraciones de agua y amurados rápidos.", 
            brand: "Juntamax", 
            features: ["Bolsa 1 kg", "Fraguado instantáneo", "Fragua bajo agua", "Color Gris"] 
        },

        // ÁRIDOS
        { 
            id: "03050", 
            category: "aridos", 
            name: "Bolsón de Arena de Río Limpia (1 m³)", 
            image: "img/products/bolson-arena-rio.webp", 
            description: "Arena clasificada y lavada en bolsón big bag de 1 m³ (aprox. 1500 kg) para un acopio ordenado y sin desperdicio en obra.", 
            brand: "Bolsón Big Bag", 
            features: ["Capacidad 1 m³ (Big Bag)", "Arena limpia y lavada", "Entrega y descarga con hidrogrúa"] 
        },
        { 
            id: "03000", 
            category: "aridos", 
            name: "Arena de Río Limpia a Granel", 
            image: "img/products/arena-granel.jpg", 
            description: "Arena clasificada y lavada libre de impurezas para hormigones, revoques y mezclas.", 
            brand: "Granel", 
            features: ["Por metro cúbico (m³)", "Seca y limpia", "Ideal hormigón y revoques"] 
        },
        { 
            id: "03300", 
            category: "aridos", 
            name: "Piedra Partida 6/20", 
            image: "img/products/piedra-partida.jpg", 
            description: "Piedra partida granítica seleccionada para hormigón armado y contrapisos.", 
            brand: "Granel", 
            features: ["Granulometría 6/20", "Por m³ a granel", "Alta dureza"] 
        },
        { 
            id: "03310", 
            category: "aridos", 
            name: "Piedra Partida Binder en Bolsón (1 m³ / 1/2 m³)", 
            image: "img/products/piedra-partida-binder.webp", 
            images: ["img/products/piedra-partida-binder.webp", "img/products/piedra-partida-binder-mano.webp"],
            description: "Piedra partida fina tipo binder en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos especiales, pavimentos y premoldeados.", 
            brand: "Bolsón Big Bag", 
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Granulometría fina Binder", "Acopio limpio y sin desperdicio"] 
        },
        { 
            id: "03500", 
            category: "aridos", 
            name: "Bolsón de Áridos (Arena / Piedra / Cascote)", 
            image: "img/products/bolson-aridos.png", 
            description: "Bolsón reforzado big bag de 1 m³ para entrega limpia y acopio ordenado en obra.", 
            brand: "Bolsón Big Bag", 
            features: ["Capacidad 1 m³", "Fácil descarga en vereda u obra", "Sin desperdicio"] 
        },
        { 
            id: "03550", 
            category: "aridos", 
            name: "Cascote Granza Limpio en Bolsón (1 m³ / 1/2 m³)", 
            image: "img/products/cascote-granza.jpg", 
            images: ["img/products/cascote-granza.jpg", "img/products/cascote-granza-detalle.jpg"],
            description: "Granza de cascote triturado limpio y clasificado en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos alivianados y rellenos.", 
            brand: "Bolsón Big Bag", 
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Limpio y libre de tierra", "Granulometría seleccionada"] 
        },
        { 
            id: "03560", 
            category: "aridos", 
            name: "Cascote Mezcla / Picado en Bolsón (1 m³ / 1/2 m³)", 
            image: "img/products/cascote-mezcla.jpg", 
            images: ["img/products/cascote-mezcla.jpg", "img/products/cascote-mezcla-detalle.webp"],
            description: "Cascote de ladrillo y revoque picado seleccionado en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos firmes y bases.", 
            brand: "Bolsón Big Bag", 
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Ideal contrapisos de cascote", "Excelente drenaje y compactación"] 
        },

        // LADRILLOS Y BLOQUES
        { 
            id: "04000", 
            category: "ladrillos", 
            name: "Ladrillo Común de Campo Seleccionado", 
            image: "img/products/ladrillo-comun.webp", 
            description: "Ladrillo común macizo de primera calidad cocido a leña. Ideal para mampostería portante, muros vistos, hornos y parrillas.", 
            brand: "Seleccionado", 
            features: ["Por unidad, medio mil o mil (pallet)", "Cocción tradicional a leña", "Alta resistencia y adherencia"] 
        },
        { 
            id: "05006", 
            category: "ladrillos", 
            name: "Ladrillo Hueco 8x18x33 (6 Agujeros)", 
            image: "img/products/ladrillo-hueco-8x18x33.webp", 
            description: "Ladrillo cerámico hueco 6 agujeros para tabiques divisorios internos no portantes.", 
            brand: "Fanelli / Ctibor", 
            features: ["Medida 8x18x33 cm", "Rendimiento 16 u/m²", "Tabiquería liviana"] 
        },
        { 
            id: "05010", 
            category: "ladrillos", 
            name: "Ladrillo Hueco 12x18x33 (9 Agujeros)", 
            image: "img/products/ladrillo-hueco-12x18x33.webp", 
            description: "Ladrillo cerámico hueco 9 agujeros estándar para muros exteriores e interiores de 15 cm.", 
            brand: "Fanelli / Ctibor", 
            features: ["Medida 12x18x33 cm", "Rendimiento 16 u/m²", "Muro estándar"] 
        },
        { 
            id: "05012", 
            category: "ladrillos", 
            name: "Ladrillo Hueco 18x18x33 (12 Agujeros)", 
            image: "img/products/ladrillo-hueco-18x18x33.webp", 
            description: "Ladrillo cerámico hueco para cerramientos perimetrales de 20 cm con aislación acústica y térmica.", 
            brand: "Fanelli / Ctibor", 
            features: ["Medida 18x18x33 cm", "Rendimiento 16 u/m²", "Máxima aislación"] 
        },
        { 
            id: "05020", 
            category: "ladrillos", 
            name: "Ladrillo Cerámico Portante 12x19x33", 
            image: "img/products/ladrillo-portante-12.webp", 
            description: "Ladrillo cerámico portante para muros estructurales resistentes sin vigas intermedias.", 
            brand: "Fanelli / Ctibor", 
            features: ["Medida 12x19x33 cm", "Rendimiento 16 u/m²", "Estructural"] 
        },
        { 
            id: "05022", 
            category: "ladrillos", 
            name: "Ladrillo Cerámico Portante 18x19x33", 
            image: "img/products/ladrillo-portante-18.webp", 
            description: "Ladrillo cerámico portante de 18 cm para muros portantes exteriores de alta capacidad de carga.", 
            brand: "Fanelli / Ctibor", 
            features: ["Medida 18x19x33 cm", "Rendimiento 16 u/m²", "Estructural"] 
        },
        { 
            id: "06012", 
            category: "ladrillos", 
            name: "Bloque de Hormigón 12x20x40", 
            image: "img/products/bloque-hormigon-12.webp", 
            description: "Bloque de hormigón vibrado de 12 cm de espesor para tabiques y muros perimetrales.", 
            brand: "Vibrado Standard", 
            features: ["Medida 12x20x40 cm", "12.5 u/m²", "Excelente solidez"] 
        },
        { 
            id: "06020", 
            category: "ladrillos", 
            name: "Bloque de Hormigón 19x20x40 (20 cm)", 
            image: "img/products/bloque-hormigon-20.webp", 
            description: "Bloque de hormigón estructural estándar de 20 cm para muros portantes y de contención.", 
            brand: "Vibrado Standard", 
            features: ["Medida 19x20x40 cm", "12.5 u/m²", "Apto armado con hierros"] 
        },
        { 
            id: "06025", 
            category: "ladrillos", 
            name: "Bloque de Hormigón Split Texturado", 
            image: "img/products/bloque-hormigon-split.webp", 
            description: "Bloque de hormigón con terminación rústica símil piedra para muros a la vista.", 
            brand: "Vibrado Decorativo", 
            features: ["Medida 19x20x40 cm", "Terminación rústica", "No requiere revoque"] 
        },

        // HIERROS Y ACERO
        { 
            id: "09001", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - 6 mm a 25 mm", 
            image: "img/categories/cat-hierros.png", 
            description: "Barras de acero conformadas de dureza natural para estructuras de hormigón armado.", 
            brand: "Acindar", 
            features: ["Barras 12 metros", "Norma IRAM-IAS U 500-06", "Diámetros 6, 8, 10, 12, 16, 20, 25 mm"] 
        },
        { 
            id: "09011", 
            category: "hierros", 
            name: "Malla Sima Electrosoldada R-084 / Q-188", 
            image: "img/products/malla-sima.png", 
            description: "Malla de acero electrosoldada para losas, plateas de fundación y contrapisos armados.", 
            brand: "Acindar", 
            features: ["Panel 2 x 5 mts", "Malla electrosoldada", "Alta resistencia mecánica"] 
        },

        // ADHESIVOS Y PASTINAS
        { 
            id: "11100", 
            category: "adhesivos", 
            name: "Perfecto Adhesivo Impermeable 30 kg", 
            image: "img/products/adhesivo-perfecto-impermeable.webp", 
            description: "Mezcla adhesiva impermeable para colocación de pisos y revestimientos de media y alta absorción.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 30 kg", "Norma IRAM 45062 Tipo C1-I,F", "Impermeable"] 
        },
        { 
            id: "11104", 
            category: "adhesivos", 
            name: "Perfecto Adhesivo Flexible 25 kg", 
            image: "img/products/adhesivo-perfecto-flexible.webp", 
            description: "Mezcla adhesiva de alta flexibilidad para porcelanatos y placas de baja o nula absorción en interiores y exteriores.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 25 kg", "Norma IRAM 45062 Tipo C3-I", "Apto losa radiante y porcelanatos grandes"] 
        },
        { 
            id: "11105", 
            category: "adhesivos", 
            name: "Perfecto Adhesivo Porcellanato 30 kg", 
            image: "img/products/adhesivo-perfecto-porcellanato.jpg", 
            description: "Mezcla adhesiva de alta performance formulada especialmente para la colocación de placas de porcellanato y piezas de baja absorción.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 30 kg", "Norma IRAM 45062 Tipo C2-L,F,H", "Especial Porcellanatos"] 
        },
        { 
            id: "11200", 
            category: "adhesivos", 
            name: "Pastina Fluida Impermeable Weber / Perfecto", 
            description: "Mortero de rejuntado impermeable anti-hongos para juntas de pisos y azulejos de 1 a 15 mm.", 
            brand: "Weber / Perfecto", 
            features: ["Bolsa 1 kg / 5 kg", "Anti-hongos", "Variedad de colores"] 
        },

        // HIDRÓFUGOS E IMPERMEABILIZANTES
        { 
            id: "13213", 
            category: "aislantes", 
            name: "Weber HD Hidrófugo en Pasta 20 kg", 
            image: "img/products/hidrofugo-weber-hd-20kg.webp", 
            description: "Aditivo hidrófugo de masa en pasta tradicional para capas aisladoras y revoques impermeables.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Balde 20 kg", "Bloquea la humedad ascendente", "No altera fragüe"] 
        },
        { 
            id: "13214", 
            category: "aislantes", 
            name: "Weber HD Hidrófugo en Pasta 10 kg", 
            image: "img/products/hidrofugo-weber-hd-10kg.jpg", 
            description: "Aditivo hidrófugo de masa para mezclas impermeables de mortero y hormigón.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Balde 10 kg", "Máxima impermeabilidad"] 
        },
        { 
            id: "13215", 
            category: "aislantes", 
            name: "Weber HD Hidrófugo en Pasta 4 kg", 
            image: "img/products/hidrofugo-weber-hd-4kg.jpg", 
            description: "Aditivo hidrófugo en pasta para reparaciones puntuales y capas aisladoras.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Pote 4 kg", "Fácil dosificación"] 
        },
        { 
            id: "13216", 
            category: "aislantes", 
            name: "Weber HD Hidrófugo en Pasta 1 kg", 
            image: "img/products/hidrofugo-weber-hd-1kg.webp", 
            description: "Pote fraccionado de 1 kg para pequeñas reparaciones e impermeabilizaciones.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Pote 1 kg", "Listo para usar"] 
        },
        { 
            id: "13220", 
            category: "aislantes", 
            name: "Ceresita Hidrófugo Tradicional", 
            description: "Hidrófugo de masa químico tradicional para azotados impermeables.", 
            brand: "Weber Ceresita", 
            features: ["Balde 10 kg / 20 kg", "Fórmula clásica"] 
        },
        { 
            id: "13230", 
            category: "aislantes", 
            name: "Membrana Asfáltica 4 mm con Aluminio", 
            description: "Membrana asfáltica normalizada con aluminio compuesto flexible para impermeabilización de techos y terrazas.", 
            brand: "Megaflex / Ormiflex", 
            features: ["Rollo 10 m² (1 x 10 m)", "Espesor 4 mm", "Aluminio no crack"] 
        },

        // PINTURAS Y REVESTIMIENTOS
        { 
            id: "14100", 
            category: "pinturas", 
            name: "Weberpint Látex Exterior-Interior 20 L", 
            image: "img/products/weberpint-latex.jpg", 
            description: "Pintura látex acrílica de máxima cobertura, alta blancura y resistencia a la intemperie.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Balde 20 Litros", "Exterior e Interior", "Excelente poder cubritivo"] 
        },
        { 
            id: "14105", 
            category: "pinturas", 
            name: "Weberpint Látex Exterior-Interior 10 kg / 4 kg", 
            image: "img/products/weberpint-latex.jpg", 
            description: "Látex para muros exteriores e interiores en presentaciones medianas y chicas.", 
            brand: "Weber / Saint-Gobain", 
            features: ["Balde 10 kg / Pote 4 kg", "Lavable y anti-hongos", "Fácil aplicación"] 
        },
        { 
            id: "14120", 
            category: "pinturas", 
            name: "Fijador Sellador Concentrado 4 L", 
            description: "Fijador al agua concentrado para acondicionar superficies de yeso, revoque o enduido.", 
            brand: "Profesional", 
            features: ["Bidón 4 Litros", "Rinde hasta 60 m² diluido", "Uniforma la absorción"] 
        },

    ]
};
