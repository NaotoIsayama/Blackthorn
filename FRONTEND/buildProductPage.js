//build page on load

document.addEventListener('DOMContentLoaded', () => {
    
    // Grab all relevant elements from the DOM
    placeholdersList = document.querySelectorAll(".placeholder");

    // console.log sessionStorage contents
    console.log("Image in session storage is", sessionStorage.getItem("image"));

    // console.log contents of placeholdersList
    console.log("placeholdersList is: ", placeholdersList);

    placeholdersList.forEach(item => {
        key = item.dataset.label; // extract data-label value for lookup in sessionStorage
        console.log("Key is currently: ", key);
        // Check if item is a img tag first
        if (item.tagName === 'IMG') {
            item.src = sessionStorage.getItem("key");
        } else {
            item.textContent = sessionStorage.getItem("key");
        }
    }); 
});