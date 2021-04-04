const openModalButtons = document.getElementById('data-modal-target')
const closeModalButtons = document.getElementById('data-close-button')
const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')

openModalButtons.onclick = function() {
    modal.style.display = 'block'
    overlay.style.display = 'block'
}

closeModalButtons.onclick = function() {
    modal.style.display = "none"
    overlay.style.display = 'none'
}



window.onclick = function(event){
    if (event.target == modal){
        modal.style.display = "none"
    }
}

