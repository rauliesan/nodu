import { CourseMetadata } from '../types/course';

export const javascriptBasicsCourse: CourseMetadata = {
  id: 'nodu-course-js-101',
  slug: 'javascript-basics',
  title: 'JavaScript Moderno',
  shortDescription: 'Aprende la interactividad de la web con sintaxis moderna ES6+.',
  fullDescription: 'Domina variables let/const, funciones flecha, manipulación de arrays y lógica reactiva sin complicaciones.',
  language: 'javascript',
  difficulty: 'beginner',
  icon: 'js-logo',
  version: '1.0.0',
  estimatedHours: 5,
  author: {
    name: 'Equipo Pedagógico Nodu',
    url: 'https://nodu.dev'
  },
  prerequisites: [],
  certificateEligible: true,
  units: [
    {
      id: 'js-u1',
      title: 'Unidad 1: Sintaxis ES6 y Funciones',
      order: 1,
      description: 'Variables modernas inmutables, interpolación y funciones flecha.',
      colorAccent: '#f7df1e',
      lessons: [
        {
          id: 'js-u1-l1',
          title: '01. Variables: let vs const',
          slug: 'variables-let-const',
          order: 1,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'Inmutabilidad con const',
            markdownContent: 'En JavaScript moderno, usamos `const` por defecto para variables que no cambian de valor, y `let` únicamente cuando necesitamos reasignarlas.',
            codeSnippet: 'const nombre = "Alex";\nlet puntos = 10;'
          },
          exercises: [
            {
              id: 'js-u1-l1-ex1',
              type: 'fill_blank',
              prompt: 'Declara una variable inmutable llamada "saludo":',
              codeTemplate: '___ saludo = "¡Hola Nodu!";',
              blankToken: '___',
              acceptableAnswers: ['const'],
              availableTokens: ['const', 'let', 'var', 'def'],
              explanation: '`const` crea una variable de solo lectura que previene reasignaciones accidentales.',
              points: 15
            },
            {
              id: 'js-u1-l1-ex2',
              type: 'predict_output',
              prompt: '¿Qué valor tendrá la variable resultado?',
              code: 'const a = 10;\nconst b = "5";\nconst resultado = a + b;',
              options: ['15', '"105"', 'NaN', 'Error de tipo'],
              correctOptionIndex: 1,
              explanation: 'En JavaScript, sumar un número y una cadena realiza una conversión implícita concatenando ambos valores en `"105"`.',
              points: 15
            }
          ]
        }
      ],
      checkpoint: {
        id: 'js-u1-chk',
        title: 'Evaluación Unidad 1: JS Básico',
        minimumPassPercentage: 80,
        exercises: [
          {
            id: 'js-chk-1',
            type: 'true_false',
            prompt: '¿En JavaScript, una constante declarada con const dentro de un objeto no puede mutar sus propiedades internas?',
            statement: 'El contenido de un objeto declarado con `const` está completamente congelado por defecto.',
            correctValue: false,
            explanation: 'Falso. `const` impide reasignar la variable a otro objeto, pero sus propiedades internas sí pueden ser modificadas a menos que uses `Object.freeze()`.',
            points: 20
          }
        ]
      }
    }
  ]
};
