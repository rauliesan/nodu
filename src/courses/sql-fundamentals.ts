import { CourseMetadata } from '../types/course';

/**
 * CURSO DE VALIDACIÓN MULTI-TECNOLOGÍA: SQL Básico
 * Propósito: Demostrar que el motor agnóstico de Nodu interpreta
 * una tecnología declarativa relacional sin requerir ninguna adaptación de código.
 */
export const sqlFundamentalsCourse: CourseMetadata = {
  id: 'nodu-course-sql-101',
  slug: 'sql-fundamentals',
  title: 'SQL Relacional Express',
  shortDescription: 'Aprende a consultar bases de datos relacionales con consultas estructuradas.',
  fullDescription: 'Domina SELECT, WHERE, ORDER BY y JOINs para extraer información valiosa de tablas de datos.',
  language: 'sql',
  difficulty: 'beginner',
  icon: 'sql-database',
  version: '1.0.0',
  estimatedHours: 4,
  author: {
    name: 'Equipo Pedagógico Nodu',
    url: 'https://nodu.dev'
  },
  prerequisites: [],
  certificateEligible: true,
  units: [
    {
      id: 'sql-u1',
      title: 'Unidad 1: Extrayendo Datos con SELECT',
      order: 1,
      description: 'Aprende la cláusula fundamental para leer registros de una base de datos.',
      colorAccent: '#e38c00',
      lessons: [
        {
          id: 'sql-u1-l1',
          title: '01. La Consulta Universal',
          slug: 'select-from-basico',
          order: 1,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'La cláusula SELECT',
            markdownContent: 'Para obtener información de una tabla, indicamos qué columnas queremos ver mediante `SELECT` y de qué tabla provienen con `FROM`. El asterisco `*` significa "todas las columnas".',
            codeSnippet: 'SELECT * FROM usuarios;'
          },
          exercises: [
            {
              id: 'sql-u1-l1-ex1',
              type: 'fill_blank',
              prompt: 'Completa la consulta para obtener el nombre de todos los productos:',
              codeTemplate: '___ nombre FROM productos;',
              blankToken: '___',
              acceptableAnswers: ['SELECT', 'select'],
              availableTokens: ['SELECT', 'GET', 'EXTRACT', 'WHERE'],
              explanation: '`SELECT` es la palabra reservada en SQL para consultar columnas específicas.',
              points: 15
            },
            {
              id: 'sql-u1-l1-ex2',
              type: 'multiple_choice',
              prompt: '¿Qué símbolo se utiliza en SQL para seleccionar todas las columnas de una tabla?',
              explanation: 'El asterisco `*` actúa como comodín que devuelve la totalidad de las columnas disponibles en la tabla.',
              points: 10,
              options: [
                { id: 'o1', text: '*', isCorrect: true },
                { id: 'o2', text: '%', isCorrect: false },
                { id: 'o3', text: 'ALL', isCorrect: false },
                { id: 'o4', text: '#', isCorrect: false }
              ]
            }
          ]
        }
      ],
      checkpoint: {
        id: 'sql-u1-chk',
        title: 'Checkpoint: Consultas Básicas SQL',
        minimumPassPercentage: 80,
        exercises: [
          {
            id: 'sql-chk-1',
            type: 'true_false',
            prompt: 'En la mayoría de los motores de bases de datos, las palabras clave de SQL no distinguen entre mayúsculas y minúsculas.',
            statement: 'Escribir `select` en minúscula es sintácticamente equivalente a `SELECT`.',
            correctValue: true,
            explanation: 'Correcto. SQL es insensible a mayúsculas en sus comandos, aunque es una convención escribir las palabras clave en mayúsculas por legibilidad.',
            points: 20
          }
        ]
      }
    }
  ]
};
