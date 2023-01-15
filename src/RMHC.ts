import Solution, { Target } from 'Solution';
import Food from 'Food';

interface Settings {
  iterations: number;
  mutationStrength: number;
}

export default function RMHC(foods: Food[], target: Target, settings: Settings) {
  const { iterations, mutationStrength } = settings;

  let bestSolution = new Solution(foods, target);
  bestSolution.initRandom();

  let i = 0;
  while (i < iterations) {
    const mutation = bestSolution.mutate(mutationStrength);
    if (mutation.fitness() < bestSolution.fitness()) {
      bestSolution = mutation;
    }
    i++;
  }

  return bestSolution;
}
