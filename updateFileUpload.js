/* This js file updates the text content of the custom file upload button with the 
filename of the uploaded file*/

const button = document.querySelector('.custom-file-upload__btn-text');
const hiddenFileInput = document.getElementById('reference-photos');

hiddenFileInput.addEventListener("change", () => {
    if (hiddenFileInput.files.length > 0) {
        button.textContent = hiddenFileInput.files[0].name;
        button.style.border = "3px solid var(--rose)";
    } else {
        label.textContent = "UPLOAD REFERENCE PHOTOS";
    }
});