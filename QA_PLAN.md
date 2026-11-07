# Nodu — Plan de Pruebas y Aseguramiento de Calidad (QA_PLAN)

> **Documento vivo de control de calidad** | Versión: 0.10.0 (Fase 10 — QA & Testing)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Matriz Integral de Testing

Para garantizar una experiencia sólida antes del empaquetado final, se definen los siguientes niveles de prueba:

### A. Pruebas Unitarias (Lógica Pura y Validadores)
- **Validadores de Ejercicios:** Cobertura del 100% en los 10 tipos de ejercicios (entradas correctas, respuestas incorrectas con espacios atípicos, mayúsculas/minúsculas y arrays desordenados).
- **Cálculo de Gamificación:** Verificación determinista de sumas de XP, bonos de racha de 7 días consecutivos y consumo correcto de *Streak Freeze*.
- **Generador de Hash SHA-256 para Certificados:** Garantizar que los mismos datos produzcan siempre el mismo hash local de integridad.

### B. Pruebas de Integración y Persistencia (Local-First)
- **Operaciones Dexie.js (IndexedDB):** Guardado, recuperación, actualización atómica y prevención de condiciones de carrera (*race conditions*).
- **Exportación e Importación de Respaldo:** Ciclo completo: Exportar BD a JSON $\rightarrow$ Limpiar almacenamiento $\rightarrow$ Importar JSON $\rightarrow$ Verificar que el $100\%$ del progreso e insignias sigan intactos.

### C. Pruebas de Rendimiento y Offline
- **Auditoría Lighthouse PWA:**
  - Rendimiento: $\ge 95/100$.
  - Accesibilidad (WCAG 2.1 AA): $\ge 98/100$ (contraste de colores, etiquetas aria, navegación por teclado).
  - PWA: Registro correcto de Service Worker y funcionamiento en modo avión (sin conexión).
- **Uso de Memoria:** Comprobación de que la ejecución en Web Worker de Pyodide/JS libere la memoria tras cerrar las lecciones.

### D. Prueba de Escalabilidad Multi-Curso
- Para validar la promesa arquitectónica de que **añadir un curso nuevo no requiere tocar el motor**, se integrará un segundo curso de prueba de tecnología completamente distinta: **SQL Básico**.
