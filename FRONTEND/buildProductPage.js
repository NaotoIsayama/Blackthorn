//build page on load

document.addEventListener('DOMContentLoaded', () => {
    
    // Grab all relevant elements from the DOM
    placeholdersList = document.querySelectorAll(".placeholder");

    // console.log sessionStorage contents
    console.log("Name in session storage is", sessionStorage.getItem("name"));

    // console.log contents of placeholdersList
    console.log("placeholdersList is: ", placeholdersList);

    placeholdersList.forEach(item => {
        key = item.dataset.label;
        if (sessionStorage[key]) {
            item.textContent = products[key];
        }
    })
    
})