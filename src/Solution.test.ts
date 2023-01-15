import Food, { Nutrition } from 'Food';
import Solution, { Target } from 'Solution';

const createSolution = (nutritions: Nutrition[], weight = 0) => {
  const foods = nutritions.map(
    nutrition =>
      new Food({
        name: 'Food',
        nutritionPer100g: nutrition,
        weight
      })
  );

  const target: Target = {
    totalCalories: 1000,
    proteinPercent: 25,
    fatPercent: 25,
    carbsPercent: 50
  };

  return new Solution(foods, target);
};

describe('Solution', () => {
  test('initRandom', () => {
    const solution = createSolution([
      { protein: 0, carbs: 0, fat: 0 },
      { protein: 0, carbs: 0, fat: 0 }
    ]);
    expect(solution.foods.every(food => food.weight === 0)).toBeTruthy();

    solution.initRandom();
    expect(solution.foods.every(food => food.weight !== 0)).toBeTruthy();
  });

  test('totalCalories', () => {
    const solution = createSolution([
      { protein: 10, carbs: 0, fat: 0 },
      { protein: 0, carbs: 10, fat: 0 },
      { protein: 0, carbs: 0, fat: 10 }
    ]);
    solution.foods.forEach(food => (food.weight = 100));

    expect(solution.totalCalories).toBe(170);
  });

  test('nutrition totals and percentages', () => {
    const solution = createSolution(
      [
        { protein: 50, carbs: 0, fat: 0 },
        { protein: 0, carbs: 30, fat: 0 },
        { protein: 0, carbs: 0, fat: 20 }
      ],
      100
    );

    expect(solution.totalWeight).toBe(100);
    expect(solution.proteinPercent).toBe(50);
    expect(solution.carbsPercent).toBe(30);
    expect(solution.fatPercent).toBe(20);
  });

  test('fitness', () => {
    // 525 calories
    const solutionA = createSolution(
      [
        { protein: 25, carbs: 0, fat: 0 },
        { protein: 0, carbs: 50, fat: 0 },
        { protein: 0, carbs: 0, fat: 25 }
      ],
      100
    );
    // 1050 calories
    const solutionB = createSolution(
      [
        { protein: 25, carbs: 0, fat: 0 },
        { protein: 0, carbs: 50, fat: 0 },
        { protein: 0, carbs: 0, fat: 25 }
      ],
      200
    );
    expect(solutionA.fitness()).toBeGreaterThan(solutionB.fitness());
  });

  test('mutate', () => {
    const solutionA = createSolution(
      [
        { protein: 10, carbs: 0, fat: 0 },
        { protein: 0, carbs: 10, fat: 0 },
        { protein: 0, carbs: 0, fat: 10 }
      ],
      100
    );
    const fitnessA = solutionA.fitness();

    const solutionB = solutionA.mutate(100);
    const fitnessB = solutionB.fitness();

    expect(solutionA.fitness()).toBe(fitnessA);
    expect(fitnessB).not.toBe(fitnessA);
  });
});
