import Food from 'Food';
import RMHC from 'RMHC';
import { getFoodFromTescoProduct, searchTesco } from 'Tesco';

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

  test.only('it balances cereal', async () => {
    const [cerealProduct] = await searchTesco('Kellogs Cereal Wheats Apricot 500G');
    const cereal = await getFoodFromTescoProduct(cerealProduct);

    const [milkProduct] = await searchTesco('Tesco Whole Milk 2.272L/4 Pints');
    const milk = await getFoodFromTescoProduct(milkProduct);

    const bestSolution = RMHC(
      [cereal, milk],
      {
        totalCalories: 400,
        proteinPercent: 25,
        fatPercent: 25,
        carbsPercent: 50
      },
      {
        iterations: 10000,
        mutationStrength: 100
      }
    );

    bestSolution.log();
    bestSolution.foods.forEach(food => food.log());
  });
});
