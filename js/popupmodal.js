// Function for getting the pop up form on clicking the 
//respective button.
//Check this on socialmediamanager.html file.

document.getElementById("button").addEventListener(("click"), function(){
    document.querySelector (".popup-form").style.display = "flex";
});

//the function to close the pop up form

document.querySelector('.close').addEventListener(('click'), function(){
    document.querySelector(".popup-form").style.display = "none";
});