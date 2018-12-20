class pipe {
  constructor(canvas, position) {
    this.limitW = canvas.width
    this.limitH = canvas.height
    this.x = canvas.width
    this.width = 40
    this.v = -6.0
    this.topHeight = Math.floor(Math.random()*((this.limitH/1.4)-(this.limitH/4)+1)+this.limitH/4)
    this.bottomY = this.topHeight+200
  }
  show(ctx){
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.rect(this.x, 0, this.width, this.topHeight)
    ctx.fill()
    ctx.beginPath()
    ctx.fillStyle = 'white'
    ctx.rect(this.x, this.bottomY, this.width, this.limitH)
    ctx.fill()
  }
  move(){
    this.x+=this.v
  }
  offscreen(){
    if(this.x<-40){
      return true
    }else{
      return false
    }
  }
  hits(bird){
    if(bird.y<this.topHeight || bird.y>this.bottomY){
      if(bird.x>this.x && bird.x<(this.x+this.width)){
        return true
      }
    }
  }
  fillColor(ctx, c){
    ctx.fillStyle = c
    ctx.fillRect(this.x, 0, this.width, this.topHeight)
    ctx.fillRect(this.x, this.bottomY, this.width, this.limitH)
    ctx.fill()
  }
}
