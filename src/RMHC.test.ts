import Food from 'Food';
import RMHC from 'RMHC';

describe('RMHC', () => {
  test('it works', () => {
    const bestSolution = RMHC(
      [
        new Food({
          name: 'Food A',
          nutritionPer100g: {
            protein: 50,
            carbs: 0,
            fat: 10
          }
        }),
        new Food({
          name: 'Food B',
          nutritionPer100g: {
            protein: 10,
            carbs: 50,
            fat: 20
          }
        })
      ],
      {
        totalCalories: 1000,
        proteinPercent: 25,
        fatPercent: 25,
        carbsPercent: 50
      },
      {
        iterations: 1000,
        mutationStrength: 100
      }
    );

    bestSolution.log();
    bestSolution.foods.forEach(food => food.log());
    expect(bestSolution.fitness()).toBeLessThan(1000);
  });
});
