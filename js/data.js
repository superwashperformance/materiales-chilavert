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
            description: "Ladrillos comunes, de campo, cerámicos huecos, portantes, tejas y bloques de hormigón." 
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
            name: "Adhesivos", 
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
        },
        { 
            id: "refractarios", 
            name: "Refractarios y Baldosones", 
            image: "img/categories/cat-refractarios.webp", 
            icon: "fa-fire-burner", 
            description: "Ladrillos rectos N°1, tejuelas N°5, listones N°9, esquineros N°11, 1/2 esquineros N°14 y arcilla refractaria." 
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
            name: "Bolsón de Arena de Río Limpia", 
            image: "img/products/bolson-arena-rio.webp", 
            description: "Arena clasificada y lavada en bolsón big bag (1 m³ o 1/2 m³) para un acopio ordenado y sin desperdicio en obra.", 
            brand: "Bolsón Big Bag", 
            variants: ["1 Bolsón (1 m³)", "Medio Bolsón (1/2 m³)"],
            features: ["Bolsón 1 m³ (aprox. 1500 kg)", "Medio Bolsón (1/2 m³)", "Arena limpia y lavada", "Entrega y descarga con hidrogrúa"] 
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
            name: "Piedra Partida Binder en Bolsón", 
            image: "img/products/piedra-partida-binder.webp", 
            images: ["img/products/piedra-partida-binder.webp", "img/products/piedra-partida-binder-mano.webp"],
            description: "Piedra partida fina tipo binder en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos especiales, pavimentos y premoldeados.", 
            brand: "Bolsón Big Bag", 
            variants: ["1 Bolsón (1 m³)", "Medio Bolsón (1/2 m³)"],
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Granulometría fina Binder", "Acopio limpio y sin desperdicio"] 
        },
        { 
            id: "03500", 
            category: "aridos", 
            name: "Bolsón de Piedra Partida 6/20", 
            image: "img/products/bolson-piedra-partida-6-20.webp", 
            description: "Piedra partida granítica 6/20 en bolsón big bag reforzado (1 m³ o 1/2 m³) para hormigón armado, losas, columnas y bases con entrega limpia en obra.", 
            brand: "Bolsón Big Bag", 
            variants: ["1 Bolsón (1 m³)", "Medio Bolsón (1/2 m³)"],
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Granulometría estándar 6/20", "Ideal hormigón armado y bases", "Entrega y descarga con hidrogrúa"] 
        },
        { 
            id: "03550", 
            category: "aridos", 
            name: "Cascote Granza Limpio en Bolsón", 
            image: "img/products/cascote-granza.jpg", 
            images: ["img/products/cascote-granza.jpg", "img/products/cascote-granza-detalle.jpg"],
            description: "Granza de cascote triturado limpio y clasificado en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos alivianados y rellenos.", 
            brand: "Bolsón Big Bag", 
            variants: ["1 Bolsón (1 m³)", "Medio Bolsón (1/2 m³)"],
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Limpio y libre de tierra", "Granulometría seleccionada"] 
        },
        { 
            id: "03560", 
            category: "aridos", 
            name: "Cascote Mezcla / Picado en Bolsón", 
            image: "img/products/cascote-mezcla.jpg", 
            images: ["img/products/cascote-mezcla.jpg", "img/products/cascote-mezcla-detalle.webp"],
            description: "Cascote de ladrillo y revoque picado seleccionado en bolsón de 1 m³ o medio bolsón (1/2 m³) para contrapisos firmes y bases.", 
            brand: "Bolsón Big Bag", 
            variants: ["1 Bolsón (1 m³)", "Medio Bolsón (1/2 m³)"],
            features: ["Bolsón 1 m³", "Medio Bolsón (1/2 m³)", "Ideal contrapisos de cascote", "Excelente drenaje y compactación"] 
        },
        { 
            id: "03610", 
            category: "aridos", 
            name: "Isocret Agregado Ultraliviano 85 L (Estisol)", 
            image: "img/products/isocret-85l.webp", 
            description: "Perlas vírgenes de EPS Isopor aditivadas con EIA para realizar contrapisos y hormigones ultralivianos de elevado poder aislante térmico y acústico.", 
            brand: "Grupo Estisol", 
            features: ["Bolsa 85 Litros", "Solo agregar cemento y agua", "Aislación térmica y acústica", "Ideal contrapisos livianos y pendientes"] 
        },
        { 
            id: "03620", 
            category: "aridos", 
            name: "Isocret Agregado Ultraliviano 170 L (Estisol)", 
            image: "img/products/isocret-170l.webp", 
            description: "Perlas vírgenes de EPS Isopor aditivadas para hormigones ultralivianos y contrapisos de gran rendimiento aislante (rinde 5 bolsas por m³).", 
            brand: "Grupo Estisol", 
            features: ["Bolsa 170 Litros", "Rinde 5 bolsas por m³", "Solo agregar cemento y agua", "Aislante térmico y acústico"] 
        },

        // LADRILLOS Y BLOQUES
        { 
            id: "04000", 
            category: "ladrillos", 
            name: "Ladrillo Común de Campo Seleccionado", 
            image: "img/products/ladrillo-comun.webp", 
            description: "Ladrillo común macizo de primera calidad cocido a leña. Ideal para mampostería portante, muros vistos, hornos y parrillas.", 
            brand: "Seleccionado", 
            features: ["Por unidad, medio mil o mil", "Cocción tradicional a leña", "Alta resistencia y adherencia"] 
        },
        { 
            id: "04050", 
            category: "ladrillos", 
            name: "Ladrillo Vista Córdoba Seleccionado", 
            image: "img/products/ladrillo-vista-cordoba.webp", 
            images: [
                "img/products/ladrillo-vista-cordoba.webp", 
                "img/products/ladrillo-vista-cordoba-pallet.webp"
            ],
            description: "Ladrillo a la vista semiprensado tipo Córdoba de terminación pareja, aristas vivas y color uniforme. Ideal para fachadas, muros vistos, frentes y parrillas.", 
            brand: "Córdoba Seleccionado", 
            features: ["Por unidad o pallet enfardado", "Terminación pareja para pared a la vista", "Procedencia Córdoba", "Alta resistencia y estética"] 
        },
        { 
            id: "04060", 
            category: "ladrillos", 
            name: "Ladrillo Media Vista Mar del Plata", 
            image: "img/products/ladrillo-media-vista-mdp.webp", 
            description: "Ladrillo media vista tipo Mar del Plata de excelente cocción, dureza y tonalidad rojiza pareja para muros vistos, frentes y mampostería decorativa.", 
            brand: "Mar del Plata", 
            features: ["Por unidad o pallet", "Terminación media vista", "Procedencia Mar del Plata", "Alta resistencia a la intemperie"] 
        },
        { 
            id: "04410", 
            category: "ladrillos", 
            name: "Ladrillo de Telgopor para Losa 10 x 42 x 100 cm", 
            image: "img/products/ladrillo-telgopor-10.webp", 
            images: ["img/products/ladrillo-telgopor-10.webp", "img/products/ladrillo-telgopor-perfil.webp"],
            description: "Bloque de poliestireno expandido (telgopor EPS) de 10 cm de espesor para losas con viguetas pretensadas. Alivia el peso de la estructura y brinda máxima aislación termoacústica.", 
            brand: "EPS / Isopor", 
            features: ["Medidas: 10 cm alto x 42 cm ancho x 1 mt largo", "Aislación térmica y acústica", "Liviano (reduce peso de losa)", "Para viguetas pretensadas"] 
        },
        { 
            id: "04412", 
            category: "ladrillos", 
            name: "Ladrillo de Telgopor para Losa 12 x 42 x 100 cm", 
            image: "img/products/ladrillo-telgopor-12.webp", 
            images: ["img/products/ladrillo-telgopor-12.webp", "img/products/ladrillo-telgopor-perfil.webp"],
            description: "Bloque de poliestireno expandido (telgopor EPS) de 12 cm de espesor para losas con viguetas pretensadas de mayor luz o aislación. Reduce costos y tiempos de obra.", 
            brand: "EPS / Isopor", 
            features: ["Medidas: 12 cm alto x 42 cm ancho x 1 mt largo", "Aislación térmica y acústica superior", "Ultra liviano y resistente al pisado", "Para viguetas pretensadas"] 
        },
        { 
            id: "04500", 
            category: "ladrillos", 
            name: "Teja Francesa Cerámica Losa Olavarría", 
            image: "img/products/teja-francesa-losa-olavarria.webp", 
            images: [
                "img/products/teja-francesa-losa-olavarria.webp", 
                "img/products/teja-francesa-losa-olavarria-dorso.webp", 
                "img/products/teja-francesa-losa-olavarria-pila.webp"
            ],
            description: "Teja francesa de cerámica natural prensada y cocida a alta temperatura por Losa Olavarría. Diseño tradicional de encastre perfecto para techos y cubiertas inclinadas de máxima durabilidad e impermeabilidad.", 
            brand: "Losa Olavarría", 
            features: ["Rendimiento: ~14.5 tejas por m²", "Fabricación tradicional Losa Olavarría", "Excelente encastre y resistencia al granizo", "Color terracota natural"] 
        },
        { 
            id: "04600", 
            category: "ladrillos", 
            name: "Vigueta Pretensada de Hormigón T-11", 
            image: "img/products/vigueta-pretensada.webp", 
            images: [
                "img/products/vigueta-pretensada.webp", 
                "img/products/vigueta-pretensada-obra.webp"
            ],
            description: "Vigueta pretensada de hormigón de alta resistencia con perfil T invertido para armado de losas y entrepisos alivianados con bovedillas de telgopor o cerámicas.", 
            brand: "Tensolite / Shap", 
            variants: ["1.00 m", "1.20 m", "1.40 m", "1.60 m", "1.80 m", "2.00 m", "2.20 m", "2.40 m", "2.60 m", "2.80 m", "3.00 m", "3.20 m", "3.40 m", "3.60 m", "3.80 m", "4.00 m", "4.20 m", "4.40 m", "4.60 m", "4.80 m", "5.00 m", "5.20 m", "5.40 m", "5.60 m", "5.80 m", "6.00 m", "6.20 m", "6.40 m"],
            features: [
                "Medidas disponibles: desde 1.00 m hasta 6.40 m (cada 20 cm)", 
                "Hormigón pretensado de alta resistencia", 
                "Apto losas con ladrillo hueco o telgopor EPS", 
                "Certificación y control de calidad IRAM"
            ] 
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
            name: "Bloque de Hormigón 13x20x40", 
            image: "img/products/bloque-hormigon-12.webp", 
            description: "Bloque de hormigón vibrado de 13 cm de espesor para tabiques, cerramientos y muros perimetrales.", 
            brand: "Vibrado Standard", 
            features: ["Medida 13x20x40 cm", "12.5 u/m²", "Excelente solidez"] 
        },
        { 
            id: "06020", 
            category: "ladrillos", 
            name: "Bloque de Hormigón 20x20x40", 
            image: "img/products/bloque-hormigon-20.webp", 
            description: "Bloque de hormigón estructural estándar de 20 cm para muros portantes y de contención.", 
            brand: "Vibrado Standard", 
            features: ["Medida 20x20x40 cm", "12.5 u/m²", "Apto armado con hierros"] 
        },
        { 
            id: "06025", 
            category: "ladrillos", 
            name: "Bloque Símil Piedra 20x20x40", 
            image: "img/products/bloque-hormigon-split.webp", 
            description: "Bloque de hormigón con terminación rústica símil piedra split de 20 cm para muros a la vista decorativos sin revoque.", 
            brand: "Vibrado Símil Piedra", 
            features: ["Medida 20x20x40 cm", "Terminación rústica símil piedra", "No requiere revoque", "Muros vistos y frentes"] 
        },
        { 
            id: "06026", 
            category: "ladrillos", 
            name: "Bloque Símil Piedra 13x20x40", 
            image: "img/products/bloque-hormigon-split.webp", 
            description: "Bloque de hormigón con terminación rústica símil piedra split de 13 cm de espesor para tabiques y medianeras a la vista.", 
            brand: "Vibrado Símil Piedra", 
            features: ["Medida 13x20x40 cm", "Terminación rústica símil piedra", "Ideal muros vistos y frentes", "Rendimiento 12.5 u/m²"] 
        },

        // HIERROS Y ACERO
        { 
            id: "09001", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 (Barras 12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barras de acero nervuradas ADN 420 de dureza natural para estructuras de hormigón armado, losas, columnas, vigas y bases.", 
            brand: "Acindar / Acerbrag", 
            variants: ["Ø 6 mm", "Ø 8 mm", "Ø 10 mm", "Ø 12 mm", "Ø 16 mm", "Ø 20 mm", "Ø 25 mm"],
            features: ["Largo estándar: 12 metros", "Norma IRAM-IAS U 500-06", "Diámetros disponibles: 6, 8, 10, 12, 16, 20 y 25 mm", "Acero conformado de alta adherencia"] 
        },
        { 
            id: "09006", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - Ø 6 mm (12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barra de acero conformado de 6 mm de diámetro y 12 metros de largo. Ideal para estribos y armaduras secundarias.", 
            brand: "Acindar / Acerbrag", 
            features: ["Diámetro: 6 mm", "Largo: 12 metros", "Norma IRAM-IAS U 500-06"] 
        },
        { 
            id: "09008", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - Ø 8 mm (12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barra de acero conformado de 8 mm de diámetro y 12 metros de largo. Para armaduras de vigas, columnas y losas.", 
            brand: "Acindar / Acerbrag", 
            features: ["Diámetro: 8 mm", "Largo: 12 metros", "Norma IRAM-IAS U 500-06"] 
        },
        { 
            id: "09010", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - Ø 10 mm (12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barra de acero conformado de 10 mm de diámetro y 12 metros de largo para estructuras de hormigón armado.", 
            brand: "Acindar / Acerbrag", 
            features: ["Diámetro: 10 mm", "Largo: 12 metros", "Norma IRAM-IAS U 500-06"] 
        },
        { 
            id: "09012", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - Ø 12 mm (12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barra de acero conformado de 12 mm de diámetro y 12 metros de largo para vigas principales, bases y columnas.", 
            brand: "Acindar / Acerbrag", 
            features: ["Diámetro: 12 mm", "Largo: 12 metros", "Norma IRAM-IAS U 500-06"] 
        },
        { 
            id: "09016", 
            category: "hierros", 
            name: "Barra Hierro ADN 420 - Ø 16 mm (12 mt)", 
            image: "img/categories/cat-hierros.png", 
            description: "Barra de acero conformado de 16 mm de diámetro y 12 metros de largo para estructuras de alta carga.", 
            brand: "Acindar / Acerbrag", 
            features: ["Diámetro: 16 mm", "Largo: 12 metros", "Norma IRAM-IAS U 500-06"] 
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
        { 
            id: "09050", 
            category: "hierros", 
            name: "Alambre de Fardo Negro Recocido", 
            image: "img/categories/cat-hierros.png", 
            description: "Alambre negro recocido para ataduras de armaduras de hierro y encofrados.", 
            brand: "Acindar", 
            features: ["Por kilo o rollo", "Fácil maleabilidad", "Uso profesional en obra"] 
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
            image: "img/products/adhesivo-perfecto-porcellanato.webp", 
            description: "Mezcla adhesiva de alta performance formulada especialmente para la colocación de placas de porcellanato y piezas de baja absorción.", 
            brand: "Cementos Avellaneda", 
            features: ["Bolsa 30 kg", "Norma IRAM 45062 Tipo C2-L,F,H", "Especial Porcellanatos"] 
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
            name: "Weberpint Látex Exterior-Interior", 
            image: "img/products/weberpint-latex.jpg", 
            description: "Pintura látex acrílica mate de máxima cobertura, blancura superior y alta resistencia a la intemperie y lavados.", 
            brand: "Weber / Saint-Gobain", 
            variants: ["4 Litros", "10 Litros", "20 Litros"],
            features: ["Presentaciones: 4 L, 10 L y 20 L", "Exterior e Interior", "Excelente poder cubritivo y lavable", "Anti-hongos"] 
        },

        // REFRACTARIOS - BALDOSONES
        { 
            id: "15010", 
            category: "refractarios", 
            name: "Ladrillo Recto N°1 Sin Color 11x22x6 cm", 
            image: "img/products/ladrillo-recto-refractario.webp", 
            images: [
                "img/products/ladrillo-recto-refractario.webp", 
                "img/products/ladrillo-recto-refractario-medidas.jpg",
                "img/products/ladrillo-refractario-pila.webp"
            ],
            description: "Ladrillo refractario recto estándar N°1 sin color (11 x 22 x 6 cm) de alta resistencia térmica para la construcción y revestimiento de parrillas, hornos de barro, chimeneas, fogoneros y calderas.", 
            brand: "Fara / Refractarios", 
            features: [
                "Medidas: 11 cm ancho x 22 cm largo x 6 cm espesor", 
                "Modelo Recto N°1 Sin Color (Fara)", 
                "Soporta altas temperaturas y fuego directo continuo", 
                "Ideal para parrillas, hornos de barro y chimeneas"
            ] 
        },
        { 
            id: "15020", 
            category: "refractarios", 
            name: "Tejuela N°5 L.Color 22x11x2 cm", 
            image: "img/products/tejuela-refractaria-fara-5-color.webp", 
            images: [
                "img/products/tejuela-refractaria-fara-5-color.webp", 
                "img/products/tejuela-refractaria-fara-5-color-plana.webp"
            ],
            description: "Tejuela refractaria N°5 color flameado (22 x 11 x 2 cm) para revestimiento térmico y estético de parrillas, fogoneros y hogares a leña.", 
            brand: "Fara / Refractarios", 
            features: [
                "Medidas: 22 cm largo x 11 cm ancho x 2 cm espesor", 
                "Modelo Tejuela N°5 Color (Fara)", 
                "Terminación estética color flameado rojizo", 
                "Resistente al fuego directo y bajas pérdidas térmicas"
            ] 
        },
        { 
            id: "15030", 
            category: "refractarios", 
            name: "Listón N°9 L.Color 22x6x2 cm", 
            image: "img/products/liston-refractario-color.webp", 
            images: [
                "img/products/liston-refractario-color.webp", 
                "img/products/liston-refractario-color-pack.webp"
            ],
            description: "Listón refractario N°9 color flameado (22 x 6 x 2 cm) de diseño esbelto para colocación trabada o espina de pescado en pisos y paredes de parrillas.", 
            brand: "Fara / Refractarios", 
            features: [
                "Medidas: 22 cm largo x 6 cm ancho x 2 cm espesor", 
                "Modelo Listón N°9 Color (Fara)", 
                "Terminación color flameado", 
                "Apto colocación en pisos y paredes sometidos a calor"
            ] 
        },
        { 
            id: "15040", 
            category: "refractarios", 
            name: "Esquinero N°11 L.Color", 
            image: "img/products/esquinero-n11-refractario.webp", 
            images: [
                "img/products/esquinero-n11-refractario.webp", 
                "img/products/esquinero-n11-refractario-medidas.webp"
            ],
            description: "Esquinero refractario curvo N°11 color flameado (220 x 110 x 60 mm, espesor 25 mm) para remates curvos y terminaciones prolijas en bordes de parrillas y hogares.", 
            brand: "Fara / Refractarios", 
            features: [
                "Medidas: 220 mm largo x 110 mm alto x 60 mm ancho (espesor 25 mm)", 
                "Modelo Esquinero Curvo N°11 Color (Fara)", 
                "Terminación estética color flameado", 
                "Borde curvo suave para cantoneras y bocas de parrilla", 
                "Resistente a calor directo continuo"
            ] 
        },
        { 
            id: "15050", 
            category: "refractarios", 
            name: "1/2 Esquinero N°14 L.Color", 
            image: "img/products/medio-esquinero-n14-refractario.webp", 
            images: [
                "img/products/medio-esquinero-n14-refractario.webp", 
                "img/products/medio-esquinero-n14-refractario-medidas.jpg"
            ],
            description: "Medio esquinero refractario curvo N°14 color flameado con solapa (150 x 60 x 60 mm) para terminaciones y aristas precisas en parrillas.", 
            brand: "Fara / Refractarios", 
            features: [
                "Medidas: 150 mm largo x 60 mm alto x 60 mm ancho (solapa 35/25 mm)", 
                "Modelo 1/2 Esquinero Curvo N°14 Color (Fara)", 
                "Terminación color flameado", 
                "Excelente terminación en aristas y esquinas", 
                "Apto altas temperaturas y fuego directo"
            ] 
        },
        { 
            id: "15060", 
            category: "refractarios", 
            name: "Arcilla Refractaria Fara", 
            image: "img/products/arcilla-refractaria-fara.webp", 
            images: [
                "img/products/arcilla-refractaria-fara.webp"
            ],
            description: "Tierra / arcilla refractaria en polvo Fara de máxima pureza para preparar morteros y mezclas de asiento resistentes al fuego directo y altas temperaturas.", 
            brand: "Fara / Refractarios", 
            variants: ["Bolsa 30 kg", "Por Kilo (1 kg)"],
            features: [
                "Presentaciones: Bolsa cerrada de 30 kg o Fraccionado por Kilo", 
                "Polvo ligante refractario para morteros de alta temperatura", 
                "Resistente al fuego directo continuo", 
                "Indispensable para asentar tejuelas y ladrillos refractarios"
            ] 
        }

    ]
};
