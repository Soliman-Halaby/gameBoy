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



const logoGameBoy = document.querySelector('.logoGameBoy')
const gridContainer = document.querySelector('.gridContainer')

window.addEventListener('keydown', (event) =>
{
    if (event.code === 'Enter') {
        logoGameBoy.classList.toggle('changeOpacity');
        
        setTimeout(function(){ 
            logoGameBoy.style.display = 'none'; 
            gridContainer.style.display = 'flex'; 
        }, 3000);
    }
})
