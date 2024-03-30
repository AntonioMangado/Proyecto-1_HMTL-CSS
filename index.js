// Variables -------------------------------------------------------------------------------------------------------------
const USER_REGEX = /^.{3,20}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const burgerMenu = document.querySelector('.nav__burgermenu');
const navLinks = document.querySelector('.nav__links--hidden');
const progressBar = document.querySelector('.header__progressbar');
const toTop = document.querySelector(".to-top");
const contactForm = document.querySelector('.contact__form');
const errorName = document.querySelector('.error-msg.name');
const errorEmail = document.querySelector('.error-msg.email');
const errorConsent = document.querySelector('.error-msg.consent');
const nameLabel = document.querySelector('label[for="name"]');
const nameInput = document.querySelector('input[name="name"]');
const emailLabel = document.querySelector('label[for="email"]');
const emailInput = document.querySelector('input[name="email"]');
console.log(nameInput);

// Functions ------------------------------------------------------------------------------------------------------------
function updateProgressBar() {
    const { scrollTop, scrollHeight } = document.documentElement;
    const scrollPercent = `${(scrollTop / (scrollHeight - window.innerHeight)) * 100}%`;
    progressBar.style.width = scrollPercent;
}

function showToTopButton() {
    if (window.scrollY > 100) {
        toTop.classList.add("shown");
    } else {
        toTop.classList.remove("shown");
    }
}

function validateForm(e) {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const consent = e.target[2].checked;

    if (!USER_REGEX.test(name)) {
        errorName.innerHTML = 'Please enter a valid name';
        errorName.style.display = 'block';
        nameLabel.style.color = '#ff0033';
        nameInput.style.borderBottom = '2px solid #ff0033';
    } else {
        errorName.style.display = 'none';
        nameLabel.style.color = '#08A6E4';
        nameInput.style.borderBottom = '1px solid black';
    }
    
    if (!EMAIL_REGEX.test(email)) {
        errorEmail.innerHTML = 'Please enter a valid email';
        errorEmail.style.display = 'block';
        emailLabel.style.color = '#ff0033';
        emailInput.style.borderBottom = '2px solid #ff0033';
    } else {
        errorEmail.style.display = 'none';
        emailLabel.style.color = '#08A6E4';
        emailInput.style.borderBottom = '1px solid black';
    }
    
    if (!consent) {
        errorConsent.innerHTML = 'Please accept the terms and conditions';
        errorConsent.style.display = 'block';
    } else {
        errorConsent.style.display = 'none';
    }

    if (USER_REGEX.test(name) && EMAIL_REGEX.test(email) && consent) {
        contactForm.submit();
    }
}



// Event Listeners -------------------------------------------------------------------------------------------------------

// Burger Menu
burgerMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Progress Bar
document.addEventListener('scroll', updateProgressBar);

// To top button shows up when scrolling
window.addEventListener("scroll", showToTopButton);

// Contact Form validation
contactForm.addEventListener('submit', validateForm);