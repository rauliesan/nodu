# Nodu — Registro de Decisiones de Arquitectura y Producto (ADR)

| ID | Fecha | Decisión | Alternativas Descartadas | Justificación |
| :--- | :--- | :--- | :--- | :--- |
| **ADR-001** | 2026-11-07 | **Arquitectura Local-First con persistencia IndexedDB** | Backend centralizado con Supabase/Firebase o Auth obligatoria | Garantiza privacidad total, funcionamiento offline inmediato sin latencia, costo cero de infraestructura de servidor y fricción cero de onboarding para el alumno. |
| **ADR-002** | 2026-11-07 | **Modelo Pedagógico de Vidas Ilimitadas con bonificación por precisión** | Sistema de vidas/corazones de Duolingo (5 vidas y bloqueo temporal) | En programación el ensayo y error es fundamental. Bloquear al usuario por equivocarse en sintaxis destruye el aprendizaje y frustra al estudiante. Se incentiva la precisión reduciendo XP extra, no bloqueando. |
| **ADR-003** | 2026-11-07 | **Esquema de Cursos Declarativo (Data-Driven Engine)** | Código de lecciones embebido en componentes React individuales | Permite añadir decenas de cursos simplemente redactando archivos de datos validados por esquema (JSON/TypeScript/YAML) sin tocar la lógica de la UI. |
| **ADR-004** | 2026-11-07 | **Carga Progresiva del Runtime de Ejecución (WASM)** | Cargar Pyodide/Runtimes al abrir la aplicación | Evita tiempos de carga pesados al inicio. Para ejercicios sencillos se evalúa con analizadores estáticos y el worker WASM se precalienta en segundo plano. |
