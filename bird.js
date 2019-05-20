class bird {
  constructor(canvas, size, color, brain) {
    this.x = 200
    this.color = color
    this.y = canvas.height/2
    this.limitH = canvas.height
    this.limitW = canvas.width
    this.v = 0
    this.resistance = 0.90
    this.gravity = 2.0
    this.r = size
    if(brain){
      this.brain = brain.copy()
    }else{
      this.brain = new fnn([4, 10, 1])
    }
    this.fitness = 0
  }
  show(ctx){
    // console.log(this)
    ctx.beginPath()
    ctx.fillStyle = this.color
    ctx.strokeStyle = 'white'
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI)
    ctx.fill()
    ctx.stroke()
  }
  fall(){
    this.fitness++
    this.v += this.gravity
    this.v *= this.resistance
    this.y += this.v
    if(this.y>this.limitH-15){
      this.v = 0
      this.gravity = 0
    }else if(this.y<10){
      this.y = 10
    }
  }
  up(){
    this.v = -25
    this.gravity = 2.0
  }
  think(pipes){
    //finding the closes pipe
    let closest = null
    let closestDistance = Infinity
    pipes.forEach(pipe=>{
      let d = pipe.x - this.x
      if(d<closestDistance && d>0){
        closestDistance = d
        closest = pipe
      }
    })
    let inputs = [this.y/this.limitH, closest.x/this.limitW, closest.bottomY/this.limitH, closest.topHeight/this.limitH]
    let  output = this.brain.query(inputs)
    if(output[0]>0){
      this.up()
    }
  }
  mutate(x){
    function func(y){
      return y*x
    }
    this.brain.mutate(func)
  }

}
