import { CourseMetadata } from '../types/course';

/**
 * CURSO PILOTO: Python desde Cero (Python Fundamentals)
 * Diseñado conforme a COURSE_SCHEMA.md para validar:
 * - 3 Unidades completas
 * - Todos los tipos de ejercicios (multiple choice, fill blank, parsons, predict output, spot bug, etc.)
 * - Checkpoints de evaluación
 * - Proyecto práctico final
 * - Cero acoplamiento: el motor interpreta este archivo de forma agnóstica.
 */
export const pythonFundamentalsCourse: CourseMetadata = {
  id: 'nodu-course-python-101',
  slug: 'python-fundamentals',
  title: 'Python desde Cero',
  shortDescription: 'Domina los fundamentos de Python con micro-retos diarios de 5 minutos.',
  fullDescription: 'Aprende programación moderna con Python sin barreras. Desde tu primera variable y condicionales hasta la creación de un conversor de criptografía clásico en tu proyecto final.',
  language: 'python',
  difficulty: 'beginner',
  icon: 'python-logo',
  version: '1.0.0',
  estimatedHours: 6,
  author: {
    name: 'Equipo Pedagógico Nodu',
    url: 'https://nodu.dev'
  },
  prerequisites: [],
  certificateEligible: true,
  units: [
    // ========================================================================
    // UNIDAD 1: VARIABLES, CADENAS Y ENTRADA/SALIDA
    // ========================================================================
    {
      id: 'py-u1',
      title: 'Unidad 1: Variables y Tipos de Datos',
      order: 1,
      description: 'Aprende a almacenar datos, manipular texto y mostrar información por consola.',
      colorAccent: '#3776ab',
      lessons: [
        {
          id: 'py-u1-l1',
          title: '01. ¡Hola, Python!',
          slug: 'hola-python',
          order: 1,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'La función print()',
            markdownContent: 'En Python, la forma más rápida de comunicarte con el mundo es la función `print()`. Cualquier texto que coloques entre comillas se mostrará directamente en la terminal.',
            codeSnippet: 'print("¡Hola, Nodu!")'
          },
          exercises: [
            {
              id: 'py-u1-l1-ex1',
              type: 'multiple_choice',
              prompt: '¿Cuál es la función en Python para mostrar un mensaje en pantalla?',
              explanation: '`print()` es la función integrada estándar para enviar texto a la consola o salida del programa.',
              points: 10,
              options: [
                { id: 'opt1', text: 'print()', isCorrect: true },
                { id: 'opt2', text: 'echo()', isCorrect: false },
                { id: 'opt3', text: 'console.log()', isCorrect: false },
                { id: 'opt4', text: 'write()', isCorrect: false }
              ]
            },
            {
              id: 'py-u1-l1-ex2',
              type: 'fill_blank',
              prompt: 'Completa la instrucción para imprimir el saludo en la pantalla:',
              codeTemplate: '___("Bienvenido a Nodu")',
              blankToken: '___',
              acceptableAnswers: ['print'],
              availableTokens: ['print', 'write', 'output', 'display'],
              explanation: 'Llamamos a la función `print` seguida de paréntesis que envuelven nuestro texto.',
              points: 15
            },
            {
              id: 'py-u1-l1-ex3',
              type: 'predict_output',
              prompt: '¿Qué mostrará este código cuando se ejecute?',
              code: 'print("3" + "5")',
              options: ['8', '35', 'Error de sintaxis', '3 + 5'],
              correctOptionIndex: 1,
              explanation: 'Al estar entre comillas, `"3"` y `"5"` son cadenas de texto. El operador `+` las concatena (une), produciendo `"35"`.',
              points: 15
            }
          ]
        },
        {
          id: 'py-u1-l2',
          title: '02. Cajas de Memoria: Variables',
          slug: 'variables-en-python',
          order: 2,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'Guardando datos en variables',
            markdownContent: 'Una variable es como una etiqueta pegada a una caja donde guardas un valor. En Python no necesitas declarar el tipo, simplemente asignas con el operador `=`.',
            codeSnippet: 'nivel = 1\njugador = "Alex"'
          },
          exercises: [
            {
              id: 'py-u1-l2-ex1',
              type: 'spot_bug',
              prompt: 'Una de estas líneas produce un error de sintaxis en Python. Tócala para señalarla:',
              codeLines: [
                'puntos = 100',
                '2usuario = "Ada"',
                'activo = True'
              ],
              buggyLineIndex: 1,
              bugExplanation: 'En Python los nombres de variables no pueden comenzar con un número (`2usuario` no es válido; `usuario2` sí).',
              explanation: 'Los identificadores deben comenzar con una letra o un guión bajo `_`.',
              points: 15
            },
            {
              id: 'py-u1-l2-ex2',
              type: 'parsons_order',
              prompt: 'Ordena las líneas de código para calcular el precio total con descuento:',
              shuffledBlocks: [
                { id: 'b3', code: 'print(precio_final)' },
                { id: 'b1', code: 'precio = 50' },
                { id: 'b2', code: 'precio_final = precio - 10' }
              ],
              correctOrder: ['b1', 'b2', 'b3'],
              explanation: 'Primero debemos definir la variable `precio`, luego calcular `precio_final` y por último imprimir el resultado.',
              points: 20
            }
          ]
        }
      ],
      checkpoint: {
        id: 'py-u1-checkpoint',
        title: 'Evaluación de Dominio: Unidad 1',
        minimumPassPercentage: 80,
        exercises: [
          {
            id: 'py-u1-chk-1',
            type: 'true_false',
            prompt: 'En Python, las variables `nombre` y `Nombre` son tratadas como dos variables diferentes.',
            statement: 'Python distingue entre mayúsculas y minúsculas (case-sensitive).',
            correctValue: true,
            explanation: 'Correcto. Python es sensible a mayúsculas: `total`, `Total` y `TOTAL` son tres identificadores completamente distintos.',
            points: 20
          },
          {
            id: 'py-u1-chk-2',
            type: 'match_pairs',
            prompt: 'Empareja cada tipo de dato con su valor correspondiente:',
            explanation: '`str` representa texto, `int` enteros, `float` decimales y `bool` verdades lógicas.',
            points: 25,
            pairs: [
              { left: 'int', right: '42' },
              { left: 'str', right: '"Hola"' },
              { left: 'float', right: '3.14' },
              { left: 'bool', right: 'True' }
            ]
          }
        ]
      }
    },

    // ========================================================================
    // UNIDAD 2: CONDICIONALES Y TOMA DE DECISIONES
    // ========================================================================
    {
      id: 'py-u2',
      title: 'Unidad 2: Lógica y Condicionales',
      order: 2,
      description: 'Permite a tus programas tomar caminos diferentes con if, elif y else.',
      colorAccent: '#00b4d8',
      lessons: [
        {
          id: 'py-u2-l1',
          title: '01. La Bifurcación: if y else',
          slug: 'if-else-basico',
          order: 1,
          type: 'standard',
          xpReward: 15,
          intro: {
            headline: 'Tomando decisiones con if',
            markdownContent: 'La estructura `if` evalúa una condición booleana. Si es verdadera, ejecuta el bloque indentado. Recuerda colocar siempre dos puntos `:` al final de la condición.',
            codeSnippet: 'if edad >= 18:\n    print("Acceso concedido")'
          },
          exercises: [
            {
              id: 'py-u2-l1-ex1',
              type: 'fill_blank',
              prompt: 'Completa la sintaxis del condicional para verificar si la vida es mayor a 0:',
              codeTemplate: 'if vida > 0___\n    print("Sigues en juego")',
              blankToken: '___',
              acceptableAnswers: [':'],
              availableTokens: [':', ';', '{', 'then'],
              explanation: 'En Python, las estructuras de control como `if`, `for`, `while` y `def` requieren dos puntos `:` para abrir el bloque indentado.',
              points: 15
            },
            {
              id: 'py-u2-l1-ex2',
              type: 'predict_output',
              prompt: '¿Qué imprimirá este programa en consola?',
              code: 'saldo = 20\nif saldo > 50:\n    print("A")\nelif saldo > 10:\n    print("B")\nelse:\n    print("C")',
              options: ['A', 'B', 'C', 'B y C'],
              correctOptionIndex: 1,
              explanation: 'La primera condición `20 > 50` es falsa. Pasa al `elif`: `20 > 10` es verdadera, por lo que imprime "B" y termina el bloque.',
              points: 20
            }
          ]
        }
      ],
      checkpoint: {
        id: 'py-u2-checkpoint',
        title: 'Evaluación de Dominio: Unidad 2',
        minimumPassPercentage: 80,
        exercises: [
          {
            id: 'py-u2-chk-1',
            type: 'multiple_choice',
            prompt: '¿Qué operador se utiliza en Python para comparar si dos valores son iguales?',
            explanation: '`==` es el operador de comparación de igualdad. Un solo `=` es para asignación de variables.',
            points: 20,
            options: [
              { id: 'op1', text: '==', isCorrect: true },
              { id: 'op2', text: '=', isCorrect: false },
              { id: 'op3', text: '===', isCorrect: false },
              { id: 'op4', text: 'equals', isCorrect: false }
            ]
          }
        ]
      }
    },

    // ========================================================================
    // UNIDAD 3: PROYECTO FINAL INTEGRADOR
    // ========================================================================
    {
      id: 'py-u3',
      title: 'Unidad 3: Proyecto de Certificación',
      order: 3,
      description: 'Aplica todos los conceptos adquiridos en un reto práctico de programación.',
      colorAccent: '#10b981',
      lessons: [],
      checkpoint: {
        id: 'py-u3-checkpoint',
        title: 'Validación de Requisitos',
        minimumPassPercentage: 100,
        exercises: []
      },
      project: {
        id: 'py-final-project',
        title: 'Mini-Cifrador César de Textos',
        description: 'Construye un programa en Python que reciba un mensaje y una clave numérica, y desplace cada letra para cifrarla.',
        instructions: [
          '1. Define una variable `mensaje` con el texto a cifrar.',
          '2. Usa una variable `desplazamiento = 3`.',
          '3. Muestra por consola el texto procesado.',
          '4. Supera los tests unitarios automatizados en el entorno aislado.'
        ],
        starterCode: '# Proyecto Final: Cifrador Simple\nmensaje = "PYTHON"\ndesplazamiento = 3\n\n# Tu código aquí:\n',
        validationRule: {
          type: 'output_match',
          expectedOutput: 'SBWKRQ'
        }
      }
    }
  ]
};
