# Nodu — Esquema Universal de Cursos (COURSE_SCHEMA)

> **Documento vivo de especificación de contenidos** | Versión: 0.4.0 (Fase 4 — Esquema de Cursos)  
> **Estado:** Propuesta formal para revisión y aprobación

---

## 1. Filosofía del Esquema de Contenidos

El esquema de cursos de Nodu cumple tres mandatos:
1. **Separación Absoluta:** Ni una sola línea de código fuente de la app depende de qué lección o tecnología se enseña.
2. **Tipado Estricto:** Definido mediante TypeScript y validable en tiempo de compilación y ejecución (mediante `Zod` o validadores puros ligeros).
3. **Escalabilidad de Catálogo:** Añadir un nuevo curso (ej. Rust, SQL, Go) consiste en crear un paquete con esta estructura exacta.

---

## 2. Jerarquía Conceptual de un Curso

```
COURSE (Curso)
 ├── id, title, slug, icon, language, description, level, estimatedHours
 ├── units: [] (Unidades temáticas)
      ├── id, title, order, description, colorAccent
      ├── levels: [] (Niveles dentro de la unidad)
      │    ├── id, title, order
      │    ├── lessons: [] (Micro-lecciones de 3-5 minutos)
      │    │    ├── id, title, type: 'standard' | 'review'
      │    │    ├── intro: (Concepto teórico sintético <30 seg)
      │    │    └── exercises: [] (5 a 8 ejercicios variados)
      │    │         ├── id, type, prompt, points
      │    │         ├── payload (datos específicos del tipo)
      │    │         └── explanation (por qué es correcta / error común)
      │    └── checkpointExam: (Evaluación de dominio para pasar de nivel)
      └── practicalProject: (Mini-proyecto integrador de fin de unidad)
```

---

## 3. Especificación Formal de Tipos TypeScript

```typescript
// ============================================================================
// 1. TIPOS DE EJERCICIOS ADMITIDOS
// ============================================================================

export type ExerciseType =
  | 'multiple_choice'    // Selección múltiple conceptual
  | 'true_false'         // Verdadero o falso con justificación
  | 'fill_blank'         // Completar huecos en código o sentencia
  | 'parsons_order'      // Ordenar bloques de código desordenados
  | 'spot_bug'           // Señalar el error en el código
  | 'predict_output'     // Predecir la salida en consola
  | 'match_pairs'        // Relacionar términos / conceptos
  | 'code_runner'        // Escribir código real validado por tests
  | 'code_repair'        // Corregir código pre-rellenado con errores
  | 'logic_puzzle';      // Reto algorítmico o de deducción

// Base común para cualquier ejercicio
export interface BaseExercise {
  id: string;
  type: ExerciseType;
  prompt: string;               // Enunciado claro de la pregunta
  contextCode?: string;         // Código de apoyo mostrado en bloque
  hint?: string;                // Pista opcional si el usuario duda
  explanation: string;          // Explicación pedagógica mostrada tras responder
  points: number;               // XP base (ej. 10 a 20 XP)
}

// 1. Selección Múltiple
export interface MultipleChoiceExercise extends BaseExercise {
  type: 'multiple_choice';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    feedback?: string;
  }[];
}

// 2. Verdadero o Falso
export interface TrueFalseExercise extends BaseExercise {
  type: 'true_false';
  statement: string;
  correctValue: boolean;
  explanation: string;
}

// 3. Rellenar Espacios (Fill in the Blank)
export interface FillBlankExercise extends BaseExercise {
  type: 'fill_blank';
  codeTemplate: string;         // Ej: "def saludar(nombre)___ \n    print('Hola ' + nombre)"
  blankToken: string;           // "___"
  acceptableAnswers: string[];  // [":"]
  availableTokens?: string[];   // Teclas flotantes sugeridas: [":", ";", "->", "="]
}

// 4. Ordenar Instrucciones (Problemas Parsons)
export interface ParsonsOrderExercise extends BaseExercise {
  type: 'parsons_order';
  shuffledBlocks: {
    id: string;
    code: string;
    indentationLevel?: number;  // Nivel de sangrado esperado (0, 1, 2)
  }[];
  correctOrder: string[];       // Array de IDs en orden correcto
}

// 5. Señalar el Error (Spot the Bug)
export interface SpotBugExercise extends BaseExercise {
  type: 'spot_bug';
  codeLines: string[];          // Cada línea es un elemento clickeable
  buggyLineIndex: number;       // Índice 0-based de la línea con error
  bugExplanation: string;       // Por qué esa línea falla
}

// 6. Predecir Salida (Predict Output)
export interface PredictOutputExercise extends BaseExercise {
  type: 'predict_output';
  code: string;
  options: string[];            // Opciones de salida en consola
  correctOptionIndex: number;
}

// 7. Relacionar Conceptos (Match Pairs)
export interface MatchPairsExercise extends BaseExercise {
  type: 'match_pairs';
  pairs: {
    left: string;               // Término (ej. "int", "str", "bool")
    right: string;              // Significado (ej. "Número entero", "Cadena de texto", "Verdadero o falso")
  }[];
}

// 8. Escribir y Ejecutar Código (Code Runner / Repair)
export interface CodeRunnerExercise extends BaseExercise {
  type: 'code_runner' | 'code_repair';
  initialCode: string;
  solutionCode: string;
  testCases: {
    input?: string;
    expectedOutput: string;
    isSecret?: boolean;         // Si se oculta el test para evitar hardcodeo
  }[];
}

// Unión de todos los ejercicios posibles
export type Exercise =
  | MultipleChoiceExercise
  | TrueFalseExercise
  | FillBlankExercise
  | ParsonsOrderExercise
  | SpotBugExercise
  | PredictOutputExercise
  | MatchPairsExercise
  | CodeRunnerExercise;

// ============================================================================
// 2. ESTRUCTURA DE LECCIÓN, NIVEL Y UNIDAD
// ============================================================================

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  order: number;
  type: 'standard' | 'review';
  xpReward: number;
  intro: {
    headline: string;
    markdownContent: string;    // Explicación sintetizada (<30 segundos de lectura)
    codeSnippet?: string;       // Ejemplo visual
  };
  exercises: Exercise[];
}

export interface UnitCheckpoint {
  id: string;
  title: string;
  minimumPassPercentage: number; // Por defecto 80%
  exercises: Exercise[];
}

export interface PracticalProject {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  starterCode: string;
  validationRule: {
    type: 'output_match' | 'unit_tests';
    expectedOutput?: string;
    testSuite?: string;
  };
}

export interface CourseUnit {
  id: string;
  title: string;
  order: number;
  description: string;
  colorAccent: string;          // Hex o variable de color del lenguaje
  lessons: Lesson[];
  checkpoint: UnitCheckpoint;
  project?: PracticalProject;
}

// ============================================================================
// 3. CURSO RAÍZ (DEFINICIÓN DEL PAQUETE)
// ============================================================================

export interface CourseMetadata {
  id: string;                   // 'nodu-python-intro'
  slug: string;                 // 'python-fundamentals'
  title: string;                // 'Python desde Cero'
  shortDescription: string;
  fullDescription: string;
  language: 'python' | 'javascript' | 'sql' | 'typescript' | 'html_css' | 'rust';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;                 // Nombre del icono SVG
  version: string;              // '1.0.0'
  estimatedHours: number;       // ej. 8
  author: {
    name: string;
    url?: string;
  };
  prerequisites: string[];      // Lista de requerimientos
  certificateEligible: boolean; // Si emite certificado al completarse
  units: CourseUnit[];
}
```

---

## 4. Proceso Universal de Incorporación de Nuevos Cursos

Añadir un curso nuevo a Nodu en el futuro requerirá únicamente:
1. Crear una carpeta `/courses/[tecnologia]/` con el archivo `course.json` o `course.ts` tipado con `CourseMetadata`.
2. Registrar el identificador en el catálogo central de cursos.
3. El motor de Nodu parsea el contenido, valida la sintaxis y lo inyecta automáticamente en:
   - El explorador de cursos.
   - La persistencia de progreso en Dexie.js.
   - El renderizador universal de nodos y ejercicios.
   - El generador local de certificados.
