# 🏅 Sistema de Logros y Progresión de Perfil (ACHIEVEMENTS_SYSTEM)

> **Documento de Arquitectura de Gamificación** | Tipo: Feature Spec  
> **Ubicación:** `src/components/ProfileGamificationView.tsx` & `src/types/achievements.ts`  
> **Conexiones:** [[GAMIFICATION]], [[OFFLINE_STORAGE]], [[DESIGN_SYSTEM]], [[PRODUCT]]

---

## 1. Responsabilidad del Módulo

La vista de perfil unifica la identidad del estudiante como desarrollador con las mecánicas de recompensa y persistencia:

1. **Rango y Barra de Nivel Dinámica:**
   - Calcula el nivel de maestría (`Script Novice` $\rightarrow$ `Code Apprentice` $\rightarrow$ `Logic Crafter` $\rightarrow$ `System Architect`) según la experiencia acumulada ($XP$), mostrando la barra de progreso hacia el siguiente nivel.
2. **Matriz de Constancia Semanal (Racha):**
   - Visualización de 7 días (`L, M, X, J, V, S, D`) que premia el hábito diario de 5 minutos.
3. **Vitrina de Logros e Insignias Locales:**
   - 6 hitos iniciales con estados reactivos (`desbloqueado` vs `bloqueado con candado`).
   - Evalúa en cliente el progreso de lecciones completadas, días de racha y tecnologías exploradas.
4. **Acciones de Soberanía de Datos:**
   - Descarga directa del certificado en PDF con firma SHA-256.
   - Exportación de la copia de seguridad integral en JSON.
