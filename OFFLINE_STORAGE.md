# Nodu — Almacenamiento Offline, Esquemas y Respaldo (OFFLINE_STORAGE)

> **Documento vivo de persistencia y soberanía de datos** | Versión: 0.8.0 (Fase 8 — Persistencia)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Filosofía Local-First y Soberanía del Usuario

En **Nodu**, los datos del alumno no están atrapados en una base de datos remota ni supeditados a la supervivencia de un servidor.

### Principios Fundamentales:
1. **Disponibilidad Incondicional:** La app carga y funciona en modo avión o sin red celular.
2. **Privacidad por Defecto:** Cero rastreo de comportamiento analítico externo. Todos los registros de aciertos, tiempos de respuesta y errores residen en la base de datos IndexedDB local.
3. **Portabilidad Total:** El estudiante es el dueño absoluto de su progreso. En un solo clic puede exportar todo su historial o restaurarlo en otro dispositivo.

---

## 2. Esquema y Versiones de la Base de Datos Dexie.js

Se implementa una base de datos reactiva tipada con Dexie.js (`NoduDB`), con esquema versionado:

```typescript
import Dexie, { Table } from 'dexie';

export class NoduDatabase extends Dexie {
  profile!: Table<UserProfile, string>;
  courseProgress!: Table<UserCourseProgress, string>;
  activityLogs!: Table<ActivityDayLog, number>;
  achievements!: Table<UnlockedAchievement, string>;
  certificates!: Table<StoredCertificate, string>;

  constructor() {
    super('NoduLocalDatabase');

    // Versión 1 del Esquema
    this.version(1).stores({
      profile: 'id',
      courseProgress: 'courseId, status, updatedAt',
      activityLogs: '++id, date',
      achievements: 'id, claimed',
      certificates: 'id, courseId, issueDate'
    });
  }
}

export const db = new NoduDatabase();
```

---

## 3. Protocolo de Respaldo y Restauración (Backup JSON)

El sistema de copias de seguridad cuenta con validación estricta de integridad:

### A. Estructura del Archivo de Exportación (`nodu-backup-YYYY-MM-DD.json`)
```json
{
  "format": "nodu_backup",
  "version": "1.0.0",
  "exportedAt": 1794057000000,
  "checksum": "sha256-hash-de-verificacion",
  "data": {
    "profile": { ... },
    "courseProgress": [ ... ],
    "activityLogs": [ ... ],
    "achievements": [ ... ],
    "certificates": [ ... ]
  }
}
```

### B. Proceso Transaccional de Restauración
1. **Carga y Verificación:** El usuario selecciona el archivo JSON desde la pantalla de Ajustes.
2. **Validación de Integridad:** Se comprueba el formato `nodu_backup`, la versión del esquema y la coherencia de los campos clave.
3. **Importación Atómica:** Se ejecuta una transacción en Dexie:
   - Si la importación es válida: se sustituyen las tablas de forma limpia y la aplicación recarga el estado en memoria.
   - Si el archivo está dañado o manipulado: se aborta la transacción instantáneamente, manteniendo intacto el progreso existente y mostrando un mensaje amigable.

---

## 4. Estrategia PWA y Service Worker (CacheFirst)

Mediante `vite-plugin-pwa` y Workbox:
- **Precache:** HTML de entrada, bundle compilado de JavaScript/CSS, fuentes tipográficas (`Plus Jakarta Sans` y `JetBrains Mono`) e iconos SVG del sistema de diseño.
- **Runtime Cache:** Paquetes de cursos descargados e intérpretes WASM.
- **Estrategia Cache-First:** Las peticiones a recursos ya almacenados se sirven de forma instantánea ($<10ms$) sin realizar peticiones de red.
