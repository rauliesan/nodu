# Nodu — Sistema de Certificados Locales (CERTIFICATES)

> **Documento vivo de especificación de certificaciones** | Versión: 0.7.0 (Fase 7 — Certificados)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Filosofía y Enfoque de los Certificados en Nodu

Los certificados de **Nodu** celebran la maestría práctica del estudiante al culminar un curso completo y su proyecto integrador final.

Cumplen con los siguientes mandatos irrenunciables:
1. **Generación 100% Local en Cliente:** El PDF se compila y genera directamente en el navegador del usuario utilizando `jsPDF` con gráficos vectoriales y fuentes embebidas, sin requerir conexión a internet ni llamadas a servidores remotos.
2. **Honestidad y Transparencia:** Se declara explícitamente el carácter no oficial y formativo del documento (no se presenta como título universitario ni acreditación oficial externa no regulada).
3. **Integridad Criptográfica Local (SHA-256):** Cada certificado incluye un código de verificación único generado a partir de un hash SHA-256 local que vincula:
   $$\text{Hash} = \text{SHA-256}(\text{courseId} + \text{studentName} + \text{issueDate} + \text{finalScore} + \text{localSecret})$$
   Esto permite verificar que el PDF corresponde a los registros locales de progreso en la base de datos Dexie.js del usuario sin necesidad de un backend central.

---

## 2. Anatomía Visual y Contenido del Certificado

El diseño del certificado sigue la identidad **Neo-Terminal Friendly**: elegante, profesional y con detalles de la cultura de código:

```
┌────────────────────────────────────────────────────────────────────────┐
│  NODU // LOCAL CERTIFICATE OF COMPLETION                [#00B4D8 EMBLEM]│
│                                                                        │
│  Se certifica que:                                                     │
│                                                                        │
│                  ★  ALEX DEV GARCÍA  ★                                 │
│                                                                        │
│  ha superado con éxito todos los módulos prácticos, evaluaciones y el  │
│  proyecto integrador final del itinerario:                             │
│                                                                        │
│              PYTHON DESDE CERO // FUNDAMENTALS TRACK                    │
│                                                                        │
│  Horas estimadas: 12 horas prácticas  |  Precisión acumulada: 96%      │
│  Fecha de emisión: 07 de Noviembre, 2026                               │
│                                                                        │
│  ────────────────────────────────────────────────────────────────────  │
│  ID de Verificación Local: NODU-PY-7F3B-9A2E-C410                      │
│  Firma Criptográfica SHA-256: 8a93e...f412                             │
│  Aviso: Certificado de logro personal expedido por Nodu (Local-First). │
└────────────────────────────────────────────────────────────────────────┘
```

### Elementos Incluidos:
- **Nombre del Alumno:** Configurable desde el perfil del usuario.
- **Nombre y Versión del Curso:** Extraído de los metadatos de `CourseMetadata`.
- **Insignia y Acento Tecnológico:** Color característico del lenguaje completado (ej. azul serpiente y oro para Python).
- **Métricas Reales:** Puntuación media en exámenes de unidad y horas invertidas.
- **Identificador Único Criptográfico:** Hash con formato legible por bloques (`NODU-[LANG]-[HASH8]`).
- **Descargo de Responsabilidad (*Disclaimer*):** Texto legal claro sobre el carácter formativo del documento.

---

## 3. Requisitos para la Desbloqueo del Certificado

Un certificado no se regala ni se desbloquea con un simple clic. La máquina de estados del curso exige:
1. Haber completado el $100\%$ de las lecciones obligatorias de todas las unidades.
2. Haber aprobado todas las Evaluaciones de Hito (*Checkpoints*) con un mínimo de $80\%$ de aciertos.
3. Haber ejecutado y superado la batería de tests del **Proyecto Práctico Final** del curso.

---

## 4. Opciones de Exportación y Compartición

- **Guardar en PDF (jsPDF):** Documento vectorial A4 horizontal en formato ultraligero ($<90KB$), con tipografía de código incrustada y listo para imprimir o adjuntar.
- **Exportar Imagen PNG / WebP:** Renderizado de alta resolución optimizado para redes profesionales (LinkedIn, Twitter/X, GitHub Readme).
- **Historial de Certificados:** Sección dedicada dentro de la pestaña *Perfil* para re-descargar cualquier certificado obtenido en cualquier momento.
