// Targeting the navigation menu to make it responsive 
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector("nav");
const navIcon = document.querySelectorAll('.navIcon');
const hamburger = document.querySelector("#hamburger");

const submenu1 = document.getElementById("sub-menu1");
const submenu2 = document.getElementById("sub-menu2");
const submenu3 = document.getElementById("sub-menu3");

const submenus1 = document.querySelector(".submenu-content1");
const submenus2 = document.querySelector(".submenu-content2");
const submenus3 = document.querySelector(".submenu-content3");


navToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    navIcon.forEach(icon => {
        icon.classList.toggle('hidden')
    })
})

submenu1.addEventListener('click', function () {
    if (submenus1.style.display === 'block') {
        submenus1.style.display = 'none';
    } else {
        submenus1.style.display = 'block'
    }
})
submenu2.addEventListener('click', function () {
    if (submenus2.style.display === 'block') {
        submenus2.style.display = 'none';
    } else {
        submenus2.style.display = 'block'
    }
})
submenu3.addEventListener('click', function () {
    if (submenus3.style.display === 'block') {
        submenus3.style.display = 'none';
    } else {
        submenus3.style.display = 'block'
    }
})


window.addEventListener("resize", () => {
    if (document.body.clientWidth > 768) {
        nav.classList.remove('open')
        navIcon.forEach(icon => {
            icon.classList.add('hidden')
        })
        hamburger.classList.remove('hidden')
    }
})