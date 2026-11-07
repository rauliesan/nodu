import { describe, it, expect } from 'vitest';
import { pythonFundamentalsCourse } from '../courses/python-fundamentals';
import { sqlFundamentalsCourse } from '../courses/sql-fundamentals';
import { javascriptBasicsCourse } from '../courses/javascript-basics';
import { CourseMetadata } from '../types/course';

describe('Course Schema Compliance & Multi-course Scaling', () => {
  const courses: CourseMetadata[] = [
    pythonFundamentalsCourse,
    sqlFundamentalsCourse,
    javascriptBasicsCourse
  ];

  courses.forEach((course) => {
    describe(`Course: ${course.title} (${course.language})`, () => {
      it('has valid top-level metadata', () => {
        expect(course.id).toBeDefined();
        expect(course.title).toBeTruthy();
        expect(course.language).toBeTruthy();
        expect(course.units.length).toBeGreaterThan(0);
      });

      it('has correctly structured units and lessons', () => {
        course.units.forEach((unit) => {
          expect(unit.id).toBeDefined();
          expect(unit.title).toBeTruthy();
          expect(unit.order).toBeGreaterThan(0);

          unit.lessons.forEach((lesson) => {
            expect(lesson.id).toBeDefined();
            expect(lesson.title).toBeTruthy();
            expect(lesson.xpReward).toBeGreaterThan(0);
            expect(lesson.exercises.length).toBeGreaterThan(0);

            // Validar ejercicios
            lesson.exercises.forEach((ex) => {
              expect(ex.id).toBeDefined();
              expect(ex.type).toBeTruthy();
              expect(ex.prompt).toBeTruthy();
              expect(ex.explanation).toBeTruthy();
              expect(ex.points).toBeGreaterThan(0);
            });
          });
        });
      });
    });
  });
});
