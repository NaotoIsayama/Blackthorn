
// DOM elements
const image = document.querySelector(".testimonial__image");
const author = document.querySelector(".testimonial__author");
const testimonial = document.querySelector(".testimonial__body");
const indicatorsNodeList = document.querySelectorAll(".testimonial__indicator");


// Variables
let currIndex = 0; // since the first testimonial is hardcoded in index.html, 

// Testimonials array
const testimonialsArray = [
    {
        author: 'Emily Smith',
        testimonial: '\“Evelyn completely exceeded my expectations. She took my rough idea and transformed it into a stunning piece that feels like it was always meant to be on my skin. The studio is spotless and has such a calm, creative vibe. I\’ll definitely be back for my next tattoo.\”',
        image: 'images/testimonial-1.webp'
    },
    {
        author: 'Sarah Banks',
        testimonial: "\"Evelyn is an absolute artist. She listened to exactly what I wanted and brought it to life with incredible detail and creativity. Her studio is welcoming and impeccably clean, making the whole experience so comfortable. I couldn\’t be happier with my tattoo and can\’t wait to book my next session.\"",
        image: 'images/testimonial-2.webp'
    },
    {
        author: 'John Doe',
        testimonial: "\"Working with Evelyn was amazing from start to finish. She turned my vague idea into a piece that\’s even more beautiful than I imagined. The studio has a relaxed, inspiring atmosphere, and she makes you feel completely at ease. I\’m already planning my next tattoo with her.\"",
        image: 'images/testimonial-3.webp'
    }
];

// preload images
testimonialsArray.forEach(i => {
    const img = new Image();
    img.src = i.image;
});

// Function to remove the 'visible' class added by sectionObserver.js
function removeVisible() {
    image.classList.remove('visible');
    author.classList.remove('visible');
    testimonial.classList.remove('visible');
    image.src = testimonialsArray[currIndex].image; // just so the image switch gets a headstart
}

// Function to switch content. 
// index is incremented already by the time this func is called
function swapContent(index) {
    indicatorsNodeList.forEach(i => i.classList.remove('selected'));
    image.classList.add('visible');
    testimonial.textContent = testimonialsArray[index].testimonial;
    testimonial.classList.add('visible');
    author.textContent = testimonialsArray[index].author;
    author.classList.add('visible');
    indicatorsNodeList[index].classList.add('selected');
}

function main() {
    setInterval(() => {
        currIndex = (currIndex + 1) % testimonialsArray.length;
        removeVisible();
        setTimeout(() => {swapContent(currIndex)}, 175);
    }, 7500);
    
};

main();


