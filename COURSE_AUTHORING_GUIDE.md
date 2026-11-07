# Nodu — Guía para Desarrollar y Añadir Nuevos Cursos (COURSE_AUTHORING_GUIDE)

> **Manual de Creación de Cursos para Creadores de Contenido y Desarrolladores**  
> **Regla de Oro:** Para añadir un curso nuevo a Nodu **NUNCA** se modifica el motor de la aplicación. Todo se define mediante datos estructurados.

---

## 1. El Proceso en 3 Pasos

```
1. Crear archivo en src/courses/[tecnologia].ts
         │
         ▼
2. Rellenar metadatos, unidades y ejercicios conforme al tipado CourseMetadata
         │
         ▼
3. Importar y registrar la clave en src/store/appStore.ts (1 línea)
```

---

## 2. Plantilla Mínima para un Nuevo Curso (Ejemplo: JavaScript)

Crea `src/courses/javascript-basics.ts`:

```typescript
import { CourseMetadata } from '../types/course';

export const javascriptBasicsCourse: CourseMetadata = {
  id: 'nodu-course-js-101',
  slug: 'javascript-basics',
  title: 'JavaScript Moderno',
  shortDescription: 'Aprende la sintaxis interactiva de la web desde cero.',
  fullDescription: 'Domina variables let/const, arrow functions, arrays y objetos.',
  language: 'javascript',
  difficulty: 'beginner',
  icon: 'js-logo',
  version: '1.0.0',
  estimatedHours: 5,
  author: { name: 'Comunidad Nodu' },
  prerequisites: [],
  certificateEligible: true,
  units: [
    {
      id: 'js-u1',
      title: 'Unidad 1: Variables y Funciones',
      order: 1,
      description: 'Diferencia entre let, const y aprende a declarar tus primeras funciones.',
      colorAccent: '#f7df1e',
      lessons: [
        {
          id: 'js-u1-l1',
          title: '01. Variables con const y let',
          slug: 'variables-let-const',
          order: 1,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'Declarando variables inmutables',
            markdownContent: 'Usa `const` para valores que no van a cambiar y `let` para aquellos que debas reasignar.',
            codeSnippet: 'const PI = 3.14;\nlet contador = 0;'
          },
          exercises: [
            {
              id: 'js-u1-l1-ex1',
              type: 'fill_blank',
              prompt: 'Declara una constante llamada bienvenida:',
              codeTemplate: '___ mensaje = "Hola Mundo";',
              blankToken: '___',
              acceptableAnswers: ['const'],
              availableTokens: ['const', 'let', 'var', 'function'],
              explanation: '`const` se usa para variables cuyo valor no será reasignado.',
              points: 15
            }
          ]
        }
      ],
      checkpoint: {
        id: 'js-u1-chk',
        title: 'Evaluación Unidad 1',
        minimumPassPercentage: 80,
        exercises: []
      }
    }
  ]
};
```

---

## 3. Catálogo de Tipos de Ejercicios Disponibles para Usar

Puedes combinar libremente cualquiera de estos 10 formatos en cualquier curso:

1. **`multiple_choice`**: Preguntas de opciones con distractor pedagógico.
2. **`true_false`**: Razonamiento de verdadero o falso.
3. **`fill_blank`**: Rellenar huecos con botones de teclado táctil contextual.
4. **`parsons_order`**: Líneas de código desordenadas para aprender flujo y orden.
5. **`spot_bug`**: Encontrar la línea que causa un fallo de sintaxis.
6. **`predict_output`**: Predecir el resultado en consola.
7. **`match_pairs`**: Relacionar términos y conceptos.
8. **`code_runner`**: Ejecución en tiempo real con baterías de tests.
9. **`code_repair`**: Código con errores para que el alumno lo depure.
10. **`logic_puzzle`**: Retos deductivos y algoritmos.

---

## 4. Verificación Automática de Cursos

Cada vez que crees o modifiques un curso, ejecuta en la terminal:

```bash
npm test
```

El test automatizado (`src/tests/course-schema.test.ts`) inspeccionará el curso y validará:
- Que los IDs de unidades y lecciones sean únicos.
- Que todos los ejercicios tengan explicaciones pedagógicas válidas.
- Que las recompensas de XP sean positivas.
- Que los checkpoints tengan porcentajes de aprobación correctos.
