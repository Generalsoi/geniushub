const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach.addEventListener('click', link => {
    link.classList.toggle('active')
})