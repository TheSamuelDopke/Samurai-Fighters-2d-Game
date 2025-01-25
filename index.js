const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

var endGame

var playerAttack

var started = false

var timeoutStarted = false

function limitDigits(input) {
    
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3); 
    }
  }

const startGame = document.querySelector('.startGame')
const menu = document.querySelector('.menu')
var resultElement = document.querySelector('.result')


var settingsButton = document.querySelector('.settingsButton')
var menuConfigsBackButton = document.querySelector('.menuConfigs-back')
var menuConfigs = document.querySelector('.menuConfigs')
var menuStart = document.querySelector('.menuStart')


startGame.addEventListener('click', () =>{
    
    if(menu.style.display !== 'none'){
        menu.style.display = 'none'
    }

    resultElement.style.opacity = '1'
    resultElement.style.display = 'none'
    timeoutStarted = false

    if(started !== true){
        restartGame()
    }
    started = true
    
})

settingsButton.addEventListener('click', () =>{
    if(menuStart.style.display !== 'none'){
        menuStart.style.display = 'none'
        menuConfigs.style.display = 'flex'
    }
})

menuConfigsBackButton.addEventListener('click', () =>{
    if(menuConfigs.style.display !== 'none'){
        menuStart.style.display = 'flex'
        menuConfigs.style.display = 'none'
    }
})

var damage = 20

var menuConfigsApply = document.querySelector('.menuConfigs-apply')
var inputTimer = document.querySelector('.inputTimer')
var inputDamage = document.querySelector('.inputDamage')



function attTimer(){
   timer = parseInt(inputTimer.value) || 60
   document.querySelector('.timer').innerHTML = timer
}


menuConfigsApply.addEventListener('click', () =>{

    attTimer()
    damage = inputDamage.value
    if(menuConfigs.style.display !== 'none'){
        menuStart.style.display = 'flex'
        menuConfigs.style.display = 'none'
    }

})


function callofDetermine(){
    if(!timeoutStarted){
        timeoutStarted = true

                endGame = setTimeout(() => {      
                resultElement.style.transition = 'opacity 2s ease';
                resultElement.style.opacity = '0';

                if(resultElement.style.opacity == '0'){
                    setTimeout(() =>{
                        if(menu.style.display !== 'flex'){
                            menu.style.display = 'flex'
                        }
                        resultElement.style.display = 'none'
                        attTimer()
                        
                    }, 2000)
                    
            }

    
}, 3000);}}


function restartGame(){
    player.position.x = 50
    enemy.position.x = canvas.width - 80
    player.dead = false
    enemy.dead = false
    document.querySelector('.player-health').style.width = '100%'
    document.querySelector('.player2-health').style.width = '100%'
    player.restart()
    enemy.restart()
    player.health = 100
    enemy.health = 100
    
    timer = parseInt(inputTimer.value)
    timerId = setTimeout(decreaseTimer, 1000)
}

 
canvas.width = 1024
canvas.height = 576

ctx.fillStyle = 'black'
ctx.fillRect(0, 0, canvas.width, canvas.height)

const gravity = 0.7

const velocity = 0

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
})

const shop = new Sprite({
    position: {
        x: 600,
        y: 97
    },
    imageSrc: './img/shop.png',
    scale: 3,
    framesMax: 6
})



const player = new Fighter({
    position: {
        x: 50,
        y: 0
    },
    velocity: {
        x: velocity,
        y: velocity
    },
    imageSrc: './img/samuraiMack/Idle.png',
    framesMax: 8,
    scale: 2.3,
    offset: {
        x: 216, //x 216, y 137
        y: 137
    },
    framesHold: 8,
    attackBox: {
        offset:{
            x: 30,
            y: -10
        },
        width: 190,
        height: 130
    },
    sprites: {
        idle: {
            imageSrc: './img/samuraiMack/Idle.png',
            framesMax: 8,
        },
        run: {
            imageSrc: './img/samuraiMack/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/samuraiMack/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/samuraiMack/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/samuraiMack/Attack1.png',
            framesMax: 6,
        },
        takeHit:{
            imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
            framesMax: 4,
        },
        death:{
            imageSrc: './img/samuraiMack/Death.png',
            framesMax: 6,
        }

    }
})

const enemy = new Fighter({
    position: {
        x: canvas.width - 80,
        y: 0
    },
    velocity: {
        x: velocity,
        y: velocity
    },
    imageSrc: './img/kenji/Idle.png',
    framesMax: 4,
    scale: 2.3,
    offset: {
        x: 216, //   x: 216,y: 147
        y: 147
    },
    framesHold: 10,
    attackBox: {
        offset:{
            x: -175,
            y: 5
        },
        width: 175,
        height: 140
    },
    sprites: {
        idle: {
            imageSrc: './img/kenji/Idle.png',
            framesMax: 4,
        },
        run: {
            imageSrc: './img/kenji/Run.png',
            framesMax: 8,
        },
        jump: {
            imageSrc: './img/kenji/Jump.png',
            framesMax: 2,
        },
        fall: {
            imageSrc: './img/kenji/Fall.png',
            framesMax: 2,
        },
        attack1: {
            imageSrc: './img/kenji/Attack1.png',
            framesMax: 4,
        },
        takeHit:{
            imageSrc: './img/kenji/Takehit.png',
            framesMax: 3,
        },
        death:{
            imageSrc: './img/kenji/Death.png',
            framesMax: 7,
        }
    }


})

const keys = {
    a: {
        pressed: false
    },

    d: {
        pressed: false
    },

    arrowright:{
        pressed: false
    },

    arrowleft: {
        pressed: false
    }
}

//Is in utils.js
//decreaseTimer()
var timeOver = false

function animate(){
    window.requestAnimationFrame(animate)
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    enemy.update()
    player.update()
    


    //Player 1 movement
    player.velocity.x = 0
    
    
    if(keys.a.pressed && player.lastKey == 'a'){
        player.velocity.x = -5
        player.switchSprite('run')
    }else if(keys.d.pressed && player.lastKey == 'd'){
        player.velocity.x = 5
        player.switchSprite('run')
    }else{
        player.switchSprite('idle')
 
    }

    if(player.velocity.y == 0){
        player.jumping = 0
    }else if(player.velocity.y < 0){
        player.switchSprite('jump')
    }else if(player.velocity.y > 3.5 ){
        player.switchSprite('fall')
    }

    //Player 2 movement
    enemy.velocity.x = 0
    if(keys.arrowright.pressed && enemy.lastKey == 'arrowright'){
        enemy.velocity.x = 5
        enemy.switchSprite('run')
    }else if(keys.arrowleft.pressed && enemy.lastKey == 'arrowleft'){
        enemy.velocity.x = -5
        enemy.switchSprite('run')
    }else{
        enemy.switchSprite('idle')

    }

    if(enemy.velocity.y == 0){
        enemy.jumping = 0
    }else if(enemy.velocity.y < 0){
        enemy.switchSprite('jump')
    }else if(enemy.velocity.y > 3.5 ){
        enemy.switchSprite('fall')
    }


     //---Detect for collision
     //Player 1
     if(rectangularCollision({
        rectangle1: player, rectangle2: enemy}) && 
        player.isAttacking && player.framesCurrent == 4) {

        if(player.health <= 0){return}else{
            enemy.takeHit()
            player.isAttacking = false
            //Using gsap to animate the health bar
            //document.querySelector('.player2-health').style.width = enemy.health + '%'
            gsap.to('.player2-health', {
                width: enemy.health + '%'
            })

        }
     }else if(player.isAttacking && player.framesCurrent == 4){
        player.isAttacking = false
     }

     

     //Player 2
     if(rectangularCollision
    ({rectangle1: enemy, rectangle2: player}) && 
     enemy.isAttacking && 
     enemy.framesCurrent == 2) {

        if(enemy.health <= 0){return}
        else{
            player.takeHit()

            
            
            enemy.isAttacking = false
     
            //Using gsap to animate the health bar
            //document.querySelector('.player-health').style.width = player.health + '%'
            gsap.to('.player-health', {
                width: player.health + '%',
                duration: 0.5
            })

            

        }

     }else if(enemy.isAttacking && enemy.framesCurrent == 2){
   
        enemy.isAttacking = false

     }

     if(enemy.health <= 0 || player.health <= 0){
        determineWinner({player, enemy, timerId})
    }
 


    console.log(player.health, enemy.health)
}
animate()



//Keys control

window.addEventListener('keydown', (event) =>{
    const key = event.key.toLowerCase()

    if(player.health > 0 && !timeOver && started){
    switch (key){
        case 'd': 
            keys.d.pressed = true
            player.lastKey = 'd'
            break

        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break

        case 'w':
            if(player.jumping < 2){
            player.jumping++
            player.velocity.y = -15
        }
            break

        case ' ':
            if(player.isAttacking == false){
                player.attack()
                player.lastKey = ' '
            }
            break

    }}

    if(enemy.health > 0 && !timeOver && started){
    switch(key){
        case 'arrowright':
            keys.arrowright.pressed = true
            enemy.lastKey = 'arrowright'
            break

        case 'arrowleft':
            keys.arrowleft.pressed = true
            enemy.lastKey = 'arrowleft'
            break

        case 'arrowup':
            if(enemy.jumping < 2){
                enemy.jumping++
                enemy.velocity.y = -15
            }
            break

        case 'enter':
                if(enemy.isAttacking == false){
                    enemy.attack()
                    enemy.lastKey = 'enter'
                }
            break
        }}
})

window.addEventListener('keyup', (event) =>{
    const key = event.key.toLowerCase()


    switch (key){
        case 'd':
            keys.d.pressed = false
            break

        case 'a':
            keys.a.pressed = false
            break

        case 'arrowright':
            keys.arrowright.pressed = false
            break
    
        case 'arrowleft':
            keys.arrowleft.pressed = false
            break
    }
})
