'use strict'

const burgerIcon = document.querySelector('.burger-menu-icon');
const burgerMenu = document.querySelector('.burger-menu');
const body = document.querySelector('body');

burgerIcon.addEventListener('click', () => {
  burgerIcon.classList.toggle('burger-menu-icon-active');
  burgerMenu.classList.toggle('burger-menu-active');
  body.classList.toggle('overflow')
})