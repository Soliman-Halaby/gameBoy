VANTA.TOPOLOGY({
  el: ".bg",
  mouseControls: true,
  touchControls: true,
  minHeight: 1000,
  minWidth: 1000,
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0x891e1e,
  backgroundColor: 0x0,
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

let caseList = ['.col1row1', '.col2row1', '.col3row1', '.col1row2', '.col2row2', '.col3row2', '.col1row3', '.col2row3', '.col3row3']
let colNumber = 2
let rowNumber = 2
let canPlay = 1
let nbPlay = 0
let canPlayBut = 1
let gameStart = 0
let gameModeSelect = 0

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
        gameModeSelect++
        difHard.style.opacity = '30%'; 
        difEasy.style.opacity = '100%';
    } else if (gameModeSelect === 1){
        gameModeSelect++
        difEasy.style.opacity = '30%'; 
        difMedi.style.opacity = '100%';
    } else if (gameModeSelect === 2){
        gameModeSelect = 0
        difMedi.style.opacity = '30%'; 
        difHard.style.opacity = '100%';
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
    if (event.code === 'ShiftRight') {
        gameMode()
        
    } else if (event.code === 'Slash' && gameStart === 0){
        // if the player want to start
        canPlayBut++
        if(canPlayBut%2 != 0){
            playerATurn()
            console.log('player');
            
        } else {
            computerTurn()
            console.log('computer');
        }
    } else if (event.code === 'ArrowDown' && canPlay === 1) {
        if (rowNumber < 3 && rowNumber >= 1) {
            unselectCase()
            rowNumber = rowNumber + 1
            selectCase()
        }
    } else if (event.code === 'ArrowUp' && canPlay === 1){
        if (rowNumber <= 3 && rowNumber > 1) {
            unselectCase()
            rowNumber = rowNumber - 1
            selectCase()
        }
    } else if (event.code === 'ArrowRight' && canPlay === 1){
        if (colNumber < 3 && colNumber >= 1) {
            unselectCase()
            colNumber = colNumber + 1
            selectCase()
        }
    } else if (event.code === 'ArrowLeft' && canPlay === 1){
        if (colNumber <= 3 && colNumber > 1) {
            unselectCase()
            colNumber = colNumber - 1
            selectCase()
        }
    } else if (event.code === 'Enter'){
        verifCase()
    }
})

// erase the background color of the box if the player changes boxes
function unselectCase(){
    const caseClass = '.col' + colNumber + 'row' + rowNumber
    const caseSelectorMem = document.querySelector(caseClass)
    caseSelectorMem.style.background = '#4c4d9f00'; 
    console.log(caseClass)
}

// add background color of the box if the player select it
function selectCase(){
    const caseClass = '.col' + colNumber + 'row' + rowNumber
    // console.log(caseClass);
    const caseSelector = document.querySelector(caseClass)
    console.log(caseSelector);
    caseSelector.style.background = '#4c4d9f4D'; 
}

// checks if the box selected by the player is already occupied
function verifCase(){
    const caseClass = '.col' + colNumber + 'row' + rowNumber
    const caseState = caseArray.find(search => search.class == caseClass ).state
    const caseSelector = document.querySelector(caseClass)
    // if the box is equal to 0 then it is free
    if (caseState === '0') {
        caseSelector.textContent = 'o'
        canPlay = 0
        nbPlay++
        caseArray.find(search => search.class == caseClass ).state = 1
        unselectCase()
        computerTurn()
        winCheck()
    } else {
        console.log('occupied');
        // canPlay = 0
        // playerBTurn()
        // unselectCase()
    }
}



function computerTurn(){
    gameStart = 1
    canPlay = 0
    playerBTurn()
    const newList = []
    setTimeout(function () {
        // if the total number of turns played is less than the number of boxes, then there are places left
        if (nbPlay < caseArray.length) {
            for (i = 0; i <= caseArray.length-1; i++) {
                const caseState = caseArray.find(search => search.nb == i ).state
                if (caseState === '0') {
                    const newListElement = caseArray.find(search => search.nb == i ).class
                    newList.push(newListElement)
                }
            }
            nbPlay++
            const randomElement = Math.floor(Math.random() * newList.length)
            const caseRandom = newList[randomElement];
            const caseSelector = document.querySelector(caseRandom)
            caseArray.find(search => search.class == caseRandom ).state = 2
            caseSelector.textContent = 'x'
            playerATurn()
            winCheck()
            canPlay = 1
        } else if (nbPlay >= caseArray.length){ //if the total number of turns played is greater than the number of boxes, then there are no more places
            console.log('cest fini');
        }
    }, 500)
}

function winCheck(){
    const newList2 = []
    for (i = 0; i <= caseArray.length-1; i++) {
        const caseState = caseArray.find(search => search.nb == i ).state
        const newListElement = caseArray.find(search => search.nb == i ).state
        newList2.push(newListElement)
    }
    console.log(newList2);
    if (newList2[0] === newList2[1] && newList2[0] === newList2[2] && newList2[0] !== '0') {
        winFunct()
        
    } else if (newList2[3] === newList2[4] && newList2[3] === newList2[5] && newList2[3] !== '0') {
        winFunct()
    } else if (newList2[6] === newList2[7] && newList2[6] === newList2[8] && newList2[6] !== '0') {
        winFunct()
    } else if (newList2[0] === newList2[3] && newList2[0] === newList2[6] && newList2[0] !== '0') {
        winFunct()
    } else if (newList2[1] === newList2[4] && newList2[1] === newList2[7] && newList2[1] !== '0') {
        winFunct()
    } else if (newList2[2] === newList2[5] && newList2[2] === newList2[8] && newList2[2] !== '0') {
        winFunct()
    } else if (newList2[0] === newList2[4] && newList2[0] === newList2[8] && newList2[0] !== '0') {
        winFunct()
    } else if (newList2[2] === newList2[4] && newList2[2] === newList2[6] && newList2[2] !== '0') {
        winFunct()
    }
}

function winFunct(){
    console.log('gg champion');
    
}