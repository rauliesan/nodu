# Nodu — Sistema de Gamificación y Retención (GAMIFICATION)

> **Documento vivo de mecánicas de hábito** | Versión: 0.6.0 (Fase 6 — Gamificación)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Filosofía de Gamificación Ética (Sin Dark Patterns)

Nodu rechaza los patrones oscuros tradicionales de retención que causan frustración o ansiedad (ej. vidas agotadas, penalizaciones punitivas por descansar un día o muros de pago para continuar aprendiendo).

El sistema se orienta a la **motivación intrínseca**:
1. **Sensación constante de progreso:** Dominar nodos de conocimiento tangibles.
2. **Recompensa por consistencia:** Celebrar el hábito de programar 5 minutos al día.
3. **Maestría verificable:** Los certificados y proyectos demuestran habilidades reales.

---

## 2. Puntos de Experiencia (XP) y Sistema de Niveles

### Cálculo de XP por Actividad:
- **Lección estándar completada:** $+15$ XP base.
- **Bono de precisión perfecta:** $+5$ XP (si no hubo errores a la primera).
- **Evaluación de Hito (Checkpoint):** $+30$ XP.
- **Mini-Proyecto de Unidad completado:** $+50$ XP.
- **Objetivo diario cumplido:** $+10$ XP extra.

### Rangos de Desarrollador por Nivel de XP:
| Rango / Título | Rango de XP | Icono / Identificador |
| :--- | :--- | :--- |
| **Nivel 1: Script Novice** | 0 - 150 XP | `[o_o]` Nodo Verde |
| **Nivel 2: Code Apprentice** | 151 - 450 XP | `[*_*]` Nodo Turquesa |
| **Nivel 3: Logic Crafter** | 451 - 1,000 XP | `[^_^]` Nodo Zafiro |
| **Nivel 4: Algorithm Pioneer** | 1,001 - 2,500 XP | `[#_#]` Nodo Púrpura |
| **Nivel 5: System Architect** | 2,501+ XP | `[$_$]` Nodo Dorado |

---

## 3. Sistema de Rachas y Protección de Hábito (Streak Freeze)

1. **Racha Diaria (Streak):** Se incrementa al completar al menos una lección o evaluación antes de las 23:59 (hora local del dispositivo).
2. **Congelador de Racha (Streak Freeze):**
   - El usuario recibe 1 congelador de racha gratuito al completar su primera semana.
   - Puede adquirir protecciones adicionales usando gemas ganadas por esfuerzo.
   - Si un día no puede conectarse por motivos de fuerza mayor, el congelador se consume automáticamente evitando que la racha vuelva a cero.
3. **Calendario Visual:** Matriz semanal tipo GitHub (`Heatmap`) en el perfil para visualizar los días activos del mes.

---

## 4. Árbol de Logros e Insignias Locales

- **"Primer Commit" (Hello World):** Completa tu primera lección interactiva.
- **"En el Bucle" (In the Loop):** Alcanza una racha de 7 días consecutivos.
- **"Compilador Perfecto":** Completa 3 lecciones seguidas con 100% de precisión.
- **"Políglota":** Activa e inicia 2 cursos de diferentes tecnologías (ej. Python + SQL).
- **"Arquitecto de Unidad":** Supera tu primer proyecto práctico integrador.
- **"Graduado Nodu":** Obtén tu primer certificado descargable en PDF.
