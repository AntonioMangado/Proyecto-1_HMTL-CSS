// Variables -------------------------------------------------------------------------------------------------------------
const burgerMenu = document.querySelector('.nav__burgermenu');
const navLinks = document.querySelector('.nav__links--hidden');
const progressBar = document.querySelector('.header__progressbar');


// Functions ------------------------------------------------------------------------------------------------------------
function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;
    console.log(scrollPercent);
    progressBar.style.width = scrollPercent;

}


// Event Listeners -------------------------------------------------------------------------------------------------------

// Burger Menu
burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Progress Bar
document.addEventListener('scroll', updateProgressBar);

console.log(navLinks);