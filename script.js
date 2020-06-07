VANTA.WAVES({
  el: ".bg",
  mouseControls: true,
  touchControls: true,
  minHeight: 800.00,
  minWidth: 200.00,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x8c8566,
  shininess: 0.00,
  waveHeight: 10.00,
  waveSpeed: 0.65,
  zoom: 0.65
})

const is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
if(is_chrome)
{
    document.write('<link rel="stylesheet" href="./chrome.css" type="text/css" />')
}


const rotation = document.querySelector('.cube')
let count = 0
let count2 = 0

window.addEventListener('keydown', (event) =>
{
    console.log(count)
    if(event.code === 'KeyW')
    {
        count += 30
        console.log(count)
        rotation.style.transform = `rotateY(${count}deg)`
    }
    if(event.code === 'KeyS')
    {
        count2 += 30
        rotation.style.transform = `rotateX(${count2}deg)`
    }
})
const enterScreen = document.querySelector('.enterScreen')
const gridContainer = document.querySelector('.gridContainer')
const enterText = document.querySelector('.enterText')
const playerTurnClassA = document.querySelector('.playerTurnA')
const playerTurnClassB = document.querySelector('.playerTurnB')
const difEasy = document.querySelector('.difEasy')
const difMedi = document.querySelector('.difMedi')
const difHard = document.querySelector('.difHard')
const endGame = document.querySelector('.endGame')
const endGameText = document.querySelector('.endGameText')
const classWinA = document.querySelector('.classWinA')
const classWinB = document.querySelector('.classWinB')
const titleWinA = document.querySelector('.titleWinA')
const titleWinB = document.querySelector('.titleWinB')

let colNumber = 2
let rowNumber = 2
let canPlay = 1
let nbPlay = 0
let canPlayBut = 1
let gameStart = 0
let gameModeSelect = 2
let restart = 0
let winner = ''
let countWinA = 0
let countWinB = 0
let playerTurn1v1 = 0

playerATurn()
gameMode()



// Change the display color of player 
function playerATurn(){
    playerTurnClassA.style.color = '#4c4d9f'
    playerTurnClassB.style.color = '#4c4d9f4D'
}

function playerBTurn(){
    playerTurnClassA.style.color = '#4c4d9f4D'
    playerTurnClassB.style.color = '#4c4d9f'
}

// Change the mode of game
function gameMode(){
    if(gameModeSelect === 0){
        playerTurn1v1 = 0
        titleWinA.textContent = 'Win'
        titleWinB.textContent = 'Lose'
        gameModeSelect++
        difHard.style.opacity = '30%'; 
        difEasy.style.opacity = '100%';
        resetGrid()
    } else if (gameModeSelect === 1){
        gameModeSelect++
        difEasy.style.opacity = '30%'; 
        difMedi.style.opacity = '100%';
        resetGrid()
    } else if (gameModeSelect === 2){
        titleWinA.textContent = 'A'
        titleWinB.textContent = 'B'
        gameModeSelect = 0
        difMedi.style.opacity = '30%'; 
        difHard.style.opacity = '100%';
        resetGrid()
    }
}


window.addEventListener('keydown', (event) =>
{
    if (event.code === 'Space') {
        enterScreen.classList.toggle('changeOpacity');
        enterText.style.display = 'none'; 
        
        setTimeout(function(){ 
            enterScreen.style.display = 'none'; 
            gridContainer.style.display = 'flex'; 
        }, 3000);
    }
})


window.addEventListener('keydown', (event) =>
{
    if (event.code === 'ShiftRight') {      //change game mode if you press this key
        gameMode()
    } else if (event.code === 'Slash' && gameStart === 0){      //to change who starts
        canPlayBut++
        if(canPlayBut%2 != 0){
            playerATurn()
            console.log('player');
            
        } else {
            computerTurn()
            console.log('computer');
        }
    } else if (event.code === 'ArrowDown' && canPlay === 1) { //arrows to move the box selection cursor
        if (rowNumber < 3 && rowNumber >= 1) {
            unselectBox()
            rowNumber = rowNumber + 1
            selectBox()
        }
    } else if (event.code === 'ArrowUp' && canPlay === 1){
        if (rowNumber <= 3 && rowNumber > 1) {
            unselectBox()
            rowNumber = rowNumber - 1
            selectBox()
        }
    } else if (event.code === 'ArrowRight' && canPlay === 1){
        if (colNumber < 3 && colNumber >= 1) {
            unselectBox()
            colNumber = colNumber + 1
            selectBox()
        }
    } else if (event.code === 'ArrowLeft' && canPlay === 1){
        if (colNumber <= 3 && colNumber > 1) {
            unselectBox()
            colNumber = colNumber - 1
            selectBox()
        }
    } else if (event.code === 'Enter'){
        if (restart === 0) {
            verifBox()
        } else {        //if the game is finished, enter closes the message and restarts the game
            endGame.style.display = 'none'
            restart = 0
            resetGrid()
            canPlay = 1
        }
    }
})

// erase the background color of the box if the player changes boxes
function unselectBox(){
    const boxClass = '.col' + colNumber + 'row' + rowNumber
    const boxSelectorMem = document.querySelector(boxClass)
    boxSelectorMem.style.background = '#4c4d9f00'; 
}

// add background color of the box if the player select it
function selectBox(){
    const boxClass = '.col' + colNumber + 'row' + rowNumber
    const boxSelector = document.querySelector(boxClass)
    boxSelector.style.background = '#4c4d9f4D'; 
}

// checks if the box selected by the player is already occupied
function verifBox(){
    const boxClass = '.col' + colNumber + 'row' + rowNumber
    const boxState = boxArray.find(search => search.class == boxClass ).state
    const boxSelector = document.querySelector(boxClass)
    // if the box is equal to 0 then it is free
    if (boxState === '0') {        //do not allow placement if the box is already in use
        if (playerTurn1v1 === 0) {
            boxSelector.textContent = 'o'
            boxArray.find(search => search.class == boxClass ).state = '1'
        } else {
            boxSelector.textContent = 'x'
            boxArray.find(search => search.class == boxClass ).state = '2'
        }
        canPlay = 0
        nbPlay++
        unselectBox()
        winCheck()
        if (restart === 0) {        //do not allow computer to play if the game is finished
            if (gameModeSelect === 0) {
                canPlay = 1
                if (playerTurn1v1 === 0) {
                    playerBTurn()
                    playerTurn1v1 = 1
                } else {
                    playerATurn()
                    playerTurn1v1 = 0
                }
            } else {
                computerTurn()
            }
        }
    }
}



function computerTurn(){
    gameStart = 1
    canPlay = 0
    playerBTurn()
    const freeBoxList = []
    setTimeout(function () {        //the time it takes for the computer to play
        // if the total number of turns played is less than the number of boxes, then there are places left
        if (nbPlay < boxArray.length) {
            for (i = 0; i <= boxArray.length-1; i++) {
                const boxState = boxArray.find(search => search.nb == i ).state
                if (boxState === '0') {        //get all unused classes from the boxArray and put them in freeBoxList
                    const freeBoxListElement = boxArray.find(search => search.nb == i ).class
                    freeBoxList.push(freeBoxListElement)
                }
            }
            nbPlay++
            if (gameModeSelect === 2) {
                hardMode()
            } else {        //randomly draws a box from freeBoxList
                const randomElement = Math.floor(Math.random() * freeBoxList.length)
                const boxRandom = freeBoxList[randomElement];
                const boxSelector = document.querySelector(boxRandom)
                boxArray.find(search => search.class == boxRandom ).state = '2'
                boxSelector.textContent = 'x'
            }
            winCheck()
            playerATurn()
            canPlay = 1
        } else if (nbPlay >= boxArray.length){ //if the total number of turns played is greater than the number of boxes, then there are no more places
            console.log('cest fini');
        }
    }, 500)
}

function winCheck(){
    const winCheckList = []
    for (i = 0; i <= boxArray.length-1; i++) {     //get the states of each box in boxArray and put then in winCheckList
        const boxState = boxArray.find(search => search.nb == i ).state
        const freeBoxListElement = boxArray.find(search => search.nb == i ).state
        winCheckList.push(freeBoxListElement)
    }
    //check all winning combinations
    if (winCheckList[0] === winCheckList[1] && winCheckList[0] === winCheckList[2] && winCheckList[0] !== '0') {
        if (winCheckList[0] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[3] === winCheckList[4] && winCheckList[3] === winCheckList[5] && winCheckList[3] !== '0') {
        if (winCheckList[3] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[6] === winCheckList[7] && winCheckList[6] === winCheckList[8] && winCheckList[6] !== '0') {
        if (winCheckList[6] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[0] === winCheckList[3] && winCheckList[0] === winCheckList[6] && winCheckList[0] !== '0') {
        if (winCheckList[0] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[1] === winCheckList[4] && winCheckList[1] === winCheckList[7] && winCheckList[1] !== '0') {
        if (winCheckList[1] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[2] === winCheckList[5] && winCheckList[2] === winCheckList[8] && winCheckList[2] !== '0') {
        if (winCheckList[2] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[0] === winCheckList[4] && winCheckList[0] === winCheckList[8] && winCheckList[0] !== '0') {
        if (winCheckList[0] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    } else if (winCheckList[2] === winCheckList[4] && winCheckList[2] === winCheckList[6] && winCheckList[2] !== '0') {
        if (winCheckList[2] === '1') {
            winner = 'A'
        } else {
            winner = 'B'
        }
        winFunct()
    }
}

function winFunct(){
    if (winner === 'A') {
        if (gameModeSelect === 0) {
            endGameText.textContent = 'PA Win'
        } else {
            endGameText.textContent = 'Win'
        }
        countWinA++
        classWinA.textContent = countWinA
    } else if (winner === 'B') {
        if (gameModeSelect === 0) {
            endGameText.textContent = 'PB Win'
        } else {
            endGameText.textContent = 'Lose'
        }
        countWinB++
        classWinB.textContent = countWinB
    }
    restart = 1
    gameStart = 0
    canPlayBut = 1
    endGame.style.display = 'flex'
    console.log('gg champion');

}

function resetGrid(){
    for (i = 0; i <= boxArray.length-1; i++) {
        //reset states of all boxs in boxArray
        boxArray.find(search => search.nb == i ).state = '0'
        const boxClass = boxArray.find(search => search.nb == i ).class
        const boxSelector = document.querySelector(boxClass)
        //reset display
        boxSelector.textContent = ''
    }
    nbPlay = 0
}

function hardMode(){
    console.log('hard');
}