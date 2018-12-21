let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let pipes = new Array()
let minPopulation = 10
population = 30
let total = minPopulation*population
let diedBirds = []
let birds = []
for(let i=0; i<total; i++){
  birds.push(new bird(canvas, 20, 'rgba(255,255,255,0.4)'))
}
pipes.push(new pipe(canvas))
let hscore = 0
if(localStorage.getItem('hscore')){
  hscore = parseInt(localStorage.getItem('hscore'))
}
let score = 0
let generation = 1

function draw(){
  //clearing background every single frame
  ctx.clearRect(0,0,canvas.width,canvas.height)
  //showing pipes
  for(let i=pipes.length-1; i>0; i--){
    pipes[i].show(ctx)
    pipes[i].move()
  }
  //removing pipes
  for(let i=0; i<pipes.length; i++){
    if(pipes[i].offscreen()){
      pipes.splice(i, 1)
    }
  }
  //showing bird
  for(let i=0; i<birds.length; i++){
    birds[i].show(ctx)
    birds[i].fall()
    birds[i].think(pipes)
  }
  //updating high score and drawing on canvas
  ctx.font = '30px Arial'
  ctx.fillStyle = 'red'
  if(score>hscore){
    hscore=score
  }
  ctx.fillText(`HI-Score: ${hscore}, Score: ${score}, Generation: ${generation}`, 30, 30)
  //checking if any ball hits the pipe
  pipes.forEach(pipe=>{
    for(let i=0; i<birds.length; i++){
      if(pipe.hits(birds[i])){
        diedBirds.push(birds[i])
        birds.splice(i, 1)
        // console.log(diedBirds)
      }
    }
  })
  if(birds.length == 0){
    if(score==hscore || score-9 > hscore){
      localStorage.setItem('hscore', score)
    }
    nextGeneration(canvas, total, birds, 20, 'rgba(255,255,255,0.4)', diedBirds)
    generation++
    diedBirds = []
    pipes = []
    pipes.push(new pipe(canvas))
    score = 0
  }
  score++
}

setInterval(function(){
  draw()
}, 20)
setInterval(function(){
  pipes.push(new pipe(canvas))
}, 1200)
