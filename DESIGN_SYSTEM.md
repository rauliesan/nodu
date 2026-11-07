# Nodu — Sistema de Diseño e Identidad Visual (DESIGN_SYSTEM)

> **Documento vivo de diseño e identidad** | Versión: 0.3.0 (Fase 3 — Design System)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Exploración de las Tres Direcciones Visuales

Para dotar a **Nodu** de una identidad propia que no sea un clon genérico ni una plantilla SaaS predecible, se han analizado y conceptualizado tres caminos visuales:

### Dirección 1: Lúdica y Colorida (Cartoon / Casual)
- **Concepto:** Estilo fuertemente inspirado en Duolingo y juegos móviles hiper-casuales. Botones 3D con efecto de pulsación profunda (*isometric extruded buttons*), bordes redondeados masivos ($r=24px$), paleta ultra-saturada y mascota tipo animal animado (ej. un pulpo o un búho cibernético).
- **Ventajas:** Máxima simpatía inicial, muy accesible para niños y principiantes absolutos.
- **Inconvenientes:** Tiende a infantilizar la programación. Desarrolladores intermedios o profesionales que quieren aprender Rust, SQL o Python sienten que están usando un "juego de niños" y cuestionan el rigor técnico del contenido.

### Dirección 2: Editorial y Minimalista con Elementos Gamificados (Swiss Tech)
- **Concepto:** Tipografía monoespaciada refinada combinada con serifa editorial moderna (estilo Linear/Craft/ReadCV). Fondos de alto contraste, monocromático con un solo color de acento, bordes nítidos ($r=4px$), micro-gráficos vectoriales sutiles y diagramación rigurosa de cuadrícula.
- **Ventajas:** Extremadamente sofisticado, elegante, transmite calidad profesional y madurez.
- **Inconvenientes:** Frío y sobrio. Pierde el carácter adictivo, cálido y gratificante que hace que un usuario regrese todos los días a completar su racha de 5 minutos.

### Dirección 3 (Recomendada): Tecnológica, Dinámica y Neobrutalista Refinada ("Neo-Terminal Friendly")
- **Concepto:** Una fusión magistral entre **la calidez lúdica de los productos de hábito** y **la estética de la cultura del código y terminal moderna**.
  - Superficies limpias con elevación sutil mediante sombras sólidas suaves (*soft neobrutalism*: bordes de 1.5px, sombras sólidas de 3px con desplazamiento horizontal y vertical).
  - Colores vibrantes y energéticos pero con fundamento funcional (paleta *Dark Modern* y *Light Crisp* de alta legibilidad).
  - Tipografía sans-serif geométrica para la interfaz combinada con una tipografía monoespaciada premium para el código.
  - El "Nodo" de aprendizaje como concepto iconográfico central: conexiones de circuitos, conectores vivos y estados táctiles claros.
  - **Mascota / Elemento de Identidad:** **"Byte" / "Nodu"**: No es un animal infantilizado, sino un pequeño nodo inteligente de energía/código con expresiones mínimas dinámicas (parpadeo de ojos terminal `[o_o]`, `[^_^]`, `[x_x]`), sirviendo como guía amigable y asistente de depuración sin ser intrusivo.

> **Veredicto del equipo:** Adoptamos la **Dirección 3 (Neo-Terminal Friendly)** porque equilibra a la perfección el rigor técnico que exige un entorno de código con la diversión táctil y la gratificación inmediata de la gamificación moderna.

---

## 2. Tokens del Sistema Visual

### A. Paleta de Colores de la Marca y Estados

```css
/* Tokens Globales de Color */
:root {
  /* Marca Primaria (Turquesa Eléctrico / Cyan Tech) */
  --nodu-primary-50:  #e6fffa;
  --nodu-primary-100: #b2f5ea;
  --nodu-primary-400: #38b2ac;
  --nodu-primary-500: #00b4d8; /* Color de marca principal */
  --nodu-primary-600: #0096c7;
  --nodu-primary-700: #03045e;

  /* Gamificación & Recompensas */
  --nodu-xp-gold:      #ffb703; /* Estrellas, XP, Niveles */
  --nodu-streak-fire:  #fb8500; /* Racha de días */
  --nodu-gem-ruby:     #e63946; /* Gemas / Créditos de práctica */

  /* Estados de Interacción */
  --nodu-success:      #10b981; /* Respuesta correcta (Esmeralda vivo) */
  --nodu-success-bg:   #d1fae5;
  --nodu-error:        #ef4444; /* Error / Corrección pedagógica */
  --nodu-error-bg:     #fee2e2;
  --nodu-warning:      #f59e0b;
  --nodu-info:         #3b82f6;

  /* Superficies y Neutros (Tema Claro) */
  --bg-app:            #f8fafc;
  --bg-surface:        #ffffff;
  --bg-subtle:         #f1f5f9;
  --border-subtle:     #e2e8f0;
  --border-strong:     #0f172a;
  --text-main:         #0f172a;
  --text-muted:        #64748b;

  /* Superficies y Neutros (Tema Oscuro / Dark Mode) */
  --bg-app-dark:        #0b0f19;
  --bg-surface-dark:    #111827;
  --bg-subtle-dark:     #1f2937;
  --border-subtle-dark: #374151;
  --border-strong-dark: #60a5fa;
  --text-main-dark:     #f9fafb;
  --text-muted-dark:    #9ca3af;
}
```

### B. Paleta Semántica por Lenguaje de Programación
Cada lenguaje tiene su color de acento consistente en toda la plataforma (tarjetas, nodos del camino, etiquetas y resaltado de sintaxis):

| Lenguaje / Tecnología | Token CSS | Color Hex | Propósito Visual |
| :--- | :--- | :--- | :--- |
| **Python** | `--lang-python` | `#3776AB` / `#FFD438` | Azul oscuro y dorado serpenteante |
| **JavaScript** | `--lang-javascript`| `#F7DF1E` | Amarillo eléctrico sobre negro |
| **TypeScript** | `--lang-typescript`| `#3178C6` | Azul zafiro nítido |
| **SQL** | `--lang-sql` | `#E38C00` | Naranja ámbar relacional |
| **HTML / CSS** | `--lang-web` | `#E34F26` / `#264DE4` | Coral y azul ultramar |
| **Rust** | `--lang-rust` | `#CE412B` | Óxido metálico profundo |
| **Git / Terminal** | `--lang-terminal` | `#4EAA25` | Verde fósforo de terminal |

### C. Tipografía y Escalas

- **Tipografía de Interfaz (UI):** `Inter` o `Plus Jakarta Sans` (Sans-serif moderna, geométrica, de altísima legibilidad en pantallas pequeñas y caracteres especiales).
- **Tipografía de Código (Code & Tokens):** `JetBrains Mono` o `Fira Code` (Monoespaciada con soporte para ligaduras de programación, diferenciación clara entre `0` y `O`, `1` y `l`).

**Escala Tipográfica Armónica (Ratio 1.25 — Major Third):**
- `Display` ($32px / 2rem$, bold): Celebraciones de finalización, grandes cifras de XP.
- `Heading 1` ($24px / 1.5rem$, bold): Título de pantalla, cabeceras de curso.
- `Heading 2` ($20px / 1.25rem$, semibold): Título de unidad, subtítulos principales.
- `Heading 3` ($16px / 1rem$, semibold): Título de lección, enunciados de ejercicio.
- `Body Large` ($16px / 1rem$, regular): Explicaciones teóricas y párrafos.
- `Body Default` ($14px / 0.875rem$, regular): Textos secundarios, opciones de respuesta.
- `Caption / Badge` ($12px / 0.75rem$, medium): Metadatos, etiquetas de dificultad, chips de XP.
- `Code Text` ($14px / 0.875rem$, monoespaciada): Bloques de código interactivos y terminal.

### D. Radios, Sombras y Profundidad

- **Radios de Borde:**
  - Micro (`$radius-sm: 6px`): Chips, etiquetas, atajos de sintaxis.
  - Estándar (`$radius-md: 12px`): Tarjetas de ejercicio, bloques de código, opciones de respuesta.
  - Contenedor (`$radius-lg: 20px`): Tarjetas de curso, modales inferiores (*bottom-sheets*).
  - Círculo (`$radius-full: 9999px`): Botones de nodo de lección, avatares, chips de racha.
- **Elevación y Sombras (Efecto Táctil 3D Suave):**
  - Los botones interactivos utilizan una sombra de desplazamiento sólido inferior de 3px (`box-shadow: 0 4px 0 var(--border-shade)`), que se aplana al hacer clic (`transform: translateY(2px); box-shadow: 0 2px 0 ...`). Esto proporciona una respuesta física extraordinariamente satisfactoria al tocar la pantalla.

---

## 3. Catálogo de Componentes Reutilizables

El sistema de componentes se define para ser 100% reutilizable en cualquier tecnología o curso:

### 1. Botones y Controles
- **`PrimaryButton`:** Botón principal de ancho completo en móvil con efecto 3D de pulsación. Estados: `default`, `hover`, `active`, `disabled`, `loading`.
- **`SecondaryButton`:** Botón con borde nítido y fondo transparente o sutil para acciones secundarias ("Saltar", "Ver pista").
- **`SyntaxKeyPill`:** Tecla táctil redondeada para caracteres rápidos de programación (`:`, `()`, `""`, `indent`) que se insertan en la posición del cursor.
- **`BottomNavIcons`:** Iconografía vectorial propia de trazo geométrico y semántica técnica:
  - *Aprender:* Circuito ramificado de nodos (`Node Tree`).
  - *Explorar:* Ventana interactiva de terminal de comandos (`Prompt Terminal`).
  - *Retos:* Trofeo de maestría y compilación limpia (`Mastery Trophy`).
  - *Perfil:* Desarrollador con máscara/cabeza terminal con ojos de código (`Dev Avatar Byte`).

### 2. Estructura y Navegación
- **`LessonNode`:** El componente insignia de Nodu. Círculo táctil ($64 \times 64px$) que representa una lección en el camino vertical.
  - *Estado Completado:* Color de tecnología, icono de check/estrella dorada.
  - *Estado Activo:* Animación de pulso concéntrico sutil, anillo de progreso alrededor del nodo.
  - *Estado Bloqueado:* Fondo gris neutro, candado monocromático con opacidad del 60%.
- **`LearningPath`:** Contenedor de ruta serpenteante que une los `LessonNode` mediante líneas curvas conectadas (estilo cable o pista de circuito).
- **`UnitCardHeader`:** Encabezado de sección que agrupa varios nodos bajo una temática común (ej. "Unidad 1: Variables y Tipos de Datos").
- **`CourseCard`:** Tarjeta del catálogo con banner tecnológico, nivel de dificultad, progreso porcentual y botón de acción.

### 3. Gamificación y Métricas
- **`StreakIndicator`:** Píldora compacta con icono vectorial de llama de hábito estilizada (`Flame Icon`), contador de días en fuente monoespaciada y estado de protección.
- **`XPBadge`:** Indicador dorado con icono vectorial de relámpago de energía (`Lightning Bolt`) con animación de incremento numérico fluido al ganar puntos.
- **`GemBadge`:** Píldora de rubí/esmeralda con icono vectorial de diamante facetado geométrico (`Faceted Gem`) para el balance de créditos de proyectos.
- **`ProgressBar`:** Barra horizontal con esquinas redondeadas, indicador de progreso relleno y brillo sutil animado.
- **`AchievementBadge`:** Medalla poligonal con icono vectorial representativo, estado de bloqueo o fecha de obtención.

### 4. Motor de Ejercicios
- **`ExerciseCard`:** Marco unificado con enunciado, etiqueta de tipo de ejercicio e indicador de pistas disponibles.
- **`AnswerOption`:** Opción de selección múltiple con borde reforzado, estado seleccionado con acento de color y tecla rápida de teclado (`1`, `2`, `3`, `4`).
- **`ParsonsBlock`:** Ficha de línea de código arrastrable o seleccionable con un toque (*tap-to-place*), con indentación visual guiada.
- **`CodeEditorLite`:** Contenedor de código con numeración de líneas, resaltado de sintaxis sintético y zona de inserción de tokens.
- **`FeedbackPanel`:** Hoja emergente inferior fija (*slide-up sheet*) que muestra el resultado de la comprobación:
  - *Modo Correcto:* Fondo esmeralda claro, mensaje de felicitación dinámico, botón "Continuar".
  - *Modo Error:* Fondo coral/ámbar, diagnóstico claro del problema, explicación pedagógica y botón "Entendido / Reintentar".

---

## 4. Animaciones, Transiciones y Audio Háptico

- **Micro-interacciones:**
  - Pulsación de nodos y botones: escala `0.96` al tacto con transición `spring` (duración $150ms$).
  - Nodos activos: halo de pulso suave (`@keyframes nodu-pulse`) con opacidad fluctuante de $0.4$ a $0.8$.
  - Barra de progreso: interpolación suave con curva `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Celebraciones (Confeti sutil):**
  - Al completar una lección o evaluación de hito, micro-partículas de código flotante (símbolos `{ }`, `< >`, `*`, `+`, `1`, `0`) estallan de forma elegante sin sobrecargar el procesador del dispositivo.
- **Feedback Sonoro / Háptico (Opcional y Desactivable):**
  - Toque correcto: acorde musical ascendente corto y suave ($440Hz \rightarrow 880Hz$, sintetizado vía Web Audio API sin necesidad de descargar archivos de audio externos pesados).
  - Toque de error: tono apagado no estridente ($220Hz$, envolvente suave).
  - Cumple estrictamente con directrices de accesibilidad (botón de mute global y respeto a `prefers-reduced-motion`).
