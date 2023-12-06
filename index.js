const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = 1324
canvas.height = 600
c.fillStyle = 'white'
c.fillRect(0,0, canvas.width,canvas.height)

// ------------//
const image = new Image()
const playerImage = new Image()
image.src = './img/bg400.png'
playerImage.src = './img/playerDown.png'

class Sprite{
    constructor({position,velocity,image}){
        this.position = position
        this.image = image
    }
    draw(){
        c.drawImage(this.image,this.position.x,this.position.y)
    }
}

const background = new Sprite({position: {
    x:-590,
    y:-560
},
  image: image
})

const keys ={
    w:{
        pressed : false
    },
    a:{
        pressed : false
    },
    s:{
        pressed : false
    },
    d:{
        pressed : false
    }


}
function animate(){
    window.requestAnimationFrame(animate)
    background.draw()
    c.drawImage(playerImage,0,0,playerImage.width/4,playerImage.height,canvas.width/2 - (playerImage.width/4)/2,canvas.height/2-playerImage.height/2,playerImage.width/4,playerImage.height)
    
    if(keys.w.pressed){
        background.position.y =background.position.y + 7 
    }
    else if(keys.a.pressed){
        background.position.x = background.position.x +7
    }
    else if(keys.s.pressed){
        background.position.y = background.position.y -7
    }
    else if(keys.d.pressed){
        background.position.x = background.position.x -7
    }
    
}

animate()
window.addEventListener('keydown',(e)=> {
   // e= event
    if(e.key == 'w' || e.key == 'W'){
        keys.w.pressed =true
    }
    else if(e.key == 'a' || e.key == 'A'){
        keys.a.pressed =true
           }
    else if(e.key == 's' || e.key == 'S'){
        keys.s.pressed =true
        }
    else if(e.key == 'd' || e.key == 'D'){
        keys.d.pressed =true
        }
}
)

window.addEventListener('keyup', (e) => {
    if(e.key == 'w' || e.key == 'W'){
        keys.w.pressed =false
    }
    else if(e.key == 'a' || e.key == 'A'){
        keys.a.pressed =false
           }
    else if(e.key == 's' || e.key == 'S'){
        keys.s.pressed =false
        }
    else if(e.key == 'd' || e.key == 'D'){
        keys.d.pressed =false
        }
        //May use switch case
}
      
)
 
//----------//