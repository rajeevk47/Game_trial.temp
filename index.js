const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

//========================================================//

canvas.width = 1324
canvas.height = 600
c.fillStyle = 'white'
c.fillRect(0, 0, canvas.width, canvas.height)
//------------//
// function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
// }
// window.addEventListener("resize", resizeCanvas);
// resizeCanvas();

//=========================================================//
const collisionsMap = []
for (let i = 0; i < collisions.length; i += 160) {
    collisionsMap.push(collisions.slice(i, 160 + i))
}



class Boundary {
    static width = 24;
    static height =24;
    constructor({ position }) {
        this.position = position
        this.width = 24
        this.height = 24
    }
    draw() {
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
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

console.log(boundaries)

const image = new Image()
const playerImage = new Image()

image.src = './img/tiledrpg.png'
playerImage.src = './img/playerDown.png'

class Sprite {
    constructor({ position, velocity, image }) {
        this.position = position
        this.image = image
    }
    drawi() {
        c.drawImage(this.image, this.position.x, this.position.y)
    }
}

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y
    },
    image: image
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

// function rectangularcollision({rectangle1,rectangle2}){
//     return(
//         rectangle1.position.x + rectangle1.>=rectangle2.position.x &&
//         rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
//         rectangle1.position.y <=rectangle2.position.y + rectangle2.height &&
//     )
// }
const test = new Boundary({
    position:{
        x:400,
        y:400
    }
})

function animate() {
    window.requestAnimationFrame(animate)
    background.drawi()
    // boundaries.forEach(boundary => {
    //     boundary.draw()
    // })
    
    c.drawImage(playerImage, 0, 0, playerImage.width / 4, playerImage.height, canvas.width / 2 - (playerImage.width / 4) / 2, canvas.height / 2 - playerImage.height / 2, playerImage.width / 4, playerImage.height)

    if (keys.w.pressed) {
        background.position.y += 7
    }
    else if (keys.a.pressed) {
        background.position.x += 7
    }
    else if (keys.s.pressed) {
        background.position.y -= 7
    }
    else if (keys.d.pressed) {
        background.position.x -= 7
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