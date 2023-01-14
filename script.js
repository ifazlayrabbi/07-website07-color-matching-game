'use strict'

const colors = ['red', 'blue', 'green', 'yellow']
let gamePattern = []
let userClickedPattern = []




let level = 1
let count1 = 0

function nextSequence(){
    let rand = Math.floor(Math.random()*4)
    let randomChosenColor = colors[rand]

    gamePattern[count1] = randomChosenColor
    count1++

    $('.' + randomChosenColor).fadeOut(500).fadeIn(500).fadeOut(500).fadeIn(500)
    playSound(randomChosenColor)

    $('#level-title').text('Level ' + level)
    level++
}
// nextSequence()



let count2=0

$('.btn').click(function(){
    let userClickedColor = this.id

    userClickedPattern[count2] = userClickedColor
    count2++

    playSound(userClickedColor)
    animation(userClickedColor)
    checkAnswer(userClickedPattern.length-1)
})



let start = false

$(document).keydown(function(){
    if(!start){
        nextSequence()
        start = true
    }
})



function playSound(colorName){
    var sound = new Audio('sounds/'  + colorName + '.mp3')
    sound.play()
}

function animation(colorName){
    $('.' + colorName).addClass('pressed')
    setTimeout(function(){
        $('.' + colorName).removeClass('pressed')
    }, 100)
}





function checkAnswer(currentColor){

    // console.log('gamePattern length = ' + gamePattern.length)
    // console.log('userClickedPattern length = ' + userClickedPattern.length)
    // console.log('gamePattern['+ currentColor + '] = ' + gamePattern[currentColor])
    // console.log('userClickedPattern['+ currentColor + '] = ' + userClickedPattern[currentColor])
    
    if (gamePattern[currentColor] == userClickedPattern[currentColor]){
        if(userClickedPattern.length == gamePattern.length){
            console.log('success !!')
            
            setTimeout(function(){
                nextSequence()
            }, 1000) 
        }
    }
    else{
        console.log('Error !')
        playSound('error')

        $('body').addClass('game-over')
        setTimeout(function(){
            $('body').removeClass('game-over')
        },1000)
        
        $('#level-title').text('Game over, Enter a key to restart')
        restart()
    }
}

function restart(){
    gamePattern = []
    userClickedPattern = []
    start = false
    level = 1
    count1 = 0
    count2 = 0
}

