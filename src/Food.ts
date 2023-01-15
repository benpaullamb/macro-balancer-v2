export interface FoodOptions {
  name: string;
  weight?: number;
  nutritionPer100g: Nutrition;
}

export interface Nutrition {
  protein: number;
  carbs: number;
  fat: number;
}

export type IndexableProp = 'calories' | 'weight' | 'protein' | 'carbs' | 'fat';

export default class Food {
  name: string;
  weight: number;
  nutritionPer100g: {
    protein: number;
    carbs: number;
    fat: number;
  };

  get calories(): number {
    return this.protein * 4 + this.carbs * 4 + this.fat * 9;
  }
  get protein(): number {
    return (this.nutritionPer100g.protein / 100) * this.weight;
  }
  get carbs(): number {
    return (this.nutritionPer100g.carbs / 100) * this.weight;
  }
  get fat(): number {
    return (this.nutritionPer100g.fat / 100) * this.weight;
  }

  constructor({ name, nutritionPer100g, weight = 0 }: FoodOptions) {
    this.name = name;
    this.weight = weight;
    this.nutritionPer100g = { ...nutritionPer100g };
  }

  mutate(strength: number): Food {
    const props = { ...this };
    props.weight += Math.random() * strength - strength / 2;
    props.weight = Math.max(props.weight, 0);
    return new Food(props);
  }

  log() {
    const simpleFood = {
      calories: this.calories.toFixed(0),
      weight: this.weight.toFixed(0),
      protein: this.protein.toFixed(0),
      carbs: this.carbs.toFixed(0),
      fat: this.fat.toFixed(0)
    };
    console.log(this.name, JSON.stringify(simpleFood, null, 2));
  }
}
