import Food, { IndexableProp } from 'Food';

export interface Target {
  totalCalories: number;
  proteinPercent: number;
  carbsPercent: number;
  fatPercent: number;
}

export default class Solution {
  foods: Food[];
  target: Target;

  get totalCalories(): number {
    return this.sumFoodProperty('calories');
  }
  get totalWeight(): number {
    return (
      this.sumFoodProperty('protein') + this.sumFoodProperty('carbs') + this.sumFoodProperty('fat')
    );
  }
  get proteinPercent(): number {
    return (this.sumFoodProperty('protein') / this.totalWeight) * 100;
  }
  get carbsPercent(): number {
    return (this.sumFoodProperty('carbs') / this.totalWeight) * 100;
  }
  get fatPercent(): number {
    return (this.sumFoodProperty('fat') / this.totalWeight) * 100;
  }

  constructor(foods: Food[], target: Target) {
    this.foods = foods;
    this.target = target;
  }

  initRandom() {
    this.foods.forEach(food => (food.weight = Math.random() * 500));
  }

  fitness(): number {
    const caloriesDiff = Math.abs(this.target.totalCalories - this.totalCalories);
    const proteinDiff = Math.abs(this.target.proteinPercent - this.proteinPercent);
    const carbsDiff = Math.abs(this.target.carbsPercent - this.carbsPercent);
    const fatDiff = Math.abs(this.target.fatPercent - this.fatPercent);

    return caloriesDiff + proteinDiff + carbsDiff + fatDiff;
  }

  mutate(strength: number): Solution {
    const mutatedFoods = this.foods.map(food => food.mutate(strength));
    return new Solution(mutatedFoods, this.target);
  }

  sumFoodProperty(prop: IndexableProp): number {
    return this.foods.reduce((prev, cur) => {
      prev += cur[prop];
      return prev;
    }, 0);
  }

  log() {
    const simpleSolution = {
      fitness: this.fitness().toFixed(0),
      calories: this.totalCalories.toFixed(0),
      protein: this.proteinPercent.toFixed(0),
      carbs: this.carbsPercent.toFixed(0),
      fat: this.fatPercent.toFixed(0)
    };
    console.log('Solution', JSON.stringify(simpleSolution, null, 2));
  }
}
