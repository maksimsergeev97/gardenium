'use strict'
const cursor = document.querySelector('.cursor'),
      follower = document.querySelector('.aura'),
      links = document.querySelectorAll('a'),
      bodyElem = document.querySelector('body');

let mouseX = 0, mouseY = 0, posX = 0, posY = 0;

bodyElem.addEventListener('mousemove', e => {
    cursor.classList.remove('hidden');
    follower.classList.remove('hidden');
    mouseCoord(e);
  })

function mouseCoord(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

gsap.to({}, .01, {

  repeat: -1,
  onRepeat: () => {
    posX += (mouseX - posX) / 5;
    posY += (mouseY - posY) / 5;

    gsap.set(cursor, {
      css: {
        left: mouseX,
        top: mouseY
      }
    });
    gsap.set(follower, {
      css: {
        left: posX - 24,
        top: posY - 24
      }
    });
  }
})


links.forEach(link => {
    link.addEventListener('mouseover', () => {
      cursor.classList.add('active');
      follower.classList.add('active');    
    })
  
    link.addEventListener('mouseout', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');    
    })
  })
  
  bodyElem.addEventListener('mouseout', () => {
    cursor.classList.add('hidden');
    follower.classList.add('hidden');
  })
  