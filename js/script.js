let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () =>  {
    menu.classList.toggle('bx-x')
    navlist.classList.toggle('open')
}
const src = ScrollReveal({
    distance: '65px' ,
    duration: 2600,
    delay: 450,
    reset: true
  
  });
  sr.reavel('.title', {delay:200, origin: top});