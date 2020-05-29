
const rotation = document.querySelector('.cube')
window.addEventListener('mousemove', (event) =>
{
    const rotateY = (event.clientX / window.innerWidth - 0.5) * 720
    const rotateX = - (event.clientY / window.innerHeight - 0.5) * 180
    rotation.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg)`
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
