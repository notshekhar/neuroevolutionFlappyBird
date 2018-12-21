let genes = null
function nextGeneration(canvas, total, birds, size, diedBirds){
  // console.log('died', diedBirds)
  let fittest
  if(genes){
    fittest = tenFittest(diedBirds, genes)
    genes = fittest
    // console.log(genes)
  }else{
    fittest = tenFittest(diedBirds)
    genes = fittest
  }
  //reprodusing new population
  for(let i=0; i<total/10; i++){
    let mutationRate = Math.random()*0.99
    for(let i=0; i<fittest.length; i++){
      let brain = fittest[i].brain.copy()
      let childBird = new bird(canvas, 20, brain)
      childBird.mutate(mutationRate)
      birds.push(childBird)
    }
  }
  for(let i=10; i<birds.length; i+=3){
    dropout(birds[i])
  }
}
function mostFittest(diedBirds){
  let fittest = null
  let n = 0
  for(let i=0; i<diedBirds.length; i++){
    if(diedBirds[i].score>n){
      n = i
      fittest = diedBirds[i]
    }
  }
  return {'fittest': fittest, 'number': n}
}
function tenFittest(diedBirds, genes){
  let dBirds = diedBirds
  let tfittest = []
  for(let i=0; i<10; i++){
    let fittest = mostFittest(dBirds)
    tfittest.push(fittest.fittest)
    dBirds.splice(fittest.number, 1)
  }
  if(genes){
    for(let i=0; i<3; i++){
      if(tfittest[i].score<genes[i].score){
        tfittest[tfittest.length-(i+1)] = genes[i]
        console.log('replaced')
      }
    }
  }
  return tfittest
}
function dropout(b){
  for(let k=0; k<b.brain.weights.length; k++){
    let i = Math.floor(Math.random()*b.brain.weights[k].rows)
    let j = Math.floor(Math.random()*b.brain.weights[k].cols)
    b.brain.weights[k].data[i][j] = 0
    b.brain.bias[k].data[i][j] = 0
  }
}
