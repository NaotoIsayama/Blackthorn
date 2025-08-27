/* This js file updates the text content of the custom file upload button with the 
filename of the uploaded file*/

const button = document.querySelector('.custom-file-upload');
const hiddenFileInput = document.getElementById('reference-photos');

hiddenFileInput.addEventListener("change", () => {
    if (input.files.length > 0) {
        button.textContent = input.files[0].name;
    } else {
        label.textContent = "UPLOAD REFERENCE PHOTOS";
    }
});