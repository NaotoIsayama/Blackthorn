/* This js file updates the text content of the custom file upload button with the 
filename of the uploaded file*/

const button = document.querySelectorAll('.custom-file-upload-1, .custom-file-upload-2, .custom-file-upload-3');
const buttonText = document.querySelectorAll('.custom-file-upload__btn-text-1, .custom-file-upload__btn-text-2, .custom-file-upload__btn-text-3');
const hiddenFileInputs = document.querySelectorAll('#reference-photos1, #reference-photos2, #reference-photos3');

// note that all are the same size, so use i to find corresponding elements
const buttonArray = [...button];
const buttonTextArray = [...buttonText];
const hiddenFileInputsArray = [...hiddenFileInputs]

console.log('The hiddenFileInputsArray is: ', hiddenFileInputsArray);
console.log('The buttonArray is: ', buttonArray);
console.log('The buttonTextArray is: ', buttonTextArray);

for (let i = 0; i < buttonArray.length; i++) {
    hiddenFileInputs[i].addEventListener("change", () => {
        if (hiddenFileInputs[i].files.length > 0) {
            buttonTextArray[i].textContent = hiddenFileInputs[i].files[0].name;
            buttonArray[i].style.border = "3px solid var(--rose)";
        } else {
            label.textContent = "UPLOAD REFERENCE PHOTOS";
        }
    });
};