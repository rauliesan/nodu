# ⚙️ Módulo 1: Ajustes, Accesibilidad y Motor de Temas (SETTINGS_MODULE)

> **Documento de Arquitectura de Funcionalidad** | Tipo: Feature Spec  
> **Ubicación:** `src/components/SettingsModal.tsx` & `src/services/db.ts`  
> **Conexiones:** [[EXECUTION_PLAN]], [[DESIGN_SYSTEM]], [[OFFLINE_STORAGE]], [[AUDIO_FEEDBACK]]

---

## 1. Responsabilidad del Módulo

El Módulo 1 proporciona control absoluto al alumno sobre su entorno de aprendizaje sin comprometer el rendimiento ni la privacidad:

1. **Motor de Temas Dual (Dark / Light):**
   - **Oscuro OLED (`theme: 'dark'`):** Fondo `#171e2e` / `#0e131f` para estudio nocturno y ahorro energético.
   - **Claro Cristal (`theme: 'light'`):** Fondo `#ffffff` / `#f8fafc` con contrastes optimizados según WCAG 2.1 AA para entornos luminosos.
2. **Control Centralizado de Efectos Sonoros:**
   - Activa o desactiva la síntesis nativa de Web Audio API mediante `soundFX.setMuted()`, emitiendo un acorde de confirmación al re-activarlo.
3. **Accesibilidad Cognitiva y Motora:**
   - **Reducción de Movimiento (`reducedMotion`):** Elimina animaciones pulsantes y transiciones elásticas.
   - **Texto Aumentado (`largeFont`):** Incrementa la escala tipográfica a `16px` base para explicaciones y código.
4. **Persistencia Transaccional Inmediata:**
   - Los cambios se guardan directamente en la tabla `profile` de IndexedDB (`Dexie.js`) y se aplican reactivamente en tiempo real en todo el árbol de componentes vía Zustand.
