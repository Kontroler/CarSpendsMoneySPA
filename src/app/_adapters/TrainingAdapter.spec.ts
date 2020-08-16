/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TrainingAdapter } from './TrainingAdapter';

describe('Adapter: Training', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingAdapter]
    });
  });

  it('should adapt training', inject(
    [TrainingAdapter],
    (adapter: TrainingAdapter) => {
      const json = {
        id: 1,
        name: 'TrainingTest',
        date: '2020-08-03T00:00:00',
        exercises: [
          {
            id: 1,
            exercise: {
              name: 'ExerciseTest'
            },
            sets: [
              {
                id: 1,
                reps: 1.0,
                weight: 100.0,
                unit: {
                  code: 'kg'
                }
              }
            ]
          }
        ]
      };

      const training = adapter.adapt(json);
      expect(training).toBeDefined();
      expect(training.name).toBe('TrainingTest');
      expect(training.exercises.length).toBe(1);
      expect(training.exercises[0].name).toBe('ExerciseTest');
      expect(training.exercises[0].sets.length).toBe(1);
      expect(training.exercises[0].sets[0].reps).toBe(1.0);
      expect(training.exercises[0].sets[0].weight).toBe(100.0);
      expect(training.exercises[0].sets[0].unit.code).toBe('kg');
    }
  ));
});
