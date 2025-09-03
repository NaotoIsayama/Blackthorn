// JS file to trigger the 'slideUpAndFade' animation
// as the user scrolls into each section of the website

const sections = document.querySelectorAll('.fade-section');
const lightsections = document.querySelectorAll('.light-section');
const nav = document.querySelector('#desktopNav');
const navHeight = nav.offsetHeight;

const observer1 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fadeItems = entry.target.querySelectorAll('.fade'); //selects children of the section with fade class
            fadeItems.forEach(item => item.classList.add('visible'));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2});

const observer2 = new IntersectionObserver((entries) => {
    entries.forEach(entry =>{
        if (entry.isIntersecting && window.scrollY > 0) {
            nav.classList.add('bg-dark');
        }
        else {
            nav.classList.remove('bg-dark');
        }
    })
}, { 
    root: null,
    threshold: 0.1
});

window.addEventListener('resize', () => {
    sections.forEach(section => observer1.unobserve(section));
    sections.forEach(section => observer1.observe(section));
    lightsections.forEach(section => observer2.unobserve(section));
    lightsections.forEach(section => observer2.observe(section));
});

sections.forEach(sec => observer1.observe(sec));
lightsections.forEach(sec => observer2.observe(sec));
