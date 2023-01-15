import Food from 'Food';

const createChicken = (weight: number) =>
  new Food({
    name: 'Chicken',
    nutritionPer100g: { protein: 24, carbs: 0, fat: 1.1 },
    weight
  });

describe('Food', () => {
  test('calories', () => {
    const food = createChicken(100);
    expect(Math.round(food.calories)).toBe(106);
  });

  test('protein', () => {
    const food = createChicken(200);
    expect(food.protein).toBe(48);
  });

  test('mutate', () => {
    const foodA = createChicken(200);
    const foodB = foodA.mutate(10);

    expect(foodA.weight).toBe(200);
    expect(foodB.weight).not.toBe(200);
  });
});
