# Nodu — Visión, Objetivos y Definición de Producto

> **Documento vivo de producto** | Versión: 0.1.0 (Fase 1 — Definición Inicial)  
> **Estado:** Pendiente de Aprobación

---

## 1. Visión y Concepto del Producto

**Nodu** es una plataforma gamificada de aprendizaje de programación orientada a la práctica diaria, estructurada en micro-sesiones interactivas (3 a 7 minutos) y diseñada con un enfoque **Local-First**, privado y 100% offline.

Nace para resolver la brecha crítica del aprendizaje técnico:
- Las plataformas tradicionales (cursos en vídeo, documentación densa) generan **sobrecarga cognitiva y abandono prematuro**.
- Las aplicaciones gamificadas existentes (Mimo, Sololearn) pecan de **frivolidad técnica**: exceso de trivial tipo test, correcciones por coincidencia de cadenas frágiles, y poca o nula sensación de estar construyendo software real.

El concepto de Nodu combina la **fricción cero y el bucle de hábito de Duolingo** con la **rigurosidad técnica y ejecución aislada de código en cliente** (WebAssembly / Web Workers), todo en una interfaz moderna con identidad propia.

---

## 2. Propuesta de Valor

> *"Aprende a programar desde cero o consolida nuevos lenguajes en sesiones de 5 minutos al día, ejecutando código real directamente en tu dispositivo, sin registros forzados y con progreso 100% tuyo."*

### Pilares Fundamentales:
1. **Local-First & Privacidad Absoluta:** Tus datos, progreso, código y certificados viven en tu dispositivo (IndexedDB). No requiere login ni conexión a internet tras la carga inicial.
2. **Ejecución Real en Cliente:** Nada de simulaciones frágiles. El código se ejecuta de forma segura en un entorno aislado (WASM / Web Workers).
3. **Micro-aprendizaje estructurado:** Curva de dificultad milimétricamente calibrada en nodos progresivos (conceptos atómicos -> retos guiados -> mini-proyectos integradores).
4. **Gamificación respetuosa:** Mecánicas de retención (XP, rachas, hitos de maestría) enfocadas en la constancia y motivación intrínseca, **sin dark patterns** (sin penalizaciones frustrantes ni corazones que impidan seguir aprendiendo).

---

## 3. Público Objetivo (Buyer Personas)

| Perfil | Descripción | Necesidad / Dolor | Qué le ofrece Nodu |
| :--- | :--- | :--- | :--- |
| **P1: Principiante Curioso (16-30 años)** | Quiere aprender a programar pero se siente intimidado por IDEs complejos, terminales y cursos de 40 horas. | Frustración temprana al configurar entornos; falta de tiempo sostenido. | Entorno amigable, interactivo, accesible en sesiones cortas con feedback instantáneo. |
| **P2: Estudiante / Switcher de Carrera** | Está estudiando informática o preparándose para un bootcamp y necesita asentar fundamentos de sintaxis y lógica. | Le cuesta interiorizar patrones y retener sintaxis sin repetición espaciada. | Práctica deliberada, ordenación mental de conceptos, proyectos de consolidación. |
| **P3: Desarrollador Políglota** | Ya programa en un lenguaje (ej. JS) y quiere aprender Python, Rust o Go de manera rápida y sin rodeos teóricos. | La teoría básica de programación le aburre; busca dominar modismos y sintaxis ágilmente. | Test de nivel/atajos para desbloquear unidades y enfoque directo en la sintaxis y ejercicios. |

---

## 4. Análisis Competitivo: Qué funciona, qué falla y Oportunidad para Nodu

| Plataforma | Puntos Fuertes (A imitar con criterio) | Puntos Débiles (A evitar) | Oportunidad para Nodu |
| :--- | :--- | :--- | :--- |
| **Duolingo** | Bucle de retención magistral, mapa de progresión claro, feedback sensorial inmediato, micro-lecciones. | Sistema de vidas/corazones punitivo, repetición mecánica sin contexto profundo, infantilización excesiva. | Adoptar el mapa visual de nodos y el ritmo de micro-sesiones, pero con **vidas ilimitadas para aprender de los errores**. |
| **Mimo / Sololearn** | Portabilidad móvil, interfaces atractivas para programar con bloques. | Ejercicios tipo test triviales (adivinar palabras), backend lento, paywalls agresivos, nula privacidad local. | Ejecución client-side ultra rápida (WASM), ejercicios de lógica real y arquitectura offline-first. |
| **Brilliant** | Principios interactivos de primer orden, visualización de algoritmos y estados. | Curva de dificultad a veces abrupta, suscripción muy costosa, no enfocada a la sintaxis práctica de lenguajes. | Combinar el rigor conceptual de Brilliant con la cadencia y accesibilidad de Duolingo. |
| **freeCodeCamp** | Contenido práctico, proyectos reales, filosofía abierta. | Pobre experiencia móvil, interfaz árida, bloques de texto excesivamente largos que invitan al abandono. | Fragmentar el rigor práctico en micro-bloques digeribles con UX de nivel consumidor móvil/web. |

---

## 5. Modelo de Aprendizaje (Pedagogía Nodu)

Nodu se fundamenta en tres pilares pedagógicos de ciencia cognitiva:

```
[ Concepto Atómico ]  -->  [ Andamiaje Guiado ]  -->  [ Práctica Deliberada ]  -->  [ Mini-Proyecto ]
 (Explicación <=30s)        (Arrastrar / Completar)       (Predecir / Corregir)        (Sintetizar sin red)
```

1. **Teoría Atómica (Chunking):** Cada lección aborda un único concepto o regla sintáctica explicada en un máximo de 2-3 párrafos interactivos antes del primer ejercicio.
2. **Andamiaje Progresivo (Scaffolding):**
   - *Fase 1 (Reconocimiento):* Selección múltiple conceptual, predecir la salida de un código corto.
   - *Fase 2 (Reconstrucción):* Ordenar líneas de código (bloques Parson), rellenar huecos clave.
   - *Fase 3 (Corrección y Escritura):* Encontrar el bug sintáctico o lógico, escribir la expresión que falta.
3. **Repetición Espaciada y Nodos de Consolidación:** Al final de cada nivel o unidad, una "Evaluación de Hito" combina conceptos aprendidos sin dar pistas previas.
4. **Proyecto Práctico de Unidad:** Un reto realista (ej. un conversor de unidades, un parser simple de texto o un generador de contraseñas) donde el usuario une las piezas trabajadas en la unidad.

---

## 6. Funcionalidades Principales (Alcance MVP / Base)

### Esenciales para el Core de Nodu:
- **Motor de Cursos Declarativo:** Cursos cargados vía esquemas JSON/TypeScript fuertemente tipados.
- **10 Modos de Ejercicio Interactivos:**
  1. Opción múltiple conceptual.
  2. Verdadero / Falso con justificación.
  3. Rellenar huecos (Fill-in-the-blank con sugerencias o teclado).
  4. Ordenar instrucciones (Parsons problems).
  5. Identificar el bug (Spot the error).
  6. Predicción de salida (`¿Qué imprimirá este código?`).
  7. Relacionar conceptos (Pares clave-valor / término-definición).
  8. Escritura de código guiada.
  9. Corrección activa de código en editor ligero.
  10. Reto algorítmico o de lógica aplicado.
- **Ejecución Local Segura:**
  - Evaluador de AST / Regex / Lógica para pruebas rápidas.
  - Runtime WebAssembly en Web Worker para ejecución de código real (Python vía Pyodide/MicroPython, JS nativo).
- **Gamificación Local:**
  - Puntos de Experiencia (XP) calculados por esfuerzo y consistencia.
  - Rachas diarias con control de zona horaria local y congelador de racha (Streak Freeze adquirible con gemas/XP).
  - Sistema de Niveles y Rangos (Novato, Aprendiz, Desarrollador, Arquitecto).
  - Árbol de Logros e Insignias desbloqueables.
- **Certificados Locales en PDF:** Generación en el cliente mediante `jsPDF` con firma de verificación única (hash criptográfico local SHA-256 de los datos de progreso).
- **Gestor de Datos Local-First:** Almacenamiento Dexie.js (IndexedDB), backup JSON descargable e importable sin pérdida de datos.

---

## 7. Propuesta de Navegación Inicial

Estructura de navegación global de 4 secciones (Bottom Navigation Bar en móvil, Sidebar colapsable en escritorio):

1. **Aprender (Home):**
   - Selector del curso activo en la barra superior.
   - El **Mapa de Ruta** (Learning Path) estilizado en nodos verticales: unidades temáticas, niveles desbloqueables, hitos evaluativos y proyecto de fin de unidad.
   - Indicador flotante superior: Racha activa, Gemas/Créditos, XP acumulado.
2. **Explorar (Cursos):**
   - Catálogo de tecnologías y lenguajes disponibles (Python, JavaScript, SQL, HTML/CSS, etc.).
   - Tarjetas de curso con progreso relativo, nivel estimado y botón "Instalar / Activar".
3. **Logros & Desafíos:**
   - Panel de actividad semanal/mensual (gráfico de constancia).
   - Vitrina de insignias y medallas obtenidas y por desbloquear.
   - Retos diarios ("Completa 2 lecciones hoy", "Obtén 50 XP").
4. **Perfil & Ajustes:**
   - Avatar y estadísticas vitales (total XP, días en racha, lecciones completadas).
   - Mis Certificados emitidos (con botón para previsualizar y descargar PDF).
   - Ajustes: tema (oscuro/claro/contrastado), recordatorios, gestión de almacenamiento local, Exportar/Importar Backup.

---

## 8. Posibles Vías de Monetización Futura (Diseño Sostenible)

Aunque la arquitectura inicial es 100% libre, local y sin paywalls bloqueantes, el diseño contempla modelos sostenibles no invasivos:
- **Nodu Pro (Suscripción o Compra Única "Pay Once"):**
  - Cursos avanzados premium o tracks de especialización.
  - Certificados con plantillas de diseño premium y exportación en alta resolución vectorial.
  - Análisis detallado de debilidades de aprendizaje (Smart Review).
- **Paquetes de Cursos Adicionales (Marketplace de Contenidos):**
  - Posibilidad de descargar cursos de la comunidad o de creadores mediante importación de paquetes `.nodu`.
- **Modo Educativo / Empresas:**
  - Exportación de métricas para profesores o academias.

---

## 9. Riesgos Identificados y Decisiones Pendientes

1. **Riesgo de Rendimiento en Motores WASM (Ej. Pyodide):**
   - *Problema:* Pyodide pesa varios megabytes (~15MB gzipped) y puede tardar en cargar en conexiones lentas.
   - *Mitigación:* Para lecciones iniciales de sintaxis, utilizar evaluación estática (AST / comprobación semántica). Reservar el motor WASM completo para la unidad de ejecución real y cargarlo perezosamente en segundo plano (Web Worker con caché persistente de Service Worker).
2. **Experiencia de Teclado y Escritura de Código en Pantallas Táctiles:**
   - *Problema:* Escribir código en móviles (`{`, `}`, `[`, `]`, indentación) suele ser una experiencia frustrante.
   - *Mitigación:* Priorizar en móvil bloques de código "tap-to-insert", barras de herramientas con caracteres especiales y autocompletado inteligente adaptativo.
3. **Mecánica de Vidas / Errores:**
   - *Decisión:* Descartar activamente el sistema de "5 vidas y tienes que esperar 4 horas o pagar". En programación, cometer errores y depurar es la esencia del aprendizaje. Se implementará un sistema de **"Intentos con pistas progresivas"**, donde errar reduce ligeramente el XP de bonificación de la lección, pero nunca bloquea la posibilidad de seguir aprendiendo.
