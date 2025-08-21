// DOM elements
const form = document.querySelector('form');
const message = document.querySelector('#submit-message');

form.addEventListener('submit', e => {
    e.preventDefault();
    form.classList.add('submit-fade-out');
    setTimeout(()=>{message.classList.add('submit-fade-in');}, 1000);
    
});