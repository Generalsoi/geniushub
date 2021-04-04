const openModalButtons2 = document.getElementById('data-modal-target2')
const closeModalButtons2 = document.getElementById('data-close-button2')
const overlay = document.getElementById('overlay')
const modal2 = document.getElementById('modal2')


openModalButtons2.onclick = function() {
    modal2.style.display = 'block'
    overlay.style.display = 'block'
}


closeModalButtons2.onclick = function() {
    modal2.style.display = "none"
    overlay.style.display = 'none'
}

window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none"
    }
}