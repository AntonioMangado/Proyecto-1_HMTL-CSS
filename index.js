// Variables -------------------------------------------------------------------------------------------------------------
const burgerMenu = document.querySelector('.nav__burgermenu');
const navLinks = document.querySelector('.nav__links--hidden');
const progressBar = document.querySelector('.header__progressbar');
const toTop = document.querySelector(".to-top");


// Functions ------------------------------------------------------------------------------------------------------------
function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;
    progressBar.style.width = scrollPercent;
}


// Event Listeners -------------------------------------------------------------------------------------------------------

// Burger Menu
burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Progress Bar
document.addEventListener('scroll', updateProgressBar);

// To top button shows up when scrolling
window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        toTop.classList.add("shown");
    } else {
        toTop.classList.remove("shown");
    }
});