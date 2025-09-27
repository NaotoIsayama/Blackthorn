// This program builds a flashForm.html page on load from metadata saved to sessionStorage


/* Notes: In the html, placement will be stored as a string delimited by commas. In JS, you're
going to have to turn it back into an array manually, or find a way to work with it as is*/

document.addEventListener('DOMContentLoaded', () =>{
    
    // Grab placeholders from the DOM
    const flashName = document.querySelector(".placeholder-input-text");
    const minSize = document.querySelector(".placeholder-num-input");
    const placementDropdown = document.querySelector(".placeholder-dropdown");

    // Console.log session
    console.log('The Content of session storage is: ', sessionStorage);

    // Set name of flash tattoo in input
    flashName.placeholder = sessionStorage.getItem("name");

    // Set min size on size input, dont forget to convert to int
    minSize.min = sessionStorage.getItem("min-size");
});