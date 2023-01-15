import { searchTesco, getFoodFromTescoProduct } from 'Tesco';

describe('Tesco', () => {
  test('search', async () => {
    const results = await searchTesco('Chicken');

    expect(results.length).toBeGreaterThan(0);

    results.forEach(result =>
      expect(result).toMatchObject({
        name: expect.any(String),
        link: expect.any(String),
        image: expect.any(String)
      })
    );
  });

  test('getFoodFromTescoProduct', async () => {
    const res = await searchTesco('Tesco Whole Milk 2.272L/4 Pints');
    const food = await getFoodFromTescoProduct(res[0]);
    expect(food?.nutritionPer100g.protein).toBe(3.5);
  });
});
