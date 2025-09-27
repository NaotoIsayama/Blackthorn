//build page on load

document.addEventListener('DOMContentLoaded', () => {
    
    // Grab all relevant elements from the DOM
    placeholdersList = document.querySelectorAll(".placeholder");

    // console.log sessionStorage contents
    console.log("Name in session storage is", sessionStorage.getItem("name"));
    
})