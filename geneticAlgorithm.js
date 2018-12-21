let genes = null
function nextGeneration(canvas, total, birds, size, color, diedBirds){
  // console.log('died', diedBirds)
  let fittest
  let n = -1
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
      let childBird
      if(i == 0){
        childBird = new bird(canvas, 20, 'rgba(0, 0, 255, 0.4)', brain)
      }else{
        childBird = new bird(canvas, 20, 'rgba(255, 255, 255, 0.4)', brain)
      }
      childBird.mutate(mutationRate)
      birds.push(childBird)
      n++
    }
    birds[n] = dropout(birds[n])
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
  let brain = new fnn(b.brain.neurons, b.brain.lr)
  let n = new bird(canvas, 20, 'rgba(255,0,0,0.4)', brain)
  return n
}
