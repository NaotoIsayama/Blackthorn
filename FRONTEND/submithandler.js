// DOM elements
const form = document.querySelector('form');
const message = document.querySelector('#submit-message');
const submit = document.getElementById('submit-button')

form.addEventListener('submit', e => {
    e.preventDefault();
    submit.textContent("Submission Disabled!")
    /*
    form.classList.add('submit-fade-out');
    setTimeout(()=>{message.classList.add('submit-fade-in');}, 1000);*/
}); 