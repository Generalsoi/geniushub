// Function for getting the pop up on clicking the 
//mission button.
//Check this on index.html file.

document.getElementById("mission").addEventListener(("click"), function(){
    document.querySelector (".popup").style.display = "flex";
    document.body.style.overflow = "hidden";
});

document.getElementById("vision").addEventListener(("click"), function(){
    document.querySelector (".popup-2").style.display = "flex";
    document.body.style.overflow = "hidden";
});

//the function to close the pop up form

document.querySelector('.exit').addEventListener(('click'), function(){
    document.querySelector(".popup").style.display = "none";
    document.body.style.overflow = "auto";
});

document.querySelector('.close').addEventListener(('click'), function(){
    document.querySelector(".popup-2").style.display = "none";
    document.body.style.overflow = "auto";
});