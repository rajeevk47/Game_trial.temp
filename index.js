const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//==========================//

// canvas.width = 1324
// canvas.height = 600
// c.fillStyle = 'white'
// c.fillRect(0, 0, canvas.width, canvas.height)

//=========================//

//====================Resize=========================//
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

//=============================================//

const collisionsMap = []
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i)) 
}


const offset = {
    x: -810,
    y : -900
}

const boundaries = []
collisionsMap.forEach((row, i) => {
    row.forEach((Symbol, j) => {
        if(Symbol === 2227){
        boundaries.push(new Boundary({
            position: {
                x: j * Boundary.width + offset.x,
                y: i * Boundary.height + offset.y
            }
        })
        )}
    })
})

const image = new Image()
const playerImage = new Image()
const Foreground = new Image()

image.src = './img/ok.png'
playerImage.src = './img/playerDown.png'
Foreground.src = './img/foreground.png'

const player = new Sprite({
    position:{
        x: canvas.width / 2 - (playerImage.width / 4) / 2,
        y: canvas.height / 2 - playerImage.height / 2
    },
    image : playerImage,
    frames:{
        max:4
    }

})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: Foreground
})

const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }

}

const movableitems = [background,...boundaries , foreground]

function rectangularcollision({rectangle1,rectangle2}){
    return(
        rectangle1.position.x + rectangle1.width>=rectangle2.position.x &&
        rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.position.y+ rectangle1.height/1.5 <=rectangle2.position.y + rectangle2.height &&
        rectangle1.position.y + rectangle1.height/1.1>= rectangle2.position.y
    )
}

function animate() {
    window.requestAnimationFrame(animate)
    background.draw()
    boundaries.forEach(boundary => {
        boundary.draw()})

    player.draw()
    foreground.draw()
    let moving = true
    if (keys.w.pressed) {
        for(let i=0 ;i <boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularcollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y+7}
                   }
                 }
               )
            ){
                console.log('collide')
                moving =false
                break
            }
                }
    if(moving){
        movableitems.forEach(movable =>{
            movable.position.y+=7
        })}
    }
    else if (keys.s.pressed) {
        for(let i=0 ;i <boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularcollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{x:boundary.position.x ,y:boundary.position.y-7}
                   }
                 }
               )
            ){
                console.log('collide')
                moving =false
                break
            }
                }
        if(moving){
        movableitems.forEach(movable =>{
            movable.position.y-=7
        })}
    }
    else if (keys.a.pressed) {
        for(let i=0 ;i <boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularcollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{x:boundary.position.x+7 ,y:boundary.position.y}
                   }
                 }
               )
            ){
                console.log('collide')
                moving =false
                break
            }
                }
        if(moving){
        movableitems.forEach(movable =>{
            movable.position.x+=7
        })}
    }
    else if (keys.d.pressed) {
        for(let i=0 ;i <boundaries.length;i++){
            const boundary = boundaries[i]
            if(rectangularcollision({
                rectangle1: player,
                rectangle2: {...boundary, position:{x:boundary.position.x-7 ,y:boundary.position.y}
                   }
                 }
               )
            ){
                console.log('collide')
                moving =false
                break
            }
                }
        if(moving){
        movableitems.forEach(movable =>{
            movable.position.x-=7
        })}
    }

}

animate()
window.addEventListener('keydown', (e) => {
    // e= event
    switch (e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = true
            break
        case 'a':
            keys.a.pressed = true
            break
        case 's':
            keys.s.pressed = true
            break
        case 'd':
            keys.d.pressed = true
            break
    }
}
)

window.addEventListener('keyup', (e) => {
    // e= event
    switch (e.key.toLowerCase()) {
        case 'w':
            keys.w.pressed = false
            break
        case 'a':
            keys.a.pressed = false
            break
        case 's':
            keys.s.pressed = false
            break
        case 'd':
            keys.d.pressed = false
            break
    }
}
)



//----------//