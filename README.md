# Materiales Chilavert — Catálogo Digital y Calculadora Profesional de Materiales

Sitio web comercial y catálogo digital para **Materiales Chilavert**, desarrollado con **HTML5, CSS3 nativo y JavaScript Vanilla**.

## 🚀 Características Principales

1. **Catálogo Digital de Materiales:**
   * Organizado por rubros (Cementos, Áridos, Ladrillos y Bloques, Hierros ADN 420, Adhesivos, Pastinas, Hidrófugos y Pinturas).
   * Enfoque comercial orientado a consultas directas por WhatsApp.
   * Sin precios visibles ni pasarelas de pago de e-commerce genéricas.

2. **Calculadora Profesional de Materiales:**
   * Motor de cálculo matemático independiente (`js/calculator-engine.js`).
   * Cómputo de mamposterías (con deducción automática de aberturas), contrapisos, carpetas, revoques, pisos, pintura, hormigón y despiece de armaduras.
   * Memoria de cálculo paso a paso transparente ("Ver Cálculo").
   * Presupuesto maestro consolidado con exportación a CSV, formato de impresión PDF y solicitud de cotización por WhatsApp.

3. **Carrusel Vertical Cíclico en el Hero:**
   * Transición vertical suave ascendente en bucle infinito continuo.
   * Configurable desde `js/config.js`.

4. **Configuración Centralizada:**
   * Datos de contacto, redes sociales y teléfonos configurables desde `js/config.js`.

## 📁 Estructura del Proyecto

```
materiales-chilavert/
├── index.html              # Página de Inicio con Hero Slider y acceso a Calculadora
├── productos.html          # Catálogo general con búsqueda y filtros por categoría
├── producto-detalle.html   # Ficha técnica individual de producto
├── calculadora.html        # Calculadora Profesional de Materiales y Presupuestador
├── nosotros.html           # Información institucional de la empresa
├── obras.html              # Portafolio de proyectos
├── contacto.html           # Formulario de contacto y mapa
├── css/
│   ├── variables.css       # Paleta de colores (Rojo institucional / Carbón / Neutros)
│   ├── style.css           # Estilos globales y componentes
│   └── calculator.css      # Estilos específicos de la calculadora y presupuesto
├── js/
│   ├── config.js           # Configuración comercial y diapositivas del hero
│   ├── data.js             # Base de datos técnica de materiales y dosificaciones
│   ├── calculator-engine.js # Motor matemático de cálculo
│   ├── calculator-ui.js    # Controlador de interfaz de la calculadora
│   ├── catalog.js          # Lógica de filtrado y búsqueda del catálogo
│   └── main.js             # Lógica global, carrusel y menú móvil
└── img/                    # Fotografías e imágenes optimizadas en alta resolución
```

## 🛠️ Ejecución Local

Para visualizar el proyecto localmente sin necesidad de instalar dependencias:

```bash
# Con Python
python -m http.server 3000
```

Abrir `http://localhost:3000` en tu navegador.
