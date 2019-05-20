function nextGeneration(canvas) {
  console.log('next generation');
  calculateFitness();
  for (let i = 0; i < total; i++) {
    birds[i] = pickOne();
  }
  diedBirds = [];
}

function pickOne() {
  let index = 0;
  let r = Math.random(1);
  while (r > 0) {
    r = r - diedBirds[index].fitness;
    index++;
  }
  index--;
  let b = diedBirds[index];
  let child = new bird(canvas, 20, 'rgba(255, 255, 255, 0.3)',b.brain);
  child.mutate(0.9);
  return child;
}

function calculateFitness() {
  // Normalize all values
  let sum = 0;
  for (let bird of diedBirds) {
    sum += bird.fitness;
  }
  for (let bird of diedBirds) {
    bird.fitness = bird.fitness / sum;
  }
}
