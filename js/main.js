// Targeting the navigation menu to make it responsive 
const navToggle = document.getElementById("navToggle")
const nav = document.querySelector("nav")
const navIcon = document.querySelectorAll('.navIcon')
const hamburger = document.querySelector("#hamburger")
const submenu = document.querySelector("nav ul li")
const submenus = document.querySelector("nav ul li ul")

navToggle.addEventListener('click', function () {
    nav.classList.toggle('open')
    navIcon.forEach(icon => {
        icon.classList.toggle('hidden')
    })
})

submenu.addEventListener('click', function () {
    /*this.siblings.classList.remove('active')
    this.classList.toggle('active')*/
    submenus.style.display = 'block'
})

window.addEventListener("resize", () => {
    if (document.body.clientWidth > 768){
        nav.classList.remove('open')
        navIcon.forEach(icon => {
            icon.classList.add('hidden')
        })
        hamburger.classList.remove('hidden')
    }
})