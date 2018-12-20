function nextGeneration(canvas, total, birds, size, diedBirds){
  // console.log(diedBirds)
  let fittest = mostFittest(diedBirds)
  // console.table(fittest.brain.weights[0].data)

  //reprodusing new population
  for(let i=total-1; i>-1; i--){
    let brain = diedBirds[i].brain.copy()
    let childBird = new bird(canvas, 20, brain)
    childBird.mutate(0.9)
    birds.push(childBird)

    //else

    // let brain = fittest.brain.copy()
    // let childBird = new bird(canvas, 20, brain)
    // let ran = Math.random()*0.9
    // childBird.mutate(ran)
    // // console.log('child');
    // // console.table(childBird.brain.weights[0].data)
    // birds.push(childBird)
    // childBird.dmutate(ran)
  }
}

function calculateFittness(diedBirds){
  let sum = 0
  diedBirds.forEach(bird=>{
    sum+=bird.score
  })
  diedBirds.forEach(bird=>{
    bird.fittness = sum/bird.score
  })
}
function mostFittest(diedBirds){
  let fittest = null
  let n = 0
  for(let i=0; i<diedBirds.length; i++){
    if(diedBirds[i].score>n){
      n = diedBirds[i].score
      fittest = diedBirds[i]
    }
  }
  return fittest
}
