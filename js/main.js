// Targeting the navigation menu to make it responsive 
const navToggle = document.getElementById("navToggle")
const nav = document.querySelector("nav")
const navIcon = document.querySelectorAll('.navIcon')
const hamburger = document.querySelector("#hamburger")

navToggle.addEventListener('click', function () {
    nav.classList.toggle('open')
    navIcon.forEach(icon => {
        icon.classList.toggle('hidden')
    })
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