// CSS for chrome to avoid z fighting
const is_chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
if(is_chrome)
{
    document.write('<link rel="stylesheet" href="./styles/chrome.css" type="text/css" />')
}


// Get all DOM elements
const enterScreen = document.querySelector('.enterScreen')
const containerScreen = document.querySelector('.containerScreen')
const gridContainer = document.querySelector('.gridContainer')
const enterText = document.querySelector('.enterText')
const playerTurnClassA = document.querySelector('.playerTurnA')
const playerTurnClassB = document.querySelector('.playerTurnB')
const difEasy = document.querySelector('.difEasy')
// const difHard = document.querySelector('.difHard')
const dif1V1 = document.querySelector('.dif1V1')
const endGame = document.querySelector('.endGame')
const endGameText = document.querySelector('.endGameText')
const endGameRestart = document.querySelector('.endGameRestart')
const classWinA = document.querySelector('.classWinA')
const classWinB = document.querySelector('.classWinB')
const titleWinA = document.querySelector('.titleWinA')
const titleWinB = document.querySelector('.titleWinB')
const clickRight = document.querySelector('.clickRight')
const clickLeft = document.querySelector('.clickLeft')
const clickUp = document.querySelector('.clickUp')
const clickDown = document.querySelector('.clickDown')
const selectDash = document.querySelector('.dash4')
const startDash = document.querySelector('.dash5')
const buttonA = document.querySelector('.buttonA')
const buttonB = document.querySelector('.buttonB')
const gameBoyOnAudio = document.querySelector('.gameBoyOn')
const rotation = document.querySelector('.cube')


// Declaring variables
let colNumber = 2
let rowNumber = 2
let canPlay = 1
let nbPlay = 0
let canPlayBut = 1
let gameStart = 0
let gameModeSelect = 0
let restart = 0
let winner = ''
let countWinA = 0
let countWinB = 0
let playerTurn1v1 = 0
let screenOff = 0
let screenOnOff = 0
let count = 0
let count2 = 0

window.addEventListener('keydown', (event) =>
{
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

// Switch on off GameBoy


window.addEventListener('keydown', (event) =>
{
    if(event.code === 'Space')
    {
        startDash.style.boxShadow = 'inset 0px 0px 0px 1px #000000'
        screenOnOff++
        screenOff = 0
        countWinA = 0
        countWinB = 0
        classWinA.textContent = '0'
        classWinB.textContent = '0'
        if(screenOnOff%2 != 0)
        {
            enterText.style.display = 'none'
            enterScreen.style.display = 'none'
            containerScreen.style.background = '#262527'
            containerScreen.style.boxShadow = 'none'
            gridContainer.style.display = 'none';
            enterScreen.classList.remove('changeOpacity')
            resetGrid()
        }
        else if(screenOnOff%2 == 0)
        {
            // gridContainer.style.display = 'flex'
            enterScreen.classList.remove('changeOpacity')
            enterText.style.display = 'flex'
            enterScreen.style.display = 'block'
            containerScreen.style.background = 'linear-gradient(225deg, #e6f4fd 0%, #d5cccd 100%)'
            containerScreen.style.boxShadow = 'inset 6px 0px 13px #adb7be, inset -6px 0px 13px #c1cbd3'
        }
    }
})


playerATurn()
gameMode()

// Event listeners to make animation on the gameboy when you click
clickDown.addEventListener('mousedown', () =>
{
    clickDown.style.background = 'linear-gradient(to bottom, #00000000, #000000a0)'
    if (rowNumber < 3 && rowNumber >= 1) 
    {
        unselectBox()
        rowNumber = rowNumber + 1
        selectBox()
    }
})

clickDown.addEventListener('mouseup', () =>
{
    clickDown.style.background = 'none'
})

clickUp.addEventListener('mousedown', () =>
{
    clickUp.style.background = 'linear-gradient(to top, #00000000, #000000a0)'
    if (rowNumber <= 3 && rowNumber > 1) 
    {
        unselectBox()
        rowNumber = rowNumber - 1
        selectBox()
    }
})

clickUp.addEventListener('mouseup', () =>
{
    clickUp.style.background = 'none'
})

clickRight.addEventListener('mousedown', () =>
{
    clickRight.style.background = 'linear-gradient(to right, #00000000, #000000a0)'
    if (colNumber < 3 && colNumber >= 1) {
        unselectBox()
        colNumber = colNumber + 1
        selectBox()
    }
})

clickRight.addEventListener('mouseup', () =>
{
    clickRight.style.background = 'none'
})

clickLeft.addEventListener('mousedown', () =>
{
    clickLeft.style.background = 'linear-gradient(to left, #00000000, #000000a0)'
    if (colNumber <= 3 && colNumber > 1) 
    {
    unselectBox()
    colNumber = colNumber - 1
    selectBox()
    }
})

clickLeft.addEventListener('mouseup', () =>
{
    clickLeft.style.background = 'none'
})

buttonA.addEventListener('mousedown', () =>
{
    buttonA.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
    if (screenOff === 0) 
    {
        enterScreen.classList.toggle('changeOpacity')
        enterText.style.display = 'none'
        
        setTimeout(function()
        { 
            enterScreen.style.display = 'none' 
            gridContainer.style.display = 'flex' 
            screenOff = 1
        }, 3000)
    } 
    else 
    {
        buttonA.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
        if (restart === 0) 
        {
            verifBox()
        } 
        else 
        {        //if the game is finished, enter closes the message and restarts the game
            endGame.style.display = 'none'
            restart = 0
            resetGrid()
            canPlay = 1
        }
    }
})

buttonA.addEventListener('mouseup', () =>
{
    buttonA.style.boxShadow = 'inset 2px 1px 0px 1px #000000'
})

buttonB.addEventListener('mousedown', () =>
{
    buttonB.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
    if(gameStart === 0)
    {
        canPlayBut++
        if(canPlayBut%2 != 0)
        {
            playerATurn()
        } 
        else if(canPlayBut%2 == 0) 
        {
            computerTurn()
        }
    }
})

buttonB.addEventListener('mouseup', () =>
{
    buttonB.style.boxShadow = 'inset 2px 1px 0px 1px #000000'
})

selectDash.addEventListener('mousedown', () =>
{
    console.log('coucou')
    selectDash.style.boxShadow = 'inset 0px 0px 0px 1px #000000'
        {      //change game mode if you press this key
        gameMode()
    } 
})

selectDash.addEventListener('mouseup', () =>
{
    selectDash.style.boxShadow = 'inset 1px 1px 0px 1px #000000' 
})

startDash.addEventListener('mousedown', () =>
{
    startDash.style.boxShadow = 'inset 0px 0px 0px 1px #000000'
    {
        screenOnOff++
        screenOff = 0
        countWinA = 0
        countWinB = 0
        classWinA.textContent = '0'
        classWinB.textContent = '0'
        if(screenOnOff%2 != 0)
        {
            enterText.style.display = 'none'
            enterScreen.style.display = 'none'
            containerScreen.style.background = '#262527'
            containerScreen.style.boxShadow = 'none'
            gridContainer.style.display = 'none' 
            enterScreen.classList.remove('changeOpacity')
            resetGrid()
        }
        else if(screenOnOff%2 == 0)
        {
            // gridContainer.style.display = 'flex' 
            enterScreen.classList.remove('changeOpacity')
            enterText.style.display = 'flex'
            enterScreen.style.display = 'block'
            containerScreen.style.background = 'linear-gradient(225deg, #e6f4fd 0%, #d5cccd 100%)'
            containerScreen.style.boxShadow = 'inset 6px 0px 13px #adb7be, inset -6px 0px 13px #c1cbd3'
        }
    }
})

startDash.addEventListener('mouseup', () =>
{
    startDash.style.boxShadow = 'inset 1px 1px 0px 1px #000000' 
})


// Change the display color of player 
function playerATurn()
{
    playerTurnClassA.style.color = '#4c4d9f'
    playerTurnClassB.style.color = '#4c4d9f4D'
}

function playerBTurn()
{
    playerTurnClassA.style.color = '#4c4d9f4D'
    playerTurnClassB.style.color = '#4c4d9f'
}

// Change the mode of game
function gameMode()
{
    if(gameModeSelect === 0)
    {
        playerTurn1v1 = 0
        titleWinA.textContent = 'Win'
        titleWinB.textContent = 'Lose'
        gameModeSelect++
        dif1V1.style.opacity = '30%' 
        difEasy.style.opacity = '100%'
        resetGrid()
        countWinA = 0
        countWinB = 0
        classWinA.textContent = '0'
        classWinB.textContent = '0'
        endGameText.textContent = ''
        endGameRestart.textContent = ''
    } 
    else if (gameModeSelect === 1) 
    {
        gameModeSelect = 0
        difEasy.style.opacity = '30%' 
        dif1V1.style.opacity = '100%'
        titleWinA.textContent = 'A'
        titleWinB.textContent = 'B'
        resetGrid()
        countWinA = 0
        countWinB = 0
        classWinA.textContent = '0'
        classWinB.textContent = '0'
        endGameText.textContent = ''
        endGameRestart.textContent = ''
    } 
    // else if (gameModeSelect === 2)
    // {
    //     gameModeSelect = 0
    //     dif1V1.style.opacity = '30%' 
    //     difHard.style.opacity = '100%'
    //     resetGrid()
    // }
}

window.addEventListener('keydown', (event) =>
{
    if (event.code === 'ShiftRight') 
    {      //change game mode if you press this key
        gameMode()
        selectDash.style.boxShadow = 'inset 0px 0px 0px 1px #000000'
    } 
    else if (event.code === 'Backspace' && gameStart === 0)
    {      //to change who starts
        buttonB.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
        canPlayBut++
        if(canPlayBut%2 != 0)
        {
            playerATurn()
        } 
        else 
        {
            computerTurn()
        }
    } 
    else if (event.code === 'ArrowDown' && canPlay === 1) 
    { //arrows to move the box selection cursor
        clickDown.style.background = 'linear-gradient(to bottom, #00000000, #000000a0)'
        if (rowNumber < 3 && rowNumber >= 1) 
        {
            unselectBox()
            rowNumber = rowNumber + 1
            selectBox()
        }
    } 
    else if (event.code === 'ArrowUp' && canPlay === 1)
    {
        clickUp.style.background = 'linear-gradient(to top, #00000000, #000000a0)'
        if (rowNumber <= 3 && rowNumber > 1) 
        {
            unselectBox()
            rowNumber = rowNumber - 1
            selectBox()
        }
    } 
    else if (event.code === 'ArrowRight' && canPlay === 1)
    {
        clickRight.style.background = 'linear-gradient(to right, #00000000, #000000a0)'
        if (colNumber < 3 && colNumber >= 1) 
        {
            unselectBox()
            colNumber = colNumber + 1
            selectBox()
        }
    } 
    else if (event.code === 'ArrowLeft' && canPlay === 1)
    {
        clickLeft.style.background = 'linear-gradient(to left, #00000000, #000000a0)'
        if (colNumber <= 3 && colNumber > 1) 
        {
            unselectBox()
            colNumber = colNumber - 1
            selectBox()
        }
    } 
    else if (event.code === 'Enter')
    {
        buttonA.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
        if (screenOff === 0) 
        {
            enterScreen.classList.toggle('changeOpacity')
            enterText.style.display = 'none'; 
            gameBoyOnAudio.play()
            setTimeout(function()
            { 
                enterScreen.style.display = 'none'; 
                gridContainer.style.display = 'flex'; 
                screenOff = 1
            }, 3000);
        } 
        else 
        {
            buttonA.style.boxShadow = 'inset 0px 1px 0px 1px #000000'
            if (restart === 0) 
            {
                verifBox()
            } 
            else 
            {        //if the game is finished, enter closes the message and restarts the game
                endGame.style.display = 'none'
                restart = 0
                resetGrid()
                canPlay = 1
            }
        }
    }
})

// Effects in the button when we stop 
window.addEventListener('keyup', (event) =>
{
    if (event.code === 'ShiftRight') 
    {
        selectDash.style.boxShadow = 'inset 1px 1px 0px 1px #000000'
    } 
    else if (event.code === 'ArrowDown' && canPlay === 1) 
    { 
        clickDown.style.background = 'none'
    } 
    else if (event.code === 'ArrowUp' && canPlay === 1)
    {
        clickUp.style.background = 'none'
    } 
    else if (event.code === 'ArrowRight' && canPlay === 1)
    {
        clickRight.style.background = 'none'

    } 
    else if (event.code === 'ArrowLeft' && canPlay === 1)
    {
        clickLeft.style.background = 'none'
    } 
    else if (event.code === 'Space')
    {
        startDash.style.boxShadow = 'inset 1px 1px 0px 1px #000000' 
    }
    else if (event.code === 'Enter')
    {
        buttonA.style.boxShadow = 'inset 2px 1px 0px 1px #000000'
    }
    else if (event.code === 'Backspace')
    {
        buttonB.style.boxShadow = 'inset 2px 1px 0px 1px #000000'
    }
})

// erase the background color of the box if the player changes boxes
function unselectBox()
{
    const boxClass = `.col${colNumber}row${rowNumber}`
    const boxSelectorMem = document.querySelector(boxClass)
    boxSelectorMem.style.background = '#4c4d9f00'; 
}

// add background color of the box if the player select it
function selectBox()
{
    const boxClass = `.col${colNumber}row${rowNumber}`
    const boxSelector = document.querySelector(boxClass)
    boxSelector.style.background = '#4c4d9f4D'; 
}

// checks if the box selected by the player is already occupied
function verifBox()
{
    const boxClass = `.col${colNumber}row${rowNumber}`
    const boxState = boxArray.find(search => search.class == boxClass ).state
    const boxSelector = document.querySelector(boxClass)
    // if the box is equal to 0 then it is free
    if (boxState === '0') 
    {        //do not allow placement if the box is already in use
        if (playerTurn1v1 === 0) 
        {
            boxSelector.textContent = 'o'
            boxArray.find(search => search.class == boxClass ).state = '1'
        } 
        else 
        {
            boxSelector.textContent = 'x'
            boxArray.find(search => search.class == boxClass ).state = '2'
        }
        canPlay = 0
        nbPlay++
        unselectBox()
        winCheck()
        if (restart === 0) 
        {        //do not allow computer to play if the game is finished
            if (gameModeSelect === 0) 
            {
                canPlay = 1
                if (playerTurn1v1 === 0) 
                {
                    playerBTurn()
                    playerTurn1v1 = 1
                } 
                else 
                {
                    playerATurn()
                    playerTurn1v1 = 0
                }
            } 
            else {
                computerTurn()
            }
        }
    }
}



function computerTurn()
{
    gameStart = 1
    canPlay = 0
    playerBTurn()
    const freeBoxList = []
    setTimeout(function () 
    {        //the time it takes for the computer to play
        // if the total number of turns played is less than the number of boxes, then there are places left
        if (nbPlay < boxArray.length) 
        {
            for (i = 0; i <= boxArray.length-1; i++) 
            {
                const boxState = boxArray.find(search => search.nb == i ).state
                if (boxState === '0') 
                {        //get all unused classes from the boxArray and put them in freeBoxList
                    const freeBoxListElement = boxArray.find(search => search.nb == i ).class
                    freeBoxList.push(freeBoxListElement)
                }
            }
            nbPlay++
            if (gameModeSelect === 2) 
            {
                hardMode()
            } 
            else 
            {        //randomly draws a box from freeBoxList
                const randomElement = Math.floor(Math.random() * freeBoxList.length)
                const boxRandom = freeBoxList[randomElement]
                const boxSelector = document.querySelector(boxRandom)
                boxArray.find(search => search.class == boxRandom ).state = '2'
                boxSelector.textContent = 'x'
            }
            winCheck()
            playerATurn()
            canPlay = 1
        }
    }, 500)
}

function winCheck()
{
    const winCheckList = []
    for (i = 0; i <= boxArray.length-1; i++) 
    {     //get the states of each box in boxArray and put then in winCheckList
        const boxState = boxArray.find(search => search.nb == i ).state
        const freeBoxListElement = boxArray.find(search => search.nb == i ).state
        winCheckList.push(freeBoxListElement)
    }
    //check all winning combinations
    if (winCheckList[0] === winCheckList[1] && winCheckList[0] === winCheckList[2] && winCheckList[0] !== '0') 
    {
        if (winCheckList[0] === '1')
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[3] === winCheckList[4] && winCheckList[3] === winCheckList[5] && winCheckList[3] !== '0') 
    {
        if (winCheckList[3] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[6] === winCheckList[7] && winCheckList[6] === winCheckList[8] && winCheckList[6] !== '0') 
    {
        if (winCheckList[6] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[0] === winCheckList[3] && winCheckList[0] === winCheckList[6] && winCheckList[0] !== '0') 
    {
        if (winCheckList[0] === '1') {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[1] === winCheckList[4] && winCheckList[1] === winCheckList[7] && winCheckList[1] !== '0') 
    {
        if (winCheckList[1] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[2] === winCheckList[5] && winCheckList[2] === winCheckList[8] && winCheckList[2] !== '0') 
    {
        if (winCheckList[2] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[0] === winCheckList[4] && winCheckList[0] === winCheckList[8] && winCheckList[0] !== '0') 
    {
        if (winCheckList[0] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    } 
    else if (winCheckList[2] === winCheckList[4] && winCheckList[2] === winCheckList[6] && winCheckList[2] !== '0')
    {
        if (winCheckList[2] === '1') 
        {
            winner = 'A'
        } 
        else 
        {
            winner = 'B'
        }
        winFunct()
    }
    else if (nbPlay === 9)
    {
        endGame.style.display = 'flex'
        endGameText.textContent = 'Draw'
        restart = 1
    }
}

function winFunct()
{
    if (winner === 'A') 
    {
        if (gameModeSelect === 0) 
        {
            endGameText.textContent = 'A Win'
            endGameRestart.textContent = 'Press A to Restart'
        } 
        else 
        {
            endGameText.textContent = 'Win'
            endGameRestart.textContent = 'Press A to Restart'
        }
        countWinA++
        classWinA.textContent = countWinA
    } 
    else if (winner === 'B') 
    {
        if (gameModeSelect === 0) 
        {
            endGameText.textContent = 'B Win'
            endGameRestart.textContent = 'Press A to Restart'
        } 
        else 
        {
            endGameText.textContent = 'Lose'
            endGameRestart.textContent = 'Press A to Restart'
        }
        countWinB++
        classWinB.textContent = countWinB
    }
    restart = 1
    gameStart = 0
    canPlayBut = 1
    endGame.style.display = 'flex'
}

function resetGrid()
{
    for (i = 0; i <= boxArray.length-1; i++) 
    {
        //reset states of all boxs in boxArray
        boxArray.find(search => search.nb == i ).state = '0'
        const boxClass = boxArray.find(search => search.nb == i ).class
        const boxSelector = document.querySelector(boxClass)
        //reset display
        boxSelector.textContent = ''
    }
    nbPlay = 0
}

// function hardMode()
// {
//     console.log('hard')
// }