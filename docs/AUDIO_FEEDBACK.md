# 🔊 Sistema de Síntesis de Audio y Efectos Hápticos (AUDIO_FEEDBACK)

> **Documento de Arquitectura Multimedia** | Tipo: Architecture Spec  
> **Ubicación:** `src/services/sound.ts`  
> **Conexiones:** [[DESIGN_SYSTEM]], [[LESSON_PLAYER]], [[GAMIFICATION]]

---

## 1. Filosofía: Rendimiento Cero-Descargas y Privacidad

En consonancia con el enfoque **Local-First y ultra ligero** de Nodu:
- **Cero archivos de audio `.mp3` o `.wav` descargados:** Los sonidos no consumen ancho de banda ni espacio en disco.
- **Web Audio API en tiempo real:** Los tonos se sintetizan matemáticamente mediante osciladores puros (`sine`, `triangle`) con curvas de envolvente analógica (*exponential ramps*).
- **Accesibilidad Primero:**
  - Respeta el ajuste de silencio global (`isMuted`).
  - No intrusivo: frecuencias acústicamente confortables para evitar fatiga auditiva tras sesiones prolongadas.

---

## 2. Mapa de Frecuencias y Acordes

| Evento | Tipo de Onda | Notas / Frecuencia | Envolvente | Sensación Psicológica |
| :--- | :--- | :--- | :--- | :--- |
| **Acierto de Ejercicio** | Sinusoidal pura (`sine`) | Acorde C Mayor ascendente:<br>• Do5 ($523.25\text{ Hz}$)<br>• Mi5 ($659.25\text{ Hz}$)<br>• Sol5 ($783.99\text{ Hz}$) | Ataque $0\text{ms}$, decaimiento exponencial a $250\text{ms}$ | Refuerzo positivo, claridad mental y recompensa. |
| **Error / Pista Pedagógica** | Triangular suave (`triangle`) | Tono descendente cálido:<br>$260\text{ Hz} \rightarrow 190\text{ Hz}$ | Decaimiento suave a $250\text{ms}$ | Corrección amigable, no punitiva, orientada a la depuración. |
| **Celebración de Fin de Lección** | Triangular brillante (`triangle`) | Arpegio mayor extendido:<br>C5 ($523\text{ Hz}$) $\rightarrow$ E5 $\rightarrow$ G5 $\rightarrow$ C6 ($1046.5\text{ Hz}$) | Staccato progresivo con cola de $400\text{ms}$ | Culminación de hábito, satisfacción y cierre de sesión. |

---

## 3. Integración con Confeti Físico

En la finalización de lección y aprobación de checkpoints, el sonido de celebración se combina con la emisión de partículas de confeti vectorial optimizado en canvas (`canvas-confetti`), ofreciendo una gratificación sensorial coordinada sin degradar los 60 fps del dispositivo móvil.
