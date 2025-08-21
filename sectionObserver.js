// JS file to trigger the 'slideUpAndFade' animation
// as the user scrolls into each section of the website

const sections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fadeItems = entry.target.querySelectorAll('.fade'); //selects children of the section with fade class
            fadeItems.forEach(item => item.classList.add('visible'));
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2});

window.addEventListener('resize', () => {
    sections.forEach(section => observer.unobserve(section));
    sections.forEach(section => observer.observe(section));
});

sections.forEach(sec => observer.observe(sec));
